<template>
	<div class="card p-1 my-4" style="width: 40%">
		<div class="card-image">
			<figure class="image is-1by1">
				<!-- TODO: loadされるまでのplaeceholder -->
				<!-- TODO: imageない時かり -->
				<!-- lazy load? -->
				<img :src="item.imageLinks.thumbnail" alt="book image" />
			</figure>
		</div>
		<div class="content">
			<p class="is-size-7-mobile">
				<a :href="item.infoLink" class="has-text-weight-bold">
					{{ item.title }}
				</a>
				<br />
				<!-- かっこからだす -->
				{{ authors ?? '記載なし' }}
				<!-- ???カードであるべき？ -->
				<br />
				発行日: {{ item.publishedDate }}
			</p>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { computed } from 'vue';

// TODO: 一個上にlist?
export default defineComponent({
	name: 'Card',
	props: {
		book: Array,
	},
	setup(props) {
		const item = computed(() => {
			if (!props.book) return;
			// TODO
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			return props.book.volumeInfo;
		});

		const authors = computed(() => {
			return item.value.authors.join(', ');
		});

		return { item, authors };
	},
});
</script>
