<template>
	<div>
		<ErrorResult v-if="error" />
		<EmptyResult v-else-if="totalNumber === 0" />
		<div
			v-else
			class="is-fullwidth is-flex is-justify-content-space-around is-flex-wrap-wrap"
		>
			<BookCard v-for="book in books" :key="book.id" :book="book" />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import EmptyResult from './EmptyResult.vue';
import BookCard from './BookCard.vue';
import { ItemType } from '../types/';
import ErrorResult from './ErrorResult.vue';

export default defineComponent({
	name: 'BookResult',
	components: { EmptyResult, BookCard, ErrorResult },
	props: {
		books: Object as PropType<ItemType[]>,
		totalNumber: Number,
		error: String,
	},
});
</script>
