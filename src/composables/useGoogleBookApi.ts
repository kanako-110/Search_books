import { BooksType, SortType } from '@/types';
import axios from 'axios';
import { Ref, ref, watch } from 'vue';

const fetchBooks = async (text: Ref<string>, sort: Ref<SortType>) => {
	const data = ref(undefined);

	await axios
		.get(
			`https://www.googleapis.com/books/v1/volumes?q=${
				text.value
			}${sort.value === 'newest' && '&orderBy=newest'}`
		)
		.then((resp) => {
			console.log(resp.data);
			data.value = resp.data;
		})
		.catch((err) => {
			// ユーザーにエラー表示
			console.log(err);
		});

	// itemにわける
	return data;
};

// TODO; type
interface ReturnType {
	books: Ref<BooksType | undefined>;
	loading: Ref<boolean>;
	getBooks: () => Promise<void>;
}

export const useGoogleBookApi = (
	text: Ref<string>,
	sort: Ref<SortType>
): ReturnType => {
	const books = ref<BooksType | undefined>(undefined);
	const loading = ref(false);

	const getBooks = async () => {
		loading.value = true;
		const data = await fetchBooks(text, sort);
		books.value = data.value;
		loading.value = false;
	};

	watch(sort, getBooks);

	return {
		books,
		loading,
		getBooks,
	};
};
