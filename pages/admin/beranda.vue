<template>
	<div class="fill-height mb-16">
		<div class="primary pb-16">
			<v-container>
				<Head
					title="Akun"
					subtitle="Kelola data akses akun">
					<v-btn
						small
						@click="handelResetForm();dialog=true">
						<v-icon left>
							mdi-plus
						</v-icon>
						Tambah Akun
					</v-btn>
				</Head>
				<v-row class="mt-2">

				</v-row>
			</v-container>
		</div>
		<v-container class="mt-n16">
            <v-card>
			<v-simple-table dense>
				<template v-slot:default>
				<thead>
					<tr>
						<th class="text-left" style="width:5%">
							#
						</th>
						<th class="text-left" style="width:20%">
							Email
						</th>
						<th class="text-left" style="width:25%">
							Password
						</th>
						<th class="text-left" style="width:10%">
							Role
						</th>
						<th class="text-left" style="width:30%">
							Keterangan
						</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					<tr
                        v-for="(item, index) in data"
                        :key="index">
						<td>{{ index+1 }}</td>
						<td>{{ item.email }}</td>
						<td>{{ item.password }}</td>
						<td>{{ item.tipe }}</td>
						<td>{{ item.keterangan }}</td>
						<td>
							<v-btn
                                icon
                                small
                                @click="handelEditForm(item)">
								<v-icon>mdi-pencil</v-icon>
							</v-btn>
							<v-btn
                                icon
                                small
                                @click="handelHapus(item.id)">
								<v-icon>mdi-delete</v-icon>
							</v-btn>
						</td>
					</tr>
				</tbody>
				</template>
			</v-simple-table>
            </v-card>
		</v-container>

		<v-dialog
			v-model="dialog"
			persistent
			max-width="600px"
			>
			<v-card>
				<v-card-title>
				</v-card-title>
				<v-card-text>
					<v-container>
						<v-row>
							<v-col cols="12">
								<v-text-field
                                    v-model="form.email"
									dense
									label="Email"
									outlined
									required
                                    hide-details=""/>
							</v-col>
                            <v-col cols="12">
								<v-text-field
                                    v-model="form.password"
                                    type="password"
									dense
									label="Password"
									outlined
									required
                                    hide-details=""/>
							</v-col>
                            <v-col cols="12">
								<v-text-field
                                    v-model="form.keterangan"
									dense
									label="keterangan"
                                    placeholder="Contoh: Guru Matematika, Bagian Keuangan"
									outlined
									required
                                    hide-details=""/>
							</v-col>
                            <v-col cols="12">
                                <p class="mb-0">Tipe Akun</p>
                                <v-radio-group
                                    class="mt-0"
                                    v-model="form.tipe"
                                    mandatory>
                                    <v-radio
                                        label="Biasa"
                                        value="biasa"/>
                                    <v-radio
                                        label="Super Admin"
                                        value="superadmin"/>
                                </v-radio-group>
                            </v-col>

						</v-row>
					</v-container>
				</v-card-text>
				<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn
					color="blue darken-1"
					text
					@click="dialog = false"
				>
					Close
				</v-btn>
				<v-btn
					color="blue darken-1"
					text
					@click="handelSimpanForm()"
				>
					Simpan
				</v-btn>
				</v-card-actions>
			</v-card>
			</v-dialog>
	</div>
</template>
<script>
export default {
	layout: 'beranda',
	props: ['apps', 'setFetching'],

    mounted: function(){
        this.handelLoadData()
        this.handelResetForm()
    },
	data: function(){
		return {
            data: [],
			dialog: false,
            form: {}
		}
	},
    methods: {
        handelLoadData: async function(){
            this.data	= (await this.$api.$get(`superadmin/akun`)).data
        },
        handelResetForm: function(){
            this.form   = {
                email: '',
                password: '',
                tipe: 'biasa',
                keterangan: '',
            }
        },
        handelEditForm: function(item){
            this.form   = item
            this.dialog = true
        },
        handelSimpanForm: function(){
            this.setFetching(true)
            this.$api.$post(`superadmin/akun/simpan`, this.form).then((resp)=>{
                this.dialog = false
                this.handelResetForm()
                this.handelLoadData()
                this.setFetching(false)
            })
            // this.dialog = false
        },
        handelHapus: function(id){
            this.setFetching(true)
            this.$api.$get(`superadmin/akun/hapus/${id}`, this.form).then((resp)=>{
                this.dialog = false
                this.handelLoadData()
                this.setFetching(false)
            })
        }
    }
}
</script>
