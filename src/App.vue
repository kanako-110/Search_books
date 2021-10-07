<template>
	<div class="app has-text-centered">
		<Header @button-click="handleBookSearch" :loading="loading" />
		<div class="m-5">
			<SortBox v-show="books" @selection-change="setSortValue" />
			<div v-show="totalNumber">
				<BookResult
					:books="books"
					:totalNumber="totalNumber"
					:error="error"
					:pageError="pageError"
					class="mt-5"
				/>
				<Pagination
					:totalPages="totalPages"
					@click-new-page="fetchBooks"
					class="mt-3"
				/>
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

		const {
			books,
			totalNumber,
			totalPages,
			loading,
			error,
			pageError,
			fetchBooks,
		} = useGoogleBookApi(userInput, sort);

		const handleBookSearch = (text: string) => {
			userInput.value = text;
			fetchBooks();
		};

		const setSortValue = (value: SortType) => {
			sort.value = value;
		};

		return {
			books,
			totalNumber,
			loading,
			error,
			pageError,
			totalPages,
			fetchBooks,
			handleBookSearch,
			setSortValue,
		};
	},
});
</script>

<style lang="scss">
@import '../node_modules/bulma/bulma.sass';
@import url('https://fonts.googleapis.com/css2?family=Merriweather&display=swap');
</style>
