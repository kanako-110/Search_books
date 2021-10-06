import { BooksApiType, ItemType, SortType } from '@/types';
import axios, { AxiosError } from 'axios';
import { Ref, ref, watch } from 'vue';

// TODO; type
interface ReturnType {
	books: Ref<ItemType[] | undefined>;
	totalNumber: Ref<number | undefined>;
	loading: Ref<boolean>;
	error: Ref<string | undefined>;
	fetchBooks: () => Promise<void>;
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

	const fetchBooks = async () => {
		loading.value = true;
		await axios
			.get(
				`https://www.googleapis.com/books/v1/volumes?q=${
					text.value
				}${sort.value === 'newest' && '&orderBy=newest'}`
			)
			.then((resp) => {
				const data: BooksApiType = resp.data;
				books.value = data.items;
				totalNumber.value = data.totalItems;
			})
			.catch((err: AxiosError<IErrorResponse>) => {
				error.value = err.message;
				console.error(err.message);
			})
			.finally(() => {
				loading.value = false;
			});
	};

	watch(sort, fetchBooks);

	return {
		books,
		totalNumber,
		loading,
		error,
		fetchBooks,
	};
};
