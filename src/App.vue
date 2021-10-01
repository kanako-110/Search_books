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
		<BookCard />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Form from './components/Form.vue';
import BookCard from './components/BookCard.vue';

export default defineComponent({
	name: 'App',
	components: { Form, BookCard },
	setup() {
		// TODO:  watch
		const fetchData = (text: string) => {
			console.log({ text });
		};
		return {
			fetchData,
		};
	},
});
</script>

<style lang="scss">
@import '../node_modules/bulma/bulma.sass';
</style>
