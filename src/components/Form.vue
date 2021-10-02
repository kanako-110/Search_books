<template>
	<form>
		<input
			class="input"
			type="text"
			v-model="text"
			placeholder="本を検索してみましょう"
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
import { computed, defineComponent } from 'vue';
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
