<template>
	<div class="column is-flex is-half-mobile is-one-fifth-tablet">
		<div class="card p-1 my-4" style="width: 100%">
			<div class="card-image">
				<figure class="image is-1by1">
					<img
						:src="
							item.imageLinks?.thumbnail ?? require(`@/assets/images/noImg.png`)
						"
						alt="book image"
					/>
				</figure>
				<!-- <div v-show="!isImgLoaded" class="skeleton">
				<div class="columns">
					<div class="column">
						<article class="message">
							<div class="message-header">
								<p />
							</div>
							<div class="message-body">
								<p />
							</div>
						</article>
					</div>
				</div>
			</div> -->
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
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { computed, PropType } from 'vue';
import { ItemType } from '../types';

export default defineComponent({
	name: 'Card',

	props: {
		book: Object as PropType<ItemType>,
	},
	setup(props) {
		// const isImgLoaded = ref(false);

		const item = computed(() => {
			return props?.book?.volumeInfo;
		});

		// const onImgLoad = () => {
		// 	console.log('onImg');
		// 	isImgLoaded.value = true;
		// };

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

<style scoped>
.message-header {
	background-color: #e2e2e2;
	animation: loading 0.5s infinite alternate;
}

@keyframes loading {
	from {
		background-color: #b8b3b3;
	}
	to {
		background-color: hsl(0, 5%, 78%);
	}
}
</style>
