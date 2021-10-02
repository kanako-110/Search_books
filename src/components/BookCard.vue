<template>
	<div class="card">
		<div class="card-image">
			<figure class="image is-4by3">
				<!-- TODO: loadされるまでのplaeceholder -->
				<img :src="book.volumeInfo.imageLinks.thumbnail" alt="book image" />
			</figure>
		</div>
		<div class="content">
			<p>書籍名: {{ book.volumeInfo.title }}</p>
			<br />
			<p>著者: {{ book.volumeInfo.authors ?? '記載なし' }}</p>
			<!-- ???カードであるべき？ -->
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
