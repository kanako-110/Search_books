<template>
	<div class="app has-text-centered">
		<Header @button-click="handleBookSearch" :loading="loading" />
		<div class="m-5">
			<SortBox v-show="books" @selection-change="setSortValue" />
			<BookResult
				:books="books"
				:totalNumber="totalNumber"
				:error="error"
				class="mt-5"
			/>
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

// TODO: console.log消す

export default defineComponent({
	name: 'App',
	components: { SortBox, Header, BookResult },
	setup() {
		const sort = ref<SortType>('relevance');
		const userInput = ref('');

		const { books, totalNumber, loading, error, fetchBooks } = useGoogleBookApi(
			userInput,
			sort
		);

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
