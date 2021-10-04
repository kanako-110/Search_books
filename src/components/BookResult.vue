<template>
	<div class="mt-5">
		<EmptyResult v-if="resultNumber === 0" />
		<div
			v-else
			class="is-fullwidth is-flex is-justify-content-space-around is-flex-wrap-wrap"
		>
			<BookCard v-for="book in result" :key="book.id" :book="book" />
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import EmptyResult from './EmptyResult.vue';
import BookCard from './BookCard.vue';
import { BooksType } from '../types/';

export default defineComponent({
	name: 'BookResult',
	components: { EmptyResult, BookCard },
	props: {
		response: Object as PropType<BooksType>,
	},
	setup(props) {
		const result = computed(() => props.response && props.response.items);

		const resultNumber = computed(
			() => props.response && props.response.totalItems
		);
		return { result, resultNumber };
	},
});
</script>
