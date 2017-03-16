<template lang="pug">
	.modal(:class='{ "is-active": isActive }')
		.modal-background
		.modal-content: .box
			.control.is-grouped.columns
				.control.column
					input.input.is-large(type='text', placeholder='신청자')
				.control.column
					input.input.is-large(type='text', placeholder='노래 제목')
			a.control.button.is-primary.is-large.is-fullwidth 제출
		button.modal-close(@click='toggle')
		//TODO Spinning button
</template>

<script>
	export default {
		props: ['isActive', 'toggle']
	}
</script>