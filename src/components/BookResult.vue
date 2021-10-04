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
import { computed, defineComponent } from 'vue';
import EmptyResult from './EmptyResult.vue';
import BookCard from './BookCard.vue';

export default defineComponent({
	name: 'BookResult',
	components: { EmptyResult, BookCard },
	props: {
		noResult: Boolean,
		//  TODO: more specific type
		response: Object,
	},
	setup(props) {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		const result = computed(() => props.response && props.response.items);

		const resultNumber = computed(
			() => props.response && props.response.totalItems
		);
		return { result, resultNumber };
	},
});
</script>
