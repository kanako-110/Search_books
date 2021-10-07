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
		<SearchForm v-bind="$attrs" :loading="loading" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SearchForm from './SearchForm.vue';

export default defineComponent({
	name: 'Header',
	components: { SearchForm },
	props: {
		loading: Boolean,
	},
});
</script>
