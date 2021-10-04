<template>
	<div>
		<img :src="require(`@/assets/images/noData.png`)" style="height: 320px" />
		<p>
			一致する検索結果はありません
			<br />
			<span class="is-size-7 has-text-grey">
				別のキーワードを試してみてください
			</span>
		</p>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'EmptyResult',
});
</script>
