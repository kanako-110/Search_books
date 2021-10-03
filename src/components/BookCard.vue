<template>
	<div class="card m-3" style="width: 320px">
		<div class="card-image">
			<figure class="image is-3by2">
				<!-- TODO: loadされるまでのplaeceholder -->
				<!-- TODO: imageない時かり -->
				<!-- lazy load? -->
				<img
					:src="book.volumeInfo.imageLinks.thumbnail"
					alt="book image"
					class="is-fullheight"
					style="objectFit: cover"
				/>
			</figure>
		</div>
		<div class="content">
			<p>
				書籍名: {{ book.volumeInfo.title }}
				<br />
				著者: {{ book.volumeInfo.authors ?? '記載なし' }}
				<!-- ???カードであるべき？ -->
				<br />
				発行日: {{ book.volumeInfo.publishedDate }}
			</p>
			<a :href="book.volumeInfo.infoLink">詳細</a>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

// TODO: 一個上にlist?
export default defineComponent({
	name: 'Card',
	props: {
		book: Object,
	},
});
</script>
