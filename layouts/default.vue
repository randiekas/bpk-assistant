<template>
<v-app>
	
	<v-app-bar
		:clipped-left="clipped"
		fixed
		app
		color="white">
		<v-toolbar-title>
			<v-img src="https://scola-smak1bpk.s3.ap-southeast-1.amazonaws.com/cms/login/20200929203726.png"/>
		</v-toolbar-title>
		<v-spacer />
		<v-btn
			class="mx-1"
			text>
			About
		</v-btn>
		<v-btn
			class="mx-1"
			text>
			Achievement
		</v-btn>
		<v-btn
			class="mx-1"
			text>
			Program
		</v-btn>
		<v-btn
			class="mx-1"
			text>
			Facility
		</v-btn>
		<v-btn
			class="primary"
			text
			to="/intent/beranda">
			Masuk
		</v-btn>
	</v-app-bar>
	<v-main>
		<nuxt-child />
	</v-main>
	
	<v-footer
	:absolute="!fixed"
	app
	>
	<span>&copy; {{ new Date().getFullYear() }}</span>
	</v-footer>
</v-app>
</template>

<script>
export default {
	data () {
		return {
			clipped: false,
			drawer: false,
			fixed: false,
			items: [
				{
					icon: 'mdi-apps',
					title: 'Welcome',
					to: '/'
				},
				{
					icon: 'mdi-chart-bubble',
					title: 'Inspire',
					to: '/inspire'
				}
			],
			miniVariant: false,
			right: true,
			rightDrawer: false,
			title: 'Vuetify.js'
		}
	}
}
</script>
