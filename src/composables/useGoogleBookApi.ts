import { BooksApiType, ItemType, SortType } from '@/types';
import axios, { AxiosError } from 'axios';
import { Ref, ref } from 'vue';

interface ReturnType {
	books: Ref<ItemType[] | undefined>;
	totalNumber: Ref<number | undefined>;
	loading: Ref<boolean>;
	error: Ref<string | undefined>;
	pageError: Ref<boolean>;
	totalPages: Ref<number>;
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
	const error = ref<string | undefined>(undefined);
	const totalPages = ref<number>(0);
	const pageError = ref(false);
	const perPage = 10;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const booksData: any = {};

	const fetchBooks = async () => {
		if (currentPage.value in booksData) {
			console.log('すでにある');
			books.value = booksData[currentPage.value].items;
			totalNumber.value = booksData[currentPage.value].totalItems;
			totalPages.value = Math.ceil(booksData.totalItems / perPage);
			loading.value = false;
		} else {
			console.log('fetch-booksData', booksData);
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
					console.log(resp.data);
					booksData[currentPage.value] = resp.data;
					const data: BooksApiType = resp.data;
					books.value = data.items;
					totalNumber.value = data.totalItems;
					totalPages.value = Math.ceil(data.totalItems / 10);
					if (data.totalItems > 0 && !('items' in resp.data)) {
						console.log('totalItem0以上なのに、itemsがない');
						pageError.value = true;
					}
				})
				.catch((err: AxiosError<IErrorResponse>) => {
					console.error(err.message);
					if (err.response?.status === 400) {
						console.log('400');
						pageError.value = true;
					} else {
						error.value = err.message;
					}
				})
				.finally(() => {
					console.log(booksData);
					console.log(books.value);
					loading.value = false;
				});
		}
	};

	const submitNewSearch = () => {
		for (const key in booksData) delete booksData[key];
		currentPage.value = 1;
		fetchBooks();
	};

	return {
		books,
		totalNumber,
		loading,
		error,
		pageError,
		totalPages,
		fetchBooks,
		submitNewSearch,
	};
};
