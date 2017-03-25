<template lang="pug">
	.modal(:class='{ "is-active": isActive }')
		.modal-background(@click='toggle')
		.modal-content: .box
			.control.is-grouped.columns
				.control.column
					input.input.is-large(:class='{ "is-danger": applicantInput }', v-model='name', type='text', placeholder='신청자')
				.control.column
					input.input.is-large(:class='{ "is-danger": musicNameInput }', v-model='text', type='text', placeholder='노래 제목')
			.notification.is-danger(v-if='error')
				li {{error}}
				button.delete(@click='error = false')
			a#submit.control.button.is-primary.is-large.is-fullwidth(@click='createMemo(name, text)') 제출
		button.modal-close(@click='toggle')
		//TODO Spinning button
</template>

<script>
	export default {
		data: () => ({
			name: '', text: '', error: '',
			applicantInput: false, musicNameInput: false
		}),
		methods: {
			createMemo(name, text) {
				name = name.trim();
				text = text.trim();
				if(!(name && text)) {
					this.error = '빈칸을 채워주세요';
					this.applicantInput = !name;
					this.musicNameInput = !text;
					return;
				}
				//TODO create memo
				this.init();
				this.toggle();
			}

			init() {
				this.applicantInput = false;
				this.musicNameInput = false;
				this.error = '';
				this.name = '';
				this.text = '';
			}
		},
		props: ['isActive', 'toggle', 'memos']
	}
</script>
