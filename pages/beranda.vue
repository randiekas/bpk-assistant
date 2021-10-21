<template>
    <v-row dense class="h-full">
        <v-col md="9" class="ma-0 pa-0 h-full">

			<Chart
				v-if="data.length>0"
				:data="data"
				:handelKlik="handelKlik"
				/>

            <v-app-bar>
                <v-toolbar-title>
                    Chatbot builder
                </v-toolbar-title>
                <!-- <v-spacer />
                <v-btn color="primary" rounded>
                    Simpan
                </v-btn> -->
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
					@click="handelReset">
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
					<div style="white-space: pre-line" v-html="item.pesan"></div>
                    <v-card dark :color="item.saya?'grey darken-3':'primary'" v-if="item.opsi.length>0" flat outlined>
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
				outlined
				hide-details=""
				placeholder="tulis pesan disini ..."
				dense
				append-icon="mdi-send"
				v-model="pesan"
				v-on:keyup.enter="handelKirimPesan"/>
		</div>
	</v-card>
        </v-col>

		<v-dialog
			v-model="dialog"
			max-width="75vw">
			<v-card>
				<v-app-bar>
                <v-toolbar-title class="py-6">
                    <v-text-field
                        dense
                        v-model="nama"
                        hide-details=""
                        label="Nama Alur"
                        outlined/>
                </v-toolbar-title>
                <v-spacer />
				<v-btn class="mr-2" rounded @click="dialog=false">
                    Tutup
                </v-btn>

				<v-btn
                    v-if="!parentid"
                    class="mr-2 red"
                    dark
                    rounded
                    @click="handelHapus">
                    Hapus
                </v-btn>

                <v-btn
                    color="primary"
                    rounded
                    @click="handelSimpan">
                    Simpan
                </v-btn>
            </v-app-bar>
            
            <v-container>
                <v-subheader>
                    Ketika user menulis
                </v-subheader>
                <v-text-field
                    v-for="(item, index) in perintah"
                    :key="index"
                    dense
                    placeholder="Perintah"
                    v-model="perintah[index]"
                    outlined
                    hide-details=""
                    class="mb-1"
                    append-icon="mdi-delete"
                    @click:append="handelHapusPerintah(index)"/>
                <v-btn @click="handelTambahPerintah" block class="mt-2">Tambah Perintah</v-btn>
                <!-- <v-text-field
                    dense
                    placeholder="Tulis perintah disini ..."
                    outlined
                    hide-details=""
                    append-icon="mdi-plus"
                    v-model="inputPerintah"
                    @click:append="handelTambahPerintah"
                    v-on:keyup.enter="handelTambahPerintah"
                    class="mb-1"/> -->
            </v-container>

            <!-- <v-subheader>
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
			</v-container> -->
            <v-container>
                <v-subheader class="mt-4">
                    Respon Bot
                </v-subheader>
                <v-textarea
                    v-for="(item, index) in response"
                    :key="index"
                    class="mb-1"
                    outlined
                    dense
                    hide-details=""
                    placeholder="Ketik respon bot disini ..."
                    v-model="response[index]"
                    rows="1"
                    auto-grow
                    append-icon="mdi-delete"
                    @click:append="handelHapusResponse(index)"/>
                <v-btn @click="handelTambahResponse" block class="mt-2">Tambah Respon</v-btn>
                <!-- <v-textarea
                    outlined
                    dense
                    hide-details=""
                    :placeholder="`Ketik respon bot ke ${(response.length+1)} ...`"
                    append-icon="mdi-plus"
                    auto-grow
                    rows="1"
                    v-model="inputResponse"
                    @click:append="handelTambahResponse"/> -->
                    
            </v-container>

            <v-subheader class="pb-0">
				Opsi pada respon
			</v-subheader>
            
            <v-container>
                <v-simple-table dense>
                    <tbody>
                        <tr>
                            <th width="50%">Label</th>
                            <th width="30%">Aksi</th>
                            <th width="20%">Tujuan</th>
                            <th width="20px"></th>
                        </tr>

                        <tr 
                            v-for="(item, index) in opsi"
                            :key="index">
                            <td>
                                <v-text-field
                                    dense
                                    placeholder="Opsi"
                                    v-model="opsi[index].label"
                                    outlined
                                    hide-details=""
                                    class="mb-1"/>                
                            </td>
                            <td>
                                <v-radio-group
                                    v-model="opsi[index].aksi"
                                    row
                                    hide-details=""
                                    dense
                                    class="mt-0 pt-0">
                                    <v-radio
                                        label="link"
                                        value="link"/>
                                    <v-radio
                                        label="Flowchat"
                                        value="flowchat"/>

                                </v-radio-group>
                            </td>
                            <td>
                                <v-text-field
                                    v-if="opsi[index].aksi==='link'"
                                    dense
                                    placeholder="Puit Link url here ..."
                                    v-model="opsi[index].tujuan"
                                    outlined
                                    hide-details=""
                                    class="mb-1"/>                
                                    
                                <v-select
                                    v-else
                                    v-model="opsi[index].tujuan"
                                    dense
                                    :items="data"
                                    item-text="nama"
                                    item-value="id"/>
                            </td>
                            <td
                                style="width:30px">
                                <v-btn
                                    icon
                                    @click="handelHapusOpsi(index)">
                                    <v-icon>
                                        mdi-delete
                                    </v-icon>
                                </v-btn>
                            </td>
                        </tr>

                        <!-- <tr >
                            <td>
                                <v-text-field
                                    dense
                                    placeholder="Opsi"
                                    v-model="inputOpsi.label"
                                    outlined
                                    hide-details=""
                                    class="mb-1"/>                
                            </td>
                            <td>
                                <v-radio-group
                                    v-model="inputOpsi.aksi"
                                    row
                                    hide-details=""
                                    dense
                                    class="mt-0 pt-0">
                                    <v-radio
                                        label="link"
                                        value="link"/>
                                    <v-radio
                                        label="Chat Flow"
                                        value="chat"/>

                                </v-radio-group>
                            </td>
                            <td>
                                <v-text-field
                                    v-if="inputOpsi.aksi==='link'"
                                    dense
                                    placeholder="Puit Link url here ..."
                                    v-model="inputOpsi.tujuan"
                                    outlined
                                    hide-details=""
                                    class="mb-1"/>                
                                <v-select
                                    v-else
                                    v-model="inputOpsi.tujuan"
                                    dense
                                    :items="data"
                                    item-text="nama"
                                    item-value="id"/>
                            </td>
                            <td
                                style="width:30px">
                                <v-btn
                                    icon
                                    @click="handelTambahOpsi">
                                    <v-icon>
                                        mdi-plus
                                    </v-icon>
                                </v-btn>
                            </td>
                        </tr> -->
                    </tbody>
                </v-simple-table>
                <v-btn @click="handelTambahOpsi" block class="mt-2">Tambah Opsi</v-btn>
            </v-container>
			
            <v-subheader class="pb-0">
				Fallback - tidak ada respon 
			</v-subheader>
            
            </v-card>
		</v-dialog>
        <v-dialog
			v-model="isFetching"
			hide-overlay
			persistent
			width="300">
			<v-card
				color="primary"
				dark>
				<v-card-text>
				Sedang memproses, mohon tunggu
				<v-progress-linear
					indeterminate
					color="white"
					class="mb-0"
				></v-progress-linear>
				</v-card-text>
			</v-card>
		</v-dialog>
        <v-dialog
            v-model="alertMessage.status"
            max-width="300">
            <v-alert
                border="left"
                color="deep-purple accent-4"
                type="info"
                dark
                class="mb-0">
                    {{ alertMessage.message }}
                    <v-btn class="mt-4" block v-on:click="alertMessage.status=false">Tutup</v-btn>
            </v-alert>
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
    </v-row>
