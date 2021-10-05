<template>
	<form>
		<div class="is-flex">
			<input
				class="input"
				type="text"
				v-model="text"
				placeholder="キーワードを入力"
			/>
			<!-- e.prevent他の方法？毎回必要ってこと？ -->
			<button
				:class="`button ${loading && `is-loading`} ml-4 is-danger`"
				@click.prevent="handleClick"
			>
				Search
			</button>
		</div>
	</form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ref } from 'vue';

export default defineComponent({
	name: 'SearchForm',
	props: {
		loading: Boolean,
	},
	setup(_, context) {
		const text = ref('');

		const handleClick = () => {
			return context.emit('button-click', text.value);
		};
		return {
			text,
			handleClick,
		};
	},
});
</script>
