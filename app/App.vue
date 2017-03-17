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
	
	import io from 'socket.io-client'

	const socket = io();

	const vm = {
		name: 'app',
		components: {
			Writer,
			Memo,
			Navigation,
			'footer-bar': Footer	
		},

		data: () => ({
			memos: [],
			showWriter: false,
			background: false //TODO
		}),

		created() {
			this.memos = [
				{ id: 1, name: '박성민', text: 'Anything'},
				{ id: 2, name: 'Anonymous', text: 'HU'},
				{ id: 3, name: 'GoodBoy', text: 'Good night'},
				{ id: 4, name: 'asdf', text: 'asdfasdf'}
			];
		},

		methods: {
			toggleWriter() {
				this.showWriter = !this.showWriter;
			},

			createMemo(memo, flag = true) {
				if(this.memos.length >= 10) {
					alert('신청곡이 너무 많아 ㅠㅠ 내일 다시 해줄거지?');
					return;
				}
				this.memos.push(memo);
				if(flag) {
					socket.emit('req create memo', memo);
				}
			},

			removeMemo(memo, flag = true) {
				this.memos.some((v, index) => (v.name === data.name) && (v.text === data.text) ? vm.memos.splice(index, 1) : false);
				if(flag) {
					socket.emit('req remove memo', memo);
				}
			},

			clearMemos(pwd, flag = true) {
				if(flag) {
					socket.emit('req clear memo', {pwd});
				} else {
					this.memos = [];
				}
			}
		}
	};

	socket.on('res memo create', ({error, memo}) => {
		if(error || !memo) {
			vm.removeMemo(memo, false);
			alert('뭔가 잘못됐어 ㅠ');
			//TODO error handling
			return;
		}
		vm.createMemo(memo, false);
	});

	socket.on('res memo remove', ({error, memo}) => {
		if(!error ||!memo) {
			vm.createMemo(memo, false);
			alert('뭔가 잘못됐어 ㅠㅠ');
			//TODO error handling
			return;
		}
		vm.removeMemo(memo, false);
	});

	socket.on('res memo clear', ({error, result}) => {
		if(error) {
			alert('뭔가 잘못됐어 ㅠㅠㅠ');
			//TODO error handling
			return;
		} else if(!result) {
			alert('비밀번호가 잘못됐어 :P');
			return;
		}
		vm.clearMemos(undefined, false);
	});

	export default vm;
</script>

<style>
	#wrapper {
		min-height: 100vh;
	}
</style>
