<template>
	<div class="card">
		<div class="card-image">
			<figure class="image is-4by3">
				<img
					src="https://bulma.io/images/placeholders/1280x960.png"
					alt="Placeholder image"
				/>
			</figure>
		</div>
		<div class="content">
			書籍名: test name
			<br />
			<a>詳細</a>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

// TODO: 一個上にlist?
export default defineComponent({
	name: 'Card',
});
</script>
