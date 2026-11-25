# Ruwa Jurai — Sai Bumi Ruwa Jurai

Portal budaya & kuliner Lampung untuk **GEMATIK 2026 Web Design Competition**.

> “Satu bumi, dua jurai — satu cerita yang terus ditulis.”
> *Ruwa Jurai — Sai Bumi Ruwa Jurai*

## Tentang proyek

Ruwa Jurai adalah ruang digital interaktif yang menjembatani budaya dan kuliner
Lampung: ensiklopedia adat, peta wilayah, kamus aksara, agenda budaya, kuliner,
dan permainan edukatif (Gawi). Dibangun dengan teknologi web murni (HTML/CSS/JS)
agar dapat dijalankan offline, tanpa build step.

## Fitur utama (berdasarkan PRD)

| Fase | Fitur |
| --- | --- |
| P0 | Beranda interaktif (hero bergerak, mascot Sai, sorotan, timeline, CTA) |
| P0 | Ensiklopedia adat dengan kartu, modal detail, favorit, pencarian, mode grid/list |
| P0 | Kuliner: kartu hidangan, resep lengkap, skala porsi, langkah memasak, profil rasa |
| P0 | Peta 15 kabupaten/kota interaktif (hover, pan, zoom, filter adat, cari) |
| P0 | Gawi: 5 permainan (Kuis Piil Pesenggiri, Cocokkan Tapis, Pasang Siger, Tebak Aksara, Meracik Seruit) |
| P0 | Kamus & aksara: konverter Latin→Aksara, papan huruf, kamus istilah, filter dialek |
| P0 | Agenda: kalender bulanan, daftar acara, simpan ke ICS, pengajuan agenda |
| P1 | Tentang: manifesto, nilai, dampak SDG, proses, sumber, FAQ, kontak |
| P1 | Tema terang/gelap, teks besar, kontras tinggi, gerak reda, suara UI, a11y |
| P1 | PWA + offline, search ⌘K, share, copy, toast, confetti, preloader |

## Konten

- **Draf kurasi.** Seluruh entri, hidangan, dan agenda ditulis sebagai pengantar
  editorial. Klaim budaya ditandai “sering digambarkan” / “dapat berbeda antardaerah”.
- **Sai** adalah nama kerja maskot dan masih terbuka untuk dikoreksi bersama pemangku
  adat. Atributnya: siger, tapis, tangan terbuka, lengkap.
- **Aksara** pada situs adalah bantuan baca visual (dari Lampung Design System, MIT),
  bukan standar ortografi resmi.

## SDG

Portal ini merancang dampak pada:

- **SDG 4** Pendidikan Berkualitas — ensiklopedia, kamus, aksara, permainan edukatif.
- **SDG 8** Ekonomi — UMKM budaya, kerajinan, kuliner lokal.
- **SDG 11** Komunitas — warisan bersama, tata ruang adat, inklusi budaya.

## Struktur

```
/
├── index.html            # Beranda
├── ensiklopedia.html     # Ensiklopedia adat
├── kuliner.html          # Kuliner
├── peta.html             # Peta interaktif
├── gawi.html             # Gawi — permainan
├── kamus.html            # Kamus & aksara
├── agenda.html           # Agenda budaya
├── tentang.html          # Tentang, etika, sumber, SDG
├── manifest.webmanifest
├── sw.js                 # Service worker (PWA)
├── assets/
│   ├── css/              # base, components, pages, interior, games
│   ├── js/               # shell + per-page
│   ├── img/              # logo, favicon, og, icons
│   └── fonts/            # Fraunces & Plus Jakarta Sans (OFL)
├── tools/build-map.py   # Pembuat peta SVG dari GeoJSON BIG
└── docs/                # Dokumentasi kompetisi
```

## Menjalankan

```bash
python3 -m http.server 8080
# buka http://localhost:8080
```

## Pengujian cepat

1. Jalankan server lokal.
2. Buka `index.html`, setiap halaman via header.
3. Uji pencarian `⌘K` / `Ctrl+K`, mode gelap, pengaturan teks, dan games.
4. Buka halaman di viewport mobile 375px.
5. Jalankan `node --check assets/js/*.js` untuk validasi sintaks JS.

## Rujukan konten

- Data batas wilayah: BIG (Badan Informasi Geospasial) edisi 2026, diproses ulang
  dari GeoJSON MIT (`dmxsan/indonesia-admin-boundaries`).
- Aksara: Lampung Design System (MIT) — `third_party/LAMPUNG-DESIGN-SYSTEM-LICENSE.txt`.
- Font: Fraunces & Plus Jakarta Sans (OFL), self-hosted.
- Isi budaya: draf kurasi tahun 2026; memerlukan validasi tokoh adat dan ahli bahasa.

## Lisensi

- Konten situs: © Ruwa Jurai 2026, draf kurasi.
- Data batas: BIG edisi 2026; lisensi penggunaan sesuai Kementerian PPN/BPS.
- Aksara & simbol: Lampung Design System (MIT).
- Font: SIL Open Font License.
