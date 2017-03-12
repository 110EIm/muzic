<template lang="pug">
	#app
		section.section: .container
			memo(v-for='memo in memos', :key='memo.music', :memo='memo')

</template>

<script>
	import 'noto-sans-kr';
	import 'bulma/css/bulma.css';
	import 'babel-polyfill';

	import Memo from './components/Memo.vue';

	export default {
		name: 'app',
		components: { Memo },
		data: () => ({
			memos: []
		}),

		created() {
			this.memos = [{name: '박성민', music: 'Anything'}, {name: 'Anonymous', music: 'HU'}];
		},

		methods: {
			
		}
	};
</script>

<style>
	* {
		font-family: 'Noto Sans Korean', sans-serif;
	}
</style>