<template>
	<div class="app has-text-centered">
		<Header @button-click="fetchData" :isLoading="isLoading" />
		<div class="my-4">
			<SortBox @selection-change="setSortValue" />
			<BookResult :response="response" />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';
import { ref, watch } from 'vue';
import SortBox from './components/SortBox.vue';
import { SortType } from './types';
import Header from './components/Header.vue';
import BookResult from './components/BookResult.vue';

// TODO: type errで検索できなくなる
// waringたち

// skelton
// https://codepen.io/abelhorihuela/pen/bZjrEW?css-preprocessor=scss
// api fetch
// https://v3.ja.vuejs.org/guide/composition-api-introduction.html#%E3%82%B9%E3%82%BF%E3%83%B3%E3%83%88%E3%82%99%E3%82%A2%E3%83%AD%E3%83%B3%E3%81%AA-computed-%E3%83%95%E3%82%9A%E3%83%AD%E3%83%8F%E3%82%9A%E3%83%86%E3%82%A3

// data
// https://developers.google.com/books/docs/v1/using

// TODO: type errで検索できなくなる
// waringたち
// placeholder
// overfetchしてないか
// fetchDataの場所（Formだとemitしまくる。emitのemitの仕方

// Todo: Appをpageとして、他に内容を置くのもあり
// console.log消す
// Sortボタンが、検索した後に出てきてもいいかも
// pagination
// totalNumberたちのわけかた・。propsでわたす方がよい、、
// @app responseからbooksに変える

export default defineComponent({
	name: 'App',
	components: { SortBox, Header, BookResult },
	setup() {
		const response = ref(undefined);
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
					response.value = resp.data;
				})
				.catch((err) => {
					// ユーザーにエラー表示
					console.log(err);
				});
			isLoading.value = false;
		};

		watch(sort, () => fetchData(userInput.value));

		const setSortValue = (value: SortType) => {
			sort.value = value;
		};

		return {
			response,
			fetchData,
			isLoading,
			setSortValue,
			Header,
		};
	},
});
</script>

<style lang="scss">
@import '../node_modules/bulma/bulma.sass';
@import url('https://fonts.googleapis.com/css2?family=Merriweather&display=swap');
</style>
