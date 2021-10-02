<template>
	<div class="app">
		<h1 class="title">Search Books</h1>
		<Form @button-click="fetchData" :isLoading="isLoading" />
		<!-- TODO?: スタイリングなど大きくなったらCardをListに入れる、そこでSelectもいれる？ -->
		<div class="select">
			<select v-model="sort">
				<option
					:key="option.value"
					v-for="option in options"
					:value="option.value"
				>
					{{ option.label }}
				</option>
			</select>
		</div>
		<BookCard v-for="book in result" :key="book.id" :book="book" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Form from './components/Form.vue';
import BookCard from './components/BookCard.vue';
import axios from 'axios';
import { ref, watch } from 'vue';

// TODO: loading

export default defineComponent({
	name: 'App',
	components: { Form, BookCard },
	setup() {
		const result = ref(undefined);
		const options = ref([
			{ value: 'relevance', label: '関連順' },
			{ value: 'newest', label: '新着順' },
		]);
		const sort = ref<'relevance' | 'newest'>('relevance');
		const userInput = ref('');
		const isLoading = ref(false);

		const fetchData = async (text: string) => {
			console.log(sort.value);
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
					console.log(resp.data.items);

					// // TODO; tsエラ⓪ー
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

		return {
			result,
			options,
			sort,
			fetchData,
			isLoading,
		};
	},
});
</script>

<style lang="scss">
@import '../node_modules/bulma/bulma.sass';
</style>
