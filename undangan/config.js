/**
 * FILE KONFIGURASI UNDANGAN PERNIKAHAN DIGITAL
 * Anda dapat mengubah isi teks, tanggal, alamat, foto, dan rekening di sini
 * tanpa perlu mengubah kode HTML/CSS/JS utama.
 */

const WeddingConfig = {
  // Informasi Mempelai Pria (Chinese Mainland)
  groom: {
    nickname: "Yong Sheng",
    fullname: "Wang Yong Sheng",
    chineseName: "王永胜 (Wáng Yǒngshèng)",
    father: "Wang Si MAO",
    mother: "Jing Fen Lian",
    instagram: "https://instagram.com/yongsheng_wang",
    photo: "assets/groom.jpg", // Ganti dengan path foto mempelai pria Anda
    about: "Putra tercinta dari Bpk. Wang Si MAO & Ibu Jing Fen Lian. Lahir dan besar di Tiongkok, kini melangkah bersama Putri Kinanti untuk membina keluarga baru yang diberkati."
  },

  // Informasi Mempelai Wanita (Batak)
  bride: {
    nickname: "Putri",
    fullname: "Putri Kinanti Boru Naibaho, S.Tr.Kom",
    father: "Bintang Parlindungan Naibaho",
    mother: "Irma Lidia Boru Gultom",
    instagram: "https://instagram.com/putri_naibaho",
    photo: "assets/bride.jpg", // Ganti dengan path foto mempelai wanita Anda
    about: "Putri tercinta dari Bpk. Bintang Parlindungan Naibaho & Ibu Irma Lidia Boru Gultom. Gadis Batak pembawa sukacita yang siap melangkah bersama Yong Sheng dalam ikatan pernikahan kudus."
  },

  // Tanggal & Waktu Acara Utama (Format: YYYY-MM-DDTHH:mm:ss)
  // Digunakan untuk countdown timer
  weddingDate: "2026-08-22T09:00:00",

  // Rincian Acara Pernikahan Kristen (Pemberkatan & Resepsi)
  events: {
    pemberkatan: {
      title: "Pemberkatan Pernikahan",
      dateString: "Minggu, 22 Agustus 2026",
      timeString: "09:00 WIB - 11:00 WIB",
      venue: "GBI Betlehem Duta Bandara Permai",
      address: "Jl. Jenderal Sudirman No. 45, Setiabudi, Jakarta Selatan",
      mapsUrl: "https://maps.app.goo.gl/9S8G2QxXQ3f2U2P3A", // Ganti dengan link Google Maps asli Anda
      mapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.4259837947113!2d106.8206275!3d-6.2074092!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f41b2c451633%3A0x8e8eb4dc55e0c5fe!2sHKBP%20Sudirman%20Jakarta!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid"
    },
    resepsi: {
      title: "Resepsi Pernikahan Nasional",
      dateString: "Minggu, 22 Agustus 2026",
      timeString: "12:00 WIB - 15:00 WIB",
      venue: "Bukit Bandara",
      address: "Jl. MH Thamrin No. 1, Menteng, Jakarta Pusat",
      mapsUrl: "https://maps.app.goo.gl/yY4k6vXQ3f2U2P3A", // Ganti dengan link Google Maps asli Anda
      mapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.4862410313175!2d106.8228392!3d-6.1963283!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f421bfd477b7%3A0xc39f99cf2a77ef37!2sHotel%20Indonesia%20Kempinski%20Jakarta!5e0!3m2!1sid!2sid!4v1700000000001!5m2!1sid!2sid"
    }
  },

  // Foto Galeri Pernikahan
  gallery: [
    { url: "assets/gallery1.jpg", caption: "Pertemuan Pertama" },
    { url: "assets/gallery2.jpg", caption: "Saling Menatap" },
    { url: "assets/gallery3.jpg", caption: "Langkah Bersama" },
    { url: "assets/gallery4.jpg", caption: "Janji Suci" },
    { url: "assets/gallery5.jpg", caption: "Senyum Bahagia" },
    { url: "assets/gallery6.jpg", caption: "Menuju Masa Depan" }
  ],

  // Kado Digital & Kirim Hadiah
  gifts: {
    accounts: [
      {
        bankName: "BCA",
        accountNumber: "8000998877",
        accountHolder: "Albert Chen",
        logo: "assets/bca.png" // Opsional, bisa pakai teks biasa jika tidak ada logo
      },
      {
        bankName: "Mandiri",
        accountNumber: "1230009988776",
        accountHolder: "Grace Ruth Siregar",
        logo: "assets/mandiri.png"
      }
    ],
    physicalAddress: {
      recipient: "Grace Siregar / Albert Chen",
      phone: "0812-3456-7890",
      address: "Apartemen Sudirman Park Tower B Lt. 12 No. 5, Jl. KH Mas Mansyur, Karet Tengsin, Tanah Abang, Jakarta Pusat, 10220"
    }
  },

  // Musik Latar Belakang (Audio)
  // Ganti dengan file mp3 romantis pilihan Anda di folder assets
  musicUrl: "assets/wedding-song.mp3",

  // Link Web App Google Sheets untuk Menyimpan RSVP secara online
  // Jika dikosongkan (""), data RSVP hanya akan disimpan di localStorage browser sebagai demo
  googleSheetsUrl: ""
};

// Pastikan file ini bisa diekspor jika berjalan di Node, atau langsung dibaca di browser
if (typeof module !== "undefined" && module.exports) {
  module.exports = WeddingConfig;
}
