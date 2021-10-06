<template>
	<div class="select">
		<select v-model="sort" @change.prevent="handleChange">
			<option
				v-for="option in options"
				:key="option.value"
				:value="option.value"
			>
				{{ option.label }}
			</option>
		</select>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ref } from 'vue';
import { SortType } from '../types';

export default defineComponent({
	name: 'SortBox',
	setup(_, context) {
		const sort = ref<SortType>('relevance');
		const options = ref([
			{ value: 'relevance', label: '関連順' },
			{ value: 'newest', label: '新着順' },
		]);

		const handleChange = () => {
			context.emit('selection-change', sort.value);
		};

		return {
			sort,
			options,
			handleChange,
		};
	},
});
</script>
