<template>
	<div class="app has-text-centered">
		<Header @button-click="handleBookSearch" :loading="loading" />
		<div class="m-5">
			<SortBox v-show="books" @selection-change="handleSortChange" />
			<div v-show="totalNumber" class="mt-4">
				<Pagination
					:key="pageKey"
					:totalPages="totalPages"
					:currentPage="currentPage"
					@click-new-page="handlePageClick"
				>
					<BookResult
						:books="books"
						:totalNumber="totalNumber"
						:error="error"
						:pageError="pageError"
						class="mt-3"
					/>
				</Pagination>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ref } from 'vue';
import SortBox from './components/SortBox.vue';
import { SortType } from './types';
import Header from './components/Header.vue';
import BookResult from './components/BookResult.vue';
import { useGoogleBookApi } from './composables/useGoogleBookApi';
import Pagination from './components/Pagination.vue';

export default defineComponent({
	name: 'App',
	components: { SortBox, Header, BookResult, Pagination },
	setup() {
		const sort = ref<SortType>('relevance');
		const userInput = ref('');
		const currentPage = ref(1);

		const {
			books,
			totalNumber,
			totalPages,
			loading,
			error,
			pageError,
			pageKey,
			fetchBooks,
			submitNewSearch,
		} = useGoogleBookApi(userInput, sort, currentPage);

		const handlePageClick = (page: number) => {
			currentPage.value = page;
			fetchBooks();
		};

		const handleBookSearch = (text: string) => {
			userInput.value = text;
			submitNewSearch();
		};

		const handleSortChange = (value: SortType) => {
			sort.value = value;
			submitNewSearch();
		};

		return {
			books,
			totalNumber,
			loading,
			error,
			pageError,
			totalPages,
			currentPage,
			pageKey,
			fetchBooks,
			handleBookSearch,
			handleSortChange,
			handlePageClick,
		};
	},
});
</script>

<style lang="scss">
@import '../node_modules/bulma/bulma.sass';
@import url('https://fonts.googleapis.com/css2?family=Merriweather&display=swap');
</style>
