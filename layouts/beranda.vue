<template>
<v-app dark>
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
	<v-navigation-drawer
        fixed
        app
        mini-variant
        expand-on-hover>

        <v-list>
            <v-list-item
                v-for="(item, i) in items"
                :key="i"
                :to="item.link"
                router
                exact>
                    <v-list-item-action>
                        <v-icon>{{ item.ikon }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title v-text="item.nama" />
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

		<nuxt-child
            :setFetching="setFetching"/>

	</v-main>

	<v-footer
        :absolute="!fixed"
        app>
            <span>&copy; {{ new Date().getFullYear() }}</span>
	</v-footer>

</v-app>
</template>

<script>
export default {
    data () {
        let items   = []
        const tipe  = localStorage.getItem("tipe")
        if(tipe==="superadmin"){
            items   = [
                {
                    "ikon": "mdi-account-multiple",
                    "nama":"Akun",
                    "deskripsi":"Kelola data Akun",
                    "link":"/admin/beranda"
                },
                {
                    "ikon": "mdi-forum",
                    "nama":"Builder",
                    "deskripsi":"Kelola Chat Builder",
                    "link":"/admin/chatBuilder"
                },
                {
                    "ikon": "mdi-chat-processing",
                    "nama":"Riwayat",
                    "deskripsi":"Lihat Laporan Riwayat Chat",
                    "link":""
                },
            ]
        }else{
            items   = [
                {
                    "ikon": "mdi-forum",
                    "nama":"Builder",
                    "deskripsi":"Kelola Chat Builder",
                    "link":"/beranda"
                },
                {
                    "ikon": "mdi-chat-processing",
                    "nama":"Riwayat",
                    "deskripsi":"Lihat Laporan Riwayat Chat",
                    "link":""
                },
            ]
        }
        return {
            fixed: false,
            isFetching: false,
            items: items,
        }
    },
    methods:{
        setFetching: function(status){
            this.isFetching = status
        }
	}
}
</script>
