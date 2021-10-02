[
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
        "mode":"opsi",
        "opsi":[
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
        "mode":"teks",
        "opsi":[]
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
        "mode":"teks",
        "opsi":[]
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
        "mode":"teks",
        "opsi":[]
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
        "mode":"opsi",
        "opsi":[
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
        "mode":"opsi",
        "opsi":[
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
        "mode":"teks",
        "opsi":[]
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
        "mode":"opsi",
        "opsi":[
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
        "mode":"opsi",
        "opsi":[
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
        "mode":"opsi",
        "opsi":[
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
                "mode":"opsi",
                "opsi":[
                    'a',
                    'b',
                    'c',
                ]
            }
        ],
        "balasan":[
            "Yu coba soal lainnya",
        ],
        "mode":"opsi",
        "opsi":[
            'latihan soal matematika',
        ]
    }, 	
    {
        "nama": "belum mengetahui konsep ",
        "id": "2.1.2.1.1.2",
        "parentId": "2.1.2.1.1",
        "size": "",
        "katakunci":"belum tau konsep soal 1 matematika",
        "mode":"teks",
        "opsi":[]
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
        "mode":"teks",
        "opsi":[]
    }, 	
    
    {
        "nama": "Bahasa Indonesia",
        "id": "2.2",
        "parentId": "2",
        "size": "",
        "katakunci":"belajar indonesia, indonesia",
        "mode":"teks",
        "opsi":[]
    }, 	
    {
        "nama": "Bahasa Inggris",
        "id": "2.3",
        "parentId": "2",
        "size": "",
        "katakunci":"belajar bahasa inggris, inggris",
        "mode":"teks",
        "opsi":[]
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
        "mode":"teks",
        "opsi":[]
    }, 	
]