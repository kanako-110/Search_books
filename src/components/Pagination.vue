<template>
	<v-pagination
		v-model="currentPage"
		:pages="totalPages"
		:range-size="1"
		active-color="#DCEDFF"
		@update:modelValue="updatePage"
		class="is-flex is-justify-content-center p-2"
	/>
	<div>
		<slot>Book Result</slot>
	</div>
	<v-pagination
		v-model="currentPage"
		:pages="totalPages"
		:range-size="1"
		active-color="#DCEDFF"
		@update:modelValue="updatePage"
		class="is-flex is-justify-content-center p-2"
	/>
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
			context.emit('click-new-page', page);
		};

		return { currentPage, updatePage };
	},
});
</script>
