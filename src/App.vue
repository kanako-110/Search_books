<template>
	<div class="app m-5 has-text-centered">
		<h1 class="title">Book Finder</h1>
		<Form @button-click="fetchData" :isLoading="isLoading" />
		<!-- TODO?: スタイリングなど大きくなったらCardをListに入れる、そこでSelectもいれる？ -->
		<SortBox @selection-change="setSortvalue" />
		<div
			class="is-fullwidth is-flex is-justify-content-space-between is-flex-wrap-wrap"
		>
			<BookCard v-for="book in result" :key="book.id" :book="book" />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Form from './components/Form.vue';
import BookCard from './components/BookCard.vue';
import axios from 'axios';
import { ref, watch } from 'vue';
import SortBox from './components/SortBox.vue';
import { SortType } from './types';

// TODO: 結果ない時
export default defineComponent({
	name: 'App',
	components: { Form, BookCard, SortBox },
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
		};
	},
});
</script>

<style lang="scss">
@import '../node_modules/bulma/bulma.sass';
</style>
