<template>
	<div class="app has-text-centered">
		<Header @button-click="handleBookSearch" :loading="loading" />
		<div class="my-4">
			<SortBox @selection-change="setSortValue" />
			<BookResult :books="books" />
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

export default defineComponent({
	name: 'App',
	components: { SortBox, Header, BookResult },
	setup() {
		const sort = ref<SortType>('relevance');
		const userInput = ref('');

		const { books, loading, getBooks } = useGoogleBookApi(userInput, sort);

		const handleBookSearch = (text: string) => {
			userInput.value = text;
			getBooks();
		};

		const setSortValue = (value: SortType) => {
			sort.value = value;
		};

		return {
			books,
			loading,
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
