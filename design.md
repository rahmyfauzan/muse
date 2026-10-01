# Design System — Tiga Tema

Dokumen acuan desain untuk dipakai ulang di website apa pun, apa pun keperluannya
(portofolio, landing page company, blog, dashboard, dsb).
Diekstrak dari `index.html` (halaman personal Rahmy Fauzanibudi Ahmad).

Cara pakai: pilih SATU tema sebagai identitas utama sebuah website, atau sediakan
ketiganya sebagai mode ganti tema seperti di `index.html` (atribut `data-theme`
pada `<html>`, nilai disimpan di `localStorage`).

---

## 1. Prinsip Desain

1. **Satu sumber token** — semua warna, font, dan jarak hidup sebagai CSS variables.
   Ganti tema = ganti nilai variabel, bukan ganti stylesheet.
2. **Gerak adalah identitas** — setiap tema punya "kepribadian gerak" sendiri
   (bouncy / snappy / sinematik) lewat `--ease` yang dipakai di semua transisi.
3. **Konten tetap raja** — animasi tidak boleh mengorbankan keterbacaan.
   Hormati `prefers-reduced-motion`.
4. **Mobile-first** — layout kolaps rapi di layar kecil; efek berat (partikel,
   kursor custom) hanya aktif di perangkat non-touch.

## 2. Token Inti (berlaku semua tema)

| Token | Nilai | Keterangan |
|---|---|---|
| `--radius` | `22px` | Radius kartu & tombol besar |
| `--nav-h` | `64px` | Tinggi navbar |
| `.container` | `min(1080px, 92%)` | Lebar konten, tengah otomatis |
| Breakpoint | `860px`, `560px` | Kolaps grid → 1 kolom; sembunyikan nav links |
| Line-height body | `1.7` | Keterbacaan paragraf |
| `::selection` | `var(--accent)` / putih | Warna blok teks |

Skala judul: hero `clamp(2.6rem, 7vw, 4.6rem)`, section `clamp(1.9rem, 4.5vw, 3rem)`,
tag section `.8rem` uppercase dengan letter-spacing `.24em`.

---

## 3. Tema CERIA — Playful & Colorful

**Kepribadian:** fun, ramah, kreatif. Cocok untuk: personal brand kreator,
startup playful, landing produk konsumen, event.

### Warna
| Token | Nilai | Pakai untuk |
|---|---|---|
| `--bg` | `#fdf6ff` | Background halaman |
| `--bg-soft` | `#ffffff` | Background kartu/nav |
| `--ink` | `#1d1030` | Teks utama (ungu sangat gelap) |
| `--ink-soft` | `#5b4a7a` | Teks sekunder |
| `--accent` | `#ff4d8d` | Aksi utama (pink) |
| `--accent2` | `#7c3aed` | Gradasi & aksen (ungu) |
| `--accent3` | `#22d3ee` | Aksen tersier (cyan) |
| `--card` | `#ffffff` | Kartu |
| `--line` | `rgba(29,16,48,.12)` | Garis/border |
| `--shadow` | `0 18px 50px -18px rgba(124,58,237,.35)` | Bayangan ungu lembut |

### Tipografi
- Heading: **Space Grotesk** 700
- Body: **Inter** 400/500/600

### Gerak
- `--ease: cubic-bezier(.34,1.56,.64,1)` — bouncy, overshoot ringan di semua transisi.
- Background: 3+ blob gradien (`accent`/`accent2`/`accent3`), `border-radius:50%`,
  `filter:blur(70px)`, `opacity:.55`, animasi `drift` 18s infinite alternate
  (geser 6vw/5vh + scale 1.15 + rotate 20deg).
- Tombol: pill `border-radius:99px`, hover terangkat (`translateY(-3px) scale(1.03)`).

### Komponen khas
- Tombol primer: gradien `120deg` dari `--accent` ke `--accent2`, teks putih.
- Kartu: putih, radius 22px, shadow ungu lembut, hover tilt 3D.

---

## 4. Tema NEON — Dark & Cyber

**Kepribadian:** futuristik, techy, edgy. Cocok untuk: dev portfolio, produk SaaS/tech,
gaming, event teknologi.

### Warna
| Token | Nilai | Pakai untuk |
|---|---|---|
| `--bg` | `#050510` | Background (hitam kebiruan) |
| `--bg-soft` | `#0a0a1c` | Panel |
| `--ink` | `#e8f6ff` | Teks utama (putih kebiruan) |
| `--ink-soft` | `#8ea3c9` | Teks sekunder |
| `--accent` | `#00f0ff` | Aksi utama (cyan neon) |
| `--accent2` | `#ff2fd6` | Aksen (magenta neon) |
| `--accent3` | `#a3ff12` | Aksen tersier (lime neon) |
| `--card` | `rgba(14,14,32,.82)` | Kartu kaca gelap |
| `--line` | `rgba(0,240,255,.16)` | Border neon samar |
| `--shadow` | `0 0 34px -6px rgba(0,240,255,.35)` | Glow cyan |

### Tipografi
- Heading: **Space Grotesk** 700
- Body: **Inter** 400/500/600

### Gerak
- `--ease: cubic-bezier(.16,1,.3,1)` — snappy, berhenti tegas tanpa overshoot.
- Background: `<canvas>` partikel berpendar (accent cyan/magenta/lime) + grid samar.
- Judul hero: efek **glitch** — dua layer `::before`/`::after` berwarna
  `--accent2`/`--accent3` dengan `clip-path` terpotong, digeser acak via keyframes
  `gl1` (2.4s) dan `gl2` (3.1s) infinite alternate; `text-shadow: 0 0 18px accent`.
