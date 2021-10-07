<template>
	<div>
		<ErrorResult v-if="error || pageError" :label="label" />
		<EmptyResult v-else-if="totalNumber === 0" />
		<div
			v-else
			class="columns is-fullwidth is-flex is-justify-content-space-around is-flex-wrap-wrap"
		>
			<BookCard v-for="book in books" :key="book.id" :book="book" />
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import EmptyResult from './EmptyResult.vue';
import BookCard from './BookCard.vue';
import { ItemType } from '../types/';
import ErrorResult from './molecules/ErrorResult.vue';

export default defineComponent({
	name: 'BookResult',
	components: { EmptyResult, BookCard, ErrorResult },
	props: {
		books: Object as PropType<ItemType[]>,
		totalNumber: Number,
		error: String,
		pageError: Boolean,
	},
	setup(props) {
		const label = computed(() => {
			if (props.pageError) {
				return '本の数が変わったようです。もう一度検索しなおしてください。';
			}
			if (props.error) {
				return 'もう一度試すか、ネットワークの環境をお確かめください。';
			}
			return null;
		});

		return { label };
	},
});
</script>
