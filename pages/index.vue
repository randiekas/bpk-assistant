<template>
<div class="white">
	<v-dialog
		v-model="alert"
		width="300">
		<v-alert
			dense
			type="error"
			class="mb-0">
			{{ alertMessage }}
		</v-alert>
	</v-dialog>
	<v-row>
		<v-col md="4">
			<v-container style="height:80vh" class="d-flex">
				<div class="mx-auto my-auto">
				<h1 class="display-3 black--text">Virtual Assistant BPK Penabur</h1>
				<p class="text-body-1 black--text">
					Selamat datang di situs resmi belajar,  berbasis personal assistant artificial intellegence.
				</p>
				</div>
			</v-container>
		</v-col>
		<v-col md="8">
			<v-img src="/cover-homepage.png"/>
		</v-col>
	</v-row>


	<v-btn
		v-model="fab"
		fab
		dark
		color="primary"
		bottom
		right
		absolute
		class="mb-16"
		v-on:click="fab=!fab">
		<v-icon v-if="fab">
			mdi-close
		</v-icon>
		<v-icon v-else>
			mdi-chat
		</v-icon>
	</v-btn>
	<v-dialog
		v-model="fab"
		persistent
		max-width="480">
		<v-card class="card-chat d-flex flex-column justify-content-between" light>
		<div>
			<v-toolbar class="secondary">
				<v-toolbar-title class="white--text">Superbot - SMAK 1</v-toolbar-title>
                <v-spacer/>
                <v-btn
                    @click="fab=false"
                    icon
                    dark>
                    <v-icon>mdi-close-circle</v-icon>
                </v-btn>
			</v-toolbar>
		</div>
		<v-card-text class="card-chat-percakapan flex-grow-1 white">
			<div 
				v-if="user==false"
				class="mt-4">
				<v-alert
					type="error">
					Anda harus login terlebih dahulu untuk melakukan percakapan dengan bot
				</v-alert>
				<v-text-field
                    v-model="form.email"
                    label="Username"
                    placeholder="Enter username"
                    outlined
                    dense
                    />
                <v-text-field
                    v-model="form.password"
                    type="password"
                    label="Password"
                    placeholder="Enter your password"
                    outlined
                    dense
                    v-on:keyup.enter="handelMasuk()"
                    />
                <v-btn
                    class="primary mb-2"
                    block
                    @click="handelMasuk()">
                    Sign in
                </v-btn>
				<v-btn
                    block
					text
                    @click="user=true">
                    Lewati
                </v-btn>
			</div>
			<v-list-item 
				v-else
				dense
				v-for="(item, index) in percakapan"
				:key="index"
				:class="`mt-1 ${item.saya?'ml-8 justify-end':'mr-8'}`">
				<v-card
					dark
					:color="item.saya?'primary':'grey lighten-3'"
					class="pa-2">
					<div style="white-space: pre-line" :class="`${item.saya?'white':'black'}--text`" v-html="item.pesan"></div>
                    <v-card class="mt-2" dark :color="item.saya?'grey darken-3':'primary'" v-if="item.opsi.length>0" flat outlined>
                        <v-list-item-group>
                            <template
                                v-for="(row, key) in item.opsi">
                                <v-divider :key="`divider-${key}`" v-show="index !== 0"></v-divider>
                                <v-list-item
                                    :key="key"
                                    class="py-0 my-0"
                                    dense
                                    @click="pesan=row; handelKirimPesan(); mode='teks'">
                                    <v-list-item-title>{{ row.label }}</v-list-item-title>
                                    <v-list-item-action class="py-0 my-0">
                                        <v-icon x>
                                            mdi-chevron-right
                                        </v-icon>
                                    </v-list-item-action>
                                </v-list-item>
                            </template>
                    </v-list-item-group>
                    </v-card>
				</v-card>
			</v-list-item>

		</v-card-text>

		<div>
			<v-text-field
				v-if="user"
				outlined
				hide-details=""
				placeholder="tulis pesan disini ..."
				dense
				append-icon="mdi-send"
				v-model="pesan"
				v-on:keyup.enter="handelKirimPesan"/>
		</div>
	</v-card>
	</v-dialog>



	<v-dialog
		v-model="dialogMateri"
		max-width="80vw">
		<iframe
                v-if="dialogMateri && dialogUrl"
                :src="dialogUrl"
                style="width:100%; height:80vh; border:none"/>
            <v-alert
				v-else
                type="info"
                class="error mb-0">
                Flow ini belum di setting
			</v-alert>
    </v-dialog>


