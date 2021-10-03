<template>
	<div class="app has-text-centered">
		<Header @button-click="fetchData" :isLoading="isLoading" />
		<div class="my-4">
			<SortBox @selection-change="setSortvalue" />
			<!-- TODO: component化 -->
			<div>
				<div class="mt-5">
					<EmptyResult v-if="noResult" />
					<div
						v-else
						class="is-fullwidth is-flex is-justify-content-space-around is-flex-wrap-wrap"
					>
						<BookCard v-for="book in result" :key="book.id" :book="book" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BookCard from './components/BookCard.vue';
import axios from 'axios';
import { ref, watch } from 'vue';
import SortBox from './components/SortBox.vue';
import { SortType } from './types';
import Header from './components/Header.vue';
import EmptyResult from './components/EmptyResult.vue';

export default defineComponent({
	name: 'App',
	components: { BookCard, SortBox, Header, EmptyResult },
	setup() {
		const result = ref(undefined);
		const sort = ref<SortType>('relevance');
		const userInput = ref('');
		const isLoading = ref(false);
		const noResult = ref(undefined);

		const fetchData = async (text: string) => {
			isLoading.value = true;
			userInput.value = text;
			await axios
				.get(
					`https://www.googleapis.com/books/v1/volumes?q=${text}${sort.value ===
						'newest' && '&orderBy=newest'}`
				)
				.then((resp) => {
					console.log(resp.data);
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-ignore
					result.value = resp.data.items;
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-ignore
					noResult.value = resp.data.totalItems === 0;
				})
				.catch((err) => {
					// ユーザーにエラー表示
					console.log(err);
				});
			isLoading.value = false;
		};

		watch(sort, () => fetchData(userInput.value));

		const setSortvalue = (value: SortType) => {
			console.log('selection');
			sort.value = value;
		};

		console.log(noResult.value);

		return {
			result,
			fetchData,
			isLoading,
			setSortvalue,
			Header,
			noResult,
		};
	},
});
</script>

<style lang="scss">
@import '../node_modules/bulma/bulma.sass';
@import url('https://fonts.googleapis.com/css2?family=Merriweather&display=swap');
</style>
