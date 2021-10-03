<template>
	<div class="app has-text-centered">
		<Header @button-click="fetchData" :isLoading="isLoading" />
		<div class="mt-4">
			<SortBox @selection-change="setSortvalue" />
		</div>
		<div
			class="is-fullwidth is-flex is-justify-content-space-around is-flex-wrap-wrap"
		>
			<BookCard v-for="book in result" :key="book.id" :book="book" />
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

// TODO: 結果ない時
export default defineComponent({
	name: 'App',
	components: { BookCard, SortBox, Header },
	setup() {
		const result = ref(undefined);
		const sort = ref<SortType>('relevance');
		const userInput = ref('');
		const isLoading = ref(false);

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

		return {
			result,
			fetchData,
			isLoading,
			setSortvalue,
			Header,
		};
	},
});
</script>

<style lang="scss">
@import '../node_modules/bulma/bulma.sass';
@import url('https://fonts.googleapis.com/css2?family=Merriweather&display=swap');
</style>
