# Tampak Siring Smart Cluster - Design Token
Berikut ini adalah design token dari project. Silahkan gunakan sebagai acuan design.

---

### Brand & Style

Sistem desain untuk portal residensial ini dibangun dengan filosofi **"Warm Modernity"**. Desain ini bertujuan membangkitkan rasa aman, prestise, dan kepemilikan komunitas melalui estetika yang membumi (*earthy*) dan elegan. Gaya visual yang digunakan adalah **Corporate Modern** dengan sentuhan **Tactile**, menghindari kesan dingin dari antarmuka standar dengan menggunakan palet yang terinspirasi dari material alam—batu, kayu, dan tanah liat.

Antarmuka tetap bersih dan profesional untuk memastikan kemudahan penggunaan dalam tugas-tugas administratif, sambil mempertahankan nuansa residensial kelas atas melalui penggunaan *whitespace* yang luas dan tipografi yang terstruktur.

---

### Colors

Palet warna berakar pada warna bumi khas daerah Tampaksiring. Karena tidak menggunakan mode *light/dark*, seluruh token di bawah ini adalah warna baku (default) untuk antarmuka.

#### Panduan Warna Merek (Brand Colors)

* **Primary (`#A68966`):** Cokelat krem yang digunakan untuk aksi utama, *active states*, dan elemen identitas merek. *(Catatan: Di dalam token sistem, varian utamanya adalah `#705838`)*.
* **Background (`#FAF9F6`):** Warna dasar *off-white*/krem muda yang memberikan alternatif lebih hangat dan premium dibandingkan putih murni.
* **Text (`#3E2723`):** Cokelat tua pekat untuk *heading* utama dan teks tubuh demi menjaga kontras tinggi namun tetap berada dalam spektrum *earthy*.
* **Accent (Terracotta/Gold):** Terracotta (`#D2691E`) untuk elemen peringatan/sorotan sekunder. Warm Gold (`#D4AF37`) khusus untuk indikator status premium atau fitur "Smart".
* **Semantic:** Status sukses menggunakan *Sage Green* yang lembut, dan status *error* menggunakan *desaturated Brick Red* untuk mempertahankan nuansa organik.

#### Token Warna Sistem

**1. Primary & Brand Tokens**

| Token | HEX | Token | HEX |
| --- | --- | --- | --- |
| `primary` | `#705838` | `inverse-primary` | `#e2c19b` |
| `on-primary` | `#ffffff` | `primary-fixed` | `#ffddb6` |
| `primary-container` | `#8b704f` | `primary-fixed-dim` | `#e2c19b` |
| `on-primary-container` | `#fffbff` | `on-primary-fixed` | `#291801` |
| `surface-tint` | `#735a3a` | `on-primary-fixed-variant` | `#594325` |

**2. Secondary & Tertiary Tokens**

| Token | HEX | Token | HEX |
| --- | --- | --- | --- |
| `secondary` | `#5e5f5d` | `tertiary` | `#974400` |
| `on-secondary` | `#ffffff` | `on-tertiary` | `#ffffff` |
| `secondary-container` | `#e0e0dd` | `tertiary-container` | `#bb5808` |
| `on-secondary-container` | `#626361` | `on-tertiary-container` | `#fffbff` |
| `secondary-fixed` | `#e3e2e0` | `tertiary-fixed` | `#ffdbc9` |
| `secondary-fixed-dim` | `#c7c6c4` | `tertiary-fixed-dim` | `#ffb68d` |
| `on-secondary-fixed` | `#1a1c1a` | `on-tertiary-fixed` | `#321200` |
| `on-secondary-fixed-variant` | `#464745` | `on-tertiary-fixed-variant` | `#763400` |

**3. Surface & Background Tokens**

| Token | HEX | Token | HEX |
| --- | --- | --- | --- |
| `background` | `#fff8f6` | `surface-container-highest` | `#ffdad4` |
| `on-background` | `#2b1613` | `surface-dim` | `#f8d1cb` |
| `surface` | `#fff8f6` | `surface-bright` | `#fff8f6` |
| `on-surface` | `#2b1613` | `inverse-surface` | `#422a26` |
| `surface-variant` | `#ffdad4` | `inverse-on-surface` | `#ffedea` |
| `on-surface-variant` | `#4e453c` | `outline` | `#80756b` |
| `surface-container-lowest` | `#ffffff` | `outline-variant` | `#d1c4b8` |
| `surface-container-low` | `#fff0ee` | `error` | `#ba1a1a` |
| `surface-container` | `#ffe9e5` | `on-error` | `#ffffff` |
| `surface-container-high` | `#ffe2dd` | `error-container` | `#ffdad6` |
|  |  | `on-error-container` | `#93000a` |

---

### Typography

Sistem desain ini menggunakan **Inter** secara eksklusif untuk memberikan kesan yang sangat mudah dibaca, sistematis, dan profesional. Seluruh terminologi harus menggunakan Bahasa Indonesia yang formal dan disempurnakan.

#### Panduan Tipografi

* **Headlines:** Gunakan *letter spacing* yang lebih rapat dan *font weight* yang lebih tebal untuk menciptakan kesan otoritatif.
* **Body Text:** Gunakan `body-md` untuk bacaan standar, dengan teks cokelat tua (`#3E2723`) untuk visibilitas optimal di atas latar belakang krem.
* **Labels:** Digunakan untuk *micro-copy*, metadata, dan *header* formulir. `label-sm` sering kali menggunakan gaya *uppercase* untuk kategorisasi arsitektural.

#### Token Tipografi

