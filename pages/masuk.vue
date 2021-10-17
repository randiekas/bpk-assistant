<template>
	<v-row>
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
        <v-col md="8" class="text-center justify-center d-flex h-full" style="height:80vh">
            <v-icon size="128">
                mdi-forum
            </v-icon>
		</v-col>
		<v-col md="4" justify="center" align="center" class="my-auto">
			<v-container class="px-16">
                <h1 class="text-h3">Sign in</h1>
                <p class="mt-4">Kelola Superbot Anda</p>
                <v-text-field
                    v-model="form.email"
                    label="Email Address"
                    placeholder="Enter your email"
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
                    class="primary"
                    block
                    @click="handelMasuk()">
                    Sign in
                </v-btn>
			</v-container>
		</v-col>

	</v-row>
</template>
<script>
export default {
    props: ['setFetching'],
    data: function(){
        return {
            alert: false,
            alertMessage: '',
            form: {
                email: '',
                password: '',
            }
        }
    },
    methods: {
        handelMasuk: function(){
            this.setFetching(true)
            this.$axios.$post(`publik/akun/masuk`, this.form).then((resp)=>{
                this.setFetching(false)
                if(resp.status){
                    localStorage.setItem("email", resp.data.email)
                    localStorage.setItem("tipe", resp.data.tipe)
                    localStorage.setItem("token", resp.data.token)
                    if(resp.data.tipe==="superadmin"){
                        window.location.href="/admin/beranda"
                    }else{
                        window.location.href="/beranda"
                    }
                }else{
                    this.alertMessage   = resp.message
                    this.alert          = true
                }
            })
        }
    }
}
</script>
