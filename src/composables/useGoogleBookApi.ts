import { BooksApiType, ItemType, SortType } from '@/types';
import axios, { AxiosError } from 'axios';
import { Ref, ref } from 'vue';

interface ReturnType {
	books: Ref<ItemType[] | undefined>;
	totalNumber: Ref<number | undefined>;
	loading: Ref<boolean>;
	error: Ref<boolean>;
	pageError: Ref<boolean>;
	totalPages: Ref<number>;
	pageKey: Ref<number | undefined>;
	fetchBooks: (currentPage?: number) => Promise<void>;
	submitNewSearch: () => void;
}

interface IErrorResponse {
	error: string;
}

export const useGoogleBookApi = (
	text: Ref<string>,
	sort: Ref<SortType>,
	currentPage: Ref<number>
): ReturnType => {
	const books = ref<ItemType[] | undefined>(undefined);
	const totalNumber = ref<number | undefined>(undefined);
	const loading = ref(false);
	const error = ref(false);
	const totalPages = ref<number>(0);
	const pageError = ref(false);
	const pageKey = ref<number | undefined>(undefined);
	const perPage = 10;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const fetchedBooks: any = {};

	const fetchBooks = async () => {
		loading.value = true;
		if (currentPage.value in fetchedBooks) {
			books.value = fetchedBooks[currentPage.value].items;
			totalNumber.value = fetchedBooks[currentPage.value].totalItems;
			totalPages.value = Math.ceil(fetchedBooks.totalItems / perPage);
		} else {
			await axios
				.get('https://www.googleapis.com/books/v1/volumes', {
					params: {
						q: text.value,
						orderBy: sort.value,
						maxResults: perPage,
						startIndex: (currentPage.value - 1) * perPage,
					},
				})
				.then((resp) => {
					const data: BooksApiType = resp.data;
					fetchedBooks[currentPage.value] = data;
					books.value = data.items;
					totalNumber.value = data.totalItems;
					totalPages.value = Math.ceil(data.totalItems / perPage);

					// apiの仕様上、fetchするたびに検索結果合計数(totalItems)が変わる。
					// その際に起きる、新しいページを押すと本が存在しなくなっているエラーを検知する。
					if (data.totalItems > 0 && !('items' in resp.data)) {
						pageError.value = true;
					}
				})
				.catch((err: AxiosError<IErrorResponse>) => {
					console.error(err.message);
					// 上記同様、新しいページを押すと本が存在しなくなっているエラーを検知する。
					if (err.response?.status === 400) {
						pageError.value = true;
					} else {
						error.value = true;
					}
				});
		}
		loading.value = false;
	};

	const submitNewSearch = () => {
		currentPage.value = 1;
		pageKey.value = Math.floor(Math.random() * 10000);
		for (const key in fetchedBooks) delete fetchedBooks[key];
		error.value = false;
		pageError.value = false;

		fetchBooks();
	};

	return {
		books,
		totalNumber,
		loading,
		error,
		pageError,
		totalPages,
		pageKey,
		fetchBooks,
		submitNewSearch,
	};
};
