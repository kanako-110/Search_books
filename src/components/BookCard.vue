<template>
	<div class="card p-1 my-4" style="width: 40%">
		<div class="card-image">
			<figure class="image is-1by1">
				<!-- TODO: loadされるまでのplaeceholder -->
				<!-- TODO: imageない時かり -->
				<!-- lazy load? -->
				<img
					:src="
						item.imageLinks.thumbnail ?? require(`@/assets/images/noImg.png`)
					"
					alt="book image"
				/>
			</figure>
		</div>
		<div class="content">
			<p class="is-size-7-mobile">
				<a :href="item.infoLink" class="has-text-weight-bold">
					{{ item.title }}
				</a>
				<br />
				{{ authors ?? '著者: 記載なし' }}
				<br />
				発行日: {{ item.publishedDate }}
				<br />
				{{ price ?? '価格: 記載なし' }}
			</p>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { computed, PropType } from 'vue';
import { ItemType } from '../types';

export default defineComponent({
	name: 'Card',
	props: {
		book: Object as PropType<ItemType>,
	},
	setup(props) {
		const item = computed(() => {
			if (!props.book) return;
			return props.book.volumeInfo;
		});

		const authors = computed(() => {
			if (!props.book) return;
			if (!props.book.volumeInfo.authors) return;
			return props.book.volumeInfo.authors.join(', ');
		});

		const price = computed(() => {
			if (!props.book) return;
			if (!props.book.saleInfo.listPrice) return;
			return (
				props.book.saleInfo.listPrice.amount +
				props.book.saleInfo.listPrice.currencyCode
			);
		});

		return { item, authors, price };
	},
});
</script>
