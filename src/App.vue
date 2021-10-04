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
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-ignore
					response.value = resp.data;
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-ignore
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