</div>
</template>
<script>
export default {
	props: ['setFetching', 'user'],
	asyncData: function(){
		return {
			
		}
	},
	mounted: function(){
		this.pesan	= "halo"
		this.handelKirimPesan()
	},
	data: function(){
		return {
			dialogMateri:  false,
            dialogUrl:  '',
			fab: true,
			percakapan: [

			],
			pesan:'',
			form: {
                email: '',
                password: '',
            },
			alert: false,
			alertMessage: '',
		}
	},
	watch:{
		percakapan: function(){
			// setInterval(()=>{
			// 	const chatarea	= document.querySelector(".card-chat-percakapan")
			// 	chatarea.scrollTo(0, chatarea.scrollHeight+10000)
			// }, 500)
		},
		userNama: function(){
			localStorage.setItem('userNama', this.userNama)
		},
		userKelas: function(){
			localStorage.setItem('userKelas', this.userKelas)
		},
		userPelajaran: function(){
			localStorage.setItem('userPelajaran', this.userPelajaran)
		},
		step: function(){
			localStorage.setItem('step', this.step)
		}
	},
	methods: {
		handelBukaMateri: function(url){

			this.dialogUrl	= url
			this.dialog	 	= true
		},
		handelKirimPesan: function(){
            let pesan   = this.pesan;
            if(pesan.aksi){
                if(pesan.aksi==='link'){
                    this.dialogMateri   = true
                    this.dialogUrl      = pesan.tujuan
					this.pesan			= ""
                    // after popup end the flow
                    return
                }
                pesan   = this.pesan.label
            }
			this.percakapan.push({
				saya: true,
				pesan: pesan,
				mode: 'teks',
				opsi: [],
			})

			this.handelResponBot(this.pesan)
			this.pesan	= ""
		},
		handelKirimPesanDelay: function(delay=0, pesan){
			setTimeout(()=>{
				this.percakapan.push(pesan)
			}, delay)
		},
		
		handelResponBot: function(pesan){
            let balasan	= { data: [], mode: "teks", opsi:[]}
            let payload = {}
            if(pesan.label){
                payload             = pesan
            }else{
                payload.katakunci   = pesan
            }

            this.$axios.$post(`publik/alur`, payload).then((resp)=>{
                balasan.data	= JSON.parse(resp.data.balasan)
                balasan.mode	= resp.data.mode
                balasan.opsi	= JSON.parse(resp.data.opsi)

                balasan.data.map((item, index)=>{
                    // this.handelKirimPesanDelay(durasi, {
                    //     saya: false,
                    //     pesan: item,
                    //     mode: balasan.mode,
                    //     opsi: balasan.data.length-1===index?balasan.opsi:[]
                    // })
                    // durasi	+=1000
                    
                    this.percakapan.push({
                        saya: false,
                        pesan: item,
                        mode: balasan.mode,
                        opsi: balasan.data.length-1===index?balasan.opsi:[]
                    })
                })
            })

		},

		handelMasuk: function(){
            this.setFetching(true)
            this.$axios.$post(`publik/akun/masuk`, this.form).then((resp)=>{
                
                if(resp.status){
                    localStorage.setItem("email", resp.data.email)
                    localStorage.setItem("tipe", resp.data.tipe)
                    localStorage.setItem("token", resp.data.token)
                    if(resp.data.tipe==="superadmin"){
                        window.location.href="/admin/beranda"
                    }else{
                        window.location.reload()
                    }
                }else{
                    this.setFetching(false)
                    this.alertMessage   = resp.message
                    this.alert          = true
                }
				this.setFetching(false)
            })
        },
	},
}
</script>
<style scoped>

.card-chat{
	height:70vh;
	display:none
}

.card-chat-percakapan{
	overflow:auto;
}

/* total width */
html::-webkit-scrollbar, .card-chat-percakapan::-webkit-scrollbar{
    background-color: #fff !important;
    width: 16px !important;
}

/* background of the scrollbar except button or resizer */
html::-webkit-scrollbar-track, .card-chat-percakapan::-webkit-scrollbar-track {
    background-color: #fff !important;
}

/* scrollbar itself */
html::-webkit-scrollbar-thumb, .card-chat-percakapan::-webkit-scrollbar-thumb{
    background-color: #babac0 !important;
    border-radius: 16px !important;
    border: 4px solid #fff !important;
}

/* set button(top and bottom of the scrollbar) */
html::-webkit-scrollbar-button, .card-chat-percakapan::-webkit-scrollbar-button::-webkit-scrollbar-button{
    display:none !important;
}

</style>
