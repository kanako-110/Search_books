<template>
	<div class="app">
		<h1 class="title">Search Books</h1>
		<Form @fetch-data="fetchData" />
		<!-- TODO?: スタイリングなど大きくなったらCardをListに入れる、そこでSelectもいれる？ -->
		<div class="select">
			<select>
				<option>関連順</option>
				<option>新しい順</option>
			</select>
		</div>
		<BookCard v-for="book in data" :key="book.id" :book="book" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Form from './components/Form.vue';
import BookCard from './components/BookCard.vue';
import axios from 'axios';
import { ref } from 'vue';

// TODO: loading

export default defineComponent({
	name: 'App',
	components: { Form, BookCard },
	setup() {
		const data = ref(undefined);
		// TODO:  watch
		// sortがnewだったらパラメーターにnewをいれる、関連だったらデフォルト
		const fetchData = async (text: string) => {
			console.log({ text });
			await axios
				.get(`https://www.googleapis.com/books/v1/volumes?q=${text}`)
				.then((resp) => {
					console.log(resp.data.items);
					data.value = resp.data.items;
				})
				.catch((err) => {
					// ユーザーにエラー表示
					console.log(err);
				});
		};

		return {
			fetchData,
			data,
		};
	},
});
</script>

<style lang="scss">
@import '../node_modules/bulma/bulma.sass';
</style>
