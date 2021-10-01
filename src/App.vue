<template>
	<div class="app">
		<h1 class="title">Search Books</h1>
		<Form />
		<!-- TODO?: スタイリングなど大きくなったらCardをListに入れる、そこでSelectもいれる？ -->
		<div class="select">
			<select>
				<option>関連順</option>
				<option>新しい順</option>
			</select>
		</div>
		<Card />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Form from './components/Form.vue';
import Card from './components/Card.vue';

export default defineComponent({
	name: 'App',
	components: { Form, Card },
});
</script>

<style lang="scss">
@import '../node_modules/bulma/bulma.sass';
</style>
