<template>
	<div
		class="py-6 px-5"
		:style="{
			backgroundImage: 'url(' + require('@/assets/images/book.png') + ')',
		}"
	>
		<h1 class="title is-1" style="fontFamily: 'Merriweather', serif">
			Book Finder
		</h1>
		<SearchForm @button-click="buttonClick" :isLoading="isLoading" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SearchForm from './SearchForm.vue';

export default defineComponent({
	name: 'Header',
	components: { SearchForm },
	props: {
		isLoading: Boolean,
	},
	setup(_, context) {
		const buttonClick = (text: string) => {
			context.emit('button-click', text);
		};

		return {
			buttonClick,
		};
	},
});
</script>
