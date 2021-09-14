<template>
    <v-row dense class="h-full">
        <v-col md="8" class="ma-0 pa-0 h-full">
            <v-app-bar>
                <v-toolbar-title>
                    Alur Beranda
                </v-toolbar-title>
                <v-btn 
                    small
                    class="ml-4"
                    rounded>
                    <v-icon left>
                        mdi-account
                    </v-icon>
                    randiekas@gmail.com
                </v-btn>
                <v-spacer />
                <v-btn color="primary" rounded>
                    Simpan
                </v-btn>
            </v-app-bar>
            <v-subheader>
                Greetings (Web only)
            </v-subheader>
            <v-container>
                <v-text-field
                    dense
                    placeholder=""
                    value="Selamat pagi"
                    outlined
                    hide-details=""
                    class="mb-1"
                    append-icon="mdi-delete"/>
                <v-text-field
                    dense
                    placeholder=""
                    value="Selamat datang di virtual assistant BPK Penabur"
                    outlined
                    hide-details=""
                    append-icon="mdi-delete"
                    class="mb-1"/>
                <v-text-field
                    dense
                    placeholder="Tulish Greeting disini ..."
                    outlined
                    hide-details=""
                    append-icon="mdi-plus"
                    class="mb-1"/>
            </v-container>
            <v-subheader>
                Perintah
            </v-subheader>
            <v-container>
                <v-text-field
                    dense
                    placeholder="Perintah"
                    value="hi"
                    outlined
                    hide-details=""
                    class="mb-1"
                    append-icon="mdi-delete"/>
                <v-text-field
                    dense
                    placeholder="Perintah"
                    value="hello"
                    outlined
                    hide-details=""
                    append-icon="mdi-delete"
                    class="mb-1"/>
                <v-text-field
                    dense
                    placeholder="Tulish perintah disini ..."
                    outlined
                    hide-details=""
                    append-icon="mdi-plus"
                    class="mb-1"/>
            </v-container>

            <v-subheader>
                Parameter
            </v-subheader>

            <v-container>
                <v-simple-table dense class="mb-4">
                    <thead>
                        <tr>
                            <th>kode</th>
                            <th style="width:50%">prompt</th>
                            <th style="width:30%">Tipe</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>${nama}</td>
                            <td>Nama kamu siapa ?</td>
                            <td>teks</td>
                            <td>
                                <v-btn icon>
                                    <v-icon>mdi-delete</v-icon>
                                </v-btn>
                            </td>
                        </tr>
                        <tr>
                            <td>${kelas}</td>
                            <td>Kamu kelas berapa ?</td>
                            <td>['sepuluh', 'sebelas', 'duabelas']</td>
                            <td>
                                <v-btn icon>
                                    <v-icon>mdi-delete</v-icon>
                                </v-btn>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <v-text-field
                                    hide-details=""
                                    dense/>
                            </td>
                            <td>
                                <v-text-field
                                    hide-details=""
                                    dense/>
                            </td>
                            <td>
                                <v-text-field
                                    hide-details=""
                                    dense/>
                            </td>
                            <td>
                                <v-btn icon>
                                    <v-icon>mdi-delete</v-icon>
                                </v-btn>
                            </td>
                        </tr>
                    </tbody>
                </v-simple-table>

                <v-subheader>
                    Response
                </v-subheader>

                <v-container>
                    <v-simple-table dense>
                    <thead>
                        <tr>
                            <th style="width:60%">Response</th>
                            <th style="width:30%">Tipe</th>
                            <th style="width:10%"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Halo ${nama}, kamu mau belajar apa hari ini ?</td>
                            <td>
                                ['matematika', 'bahasa indonesia']
                            </td>
                            <td>
                                <v-btn icon>
                                    <v-icon>mdi-delete</v-icon>
                                </v-btn>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <v-text-field
                                    hide-details=""
                                    dense/>
                            </td>
                            <td>
                                <v-text-field
                                    hide-details=""
                                    dense/>
                            </td>
                            <td>
                                <v-btn icon>
                                    <v-icon>mdi-plus</v-icon>
                                </v-btn>
                            </td>
                        </tr>
                    </tbody>
                </v-simple-table>
                </v-container>
            </v-container>
        </v-col>
        
        <v-col md="4" class="ma-0 pa-0 h-full">
        <v-card 
            class="card-chat d-flex flex-column justify-content-between">
            <v-card-title>
                Simulasi
                <v-spacer/>
                <v-btn
                    class="primary"
                    rounded>
                    Reset
                </v-btn>
            </v-card-title>
            <v-divider/>
		<v-card-text class="card-chat-percakapan flex-grow-1">
			<v-list-item dense
				v-for="(item, index) in percakapan"
				:key="index"
				:class="`mt-1 ${item.saya?'ml-8 justify-end':'mr-8'}`">
				<v-card 
					dark 
					:color="item.saya?'primary':'grey darken-3'" 
					class="pa-2">
					<div v-html="item.pesan"></div>
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
						v-on:click="pesan=item.value; handelKirimPesan(); mode='teks'">
						<v-list-item-title>{{ item.label }}</v-list-item-title>
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
        </v-col>
    </v-row>
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
			if(this.step==1){
				this.userNama	= pesan
				this.handelKirimPesanDelay(500, {
					saya: false,
					pesan: "Halo "+this.userNama,
					mode: 'teks',
					opsi: [],
				})

				this.handelKirimPesanDelay(1000, {
					saya: false,
					pesan: "Kamu kelas berapa ?",
					mode: 'opsi',
					opsi: this.tingkat
				})
				this.step	= 2
			}else if(this.step==2){
				this.userKelas	= pesan
				this.handelKirimPesanDelay(1000, {
					saya: false,
					pesan: `Ok ${this.userNama}, kamu mau belajar apa hari ini ?`,
					mode: 'opsi',
					opsi: this.pelajaran
				})

				this.step		= 3
			}else{
				this.userPelajaran = pesan
				if(pesan==="belajar"){
					this.handelKirimPesanDelay(1000, {
						saya: false,
						pesan: `Ok ${this.userNama}, kamu mau belajar apa hari ini ?`,
						mode: 'opsi',
						opsi: this.pelajaran
					})
				}else{
					this.handelKirimPesanDelay(1000, {
						saya: false,
						pesan: ([
							`Untuk ${pesan} kelas ${this.userKelas}, berikut materinya `,
						].concat(this.materi[pesan])).join(`<br/>`),
						mode: 'teks',
						opsi: []
					}),

					this.handelKirimPesanDelay(5000, {
						saya: false,
						pesan: `Jika mau lihat materi lainyya, cukup ketik "belajar" yaa`,
						mode: 'teks',
						opsi: []
					})
				}
				
				
				
			}
		},
	},
	mounted: function(){
		window.handelBukaMateri = this.handelBukaMateri.bind(this);
		this.handelKirimPesanDelay(500, {
			saya: false,
			pesan: "Selamat pagi",
			mode: 'teks',
			opsi: [],
		})

		

		if(this.step==1){

			this.handelKirimPesanDelay(1000, {
				saya: false,
				pesan: "Selamat datang di virtual assistant BPK Penabur",
				mode: 'teks',
				opsi: [],
			})
			
			this.handelKirimPesanDelay(1500, {
				saya: false,
				pesan: "Nama kamu siapa ?",
				mode: 'teks',
				opsi: [],
			})

		}else if(this.step==2){
			this.handelKirimPesanDelay(1000, {
				saya: false,
				pesan: "Halo "+this.userNama,
				mode: 'teks',
				opsi: [],
			})
			this.handelKirimPesanDelay(1000, {
				saya: false,
				pesan: "Selamat datang kembali di virtual assistant BPK Penabur",
				mode: 'teks',
				opsi: [],
			})
			this.handelKirimPesanDelay(1500, {
				saya: false,
				pesan: "Kamu kelas berapa ?",
				mode: 'opsi',
				opsi: this.tingkat
			})
		}else{
			this.handelKirimPesanDelay(1000, {
				saya: false,
				pesan: "Halo "+this.userNama,
				mode: 'teks',
				opsi: [],
			})
			this.handelKirimPesanDelay(1500, {
				saya: false,
				pesan: "Selamat datang kembali di virtual assistant BPK Penabur",
				mode: 'teks',
				opsi: [],
			})
			this.handelKirimPesanDelay(2000, {
				saya: false,
				pesan: `Ok ${this.userNama}, kamu mau belajar apa hari ini ?`,
				mode: 'opsi',
				opsi: this.pelajaran
			})
		}
		
	

	},
}
</script>
<style scoped>
.card-chat{
	height:96vh
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