<template lang="pug">
	.nav.has-shadow.is-dark: .container
		.nav-left
			.nav-item
				h1.title WP 신청곡
		.nav-right
			span.nav-item
				a.button.is-primary.is-medium(@click='toggle') 음악 신청
</template>

<script>
	export default {
		props: ['toggle']
	}
</script>
