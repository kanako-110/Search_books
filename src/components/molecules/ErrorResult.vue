<template>
	<div class="notification is-danger is-light">
		検索処理でエラーが発生しました。
		<br />
		{{ label }}それでも直らない場合は早急に改善させていただきます。
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'ErrorResult',
	props: {
		label: String,
	},
});
</script>
