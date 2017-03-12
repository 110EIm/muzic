<template lang="pug">
	.box
		.content: p
			strong {{ memo.music }}
			br
			| {{ memo.name }}
</template>

<script>
	export default {
		props: ['memo']
	}
</script>