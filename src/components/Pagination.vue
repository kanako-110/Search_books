<template>
	<div class="is-flex is-justify-content-center">
		<v-pagination
			v-model="currentPage"
			:pages="totalPages"
			:range-size="1"
			active-color="#DCEDFF"
			@update:modelValue="updatePage"
		/>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import VPagination from '@hennge/vue3-pagination';
import '@hennge/vue3-pagination/dist/vue3-pagination.css';

export default defineComponent({
	name: 'Pagination',
	props: {
		totalPages: Number,
		VPagination,
	},
	setup(_, context) {
		const currentPage = ref(1);

		const updatePage = (page: number) => {
			currentPage.value = page;
			console.log({ currentPage });
			context.emit('click-new-page', page);
		};

		return { currentPage, updatePage };
	},
});
</script>
