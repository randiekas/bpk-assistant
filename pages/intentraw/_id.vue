<template>
    <v-row dense class="h-full">
        <v-col md="9" class="ma-0 pa-0 h-full grey lighten-4">
			
			<Chart 
				:data="data"
				:handelKlik="handelKlik"
				/>
			
            <v-app-bar>
                <v-toolbar-title>
                    Chatbot builder
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
            
        </v-col>
        
        <v-col md="3" class="ma-0 pa-0 h-full">
        <v-card 
            class="card-chat d-flex flex-column justify-content-between">
            <v-card-title>
                Simulasi
                <v-spacer/>
                <v-btn
                    class="primary"
                    rounded
					v-on:click="handelReset">
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
        </v-col>

		<v-dialog
			v-model="dialog"
			max-width="80vw">
			<v-card>
				<v-app-bar>
                <v-toolbar-title>
                    Alur Welcome
                </v-toolbar-title>
                <v-spacer />
				<v-btn class="mr-2" rounded v-on:click="dialog=false">
                    Tutup
                </v-btn>
                <v-btn color="primary" rounded>
                    Simpan
                </v-btn>
            </v-app-bar>
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
			</v-card>
		</v-dialog>
    </v-row>
</template>
<script>
export default {
	asyncData: function(){
		
		return {
			data: [
				{
					"nama": "Welcome",
					"id": "0",
					"parentId": "",
					"size": "",
					"katakunci":"halo, hai, mau tanya",
					"balasan": [
						"Selamat datang di virtual assistant BPK Penabur",
						`apa yang bisa kami bantu? <br/>
						1. jadwal <br/>
						2. Belajar<br/>
						3. pengumuman`
					],
					"fallback": [
						"Maaf saya tidak mengerti yang kamu maksud",
						`coba pilih salah satu menu berikut ini ? <br/>
						1. jadwal [sd, smp, sma]<br/>
						2. belajar<br/>
						3. pengumuman`
					],
					mode:"opsi",
					opsi:[
						"jadwal",
						"belajar",
						"pengumuman"
					]
				},
				{
					"nama": "Jadwal Sekolah",
					"id": "1",
					"parentId": "0",
					"size": "",
					"katakunci":"jadwal, jadwal sekolah",
					"balasan": [
						`Pilih jadwal sekolah yang kamu mau <br/>
						1. jadwal smp <br/>
						2. jadwal sma`
					],
					mode:"teks",
					opsi:[]
				}, 	
				{
					"nama": "SMP",
					"id": "1.1",
					"parentId": "1",
					"size": "",
					"katakunci":"jadwal smp",
					"balasan": [
						`Berikut jadwal smp <br/>
						Senin : <br/>
						- matematka
						- bahasa inggris
						Selasa : <br/>
						- matematka
						- bahasa inggris`
					],
					mode:"teks",
					opsi:[]
				}, 	
				{
					"nama": "SMA",
					"id": "1.2",
					"parentId": "1",
					"size": "",
					"katakunci":"jadwal sma",
					"balasan": [
						`Berikut jadwal sma <br/>
						Senin : <br/>
						- matematka
						- bahasa inggris
						Selasa : <br/>
						- matematka
						- bahasa inggris`
					],
					mode:"teks",
					opsi:[]
				}, 	
				{
					"nama": "Belajar",
					"id": "2",
					"parentId": "0",
					"size": "",
					"katakunci":"belajar, mau belajar",
					"balasan": [
						`Mau belajar apa ?`,
					],
					mode:"opsi",
					opsi:[
						'belajar matematika',
						'belajar bahasa inggris',
						'belajar bahasa indonesia'
					]
				}, 	
				{
					"nama": "Matematika",
					"id": "2.1",
					"parentId": "2",
					"size": "",
					"katakunci":"belajar matematika, matematika",
					"balasan": [
						`Apa yang kamu inginkan ?`,
					],
					mode:"opsi",
					opsi:[
						'materi matematika',
						'latihan soal matematika',
					]
				}, 	
				{
					"nama": "Materi",
					"id": "2.1.1",
					"parentId": "2.1",
					"size": "",
					"katakunci":"materi matematika",
					"balasan": [
						`Berikut list materi matematika <br/>
						1. https://www.youtube.com/watch?v=OxHSBdG-hS8 <br/>
						2. https://www.youtube.com/watch?v=OxHSBdG-hS8 <br/>
						3. https://www.youtube.com/watch?v=OxHSBdG-hS8 <br/>
						`,
					],
					mode:"teks",
					opsi:[]
				}, 	
				{
					"nama": "Latihan Soal",
					"id": "2.1.2",
					"parentId": "2.1",
					"size": "",
					"katakunci":"latihan soal matematika",
					"balasan": [
						`Silahkan pilih soal dibawah ini`,
					],
					mode:"opsi",
					opsi:[
						'latihan soal 1 matematika'
					]
				}, 	
				{
					"nama": "Soal ke 1",
					"id": "2.1.2.1",
					"parentId": "2.1.2",
					"size": "",
					"katakunci":"latihan soal 1 matematika",
					"balasan": [
						`Sebuah mobil bergerak dengan kecepatan awal 10 m/s. Mobil tersebut dipercepat dengan percepatan 2 m/s2 selama 5 detik. Berapakah kecepatan akhir mobil tersebut? `,
						`Apakah kamu memerlukan bantuan untuk menyelesaikan soal ini`
					],
					mode:"opsi",
					opsi:[
						'bantuan soal 1 matematika',
						'jawab soal 1 matematika'
					]
				}, 	
				{
					"nama": "Memerlukan bantuan ?",
					"id": "2.1.2.1.1",
					"parentId": "2.1.2.1",
					"size": "",
					"katakunci":"bantuan soal 1 matematika",
					"balasan": [
						`Apakah kamu sudah mengetahui konsep untuk menyelesaikan soal di atas ?`,
					],
					mode:"opsi",
					opsi:[
						'sudah tau konsep soal 1 matematika',
						'belum tau konsep soal 1 matematika'
					]
				}, 	
				{
					"nama": "Sudah mengetahui konsep ",
					"id": "2.1.2.1.1.1",
					"parentId": "2.1.2.1.1",
					"size": "",
					"katakunci":"sudah tau konsep soal 1 matematika",
					"parameter":[
						{
							kode:"rumusdigunakan",
							prompt: `Baik berarti sekarang coba kamu tentukan rumus mana yang kita gunakan untuk menyelesaikan soal di atas ?
									A. Vt = Vo + a.t <br/>
									B. S = Vo.t + ½ a.t2 <br/>
									C. Vt2 = Vo2 + 2.a.s<br/>
									Jawabannya adalah ?`,
							mode:"opsi",
							opsi:[
								'a',
								'b',
								'c',
							]
						}
					],
					"balasan":[
						"Yu coba soal lainnya",
					],
					mode:"opsi",
					opsi:[
						'latihan soal matematika',
					]
				}, 	
				{
					"nama": "belum mengetahui konsep ",
					"id": "2.1.2.1.1.2",
					"parentId": "2.1.2.1.1",
					"size": "",
					"katakunci":"belum tau konsep soal 1 matematika",
					mode:"teks",
					opsi:[]
				}, 	
				{
					"nama": "Jawab soal",
					"id": "2.1.2.1.2",
					"parentId": "2.1.2.1",
					"size": "",
					"katakunci":"jawab soal 1 matematika",
					"balasan":[
						`Kita samakan jawabannya ya. Jawaban soal di atas adalah C `
					],
					mode:"teks",
					opsi:[]
				}, 	
				
				{
					"nama": "Bahasa Indonesia",
					"id": "2.2",
					"parentId": "2",
					"size": "",
					"katakunci":"belajar indonesia, indonesia",
					mode:"teks",
					opsi:[]
				}, 	
				{
					"nama": "Bahasa Inggris",
					"id": "2.3",
					"parentId": "2",
					"size": "",
					"katakunci":"belajar bahasa inggris, inggris",
					mode:"teks",
					opsi:[]
				}, 	
				{
					"nama": "Pengumuman",
					"id": "3",
					"parentId": "0",
					"size": "",
					"katakunci":"pengumuman",
					"balasan":[
						`Berikut disampaikan Pengumuman<br/> Tentang Perubahan Daftar Peserta, Waktu, dan Tempat Seleksi Kompetensi Dasar Penerimaan Calon Pegawai Negeri Sipil (CPNS) Kemdikbudristek Tahun 2021<br/><br/>
							<a href="https://randiekas.id">https://randiekas.id</a>`
					],
					mode:"teks",
					opsi:[]
				}, 	
			],
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
		handelKlik: function(id){
			this.dialog	 	= true
		},
		handelReset: function(){
			this.percakapan	= []
		},
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

			let durasi	= 0;
			let balasan	= { data: [], mode: "teks", opsi:[]}
			
			// cari kata, jika ada yang mirip, maka respon jawabanya adalah ituuu, hehe
			this.data.some((item, index)=>{

				if(item.katakunci.includes(pesan)){
					balasan.data	= item.balasan
					balasan.mode	= item.mode
					balasan.opsi	= item.opsi
					return true;
				}

			})

			// jika tidak menemukan, maka kasih fallback
			if(balasan.data.length===0){
				balasan.data		= this.data[0].fallback
				balasan.mode		= this.data[0].mode
				balasan.opsi		= this.data[0].opsi
			}

			balasan.data.map((item)=>{
				this.handelKirimPesanDelay(durasi, {
					saya: false,
					pesan: item,
					mode: balasan.mode,
					opsi: balasan.opsi
				})
				durasi	+=1000
			})
			
		},
	},
	mounted: function(){
		
	

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