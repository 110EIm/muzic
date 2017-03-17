<template lang="pug">
	.box
		.media
			.media-right
				//TODO image
			.media-content
				strong {{ memo.text }}
			.media-right
				p {{ memo.name }}
</template>

<script>
	export default {
		props: ['memo', 'image']
	}
</script>