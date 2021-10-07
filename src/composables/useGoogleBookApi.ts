import { BooksApiType, ItemType, SortType } from '@/types';
import axios, { AxiosError } from 'axios';
import { Ref, ref, watch } from 'vue';

// TODO; type
interface ReturnType {
	books: Ref<ItemType[] | undefined>;
	totalNumber: Ref<number | undefined>;
	loading: Ref<boolean>;
	error: Ref<string | undefined>;
	totalPages: Ref<number>;
	fetchBooks: (currentPage?: number) => Promise<void>;
}

interface IErrorResponse {
	error: string;
}

// 命名
export const useGoogleBookApi = (
	text: Ref<string>,
	sort: Ref<SortType>
): ReturnType => {
	const books = ref<ItemType[] | undefined>(undefined);
	const totalNumber = ref<number | undefined>(undefined);
	const loading = ref(false);
	const error = ref<string | undefined>(undefined);
	const totalPages = ref<number>(0);

	const fetchBooks = async (currentPage = 1) => {
		loading.value = true;
		await axios
			.get('https://www.googleapis.com/books/v1/volumes', {
				params: {
					q: text.value,
					orderBy: sort.value,
					maxResults: 10,
					startIndex: (currentPage - 1) * 10,
				},
			})
			.then((resp) => {
				console.log(resp.data);
				const data: BooksApiType = resp.data;
				books.value = data.items;
				totalNumber.value = data.totalItems;
				totalPages.value = Math.ceil(data.totalItems / 40);
			})
			.catch((err: AxiosError<IErrorResponse>) => {
				error.value = err.message;
				console.error(err.message);
			})
			.finally(() => {
				loading.value = false;
			});
	};

	const callFetchBooks = () => {
		fetchBooks();
	};

	watch(sort, callFetchBooks);

	return {
		books,
		totalNumber,
		loading,
		error,
		totalPages,
		fetchBooks,
	};
};
