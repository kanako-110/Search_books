<template>
	<div class="card m-3" style="width: 320px">
		<div class="card-image">
			<figure class="image is-3by2">
				<!-- TODO: loadされるまでのplaeceholder -->
				<!-- TODO: imageない時かり -->
				<!-- lazy load? -->
				<img
					:src="item.imageLinks.thumbnail"
					alt="book image"
					class="is-fullheight"
					style="objectFit: cover"
				/>
			</figure>
		</div>
		<div class="content">
			<p>
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
			return props.book.volumeInfo;
		});

		const authors = computed(() => {
			return item.value.authors.join(', ');
		});

		return { item, authors };
	},
});
</script>
