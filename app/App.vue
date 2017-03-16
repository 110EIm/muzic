<template lang="pug">
	#app
		#wrapper
			navigation(:toggle='toggleWriter')
			section.section#board: .container
				Writer(:isActive='showWriter', :toggle='toggleWriter')
				memo(v-for='memo in memos', :key='memo.music', :memo='memo')
		footer-bar
</template>

<script>
	import 'noto-sans-kr';
	import 'bulma/css/bulma.css';
	import 'babel-polyfill';
	import 'font-awesome/css/font-awesome.min.css'

	import Memo from './components/Memo.vue';
	import Navigation from './components/Navigation.vue'
	import Writer from './components/Writer.vue';
	import Footer from './components/Footer.vue';

	export default {
		name: 'app',
		components: {
			Writer,
			Memo,
			Navigation,
			'footer-bar': Footer	
		},
		data: () => ({
			memos: [],
			showWriter: false
		}),

		created() {
			this.memos = [
				{name: '박성민', music: 'Anything', author: 'ME!!'},
				{name: 'Anonymous', music: 'HU', author: 'SOMEONE'},
				{ name: 'GoodBoy', music: 'Good night', author: 'Hello'},
				{ name: 'asdf', music: 'asdfasdf', author: 'asdfasdf'}
			];
		},

		methods: {
			toggleWriter() {
				this.showWriter = !this.showWriter;
			}
		}
	};
</script>

<style>
	#wrapper {
		min-height: 100vh;
	}
</style>