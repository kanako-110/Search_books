<template>
	<div>Form</div>
	<input class="input" type="text" placeholder="本を検索してみましょう" />
	<button class="button">Search</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'Form',
	setup() {
		console.log('Form');
	},
});
</script>
