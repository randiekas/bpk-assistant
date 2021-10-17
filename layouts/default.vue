<template>
<v-app>
    <v-dialog
        v-model="isFetching"
        persistent
        width="300"
        >
        <v-card
            color="primary"
            dark
        >
            <v-card-text>
            Sedang diproses ...
            <v-progress-linear
                indeterminate
                color="white"
                class="mb-0"
            ></v-progress-linear>
            </v-card-text>
        </v-card>
    </v-dialog>
	<v-app-bar
		:clipped-left="clipped"
		fixed
		app>
		<v-toolbar-title>
            <nuxt-link to="/">

                <v-img
                    class="white"
                    src="https://scola-smak1bpk.s3.ap-southeast-1.amazonaws.com/cms/login/20200929203726.png"/>
            </nuxt-link>
		</v-toolbar-title>
		<v-spacer />
		<!-- <v-btn
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
		</v-btn> -->
		<v-btn
			class="primary"
			text
			to="/masuk">
			Masuk
		</v-btn>
	</v-app-bar>
	<v-main>
		<nuxt-child
            :setFetching="setFetching"/>
	</v-main>

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
			title: 'Vuetify.js',
            isFetching: false
		}
	},
    methods:{
        setFetching: function(status){
            this.isFetching = status
        }
	}
}
</script>
