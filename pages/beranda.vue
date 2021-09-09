<template>
<div>
	<v-row>
		<v-col md="5">
			<v-container style="height:80vh" class="d-flex">
				<div class="mx-auto my-auto">
				<h1 class="display-4">Virtual Asisten BPK Penabur</h1>
				<p class="text-body-1">
					Selamat datang di situs resmi belajar,  berbasis personal asisten artificial intellegence.
				</p>
				</div>
			</v-container>
		</v-col>
		<v-col md="7">
			<v-img src="https://www.tidio.com/images/frontpage/hero/george.png"/>
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
		class="mb-16">
		<v-icon v-if="fab">
			mdi-close
		</v-icon>
		<v-icon v-else>
			mdi-chat
		</v-icon>
	</v-btn>

	<v-card class="card-chat">
		<v-card-title>Ada yang bisa dibantu ?</v-card-title>
		<v-divider/>
		<v-card-text style="height:295px">
			<v-list-item>
				<v-list-item-title>You</v-list-item-title>
				<v-list-item-content>Selamat pagi, selamat datang di virtual asisten BPK Penabur</v-list-item-content>
			</v-list-item>
		</v-card-text>
		<v-spacer/>
		<v-text-field
			outlined
			hide-details=""
			placeholder="tulis pesan disini ..."
			dense
			append-icon="mdi-send"
			/>
	</v-card>
</div>
</template>
<script>
export default {
	data: function(){
		return {
			fab: false
		}
	}
}
</script>
<style scoped>
.card-chat{
	width:400px; 
	position: absolute;
	right:20px;
	bottom:100px;
	height:400px
}
</style>