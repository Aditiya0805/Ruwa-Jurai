# Demo Script — Ruwa Jurai

## Persiapan

1. Jalankan `python3 -m http.server 8080` di root proyek.
2. Buka `http://localhost:8080`.
3. Aktifkan mode suara di header (opsional).

## Demo 4 menit (judges)

| Menit | Langkah | Halaman | Catatan |
| --- | --- | --- | --- |
| 0–1 | Preloader & hero | Beranda | Tunjukkan interaksi mascat & drag. |
| 1–2 | Jelajah | Ensiklopedia | Buka modal entri, pakai pencarian, grid/list. |
| 2–3 | Rasa & peta | Kuliner → Peta | Buka resep, buka modal wilayah. |
| 3–4 | Permainan & aksara | Gawi, Kamus | Main 1 game, converter aksara, search ⌘K. |

## Demo lanjutan

- Mode gelap / teks besar / gerak reda.
- PWA offline: buka situs, jalankan tanpa jaringan.
- Agenda: simpan ICS, kirim agenda.

## Demo singkat (pitching)

1. “Satu bumi, dua jurai.”
2. Tunjuk peta interaktif → sorotan adat.
3. Buka Gawi → main singkat.
4. Arahkan ke SDG 4, 8, 11.

## Troubleshooting

- Jika font tidak muncul: pastikan `assets/fonts/fonts.css` diimpor.
- Jika aksara kosong: pastikan `assets/js/glyphs.js`, `aksara.js`, `illustrations.js` dimuat.
- Jika peta kosong: pastikan `assets/js/map-data.js` dimuat dan `RJ_MAP` ada.