| Token | Font Family | Size | Weight | Line Height | Letter Spacing |
| --- | --- | --- | --- | --- | --- |
| `display-lg` | Inter | 48px | 700 (Bold) | 56px | -0.02em |
| `headline-lg` | Inter | 32px | 600 (SemiBold) | 40px | -0.01em |
| `headline-lg-mobile` | Inter | 28px | 600 (SemiBold) | 36px | - |
| `title-md` | Inter | 20px | 600 (SemiBold) | 28px | - |
| `body-lg` | Inter | 18px | 400 (Regular) | 28px | - |
| `body-md` | Inter | 16px | 400 (Regular) | 24px | - |
| `label-md` | Inter | 14px | 500 (Medium) | 20px | 0.01em |
| `label-sm` | Inter | 12px | 600 (SemiBold) | 16px | - |

---

### Layout & Spacing

Tata letak mengikuti model **Fluid-to-Fixed Grid**.

* **Mobile:** Tata letak kolom tunggal dengan margin samping 16px. Elemen didesain *touch-friendly* (minimum area sentuh 44px) dan menumpuk secara vertikal secara default.
* **Desktop:** Bertransisi menjadi sistem grid 12 kolom dengan lebar konten maksimum 1280px agar panjang baris tetap nyaman dibaca.
* **Rhythm:** Berbasis pada kelipatan **8px**.
* **Sectioning:** Gunakan spasi vertikal `xl` (80px) antar bagian utama di desktop.

#### Token Spacing

| Token | Value | Token | Value |
| --- | --- | --- | --- |
| `xs` | 4px | `xl` | 80px |
| `base` | 8px | `gutter` | 24px |
| `sm` | 12px | `margin-mobile` | 16px |
| `md` | 24px | `max-width-desktop` | 1280px |
| `lg` | 48px |  |  |

---

### Shapes & Borders

Bahasa bentuk didefinisikan oleh **"Softened Geometry"**. Konsistensi kelengkungan ini memperkuat merek "Smart Cluster"—presisi dan teknologis, namun tetap humanis dan hangat.

* **Standard Elements:** 8px (`DEFAULT`) untuk tombol, kolom input, dan kartu kecil.
* **Large Containers:** 16px (`lg`) untuk bagian dasbor utama atau galeri gambar.
* **Interactive Triggers:** Tidak pernah menggunakan sudut tajam (0px).

#### Token Rounded (Border Radius)

| Token | Value | Equivalent |
| --- | --- | --- |
| `sm` | 0.25rem | 4px |
| `DEFAULT` | 0.5rem | 8px |
| `md` | 0.75rem | 12px |
| `lg` | 1rem | 16px |
| `xl` | 1.5rem | 24px |
| `full` | 9999px | Pill / Circle |

---

### Elevation & Depth

Kedalaman dicapai melalui **Tonal Layers** dan **Ambient Shadows**. Alih-alih menggunakan bayangan hitam yang keras, sistem desain ini menggunakan bayangan yang lembut dan menyebar, sedikit diwarnai dengan warna utama cokelat krem untuk menjaga kehangatan. *Interaksi hover pada kartu harus sedikit meningkatkan penyebaran (spread) bayangan, bukan mengubah warna secara drastis.*

* **Level 0 (Flat):** Latar belakang utama (`#FAF9F6`).
* **Level 1 (Raised):** Untuk kartu utama dan kontainer konten.
  * *Shadow:* `0px 4px 20px rgba(62, 39, 35, 0.05)`
* **Level 2 (Floating):** Untuk bilah navigasi (navbar) dan *dropdowns*.
  * *Shadow:* `0px 8px 30px rgba(62, 39, 35, 0.08)`
* **Level 3 (Overlay):** Untuk modals dan peringatan darurat.
  * *Shadow:* `0px 12px 40px rgba(62, 39, 35, 0.12)`

---

### Components

Berikut adalah panduan anatomi untuk komponen-komponen antarmuka pengguna:

* **Buttons:**
  * *Primary:* Latar Primary Creamy Brown dengan teks putih.
  * *Secondary:* Latar transparan dengan border 1px warna Primary.
  * *Styling:* Radius 8px (`DEFAULT`) dan teks *medium weight*.
* **Input Fields:**
  * Latar *off-white* halus dengan border 1px varian warna Primary yang diredupkan.
  * *Focus state:* Border berubah menjadi warna Primary penuh.
* **Cards:**
  * Komponen sentral portal. Menggunakan elevasi Level 1, radius 16px (`lg`), dan *padding* internal 24px (`md`).
  * Judul di dalam kartu menggunakan tipografi `title-md`.
* **Chips / Badges:**
  * Untuk penanda status (contoh: "Lunas", "Proses", "Terkirim").
  * Bentuk *pill* (radius `full`) dengan latar opasitas rendah dari warna status dan teks gelap.
* **Lists:**
  * Digunakan untuk direktori penghuni atau riwayat transaksi ("Clean Lists").
  * Pemisah (*separator*) setebal 1px berwarna `#E0DCD0`.
* **Navigation:**
  * Navigasi bawah seluler atau *sidebar* desktop menggunakan ikon ber-kontras tinggi dengan label yang jelas (`label-sm`).
  * Status aktif (Active state) ditandai dengan warna Primary.
* **Announcement Banner:**
  * *Banner* lebar penuh (full-width) dengan kontras rendah untuk berita klaster (contoh: "Jadwal Fogging").
* **Facility Card:**
  * Kartu khusus untuk pemesanan fasilitas (Kolam Renang, Clubhouse).
  * Menampilkan gambar besar dan tombol utama "Pesan Sekarang".

---
