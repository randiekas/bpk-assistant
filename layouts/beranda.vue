<template>
<v-app dark>
	<v-navigation-drawer
	fixed
	app
	mini-variant
	expand-on-hover
	>
	<v-list>
		<v-list-item
			to="/intent/beranda">
			<v-list-item-action>
				<v-icon>mdi-chat</v-icon>
			</v-list-item-action>
			<v-list-item-content>
				<v-list-item-title>Chat Builder</v-list-item-title>
			</v-list-item-content>
		</v-list-item>
		<v-list-item
			v-for="(item, i) in items"
			:key="i"
			:to="item.to"
			router
			exact>
				<v-list-item-action>
					<v-icon>{{ item.icon }}</v-icon>
				</v-list-item-action>
				<v-list-item-content>
					<v-list-item-title v-text="item.title" />
				</v-list-item-content>
		</v-list-item>
		<v-list-item>
			<v-list-item-action>
				<v-icon>mdi-chat-processing</v-icon>
			</v-list-item-action>
			<v-list-item-content>
				<v-list-item-title>Riwayat Chat</v-list-item-title>
			</v-list-item-content>
		</v-list-item>
		<v-list-item
			to="/">
			<v-list-item-action>
				<v-icon>mdi-logout</v-icon>
			</v-list-item-action>
			<v-list-item-content>
				<v-list-item-title>Keluar</v-list-item-title>
			</v-list-item-content>
		</v-list-item>
	</v-list>
	</v-navigation-drawer>
	
	<v-main>
	
		<nuxt-child />
	
	</v-main>
	<v-navigation-drawer
	v-model="rightDrawer"
	:right="right"
	temporary
	fixed
	>
	<v-list>
		<v-list-item @click.native="right = !right">
		<v-list-item-action>
			<v-icon light>
			mdi-repeat
			</v-icon>
		</v-list-item-action>
		<v-list-item-title>Switch drawer (click me)</v-list-item-title>
		</v-list-item>
	</v-list>
	</v-navigation-drawer>
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
		
	],
	miniVariant: true,
	right: true,
	rightDrawer: false,
	title: 'Vuetify.js'
	}
}
}
</script>