- Hover: glow menguat, bukan bayangan lembut.

### Komponen khas
- Tombol primer: gradien cyan→magenta dengan glow.
- Kartu: kaca gelap transparan, border neon tipis.

---

## 5. Tema MINIMAL — Elegan

**Kepribadian:** tenang, premium, percaya diri. Cocok untuk: company profile,
agency, arsitek/fotografer, publikasi/editorial.

### Warna
| Token | Nilai | Pakai untuk |
|---|---|---|
| `--bg` | `#faf9f6` | Background (putih hangat) |
| `--bg-soft` | `#ffffff` | Panel |
| `--ink` | `#141414` | Teks utama (hitam lembut) |
| `--ink-soft` | `#6f6a63` | Teks sekunder (abu hangat) |
| `--accent` | `#141414` | Aksi utama = hitam (monokrom) |
| `--accent2` | `#8a7a5c` | Aksen (taupe keemasan) |
| `--accent3` | `#c9c2b4` | Aksen tersier (beige) |
| `--card` | `#ffffff` | Kartu |
| `--line` | `rgba(20,20,20,.14)` | Garis hairline |
| `--shadow` | `0 24px 60px -30px rgba(20,20,20,.25)` | Bayangan dalam & tenang |

### Tipografi
- Heading: **Playfair Display** serif, 900 italic untuk judul besar
- Body: **Inter** 400/500/600

### Gerak
- `--ease: cubic-bezier(.22,1,.36,1)` — halus sinematik, tanpa overshoot.
- Background: bersih, tanpa partikel/blob — whitespace adalah dekorasi.
- Reveal on scroll: fade + translateY 28px, durasi .8s, stagger antar elemen.
- Tombol primer: hitam solid (`var(--ink)`), bukan gradien.

### Komponen khas
- Divider hairline antar section, bukan kartu berwarna.
- Judul section italic serif tebal.

---

## 6. Pustaka Gerak (dipakai semua tema)

| Nama | Durasi | Efek |
|---|---|---|
| Preloader | s.d. 100% | Nama + persen, fade out saat `window.load` |
| Typewriter | ~60ms/karakter | Ketik judul hero + caret `blink` 1s |
| Role rotator | 2.6s/kata | Kata berganti dengan fade+slide |
| `drift` | 18s | Blob melayang (khusus Ceria) |
| `gl1` / `gl2` | 2.4s / 3.1s | Glitch RGB-split (khusus Neon) |
| `scrollX` | 22s | Marquee ticker infinite |
| `drop` | 1.8s | Indikator scroll |
| Reveal | .8s | Fade+naik 28px via IntersectionObserver, threshold .15 |
| Counter | 1.6s | Angka menghitung naik saat terlihat |
| Skill bar | 1.2s | Lebar 0 → target saat terlihat |
| Tilt 3D | realtime | Kartu mengikuti mouse (max ~10deg), reset saat leave |
| Magnetic | realtime | Tombol tertarik ke kursor (maks 6px) |
| Custom cursor | realtime | Dot + glow mengekor (non-touch saja) |
| Back-to-top | — | Muncul setelah scroll 600px |

**Aksesibilitas gerak:** jika `prefers-reduced-motion: reduce`, matikan semua
animasi infinite, typewriter tampil instan, reveal tanpa transisi.

## 7. Komponen & Pola Layout

- **Navbar:** fixed, blur (`backdrop-filter`), border-bottom `var(--line)`,
  link aktif = pill `--accent`. Theme-switcher: 3 tombol pill dalam satu grup.
- **Hero:** full viewport (`min-height:100svh`), konten tengah-kiri, tag uppercase
  kecil + H1 besar + deskripsi + 2 CTA + indikator scroll.
- **Section:** padding `110px 0`, pola tag → judul → konten.
- **Kartu proyek:** grid `repeat(auto-fit,minmax(240px,1fr))`, gap 22px; kartu berisi
  tag bahasa, judul, deskripsi, link panah; hover: tilt + border accent.
- **Skill bar:** label + persen, track 8px `var(--line)`, fill gradien accent.
- **Kontak:** CTA besar di tengah + tombol primer raksasa.
- **Footer:** hairline top, teks kecil, rata tengah.

## 8. Panduan Adaptasi ke Website Lain

1. **Pilih satu tema** sebagai identitas — jangan campur token antar tema dalam
   satu halaman (kecuali memang mode ganti tema).
2. **Petakan ulang konten:** section Tentang/Proyek/Keahlian/Kontak bisa diganti
   menjadi Fitur/Harga/Testimoni/FAQ — struktur section-nya sama, tokennya sama.
3. **Aksen secukupnya:** `--accent2`/`--accent3` untuk dekorasi; jangan dipakai
   untuk teks body (kontras).
4. **Tema Neon:** pastikan teks di atas glow tetap terbaca — uji di layar HP
   dengan brightness rendah.
5. **Tema Minimal:** kekuatan ada di whitespace — jangan "mengisi" kekosongan
   dengan dekorasi; tambah padding, bukan elemen.
6. **Foto/gambar:** di tema Ceria pakai bentuk blob/mask organik; di Neon pakai
   frame garis neon; di Minimal biarkan kotak penuh tanpa hiasan.

---

*Versi 1 — 2026-09-30. Diekstrak dari `index.html` v1.*