</template>
<script>

export default {
    layout: 'beranda',
	asyncData: function(){

		return {
			data: [],
            akun: [],
		}
	},
	data: function(){
		return {
            dialogMateri:  false,
            dialogUrl:  '',
            alertMessage: {
                status: false,
                message: ''
            },
            isFetching: false,
			dialog: false,
			dialogUrl: '',
			fab: true,
			percakapan: [

			],
			pesan:'',
            
            parentid:0,
            depth:0,
            perintah:[],
            response:[],
            mode:'teks',
            opsi:[],
            nama: '',
			inputPerintah: '',
			inputResponse: '',
			inputOpsi: {},
		}
	},
	watch:{
        dialog:function(){
            if(this.dialog===false){
                this.mode           = 'teks',
                this.opsi           = []
                this.nama           = ''
                this.inputPerintah  = ''
                this.inputResponse  = ''
                this.inputOpsi      = []
                
            }
        },
		percakapan: function(){
			// setInterval(()=>{
			// 	const chatarea	= document.querySelector(".card-chat-percakapan")
            //     console.log("panggil")
			// 	chatarea.scrollTo(0, chatarea.scrollHeight+10000)
			// }, 500)
		},
	},
	mounted: function(){
		this.handelLoadDataAlur()
	},
	methods: {
        handelSimpan: function(){
            // this.isFetching = true
            const payload   = {
                id: this.id,
                parentid: this.parentid,
                depth: this.depth,
                nama: this.nama,
                katakunci: this.perintah.join(),
                balasan: JSON.stringify(this.response),
                fallback: '',
                mode: this.mode,
                opsi: JSON.stringify(this.opsi)
            }
            // this.data.push(payload)
            this.$api.$post(`biasa/alur/simpan`, payload).then((resp)=>{
                this.handelLoadDataAlur()
                this.dialog         = false
                this.isFetching     = false
                this.alertMessage   = {
                    status: true,
                    message: resp.message
                }
            })
        },
        handelHapus: function(){
            this.isFetching = true
            this.$api.$get(`biasa/alur/hapus/${this.id}`).then((resp)=>{
                this.handelLoadDataAlur()
                this.dialog         = false
                this.isFetching     = false
                this.alertMessage   = {
                    status: true,
                    message: resp.message
                }
            })
        },
        handelTambahPerintah: function(){
            this.perintah.push(this.inputPerintah)
            this.inputPerintah  = ''
        },
        handelHapusPerintah: function(index){
            this.perintah.splice(index,1)
        },
        handelTambahResponse: function(){
            this.response.push(this.inputResponse)
            this.inputResponse  = ''
        },
        handelHapusResponse: function(index){
            this.response.splice(index,1)
        },
        handelTambahOpsi: function(){
            this.opsi.push(Object.assign({}, this.inputOpsi))
            this.inputOpsi      = {}
        },
        handelHapusOpsi: function(index){
            this.opsi.splice(index,1)
        },
		handelLoadDataAlur: async function(){
			let data    		= [{
                                    balasan: "[\"Selamat datang di virtual assistant BPK Penabur\",\"Apa yang bisa kami bantu?\"]",
                                    dibuat: "2021-09-30 13:41:09",
                                    fallback: "",
                                    id: "1",
                                    katakunci: "halo, hai, mau tanya",
                                    mode: "opsi",
                                    nama: "Default",
                                    opsi: "[]",
                                    parentId: "",
                                }]
			let data_api		= (await this.$api.$get(`biasa/alur`)).data
			this.data			= data.concat(data_api)
			
		},
        
		handelKlik: function(action, depth, id){
			if(depth==0){
				alert("Kamu tidak mempunyai akses untuk mengubah alur ini")
				return 
			}
			if(action=="tambah"){
                this.id         = ''
                this.nama       = ''
                this.parentid   = id
                this.depth      = depth+1
                this.perintah   = []
                this.response   = []
                this.mode       = 'teks'
                this.opsi       = []
            }else{
                const data      = this.data.filter((item)=>item.id==id)[0]
                this.id         = id
                this.parentid   = data.parentid
                this.depth      = data.depth
                this.nama       = data.nama
                this.perintah   = data.katakunci.split(",")
                this.response   = JSON.parse(data.balasan)
                this.mode       = data.mode
                this.opsi       = JSON.parse(data.opsi)
            }
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
			let durasi	= 0;
            let balasan	= { data: [], mode: "teks", opsi:[]}
            let payload = {}

            if(pesan.aksi){
                payload     = pesan
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



			// // cari kata, jika ada yang mirip, maka respon jawabanya adalah ituuu, hehe
			// this.data.some((item, index)=>{

			// 	if(item.katakunci.includes(pesan)){
			// 		balasan.data	= item.balasan
			// 		balasan.mode	= item.mode
			// 		balasan.opsi	= item.opsi
			// 		return true;
			// 	}

			// })

			// // jika tidak menemukan, maka kasih fallback
			// if(balasan.data.length===0){
			// 	balasan.data		= this.data[0].fallback
			// 	balasan.mode		= this.data[0].mode
			// 	balasan.opsi		= this.data[0].opsi
			// }

			// balasan.data.map((item)=>{
			// 	this.handelKirimPesanDelay(durasi, {
			// 		saya: false,
			// 		pesan: item,
			// 		mode: balasan.mode,
			// 		opsi: balasan.opsi
			// 	})
			// 	durasi	+=1000
			// })

		},
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
