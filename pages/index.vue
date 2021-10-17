<template>
<div>
	<v-row>
		<v-col md="5">
			<v-container style="height:80vh" class="d-flex">
				<div class="mx-auto my-auto">
				<h1 class="display-3">Virtual Assistant BPK Penabur</h1>
				<p class="text-body-1">
					Selamat datang di situs resmi belajar,  berbasis personal assistant artificial intellegence.
				</p>
				</div>
			</v-container>
		</v-col>
		<v-col md="7">
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
		<v-card class="card-chat d-flex flex-column justify-content-between">
		<div>
			<v-toolbar>
				<v-toolbar-title>superbot - Bu Ani</v-toolbar-title>
                <v-spacer/>
                <v-btn
                    @click="fab=false"
                    icon
                    dark>
                    <v-icon>mdi-close-circle</v-icon>
                </v-btn>
			</v-toolbar>
		</div>
		<v-card-text class="card-chat-percakapan flex-grow-1">
			<v-list-item dense
				v-for="(item, index) in percakapan"
				:key="index"
				:class="`mt-1 ${item.saya?'ml-8 justify-end':'mr-8'}`">
				<v-card
					dark
					:color="item.saya?'primary':'grey darken-3'"
					class="pa-2">
					<div style="white-space: pre-line" v-html="item.pesan"></div>
				</v-card>
			</v-list-item>

		</v-card-text>

		<div>
			<v-text-field
				v-if="percakapan.length===0 || percakapan[percakapan.length-1].mode==='teks'"
				outlined
				hide-details=""
				placeholder="tulis pesan disini ..."
				dense
				append-icon="mdi-send"
				v-model="pesan"
				v-on:keyup.enter="handelKirimPesan"/>

			<div v-else>
				<v-card elevation="5" dark color="primary">
					<v-list-item-group>
					<v-list-item
						v-for="(item, index) in percakapan[percakapan.length-1].opsi"
						:key="index"
						dense
						v-on:click="pesan=item; handelKirimPesan(); mode='teks'">
						<v-list-item-title>{{ item }}</v-list-item-title>
						<v-list-item-action>
							<v-icon>
								mdi-chevron-right
							</v-icon>
						</v-list-item-action>
					</v-list-item>
				</v-list-item-group>
				</v-card>
			</div>
		</div>
	</v-card>
	</v-dialog>



	<v-dialog
		v-model="dialog"
		max-width="80vw">
		<iframe
			:src="dialogUrl"
			style="width:100%; height:80vh; border:none"/>
    </v-dialog>


</div>
</template>
<script>
export default {
	asyncData: function(){
		// list step
		// step 1 = identifikasi nama
		// step 2 = identifikasi kelas
		// step 3 = sudah diidentifikasi
		return {
			step: localStorage.getItem('step')||1,
			userNama: localStorage.getItem('userNama')||'',
			userKelas: localStorage.getItem('userKelas')||'',
			userPelajaran: localStorage.getItem('userPelajaran')||'',
		}
	},
	data: function(){
		return {
			dialog: false,
			dialogUrl: '',
			fab: true,
			percakapan: [

			],
			pesan:'',
			pelajaran:  [
					{
						value: 'belajar indonesia',
						label: 'Bahasa Indonesia'
					},
					{
						value: 'belajar inggris',
						label: 'Bahasa Inggris'
					}
				],
			materi: {
				"belajar indonesia":[
					`<a onclick="handelBukaMateri('https://scola.s3.ap-southeast-1.amazonaws.com/bank_materi/1_a558b8a362f51019f9775d00292dee972c93677e3d9447c3e59b8a0ab2a3497120210119041705.pdf')">- Novel</a>`
				],
				"belajar inggris":[
					`<a onclick="handelBukaMateri('https://scola.s3.ap-southeast-1.amazonaws.com/bank_materi/64b63e922fadd8fd0a251f08f2d7ba9cde38bd9793f17147472aa376a1603ad420190730120145.pdf')">- Adjective</a>`
				]
			},
			tingkat:  [
					{
						value: 10,
						label: '10 - Sepuluh'
					},
					{
						value: 11,
						label: '11 - Sebelas'
					},
					{
						value: 12,
						label: '12 - Duabelas'
					}
				],
		}
	},
	watch:{
		percakapan: function(){
			setInterval(()=>{
				const chatarea	= document.querySelector(".card-chat-percakapan")
				chatarea.scrollTo(0, chatarea.scrollHeight+10000)
			}, 500)
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
			this.percakapan.push({
				saya: true,
				pesan: this.pesan,
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
			let durasi	= 1000;
            let balasan	= { data: [], mode: "teks", opsi:[]}
            const payload           = {
                katakunci: pesan
            }

            this.$axios.$post(`publik/alur/pesan`, payload).then((resp)=>{
                balasan.data	= JSON.parse(resp.data.balasan)
                balasan.mode	= resp.data.mode
                balasan.opsi	= JSON.parse(resp.data.opsi)

                balasan.data.map((item)=>{
                    this.handelKirimPesanDelay(durasi, {
                        saya: false,
                        pesan: item,
                        mode: balasan.mode,
                        opsi: balasan.opsi
                    })
                    durasi	+=1000
                })
            })


		},
	},
	mounted: function(){
		this.pesan	= "halo"
		this.handelKirimPesan()
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
