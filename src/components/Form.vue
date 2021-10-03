<template>
	<form>
		<input
			class="input"
			type="text"
			v-model="text"
			placeholder="キーワードを入力"
		/>
		<button
			:class="`button ${isLoading && `is-loading`}`"
			@click.prevent="handleClick"
		>
			Search
		</button>
	</form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ref } from 'vue';

export default defineComponent({
	name: 'Form',
	props: {
		isLoading: Boolean,
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
