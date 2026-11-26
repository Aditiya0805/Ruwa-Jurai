/* =========================================================
   RUWA JURAI — Kurasi data
   Draf editorial 2026. Semua entri budaya berstatus "draf kurasi"
   dan perlu divalidasi bersama tokoh adat, ahli bahasa, serta kurator.
   ========================================================= */
(function () {
  'use strict';

  const categories = [
    { id: 'masyarakat', name: 'Masyarakat Adat', short: 'Dua jurai', icon: 'people', accent: '#6a1c2b', desc: 'Saibatin, Pepadun, dan cara masyarakat Lampung menata diri.' },
    { id: 'falsafah', name: 'Falsafah & Tatanan', short: 'Pegangan hidup', icon: 'compass', accent: '#b98635', desc: 'Piil Pesenggiri, gelar, marga, dan amanah sosial.' },
    { id: 'upacara', name: 'Upacara Adat', short: 'Momen penting', icon: 'mask', accent: '#a85c3e', desc: 'Begawi, Sekura, Nyambai, dan perayaan yang mempertemukan warga.' },
    { id: 'pernikahan', name: 'Pernikahan Adat', short: 'Jalan berkeluarga', icon: 'rings', accent: '#8a2b3d', desc: 'Lamaran, musyawarah, dan prosesi yang mengikat dua keluarga.' },
    { id: 'busana', name: 'Busana & Perhiasan', short: 'Yang dikenakan', icon: 'loom', accent: '#c6933d', desc: 'Tapis, siger, dan bahasa busana yang menyimpan doa.' },
    { id: 'seni', name: 'Seni Pertunjukan', short: 'Gerak & bunyi', icon: 'drum', accent: '#2b5142', desc: 'Tari, gamolan, talo balak, dan panggung kebersamaan.' },
    { id: 'sastra', name: 'Sastra & Aksara', short: 'Kata yang dirawat', icon: 'book', accent: '#6e4331', desc: 'Warahan, pisaan, hahiwang, dan had Lampung.' },
    { id: 'bahasa', name: 'Bahasa', short: 'Dua dialek', icon: 'speech', accent: '#52705e', desc: 'Dialek A (Api) dan O (Nyow), serta ragam tutur sehari-hari.' },
    { id: 'arsitektur', name: 'Arsitektur & Ruang', short: 'Rumah adat', icon: 'house', accent: '#8c6b4c', desc: 'Lamban, nuwo, dan tata ruang yang menyimpan tatanan sosial.' },
    { id: 'kerajinan', name: 'Kerajinan', short: 'Tangan yang bekerja', icon: 'hands', accent: '#9e7b3e', desc: 'Tapis, anyaman, ukiran, dan logam yang hidup bersama pasar.' },
    { id: 'situs', name: 'Situs & Warisan', short: 'Jejak yang tinggal', icon: 'landmark', accent: '#743c4b', desc: 'Museum, situs purbakala, dan ruang yang menjaga ingatan.' }
  ];

  const entries = [
    {
      id: 'saibatin',
      category: 'masyarakat',
      title: 'Saibatin',
      subtitle: 'Adat pesisir, marga, dan amanah kepala adat',
      community: 'Saibatin',
      region: 'Pesisir barat–selatan Lampung',
      regencyIds: ['pesisir-barat', 'tanggamus', 'lampung-selatan', 'pesawaran'],
      sensitivity: 'terbuka',
      featured: true,
      labels: ['Pesisir', 'Kepala adat'],
      motif: 'wave',
      summary: 'Masyarakat adat pesisir Lampung yang menata hidup lewat garis keturunan, marga, dan kepemimpinan kepala adat.',
      lead: 'Saibatin kerap disebut sebagai masyarakat adat pesisir Lampung. Sistemnya bertumpu pada garis keturunan dan wilayah marga, dengan kepala adat sebagai pemegang amanah.',
      body: [
        'Wilayah Saibatin membentang di pesisir barat dan selatan Lampung—dari Krui, Pesisir Barat, Tanggamus, hingga Lampung Selatan. Sebutan, struktur, dan tata upacaranya dapat berbeda antarmarga dan wilayah. Karena itu, menyebut lokasi saat membicarakan adat Saibatin adalah cara yang lebih adil daripada menyamaratakan semuanya.',
        'Piil Pesenggiri menjadi napas relasi sosialnya: menjaga harga diri, menerima tamu dengan hormat, bergaul, dan bergotong royong. Dalam pernikahan atau upacara adat, keputusan diambil melalui musyawarah keluarga besar bersama pemangku adat.',
        'Siger, tapis, tari nyambai, dan tradisi lisan menjadi penanda budaya yang hidup. Banyak di antaranya kini dibawa ke ruang publik melalui festival, sanggar, dan sekolah—sebuah upaya merawat akar tanpa membekukannya.'
      ],
      facts: [
        { label: 'Orientasi', value: 'Pesisir & garis keturunan' },
        { label: 'Kepemimpinan', value: 'Kepala adat / marga' },
        { label: 'Ikon budaya', value: 'Siger, tapis, nyambai' },
        { label: 'Rujukan wilayah', value: 'Pesisir Barat, Tanggamus, Lampung Selatan' }
      ],
      symbols: [
        { title: 'Ombak', text: 'Garis pantai mengingatkan pada watak terbuka dan lalu lintas budaya pesisir.' },
        { title: 'Siger', text: 'Mahkota kehormatan yang hadir pada momen sakral keluarga.' },
        { title: 'Musyawarah', text: 'Keputusan adat diambil bersama, bukan oleh satu orang saja.' }
      ],
      terms: [
        { term: 'Marga', def: 'Kelompok kekerabatan yang menjadi salah satu dasar tata masyarakat adat.' },
        { term: 'Nyambai', def: 'Tarian pertemuan muda-mudi dalam rangkaian upacara adat Saibatin.' },
        { term: 'Nayuh', def: 'Rangkaian upacara pernikahan adat pada masyarakat Saibatin; istilah dan urutannya dapat berbeda antardaerah.' }
      ],
      sources: ['Ringkasan editorial Ruwa Jurai, 2026.', 'Rujukan umum: kajian budaya Lampung dan Warisan Budaya Takbenda Indonesia.', 'Status: draf kurasi—menunggu validasi tokoh adat.'],
      related: ['pepadun', 'siger', 'nyambai', 'piil-pesenggiri']
    },
    {
      id: 'pepadun',
      category: 'masyarakat',
      title: 'Pepadun',
      subtitle: 'Adat pedalaman, penyimbang, dan juluk-adok',
      community: 'Pepadun',
      region: 'Pedalaman Lampung',
      regencyIds: ['lampung-tengah', 'lampung-utara', 'tulang-bawang', 'tulang-bawang-barat', 'way-kanan', 'mesuji'],
      sensitivity: 'terbuka',
      featured: true,
      labels: ['Pedalaman', 'Penyimbang'],
      motif: 'mountain',
      summary: 'Masyarakat adat pedalaman Lampung dengan sistem marga, penyimbang, dan jenjang gelar adat yang dirawat melalui begawi.',
      lead: 'Pepadun sering dikaitkan dengan masyarakat adat pedalaman Lampung. Sistemnya bertumpu pada kebuayan atau marga, kepemimpinan penyimbang, serta gelar adat yang dirayakan dalam begawi.',
      body: [
        'Pepadun bukan satu kelompok tunggal. Kebuayan yang sering disebut antara lain Abung Siwo Migo, Tulang Bawang, Way Kanan–Sungkai, dan Pubian Telu Suku. Mereka berkerabat dalam banyak hal, tetapi tidak identik: tata cara, istilah, dan urutan upacara bisa berbeda.',
        'Gelar seperti juluk-adok bukan sekadar nama. Ia menandai kedudukan, tanggung jawab, dan kewajiban seseorang terhadap keluarga serta masyarakat. Untuk meraih atau meneguhkan gelar, keluarga menyelenggarakan rangkaian adat yang di dalamnya hadir musik, tari, jamuan, dan musyawarah.',
        'Lamban pesagi, cangget, gamolan, dan talo balak menjadi penanda budaya yang sering muncul dalam ruang adat. Generasi muda merawatnya lewat sanggar, sekolah, dan festival—sambil terus mendiskusikan cara agar tradisi tidak berhenti menjadi pertunjukan saja.'
      ],
      facts: [
        { label: 'Rumpun', value: 'Abung Siwo Migo, Tulang Bawang, Way Kanan–Sungkai, Pubian Telu Suku' },
        { label: 'Kepemimpinan', value: 'Penyimbang' },
        { label: 'Orientasi', value: 'Marga / buay & gelar adat' },
        { label: 'Ikon budaya', value: 'Begawi, cangget, lamban pesagi' }
      ],
      symbols: [
        { title: 'Pepadun', text: 'Kursi adat yang menjadi penanda proses penobatan.' },
        { title: 'Lamban', text: 'Rumah panggung sebagai ruang musyawarah dan ingatan keluarga.' },
        { title: 'Gamolan', text: 'Bunyi yang menyatukan warga dalam kerja adat.' }
      ],
      terms: [
        { term: 'Penyimbang', def: 'Pemimpin adat dalam masyarakat Pepadun.' },
        { term: 'Buay', def: 'Marga atau kelompok keturunan; ejaan dan penggunaannya dapat berbeda antardaerah.' },
        { term: 'Juluk-adok', def: 'Gelar dan nama kehormatan yang diikatkan pada kedudukan adat seseorang.' }
      ],
      sources: ['Ringkasan editorial Ruwa Jurai, 2026.', 'Rujukan umum: kajian masyarakat adat Lampung.', 'Status: draf kurasi—menunggu validasi tokoh adat.'],
      related: ['saibatin', 'begawi', 'cangget', 'piil-pesenggiri', 'lamban-pesagi']
    },
    {
      id: 'piil-pesenggiri',
      category: 'falsafah',
      title: 'Piil Pesenggiri',
      subtitle: 'Harga diri yang tumbuh bersama kehormatan bersama',
      community: 'Lintas adat',
      region: 'Lampung',
      regencyIds: ['bandar-lampung', 'lampung-selatan', 'lampung-tengah', 'pesisir-barat'],
      sensitivity: 'terbuka',
      featured: true,
      labels: ['Falsafah', 'Empat unsur'],
      motif: 'compass',
      summary: 'Pegangan hidup orang Lampung tentang harga diri, keramahan, pergaulan, dan gotong royong.',
      lead: 'Piil Pesenggiri adalah falsafah hidup yang sering disebut sebagai pegangan orang Lampung. Ia berbicara tentang harga diri—bukan untuk meninggikan diri, tetapi untuk menjaga nama baik dan kehormatan bersama.',
      body: [
        'Empat unsurnya saling mengikat: Juluk-adok (gelar dan nama kehormatan), Nemui-nyimah (ramah menerima tamu), Nengah-nyappur (bergaul dan berbaur), serta Sakai-sambayan (gotong royong). Keempatnya bukan daftar hafalan, melainkan cara membaca perilaku sosial sehari-hari.',
        'Pesenggiri sering disalahpahami sebagai kesombongan. Dalam percakapan budaya, ia lebih dekat pada rasa malu berbuat tercela, keberanian memikul tanggung jawab, dan kewajiban menjaga nama keluarga serta komunitas.',
        'Hari ini Piil Pesenggiri hidup dalam ruang yang berubah: sekolah, media sosial, organisasi warga, dan kehidupan kota. Memaknainya kembali bersama pemilik tradisi adalah bagian dari pelestarian—bukan sekadar mengutip semboyannya.'
      ],
      facts: [
        { label: 'Empat unsur', value: 'Juluk-adok · Nemui-nyimah · Nengah-nyappur · Sakai-sambayan' },
        { label: 'Inti', value: 'Harga diri & kehormatan bersama' },
        { label: 'Salah paham', value: 'Bukan kesombongan atau arogansi' },
        { label: 'Praktik', value: 'Musyawarah, keramahan, gotong royong' }
      ],
      symbols: [
        { title: 'Juluk-adok', text: 'Nama baik yang dijaga, gelar yang membawa tanggung jawab.' },
        { title: 'Nemui-nyimah', text: 'Rumah yang terbuka dan tamu yang dihormati.' },
        { title: 'Nengah-nyappur', text: 'Kemampuan masuk ke ruang baru tanpa kehilangan akar.' },
        { title: 'Sakai-sambayan', text: 'Beban dipikul bersama, hasil dinikmati bersama.' }
      ],
      terms: [
        { term: 'Piil', def: 'Rasa harga diri; dimensi batin yang dijaga dalam pergaulan.' },
        { term: 'Pesenggiri', def: 'Kehormatan dan nama baik yang dirawat bersama keluarga.' },
        { term: 'Sakai-sambayan', def: 'Semangat gotong royong dan saling menolong.' }
      ],
      sources: ['Ringkasan editorial Ruwa Jurai, 2026.', 'Rujukan umum: kajian falsafah Piil Pesenggiri.', 'Status: draf kurasi—menunggu validasi tokoh adat dan akademisi.'],
      related: ['saibatin', 'pepadun', 'sebambangan', 'tapis']
    },
    {
      id: 'begawi',
      category: 'upacara',
      title: 'Begawi & Cakak Pepadun',
      subtitle: 'Penobatan adat dalam masyarakat Pepadun',
      community: 'Pepadun',
      region: 'Lampung Tengah, Lampung Utara, Tulang Bawang, Way Kanan',
      regencyIds: ['lampung-tengah', 'lampung-utara', 'tulang-bawang', 'way-kanan'],
      sensitivity: 'terbatas',
      featured: false,
      labels: ['Upacara', 'Gelar adat'],
      motif: 'throne',
      summary: 'Rangkaian upacara untuk meneguhkan gelar, pernikahan, atau kedudukan adat sebuah keluarga.',
      lead: 'Begawi adalah rangkaian upacara adat Pepadun untuk meneguhkan gelar, pernikahan, atau naiknya status adat sebuah keluarga. Inti dari sebagian prosesinya dikenal sebagai cakak pepadun.',
      body: [
        'Begawi dapat berlangsung beberapa hari dan melibatkan banyak pihak: keluarga besar, penyimbang, tetua adat, penabuh talo balak, penari cangget, serta warga yang membantu. Skala dan urutan prosesinya berbeda-beda antarkebuayan dan keluarga.',
        'Di dalamnya ada momen yang terbuka untuk tamu, ada pula bagian yang lebih terbatas dan sakral. Karena itu, dokumentasi yang baik selalu bertanya lebih dahulu: apa yang boleh direkam, kapan, dan untuk siapa.',
        'Biaya begawi yang besar membuat banyak keluarga memilih bentuk yang lebih sederhana atau bergotong royong. Diskusi tentang keberlanjutan adat bukan berarti meninggalkan tradisi, melainkan menjaga agar ia tetap mungkin dijalani.'
      ],
      facts: [
        { label: 'Fungsi', value: 'Peneguhan gelar, pernikahan, status adat' },
        { label: 'Durasi', value: 'Bervariasi, sering beberapa hari' },
        { label: 'Unsur', value: 'Musyawarah, cangget, talo balak, jamuan' },
        { label: 'Etika', value: 'Sebagian prosesi terbatas; minta izin sebelum merekam' }
      ],
      symbols: [
        { title: 'Pepadun', text: 'Kursi adat yang menandai proses penobatan dan tanggung jawab baru.' },
        { title: 'Cangget', text: 'Tari yang menghadirkan kehormatan, keindahan, dan kebersamaan.' },
        { title: 'Talo balak', text: 'Ansambel gong yang mengiringi perjalanan upacara.' }
      ],
      terms: [
        { term: 'Cakak pepadun', def: 'Bagian inti upacara penobatan adat pada masyarakat Pepadun.' },
        { term: 'Penyimbang', def: 'Pemimpin adat yang duduk dalam musyawarah keluarga besar.' },
        { term: 'Gawi', def: 'Kegiatan atau hajatan; kata yang juga dipakai untuk menyebut kerja adat.' }
      ],
      sources: ['Ringkasan editorial Ruwa Jurai, 2026.', 'Rujukan umum: kajian upacara Pepadun dan Warisan Budaya Takbenda.', 'Status: draf kurasi—menunggu validasi tokoh adat.'],
      related: ['pepadun', 'cangget', 'gamolan-talo-balak', 'lamban-pesagi']
    },
    {
      id: 'sekura',
      category: 'upacara',
      title: 'Sekura Cakak Buah',
      subtitle: 'Topeng, tawa, dan syukur di Lampung Barat',
      community: 'Lintas adat',
      region: 'Lampung Barat',
      regencyIds: ['lampung-barat', 'pesisir-barat'],
      sensitivity: 'terbuka',
      featured: true,
      labels: ['Festival rakyat', 'Topeng'],
      motif: 'mask',
      summary: 'Tradisi pesta topeng masyarakat Lampung Barat yang hidup di sekitar perayaan Idulfitri.',
      lead: 'Sekura adalah tradisi pesta topeng masyarakat Lampung Barat yang hidup di sekitar perayaan Idulfitri. Topeng-topeng jenaka turun ke jalan, diiringi musik dan arak-arakan warga.',
      body: [
        'Topeng Sekura melambangkan kebebasan berekspresi: wajah sehari-hari ditutup, dan warga boleh bermain dengan karakter yang lucu, menakutkan, atau mengagetkan. Di balik gelak tawa, ada tradisi berkunjung dan mempererat hubungan antarkampung.',
        'Cakak buah menghadirkan hasil bumi dan buah-buahan dalam arak-arakan sebagai ungkapan syukur. Bentuk acaranya dapat berbeda antarwilayah dan tahun; jadwalnya mengikuti kalender Islam dan kebijakan penyelenggara setempat.',
        'Bagi pengunjung, adabnya sederhana: jangan menyentuh topeng tanpa izin, hormati jalan warga, dan mintalah persetujuan sebelum memotret wajah atau prosesi tertentu.'
      ],
      facts: [
        { label: 'Waktu', value: 'Sekitar Idulfitri / Syawal' },
        { label: 'Lokasi', value: 'Lampung Barat, dengan ragam lokal' },
        { label: 'Medium', value: 'Topeng, kostum, musik, arak-arakan' },
        { label: 'Nada', value: 'Riang, syukur, dan guyub' }
      ],
      symbols: [
        { title: 'Topeng', text: 'Kebebasan berekspresi dan keberanian menahan malu.' },
        { title: 'Buah', text: 'Syukur atas hasil bumi dan rezeki yang dibagi.' },
        { title: 'Arak-arakan', text: 'Ruang bertemu antarwarga dan antargenerasi.' }
      ],
      terms: [
        { term: 'Sekura', def: 'Sebutan untuk topeng dan tradisi pesta topeng di Lampung Barat.' },
        { term: 'Cakak buah', def: 'Bagian perayaan yang menghadirkan buah dan hasil bumi.' },
        { term: 'Syawal', def: 'Bulan dalam kalender Hijriah setelah Ramadan; waktu perayaan Idulfitri.' }
      ],
      sources: ['Ringkasan editorial Ruwa Jurai, 2026.', 'Rujukan umum: kajian tradisi Sekura Lampung Barat.', 'Status: draf kurasi—jadwal dan detail lokal perlu dikonfirmasi.'],
      related: ['lampung-barat', 'nyambai', 'seruit', 'kopi-robusta']
    },
    {
      id: 'nyambai',
      category: 'upacara',
      title: 'Nyambai',
      subtitle: 'Tari pertemuan muda-mudi Saibatin',
      community: 'Saibatin',
      region: 'Pesisir Lampung',
      regencyIds: ['pesisir-barat', 'tanggamus', 'lampung-selatan'],
      sensitivity: 'terbuka',
      featured: false,
      labels: ['Tari', 'Pertemuan'],
      motif: 'dance',
      summary: 'Tari kelompok berpasangan yang menjadi ruang pertemuan, pantun, dan pencarian jodoh dalam adat Saibatin.',
      lead: 'Tari Nyambai adalah tari kelompok yang dibawakan berpasangan oleh muli (gadis) dan meghanai (bujang) sebagai ruang silaturahmi dan pencarian jodoh.',
      body: [
        'Nyambai menjadi bagian dari rangkaian upacara pernikahan Saibatin yang disebut nayuh atau penayuhan. Dalam acara ini, muda-mudi berkenalan, menari, dan berpantun. Selendang menjadi properti sekaligus penanda siapa yang maju ke ruang tari.',
        'Istilah nyambai dikaitkan dengan cambai, kata untuk sirih—simbol keakraban dalam banyak tradisi Lampung. Gerak tarinya anggun, tetapi suasana acaranya hidup: ada musik, tawa, sindiran halus, dan kesempatan menunjukkan kecakapan bersosial.',
        'Di panggung modern, nyambai hadir sebagai pertunjukan dan materi pembelajaran. Konteksnya perlu dijaga: ia bukan sekadar gerak indah, tetapi bagian dari etika pertemuan dan musyawarah keluarga.'
      ],
      facts: [
        { label: 'Pelaku', value: 'Muli & meghanai' },
        { label: 'Properti', value: 'Selendang' },
        { label: 'Konteks', value: 'Nayuh / penayuhan, ruang pertemuan' },
        { label: 'Nilai', value: 'Keakraban, pantun, etika pergaulan' }
      ],
      symbols: [
        { title: 'Cambai', text: 'Sirih sebagai simbol keakraban dan pembuka percakapan.' },
        { title: 'Selendang', text: 'Properti tari yang menandai peran dan kesempatan.' },
        { title: 'Pantun', text: 'Cara menyampaikan maksud dengan halus dan jenaka.' }
      ],
      terms: [
        { term: 'Muli', def: 'Gadis atau perempuan muda dalam istilah adat Lampung.' },
        { term: 'Meghanai', def: 'Bujang atau pemuda dalam istilah adat Lampung.' },
        { term: 'Nayuh', def: 'Rangkaian upacara pernikahan adat Saibatin.' }
      ],
      sources: ['Ringkasan editorial Ruwa Jurai, 2026.', 'Rujukan: Tari Nyambai, Warisan Budaya Takbenda & kajian tari Lampung.', 'Status: draf kurasi—menunggu validasi penari dan tokoh adat.'],
      related: ['saibatin', 'sigeh-pengunten', 'siger', 'tapis']
    },
    {
      id: 'cangget',
      category: 'seni',
      title: 'Cangget',
      subtitle: 'Tari kehormatan dalam upacara Pepadun',
      community: 'Pepadun',
      region: 'Lampung Tengah, Lampung Utara, Tulang Bawang',
      regencyIds: ['lampung-tengah', 'lampung-utara', 'tulang-bawang', 'way-kanan'],
      sensitivity: 'terbatas',
      featured: false,
      labels: ['Tari', 'Pepadun'],
      motif: 'dance',
      summary: 'Tari yang hadir dalam rangkaian begawi untuk menyambut tamu dan menandai martabat upacara.',
      lead: 'Cangget adalah tari tradisional yang hadir dalam rangkaian upacara Pepadun. Geraknya halus, tetapi fungsinya besar: menyambut tamu, menghormati adat, dan menandai martabat sebuah hajatan.',
      body: [
        'Dalam begawi, cangget dapat dibawakan oleh penari perempuan dengan busana adat dan properti tertentu. Jumlah penari, ragam gerak, serta urutan penyajiannya dapat berbeda antarkebuayan.',
        'Cangget juga menjadi ruang bagi keluarga untuk menunjukkan kesiapan dan kebersamaan. Musik talo balak, kain tapis, dan siger membentuk satu pengalaman yang tidak bisa dipisahkan dari konteks upacaranya.',
        'Ketika dipentaskan di festival atau sekolah, konteks adat perlu dijelaskan agar penonton tidak hanya melihat bentuk geraknya. Tanyakan kepada pengampu tradisi tentang versi, busana, dan makna yang tepat.'
      ],
      facts: [
        { label: 'Konteks', value: 'Begawi / upacara Pepadun' },
        { label: 'Fungsi', value: 'Penyambutan & penanda martabat' },
        { label: 'Pengiring', value: 'Talo balak' },
        { label: 'Variasi', value: 'Berbeda antarkebuayan' }
      ],
      symbols: [
        { title: 'Langkah', text: 'Gerak kecil yang menyimpan rasa hormat.' },
        { title: 'Busana', text: 'Tapis dan perhiasan sebagai bahasa status serta doa.' },
        { title: 'Tamu', text: 'Ruang tari menjadi wajah keramahan keluarga.' }
      ],
      terms: [
        { term: 'Cangget', def: 'Tari adat Pepadun yang tampil dalam upacara.' },
        { term: 'Talo balak', def: 'Ansambel gong pengiring dalam upacara adat.' }
      ],
      sources: ['Ringkasan editorial Ruwa Jurai, 2026.', 'Rujukan umum: tari tradisional Lampung dan upacara Pepadun.', 'Status: draf kurasi—menunggu validasi sanggar.'],
      related: ['pepadun', 'begawi', 'gamolan-talo-balak', 'tapis']
    },
    {
      id: 'sebambangan',
      category: 'pernikahan',
      title: 'Sebambangan',
      subtitle: 'Perkawinan dengan jalan pintas yang diatur adat',
      community: 'Pepadun',
      region: 'Lampung',
      regencyIds: ['lampung-tengah', 'lampung-utara', 'way-kanan', 'tulang-bawang'],
      sensitivity: 'terbatas',
      featured: false,
      labels: ['Pernikahan', 'Musyawarah'],
      motif: 'rings',
      summary: 'Tradisi perkawinan Pepadun yang lahir dari pilihan pasangan, lalu diselesaikan melalui tahapan adat.',
      lead: 'Sebambangan sering diterjemahkan sebagai kawin lari, padahal praktiknya bukan pelarian tanpa aturan. Ia adalah jalan yang ditempuh pasangan, kemudian diselesaikan melalui tahapan adat dan musyawarah keluarga.',
      body: [
        'Dalam tradisi Pepadun, seorang mulei dan meghanai dapat memilih sebambangan ketika ada hambatan atau kesepakatan yang belum tercapai. Gadis meninggalkan tenepik—tanda atau surat—di rumah, lalu pihak laki-laki mengirim utusan untuk memberitahu dan meminta maaf.',
        'Setelah itu, keluarga bertemu untuk berunding. Tahapan seperti cebuk calok, ngantak salah, dan manjau menjadi bagian dari upaya memulihkan hubungan, bukan sekadar formalitas. Hasilnya tetap harus disepakati bersama, termasuk soal mahar dan tata upacara.',
        'Karena menyangkut pilihan pribadi dan kehormatan keluarga, topik ini sensitif. Narasi yang baik tidak meromantisasi pelarian, tidak pula menghakimi pelakunya. Yang perlu ditonjolkan adalah pentingnya persetujuan, keselamatan, dan penyelesaian adat yang adil.'
      ],
      facts: [
        { label: 'Komunitas', value: 'Pepadun' },
        { label: 'Kata kunci', value: 'Tenepik, ngantak salah, musyawarah' },
        { label: 'Sifat', value: 'Tradisi sensitif; tidak boleh disederhanakan' },
        { label: 'Etika', value: 'Utamakan persetujuan & keselamatan pasangan' }
      ],
      symbols: [
        { title: 'Tenepik', text: 'Tanda yang ditinggalkan sebagai awal komunikasi dengan keluarga.' },
        { title: 'Ngantak salah', text: 'Utusan yang meminta maaf dan membuka jalan musyawarah.' },
        { title: 'Manjau', text: 'Kunjungan adat untuk merajut kembali hubungan dua keluarga.' }
      ],
      terms: [
        { term: 'Mulei', def: 'Gadis atau perempuan muda; istilah adat Pepadun.' },
        { term: 'Meghanai', def: 'Bujang atau pemuda; istilah adat Pepadun.' },
        { term: 'Tenepik', def: 'Tanda atau surat yang ditinggalkan pihak perempuan.' }
      ],
      sources: ['Ringkasan editorial Ruwa Jurai, 2026.', 'Rujukan: kajian Sebambangan dalam adat Pepadun.', 'Status: draf kurasi—perlu pembacaan etis dan validasi tokoh adat.'],
      related: ['pepadun', 'ngakuk-majau', 'piil-pesenggiri']
    },
    {
      id: 'ngakuk-majau',
      category: 'pernikahan',
      title: 'Ngakuk Majau & Cuak Mengan',
      subtitle: 'Melamar, berunding, dan menetapkan adat',
      community: 'Lintas adat',
      region: 'Lampung',
      regencyIds: ['lampung-selatan', 'lampung-tengah', 'tanggamus', 'way-kanan'],
      sensitivity: 'terbuka',
      featured: false,
      labels: ['Pernikahan', 'Musyawarah'],
      motif: 'rings',
      summary: 'Rangkaian lamaran dan perundingan adat yang menandai kesepakatan dua keluarga.',
      lead: 'Sebelum pernikahan adat digelar, dua keluarga perlu bertemu, berbicara, dan menyepakati banyak hal. Ngakuk majau dan cuak mengan adalah bagian dari proses itu.',
      body: [
        'Dalam banyak tradisi Lampung, lamaran bukan sekadar membawa cincin. Ada utusan, tutur adat, dan musyawarah tentang mahar, busana, urutan prosesi, serta biaya yang akan dipikul bersama. Istilah dan tata caranya berbeda antarmarga.',
        'Jamuan makan bersama—cuak mengan—menjadi penanda bahwa pembicaraan telah menemukan titik temu. Makan bukan hanya soal hidangan; ia adalah bahasa penerimaan, penghormatan, dan harapan agar hubungan baru berjalan baik.',
        'Bagi keluarga yang akan menikah, menanyakan tradisi setempat sejak awal adalah langkah penting. Tidak semua daerah memakai istilah yang sama, dan tidak semua prosesi harus dijalankan dengan skala besar.'
      ],
      facts: [
        { label: 'Tahap', value: 'Lamaran & musyawarah keluarga' },
        { label: 'Penanda', value: 'Jamuan bersama / cuak mengan' },
        { label: 'Variasi', value: 'Istilah dan urutan berbeda antardaerah' },
        { label: 'Kunci', value: 'Kesepakatan, bukan paksaan' }
      ],
      symbols: [
        { title: 'Utusan', text: 'Perantara yang menjaga tutur dan adab keluarga.' },
        { title: 'Jamuan', text: 'Meja makan sebagai ruang kesepakatan.' },
        { title: 'Mahar', text: 'Bukan harga perempuan, melainkan bagian dari tanggung jawab yang disepakati.' }
      ],
      terms: [
        { term: 'Ngakuk majau', def: 'Istilah yang dikaitkan dengan proses melamar/memimang dalam adat Lampung.' },
        { term: 'Cuak mengan', def: 'Jamuan makan bersama sebagai bagian dari musyawarah adat.' }
      ],
      sources: ['Ringkasan editorial Ruwa Jurai, 2026.', 'Rujukan umum: tata pernikahan adat Lampung.', 'Status: draf kurasi—istilah lokal perlu validasi.'],
      related: ['sebambangan', 'saibatin', 'pepadun', 'gulai-taboh']
    },
    {
      id: 'tapis',
      category: 'busana',
      title: 'Kain Tapis',
      subtitle: 'Tenun, sulam, dan doa yang dipakai',
      community: 'Lintas adat',
      region: 'Lampung',
      regencyIds: ['bandar-lampung', 'lampung-selatan', 'lampung-tengah', 'pringsewu', 'tanggamus'],
      sensitivity: 'terbuka',
      featured: true,
      labels: ['Wastra', 'Sulam emas'],
      motif: 'loom',
      summary: 'Kain tenun bersulam benang emas khas Lampung yang hadir dalam upacara, busana, dan cerita keluarga.',
      lead: 'Tapis adalah kain tenun bersulam benang emas khas Lampung. Ia bukan sekadar kain indah: motif, warna, dan cara memakainya membawa pesan tentang status, doa, dan penghormatan.',
      body: [
        'Tapis umumnya dibuat dari benang katun sebagai bahan dasar, lalu dihias sulaman benang emas. Motif seperti pucuk rebung, kapal, tumpal, dan ragam bunga hadir dengan makna yang dapat berbeda antardaerah dan penenun.',
        'Dalam banyak upacara, tapis dikenakan pada momen pernikahan, penyambutan, dan pertemuan adat. Tingkatan pemakai, ukuran, serta tata letaknya dapat menandai peran seseorang. Karena itu, tidak semua tapis “boleh” dipakai untuk segala acara.',
        'Hari ini tapis hidup di ruang baru: busana panggung, fesyen kontemporer, cendera mata, dan museum. Menghargai karya berarti menyebut penenun, membeli dari sumber yang adil, dan tidak memakai motif sakral secara sembarangan.'
      ],
      facts: [
        { label: 'Bahan', value: 'Benang katun & benang emas' },
        { label: 'Teknik', value: 'Tenun dengan sulam ragam hias' },
        { label: 'Fungsi', value: 'Busana adat, upacara, cendera mata' },
        { label: 'Motif', value: 'Pucuk rebung, kapal, tumpal, floral' }
      ],
      symbols: [
        { title: 'Pucuk rebung', text: 'Pertumbuhan, harapan, dan arah hidup yang terus menuju atas.' },
        { title: 'Kapal', text: 'Perjalanan, keberanian, dan doa akan keselamatan.' },
        { title: 'Tumpal', text: 'Batas, perlindungan, dan penghormatan pada ruang.' }
      ],
      terms: [
        { term: 'Tapis', def: 'Kain tenun bersulam khas Lampung.' },
        { term: 'Pucuk rebung', def: 'Motif segitiga berlapis yang menyerupai tunas bambu.' },
        { term: 'Sulam usus', def: 'Kerajinan sulam khas Lampung lain yang menggunakan benang dari usus hewan.' }
      ],
      sources: ['Ringkasan editorial Ruwa Jurai, 2026.', 'Rujukan umum: kain tapis & kerajinan Lampung.', 'Status: draf kurasi—makna motif perlu divalidasi perajin dan tokoh adat.'],
      related: ['siger', 'kerajinan', 'saibatin', 'sigeh-pengunten']
    },
    {
      id: 'siger',
      category: 'busana',
      title: 'Siger',
      subtitle: 'Mahkota kehormatan pengantin Lampung',
      community: 'Lintas adat',
      region: 'Lampung',
      regencyIds: ['bandar-lampung', 'lampung-selatan', 'pesisir-barat', 'lampung-tengah'],
      sensitivity: 'terbuka',
      featured: true,
      labels: ['Mahkota', 'Kehormatan'],
      motif: 'crown',
      summary: 'Mahkota pengantin perempuan Lampung yang menjulang, berkilau, dan membawa tanggung jawab.',
      lead: 'Siger adalah mahkota adat yang lazim dikenakan pengantin perempuan Lampung. Bentuknya menjulang seperti pucuk, berkilau, dan menjadi salah satu ikon budaya yang paling mudah dikenali.',
      body: [
        'Siger biasanya dibuat dari logam—emas, perak, atau kuningan—dan dihiasi ornamen serta batu. Jumlah pucuk, detail, dan nama bagiannya dapat berbeda antardaerah. Varian Saibatin dan Pepadun pun tidak selalu sama.',
        'Dalam pernikahan, siger bukan sekadar aksesori. Ia menandai penghormatan, kesucian, dan kesiapan memikul peran baru. Proses pemasangannya kerap melibatkan keluarga dan diiringi doa atau tutur adat.',
        'Siger juga menjadi simbol visual Lampung di ruang publik. Ketika dipakai untuk pertunjukan atau sesi foto, konteksnya sebaiknya dijelaskan agar tidak kehilangan makna dan tetap menghormati pemilik tradisi.'
      ],
      facts: [
        { label: 'Pemakai', value: 'Umumnya pengantin perempuan' },
        { label: 'Bahan', value: 'Logam & hiasan, bervariasi' },
        { label: 'Makna', value: 'Kehormatan, status, tanggung jawab' },
        { label: 'Bentuk', value: 'Menjulang dengan pucuk berhias' }
      ],
      symbols: [
        { title: 'Pucuk', text: 'Arah ke atas, harapan, dan keagungan.' },
        { title: 'Kilau', text: 'Cahaya yang menarik perhatian sekaligus mengundang penghormatan.' },
        { title: 'Beban', text: 'Mahkota mengingatkan bahwa kehormatan membawa tanggung jawab.' }
      ],
      terms: [
        { term: 'Siger', def: 'Mahkota adat pengantin perempuan Lampung.' },
        { term: 'Pucuk', def: 'Bagian menjulang pada siger yang menjadi ciri visualnya.' }
      ],
      sources: ['Ringkasan editorial Ruwa Jurai, 2026.', 'Rujukan umum: busana adat Lampung.', 'Status: draf kurasi—bentuk dan istilah per daerah perlu validasi.'],
      related: ['tapis', 'saibatin', 'pepadun', 'sigeh-pengunten']
    },
    {
      id: 'sigeh-pengunten',
      category: 'seni',
      title: 'Tari Sigeh Pengunten',
      subtitle: 'Tari penyambutan tamu kehormatan',
      community: 'Lintas adat',
      region: 'Lampung',
      regencyIds: ['bandar-lampung', 'lampung-selatan', 'lampung-tengah'],
      sensitivity: 'terbuka',
      featured: true,
      labels: ['Tari', 'Penyambutan'],
      motif: 'dance',
      summary: 'Tari penyambutan yang memadukan unsur Saibatin dan Pepadun, ditetapkan sebagai Warisan Budaya Takbenda.',
      lead: 'Tari Sigeh Pengunten adalah tari penyambutan dan penghormatan kepada tamu. Bentuknya memadukan unsur adat Pepadun dan Saibatin, lalu dibakukan sebagai salah satu representasi identitas budaya Lampung.',
      body: [
        'Tari ini berkembang dari tradisi tari penyambutan yang sebelumnya dikenal dengan sebutan lain. Pada 1989, pemerintah provinsi membakukan Sigeh Pengunten sebagai tari representasi Lampung. Pada 2014, tari ini tercatat sebagai Warisan Budaya Takbenda Indonesia.',
        'Gerak, busana, dan propertinya membawa nuansa kehormatan. Penari biasanya mengenakan busana adat dengan tapis dan siger, membawa properti seperti tepak atau payung, dan bergerak dalam formasi yang tertata.',
        'Di sekolah dan acara resmi, Sigeh Pengunten sering menjadi pintu masuk untuk mengenal budaya Lampung. Penyajian yang baik tetap menyebut asal-usul, pemelihara tradisi, dan konteks adatnya.'
      ],
      facts: [
        { label: 'Fungsi', value: 'Penyambutan tamu kehormatan' },
        { label: 'Pembakuan', value: '1989 oleh Pemerintah Provinsi Lampung' },
        { label: 'Status', value: 'Warisan Budaya Takbenda Indonesia, 2014' },
        { label: 'Unsur', value: 'Saibatin & Pepadun' }
      ],
      symbols: [
        { title: 'Sembah', text: 'Penghormatan kepada tamu dan hadirin.' },
        { title: 'Tapis & siger', text: 'Busana yang menyatakan identitas dan martabat.' },
        { title: 'Formasi', text: 'Kebersamaan yang diatur dengan rapi.' }
      ],
      terms: [
        { term: 'Sigeh', def: 'Bagian dari nama tari; makna harfiahnya perlu dikonfirmasi ahli bahasa.' },
        { term: 'Pengunten', def: 'Ejaan lain yang muncul di sumber: penguten/pengunten.' },
        { term: 'WBTb', def: 'Warisan Budaya Takbenda Indonesia.' }
      ],
      sources: ['Warisan Budaya Takbenda Indonesia (Kemendikbud), entri Tari Sigeh Pengunten, 2014.', 'Ringkasan editorial Ruwa Jurai, 2026.', 'Status: draf kurasi—ejaan dan narasi perlu validasi.'],
      related: ['saibatin', 'pepadun', 'tapis', 'siger', 'gamolan-talo-balak']
    },
    {
      id: 'bedana',
      category: 'seni',
      title: 'Tari Bedana',
      subtitle: 'Tari pergaulan yang ramah',
      community: 'Lintas adat',
      region: 'Lampung',
      regencyIds: ['bandar-lampung', 'lampung-selatan', 'lampung-timur'],
      sensitivity: 'terbuka',
      featured: false,
      labels: ['Tari', 'Pergaulan'],
      motif: 'dance',
      summary: 'Tari pergaulan Lampung yang mencerminkan keramahan, kebersamaan, dan pengaruh budaya Melayu-Islam.',
      lead: 'Tari Bedana adalah tari pergaulan masyarakat Lampung yang berkembang dalam lingkungan budaya Melayu-Islam. Geraknya mencerminkan keramahan, persahabatan, dan kebersamaan.',
      body: [
        'Bedana memiliki banyak variasi bentuk: jumlah penari, ragam gerak, musik, busana, dan konteks penyajiannya dapat berbeda antardaerah. Salah satu bentuk yang direvitalisasi disusun dalam sembilan ragam gerak.',
        'Pada 2018, Tari Bedana Lampung ditetapkan sebagai Warisan Budaya Takbenda Indonesia dalam domain seni pertunjukan. Penetapan ini menjadi pengakuan atas praktik budaya yang hidup di masyarakat.',
        'Sebagai tari pergaulan, Bedana dekat dengan acara sekolah, pernikahan, dan festival. Nilai pentingnya ada pada kesediaan berbagi ruang: menari bersama, saling menghormati, dan merawat kegembiraan.'
      ],
      facts: [
        { label: 'Watak', value: 'Pergaulan & kebersamaan' },
        { label: 'Lingkungan', value: 'Budaya Lampung–Melayu–Islam' },
        { label: 'Status', value: 'Warisan Budaya Takbenda Indonesia, 2018' },
        { label: 'Variasi', value: 'Banyak bentuk lokal' }
      ],
      symbols: [
        { title: 'Tangan', text: 'Gerak yang terbuka sebagai ajakan berjumpa.' },
        { title: 'Langkah', text: 'Kebersamaan yang diatur agar semua mendapat ruang.' },
        { title: 'Musik', text: 'Iringan yang menghidupkan suasana akrab.' }
      ],
      terms: [
        { term: 'Bedana', def: 'Tari pergaulan tradisional Lampung.' },
        { term: 'Ragam gerak', def: 'Bagian-bagian gerak yang menyusun satu tarian.' }
      ],
      sources: ['Warisan Budaya Takbenda Indonesia (Kemendikbud), entri Tari Bedana, 2018.', 'Ringkasan editorial Ruwa Jurai, 2026.', 'Status: draf kurasi.'],
      related: ['sigeh-pengunten', 'melinting', 'gamolan-talo-balak']
    },
    {
      id: 'melinting',
      category: 'seni',
      title: 'Tari Melinting',
      subtitle: 'Tari keratuan dari Lampung Timur',
      community: 'Melinting',
      region: 'Lampung Timur',
      regencyIds: ['lampung-timur'],
      sensitivity: 'terbuka',
      featured: false,
      labels: ['Tari', 'Lampung Timur'],
      motif: 'dance',
      summary: 'Tari tradisional yang tumbuh di lingkungan Keratuan Melinting, Lampung Timur.',
      lead: 'Tari Melinting tumbuh di lingkungan Keratuan Melinting dan kawasan Labuhan Maringgai, Lampung Timur. Awalnya ia bagian dari kegiatan adat, lalu berkembang menjadi pertunjukan yang lebih luas.',
      body: [
        'Dalam sejarahnya, Melinting memiliki fungsi terbatas di lingkungan keratuan. Seiring waktu, bentuk penyajian, busana, iringan, dan konteksnya berubah. Pada 2014, tari ini ditetapkan sebagai Warisan Budaya Takbenda Indonesia.',
        'Nama Melinting merujuk pada komunitas adat dan wilayah sejarahnya. Karena itu, menyebut asal-usulnya penting agar tari tidak sekadar tampil sebagai “tarian Lampung” tanpa akar yang jelas.',
        'Versi panggung dapat berbeda dari versi adat. Penelusuran melalui sanggar, museum, dan narasumber setempat akan membantu memahami perubahannya.'
      ],
      facts: [
        { label: 'Asal', value: 'Melinting, Lampung Timur' },
        { label: 'Akar', value: 'Keratuan Melinting' },
        { label: 'Status', value: 'Warisan Budaya Takbenda Indonesia, 2014' },
        { label: 'Bentuk', value: 'Tari adat yang berkembang menjadi pertunjukan' }
      ],
      symbols: [
        { title: 'Keratuan', text: 'Pusat politik-budaya yang menjaga tata adat.' },
        { title: 'Perubahan', text: 'Tradisi tetap hidup ketika mampu beradaptasi.' },
        { title: 'Akar', text: 'Nama tempat dan komunitas tidak boleh terlepas dari tariannya.' }
      ],
      terms: [
        { term: 'Keratuan', def: 'Bentuk kepemimpinan adat/wilayah dalam sejarah Lampung.' },
        { term: 'Melinting', def: 'Komunitas adat dan wilayah di Lampung Timur.' }
      ],
      sources: ['Warisan Budaya Takbenda Indonesia (Kemendikbud), entri Tari Melinting, 2014.', 'Ringkasan editorial Ruwa Jurai, 2026.', 'Status: draf kurasi.'],
      related: ['bedana', 'sigeh-pengunten', 'pugung-raharjo']
    },
    {
      id: 'gamolan-talo-balak',
      category: 'seni',
      title: 'Gamolan & Talo Balak',
      subtitle: 'Bunyi kayu, logam, dan kebersamaan',
      community: 'Lintas adat',
      region: 'Lampung',
      regencyIds: ['lampung-tengah', 'lampung-utara', 'way-kanan', 'tulang-bawang'],
      sensitivity: 'terbuka',
      featured: false,
      labels: ['Musik', 'Ansambel'],
      motif: 'gong',
      summary: 'Gamolan dan talo balak adalah bunyi yang mengiringi upacara, tari, dan kerja bersama warga Lampung.',
      lead: 'Gamolan adalah instrumen pukul khas Lampung; talo balak adalah ansambel gong yang kerap berpadu dengannya. Bersama-sama, keduanya menghidupkan upacara, tari, dan hajatan warga.',
      body: [
        'Gamolan dapat berbahan kayu atau bambu, dengan bilah-bilah yang dipukul menggunakan alat khusus. Sebutan dan bentuknya berbeda antardaerah; salah satu varian yang dikenal adalah gamolan pekhing.',
        'Talo balak menghadirkan gong dan instrumen lain dengan pola tabuh yang khas. Dalam upacara Pepadun, bunyi talo balak menandai momen penting dan mengatur ritme perjalanan acara.',
        'Pengetahuan memainkan alat musik ini diwariskan secara lisan dan melalui latihan bersama. Mendengarkan, mencatat nama pemain, serta meminta izin saat merekam adalah cara sederhana untuk menghormati tradisi.'
      ],
      facts: [
        { label: 'Kategori', value: 'Musik tradisional' },
        { label: 'Gamolan', value: 'Instrumen pukul; bahan & sebutan bervariasi' },
        { label: 'Talo balak', value: 'Ansambel gong pengiring adat' },
        { label: 'Fungsi', value: 'Upacara, tari, hajatan, penyambutan' }
      ],
      symbols: [
        { title: 'Bilah', text: 'Nada yang disusun rapi, seperti pembagian peran dalam masyarakat.' },
        { title: 'Gong', text: 'Suara besar yang menandai momen penting.' },
        { title: 'Ansambel', text: 'Tidak ada satu pemain yang berdiri sendiri.' }
      ],
      terms: [
        { term: 'Gamolan', def: 'Alat musik pukul tradisional Lampung.' },
        { term: 'Talo balak', def: 'Ansambel gong dalam musik adat Lampung.' },
        { term: 'Gamolan pekhing', def: 'Salah satu varian gamolan yang perlu dirujuk sesuai sumber setempat.' }
      ],
      sources: ['Ringkasan editorial Ruwa Jurai, 2026.', 'Rujukan umum: musik tradisional Lampung.', 'Status: draf kurasi—nama bagian & versi perlu validasi pemusik.'],
      related: ['begawi', 'cangget', 'pepadun']
    },
    {
      id: 'sastra-lisan',
      category: 'sastra',
      title: 'Sastra Lisan',
      subtitle: 'Warahan, pisaan, hahiwang, wawancan',
      community: 'Lintas adat',
      region: 'Lampung',
      regencyIds: ['pesisir-barat', 'tanggamus', 'lampung-tengah', 'lampung-timur'],
      sensitivity: 'terbuka',
      featured: false,
      labels: ['Sastra', 'Tutur'],
      motif: 'book',
      summary: 'Empat bentuk tutur yang menyimpan sejarah, nasihat, duka, dan tata cara bicara dalam masyarakat Lampung.',
      lead: 'Sastra lisan Lampung hidup dalam banyak bentuk: warahan, pisaan, hahiwang, dan wawancan. Masing-masing punya suasana dan fungsi, dari bercerita hingga menyampaikan nasihat dalam upacara.',
      body: [
        'Warahan dekat dengan cerita dan legenda; pisaan hidup dalam pantun serta tutur berirama; hahiwang membawa nuansa duka; wawancan hadir dalam pidato adat. Batas dan penamaannya dapat berbeda antardaerah.',
        'Sastra lisan tidak hanya teks. Ia melibatkan suara, jeda, ekspresi, dan hubungan antara penutur dengan pendengar. Karena itu, dokumentasi audio dan video perlu disertai konteks agar tidak kehilangan makna.',
        'Penutur tua semakin sedikit, sementara generasi muda tumbuh dengan bahasa lain. Program sekolah, komunitas, dan keluarga menjadi ruang penting agar warisan tutur tidak berhenti di arsip.'
      ],
      facts: [
        { label: 'Bentuk', value: 'Warahan · pisaan · hahiwang · wawancan' },
        { label: 'Sifat', value: 'Lisan, kontekstual, banyak versi' },
        { label: 'Fungsi', value: 'Cerita, nasihat, duka, pidato adat' },
        { label: 'Tantangan', value: 'Regenerasi penutur & dokumentasi etis' }
      ],
      symbols: [
        { title: 'Suara', text: 'Makna yang lahir dari intonasi, bukan hanya kata.' },
        { title: 'Pendengar', text: 'Sastra lisan hidup dalam hubungan, bukan teks mati.' },
        { title: 'Versi', text: 'Perbedaan cerita adalah kekayaan yang perlu dicatat.' }
      ],
      terms: [
        { term: 'Warahan', def: 'Tutur cerita atau legenda dalam sastra lisan Lampung.' },
        { term: 'Pisaan', def: 'Bentuk tutur berirama/pantun yang berisi nasihat atau sindiran.' },
        { term: 'Hahiwang', def: 'Nyanyian/tutur yang bernuansa duka.' },
        { term: 'Wawancan', def: 'Tutur adat yang disampaikan dalam upacara.' }
      ],
      sources: ['Ringkasan editorial Ruwa Jurai, 2026.', 'Rujukan umum: sastra lisan Lampung.', 'Status: draf kurasi—definisi bentuk perlu validasi ahli bahasa.'],
      related: ['aksara-lampung', 'dialek-a-o', 'kamus']
    },
    {
      id: 'aksara-lampung',
      category: 'sastra',
      title: 'Aksara Lampung',
      subtitle: 'Had Lampung, abugida yang terus dipelajari',
      community: 'Lintas adat',
      region: 'Lampung',
      regencyIds: ['bandar-lampung', 'lampung-selatan', 'lampung-tengah', 'pesisir-barat'],
      sensitivity: 'terbuka',
      featured: true,
      labels: ['Aksara', 'Had Lampung'],
      motif: 'glyph',
      summary: 'Aksara tradisional Lampung dengan huruf induk dan anak huruf, kini diajarkan kembali di sekolah dan komunitas.',
      lead: 'Aksara Lampung—sering disebut had Lampung—adalah aksara abugida yang digunakan untuk menulis bahasa Lampung dan Komering. Ia memiliki huruf induk, anak huruf, serta tanda baca.',
      body: [
        'Sebagai abugida, setiap huruf induk mengandung vokal bawaan yang dapat diubah dengan anak huruf. Sistem ini membuat aksara terasa seperti jalinan bunyi: satu huruf dapat berubah peran dengan tanda kecil di atas, di bawah, atau sesudahnya.',
        'Aksara Lampung diajarkan di sekolah dan komunitas budaya, tetapi dukungan font serta Unicode belum seluas aksara Jawa. Karena itu, Ruwa Jurai menampilkan aksara melalui gambar vektor yang selalu disertai transliterasi Latin.',
        'Konverter di halaman Kamus adalah alat bantu visual, bukan mesin ortografi sempurna. Ejaan dan aturan penulisan tetap perlu dipelajari dari guru, buku, dan penutur asli.'
      ],
      facts: [
        { label: 'Jenis', value: 'Abugida' },
        { label: 'Arah', value: 'Kiri ke kanan' },
        { label: 'Unsur', value: 'Huruf induk, anak huruf, tanda baca' },
        { label: 'Catatan', value: 'Tampilan vektor + transliterasi Latin' }
      ],
      symbols: [
        { title: 'Induk', text: 'Huruf dasar yang membawa bunyi dan vokal bawaan.' },
        { title: 'Anak huruf', text: 'Tanda yang mengubah bunyi, seperti cabang dari batang.' },
        { title: 'Latin', text: 'Jembatan baca yang menjaga aksesibilitas.' }
      ],
      terms: [
        { term: 'Had Lampung', def: 'Sebutan untuk aksara Lampung.' },
        { term: 'Abugida', def: 'Sistem tulisan yang memadukan konsonan dan vokal dalam satu unit.' },
        { term: 'Anak huruf', def: 'Tanda pengubah bunyi pada huruf induk.' }
      ],
      sources: ['Ringkasan editorial Ruwa Jurai, 2026.', 'Rujukan umum: aksara Lampung & pembelajaran had Lampung.', 'Tampilan glyph: Lampung Design System (MIT).'],
      related: ['sastra-lisan', 'dialek-a-o', 'kamus']
    },
    {
      id: 'dialek-a-o',
      category: 'bahasa',
      title: 'Dialek A (Api) & O (Nyow)',
      subtitle: 'Satu bahasa, banyak warna suara',
      community: 'Lintas adat',
      region: 'Lampung',
      regencyIds: ['pesisir-barat', 'tanggamus', 'lampung-tengah', 'lampung-utara'],
      sensitivity: 'terbuka',
      featured: false,
      labels: ['Bahasa', 'Dialek'],
      motif: 'speech',
      summary: 'Dua rumpun dialek utama bahasa Lampung yang hidup berdampingan dengan banyak variasi lokal.',
      lead: 'Bahasa Lampung memiliki dua rumpun dialek yang sering disebut: A (Api) dan O (Nyow). Perbedaan bunyi dan kosakata membuat keduanya terasa berbeda, tetapi keduanya adalah bagian dari satu keluarga bahasa.',
      body: [
        'Sebutan Api dan Nyow merujuk pada kata untuk “apa” dalam masing-masing dialek. Persebarannya tidak membentuk garis tegas; di banyak wilayah, penutur hidup berdampingan dan saling memengaruhi.',
        'Selain dialek, ada variasi tingkat tutur, kosakata daerah, dan pengaruh bahasa Indonesia serta bahasa daerah lain. Kamus mini di situs ini menandai dialek hanya pada istilah yang datanya tersedia, agar tidak menciptakan kesan yang terlalu rapi.',
        'Bahasa Lampung kini menghadapi tantangan regenerasi. Sekolah, keluarga, media digital, dan ruang publik dapat menjadi tempat merawatnya—selama penutur asli tetap menjadi rujukan utama.'
      ],
      facts: [
        { label: 'Rumpun', value: 'A (Api) & O (Nyow)' },
        { label: 'Penanda', value: 'Bunyi & kosakata' },
        { label: 'Sebaran', value: 'Tidak tegas; saling bersinggungan' },
        { label: 'Tantangan', value: 'Regenerasi penutur' }
      ],
      symbols: [
        { title: 'Api', text: 'Salah satu rumpun dialek; kata “apa” menjadi penanda.' },
        { title: 'Nyow', text: 'Rumpun dialek lain dengan warna bunyi yang khas.' },
        { title: 'Ruang', text: 'Bahasa hidup dalam percakapan, bukan hanya kamus.' }
      ],
      terms: [
        { term: 'Dialek A', def: 'Rumpun dialek yang sering disebut Api.' },
        { term: 'Dialek O', def: 'Rumpun dialek yang sering disebut Nyow.' },
        { term: 'Kode-kode', def: 'Pergantian bahasa atau dialek sesuai situasi.' }
      ],
      sources: ['Ringkasan editorial Ruwa Jurai, 2026.', 'Rujukan umum: sosiolinguistik bahasa Lampung.', 'Status: draf kurasi—peta dialek perlu divalidasi ahli bahasa.'],
      related: ['aksara-lampung', 'sastra-lisan', 'kamus']
    },
    {
      id: 'lamban-pesagi',
      category: 'arsitektur',
      title: 'Lamban Pesagi & Nuwo',
      subtitle: 'Rumah panggung, ruang adat',
      community: 'Lintas adat',
      region: 'Lampung',
      regencyIds: ['lampung-tengah', 'lampung-selatan', 'pesisir-barat', 'tulang-bawang'],
      sensitivity: 'terbuka',
      featured: false,
      labels: ['Rumah adat', 'Ruang'],
      motif: 'house',
      summary: 'Rumah panggung dan balai adat yang menjadi panggung kehidupan keluarga serta musyawarah warga.',
      lead: 'Lamban pesagi dan nuwo adalah nama-nama rumah adat Lampung yang berbeda menurut komunitas. Di atas panggungnya, keluarga berkumpul, tamu disambut, dan keputusan adat dimusyawarahkan.',
      body: [
        'Pada masyarakat Pepadun, lamban pesagi dikenal sebagai rumah panggung dengan denah persegi, tiang, ukiran, dan pembagian ruang yang mengikuti tatanan keluarga. Pada masyarakat Saibatin, nuwo balak dan nuwo sesat memiliki peran yang kurang lebih sejajar sebagai rumah keluarga besar dan balai pertemuan.',
        'Bahan dan bentuknya berubah mengikuti zaman: kayu diganti material lain, ukiran disederhanakan, dan fungsi komersial muncul. Perubahan ini tidak otomatis buruk, asalkan makna ruang dan pengetahuan pembangunannya ikut dicatat.',
        'Mengunjungi rumah adat berarti memasuki ruang hidup, bukan sekadar latar foto. Mintalah izin, lepaskan alas kaki bila diminta, dan hindari menyentuh ukiran atau benda pusaka tanpa pendampingan.'
      ],
      facts: [
        { label: 'Pepadun', value: 'Lamban pesagi' },
        { label: 'Saibatin', value: 'Nuwo balak / nuwo sesat' },
        { label: 'Struktur', value: 'Rumah panggung, tiang, ukiran' },
        { label: 'Etika', value: 'Ruang hidup; hormati aturan pemilik' }
      ],
      symbols: [
        { title: 'Panggung', text: 'Pemisahan ruang yang menghormati tanah dan air.' },
        { title: 'Tiang', text: 'Kekuatan yang ditopang bersama.' },
        { title: 'Ukiran', text: 'Doa dan identitas yang dipahat pada kayu.' }
      ],
      terms: [
        { term: 'Lamban pesagi', def: 'Rumah adat panggung masyarakat Pepadun.' },
        { term: 'Nuwo balak', def: 'Rumah besar dalam tradisi Saibatin.' },
        { term: 'Nuwo sesat', def: 'Balai pertemuan adat pada masyarakat Saibatin.' }
      ],
      sources: ['Ringkasan editorial Ruwa Jurai, 2026.', 'Rujukan umum: arsitektur tradisional Lampung.', 'Status: draf kurasi—istilah per daerah perlu validasi.'],
      related: ['pepadun', 'saibatin', 'kerajinan']
    },
    {
      id: 'kerajinan',
      category: 'kerajinan',
      title: 'Anyaman, Ukir & Logam',
      subtitle: 'Tangan yang bekerja, pengetahuan yang diwariskan',
      community: 'Lintas adat',
      region: 'Lampung',
      regencyIds: ['bandar-lampung', 'pringsewu', 'lampung-tengah', 'tanggamus'],
      sensitivity: 'terbuka',
      featured: false,
      labels: ['Kriya', 'UMKM'],
      motif: 'hands',
      summary: 'Kerajinan Lampung yang hidup dari bahan sekitar: tapis, anyaman, ukiran, serta logam untuk perhiasan.',
      lead: 'Di balik tapis, siger, dan rumah adat ada tangan-tangan yang bekerja. Kerajinan Lampung mencakup tenun dan sulam, anyaman bambu/rotan, ukiran kayu, serta perak dan kuningan.',
      body: [
        'Setiap kerajinan membawa pengetahuan teknis yang diwariskan antargenerasi: memilih bahan, menyiapkan alat, menentukan motif, dan menyelesaikan produk. Sebagian pengetahuan itu tidak tertulis dan hanya hidup dalam praktik.',
        'Kerajinan juga merupakan sumber penghidupan. Membeli langsung dari perajin, menyebut nama pembuat, dan menghargai waktu kerja adalah bentuk dukungan yang lebih adil daripada menjadikannya sekadar suvenir murah.',
        'Motif tradisional memiliki pemilik komunal. Penggunaan komersial sebaiknya dilakukan dengan izin, atribusi, dan pembagian manfaat yang jelas—terutama untuk motif yang dianggap sakral atau memiliki aturan pemakaian.'
      ],
      facts: [
        { label: 'Ragam', value: 'Tapis, anyaman, ukir, perak/kuningan' },
        { label: 'Bahan', value: 'Kapas, bambu, rotan, kayu, logam' },
        { label: 'Jalur', value: 'Sanggar, keluarga, UMKM, pasar' },
        { label: 'Etika', value: 'Atribusi & izin motif komunal' }
      ],
      symbols: [
        { title: 'Tangan', text: 'Keterampilan yang tidak bisa dipisahkan dari tubuh dan latihan.' },
        { title: 'Bahan', text: 'Pengetahuan tentang alam sekitar.' },
        { title: 'Pasar', text: 'Kerajinan bertahan ketika perajinnya dapat hidup layak.' }
      ],
      terms: [
        { term: 'Kriya', def: 'Karya keterampilan tangan dengan nilai fungsi dan budaya.' },
        { term: 'Sulam usus', def: 'Teknik sulam khas Lampung dengan benang dari usus hewan.' },
        { term: 'Celugam', def: 'Salah satu jenis kain khas Lampung yang perlu dirujuk sesuai sumber.' }
      ],
      sources: ['Ringkasan editorial Ruwa Jurai, 2026.', 'Rujukan umum: kerajinan tradisional Lampung.', 'Status: draf kurasi—profil perajin & izin motif belum lengkap.'],
      related: ['tapis', 'siger', 'lamban-pesagi']
    },
    {
      id: 'pugung-raharjo',
      category: 'situs',
      title: 'Pugung Raharjo',
      subtitle: 'Jejak masa megalitik di Lampung Timur',
      community: 'Lintas adat',
      region: 'Lampung Timur',
      regencyIds: ['lampung-timur'],
      sensitivity: 'terbuka',
      featured: false,
      labels: ['Situs', 'Megalitik'],
      motif: 'landmark',
      summary: 'Kawasan purbakala di Lampung Timur dengan tinggalan megalitik dan lapisan pengaruh budaya masa lampau.',
      lead: 'Pugung Raharjo adalah kawasan purbakala di Lampung Timur yang menyimpan tinggalan dari masa megalitik serta lapisan pengaruh budaya berikutnya. Situs ini menjadi salah satu pintu untuk membaca sejarah panjang Lampung.',
      body: [
        'Di kawasan ini ditemukan benteng tanah, batu-batu besar, arca, serta jejak permukiman lama. Temuan tersebut menunjukkan bahwa Lampung telah menjadi ruang pertemuan berbagai pengaruh jauh sebelum terbentuknya provinsi.',
        'Situs arkeologi bukan sekadar latar foto. Setiap benda dan lapisan tanah menyimpan informasi; memindahkan, menyentuh, atau menggali tanpa izin dapat merusak data dan warisan bersama.',
        'Kunjungan yang baik dimulai dengan membaca aturan setempat, mengikuti pemandu, dan tidak membawa pulang apa pun. Dokumentasi untuk pendidikan sebaiknya menyebut sumber serta status penelitiannya.'
      ],
      facts: [
        { label: 'Lokasi', value: 'Lampung Timur' },
        { label: 'Jejak', value: 'Megalitik & pengaruh budaya masa lampau' },
        { label: 'Status', value: 'Situs budaya; lindungi dari kerusakan' },
        { label: 'Etika', value: 'Ikuti pemandu, jangan memindahkan temuan' }
      ],
      symbols: [
        { title: 'Batu', text: 'Ingatan yang bertahan melampaui generasi.' },
        { title: 'Lapisan', text: 'Sejarah tidak tunggal; ia tersusun berlapis.' },
        { title: 'Tempat', text: 'Situs hidup dalam lanskap, bukan hanya benda.' }
      ],
      terms: [
        { term: 'Megalitik', def: 'Tradisi budaya yang menggunakan batu-batu besar.' },
        { term: 'Arkeologi', def: 'Ilmu yang membaca masa lalu melalui tinggalan material.' }
      ],
      sources: ['Ringkasan editorial Ruwa Jurai, 2026.', 'Rujukan umum: Taman Purbakala Pugung Raharjo.', 'Status: draf kurasi—detail temuan perlu bersumber dari arkeolog.'],
      related: ['melinting', 'museum-lampung', 'lamban-pesagi']
    },
    {
      id: 'museum-lampung',
      category: 'situs',
      title: 'Museum Lampung',
      subtitle: 'Rumah benda, jendela cerita',
      community: 'Lintas adat',
      region: 'Bandar Lampung',
      regencyIds: ['bandar-lampung'],
      sensitivity: 'terbuka',
      featured: false,
      labels: ['Museum', 'Kota'],
      motif: 'landmark',
      summary: 'Museum di Bandar Lampung yang menyimpan koleksi budaya dan sejarah, sekaligus ruang belajar bagi warga.',
      lead: 'Museum Lampung di Bandar Lampung menyimpan koleksi yang membantu membaca sejarah dan budaya provinsi ini—dari benda arkeologis hingga busana adat. Ia adalah ruang belajar yang terbuka untuk umum.',
      body: [
        'Museum bukan gudang benda mati. Koleksi dipilih, dirawat, dan ditafsirkan; di baliknya ada peneliti, kurator, dan masyarakat yang memberikan konteks. Mengunjungi museum berarti diajak melihat hubungan antarbenda.',
        'Untuk peneliti muda, museum dapat menjadi titik awal—bukan satu-satunya sumber. Catat nomor koleksi, nama benda, dan keterangan yang tersedia; bandingkan dengan wawancara dan pustaka.',
        'Jangan menyentuh koleksi tanpa izin, jangan menggunakan flash bila dilarang, dan hormati area yang ditutup. Foto yang diambil untuk publikasi perlu mengikuti ketentuan museum.'
      ],
      facts: [
        { label: 'Lokasi', value: 'Bandar Lampung' },
        { label: 'Fungsi', value: 'Pelestarian, penelitian, edukasi' },
        { label: 'Koleksi', value: 'Budaya & sejarah Lampung (bervariasi)' },
        { label: 'Etika', value: 'Ikuti aturan pameran & hak cipta' }
      ],
      symbols: [
        { title: 'Koleksi', text: 'Benda yang dipelihara untuk dibaca generasi berikutnya.' },
        { title: 'Label', text: 'Konteks yang membuat benda berbicara.' },
        { title: 'Kunjungan', text: 'Belajar dengan mata, catatan, dan rasa hormat.' }
      ],
      terms: [
        { term: 'Kurator', def: 'Pihak yang memilih, merawat, dan menafsirkan koleksi.' },
        { term: 'Provenans', def: 'Asal-usul suatu benda atau koleksi.' }
      ],
      sources: ['Ringkasan editorial Ruwa Jurai, 2026.', 'Rujukan umum: Museum Lampung.', 'Status: draf kurasi—jam, koleksi, dan aturan terkini perlu dicek langsung.'],
      related: ['tapis', 'siger', 'pugung-raharjo']
    }
  ];

  // Tematik, bukan kronologi lengkap.
  const timeline = [
    { era: 'Sebelum abad ke-19', title: 'Jaringan marga & pelabuhan', text: 'Pesisir Lampung menjadi ruang pertemuan pelayaran, perdagangan, dan kekerabatan. Tradisi lisan merawat ingatan yang tidak selalu tercatat.' },
    { era: 'Abad ke-17–19', title: 'Keratuan & tata adat', text: 'Kekuasaan keratuan dan marga membentuk lanskap politik-budaya yang beragam. Setiap wilayah mengembangkan tata adatnya sendiri.' },
    { era: '1900-an', title: 'Kolonial & perubahan tata kelola', text: 'Pemerintahan kolonial menata ulang wilayah, ekonomi, dan pendidikan. Praktik adat beradaptasi, sebagian bertahan di ruang keluarga dan kampung.' },
    { era: '1945', title: 'Indonesia merdeka', text: 'Lampung menjadi bagian dari Indonesia. Identitas kedaerahan terus dibicarakan dalam konteks kebangsaan.' },
    { era: '1964', title: 'Lampung menjadi provinsi', text: '18 Maret 1964 menjadi penanda terbentuknya Provinsi Lampung dalam tata pemerintahan modern.' },
    { era: '1989', title: 'Sigeh Pengunten dibakukan', text: 'Pemerintah Provinsi Lampung membakukan tari penyambutan ini sebagai representasi identitas budaya.' },
    { era: '2014–2018', title: 'Pengakuan warisan budaya', text: 'Sigeh Pengunten, Melinting, dan Bedana tercatat sebagai Warisan Budaya Takbenda Indonesia.' },
    { era: '2026', title: 'Kurasi digital Ruwa Jurai', text: 'Draf portal budaya ini disusun untuk membuka akses, bukan menggantikan otoritas pemilik tradisi. Validasi berkelanjutan menjadi bagian dari karyanya.' }
  ];

  const dishes = [
    {
      id: 'seruit',
      name: 'Seruit',
      origin: 'Lampung',
      regencyIds: ['pesisir-barat', 'tanggamus', 'lampung-selatan', 'bandar-lampung'],
      type: 'adat',
      types: ['adat', 'harian'],
      tastes: ['gurih', 'asam', 'pedas', 'smoky'],
      spice: 3,
      time: '45 menit',
      serves: 4,
      difficulty: 'Mudah',
      illustration: 'seruit',
      labels: ['Kebersamaan', 'Ikan bakar'],
      summary: 'Ikan bakar atau goreng yang diaduk dengan sambal, tempoyak, dan mangga muda, lalu disantap bersama lalapan.',
      philosophy: 'Seruit adalah hidangan untuk berkumpul. Satu piring besar diletakkan di tengah, lalu semua orang mengambil bagiannya—rasa yang sama, cerita yang berbeda.',
      story: 'Nama seruit dekat dengan cara mencampur: ikan, sambal, dan asam diaduk menjadi satu. Di pesisir Lampung, ikan segar bertemu terasi dan tempoyak; di meja keluarga, hidangan ini sering menjadi alasan untuk pulang.',
      flavor: { pedas: 3, asam: 4, gurih: 4, manis: 1, rempah: 2, smoky: 4 },
      ingredients: [
        { qty: 4, unit: 'ekor', name: 'ikan segar (kakap, baung, atau pilihan setempat)' },
        { qty: 8, unit: 'buah', name: 'cabai merah keriting' },
        { qty: 4, unit: 'siung', name: 'bawang merah' },
        { qty: 2, unit: 'siung', name: 'bawang putih' },
        { qty: 2, unit: 'sdt', name: 'terasi bakar' },
        { qty: 3, unit: 'sdm', name: 'tempoyak (opsional)' },
        { qty: 1, unit: 'buah', name: 'mangga muda, iris tipis' },
        { qty: 1, unit: 'ikat', name: 'lalapan (timun, kemangi, daun singkong)' },
        { qty: 2, unit: 'sdm', name: 'minyak goreng' },
        { qty: 1, unit: 'sdt', name: 'garam' },
        { qty: 1, unit: 'sdt', name: 'gula pasir' },
        { qty: 1, unit: 'buah', name: 'jeruk limau' }
      ],
      steps: [
        'Bersihkan ikan, lumuri dengan garam dan jeruk limau. Diamkan 10 menit, lalu bakar atau goreng sampai matang dan sedikit kering.',
        'Ulek cabai, bawang merah, bawang putih, terasi, garam, dan gula hingga kasar. Tambahkan tempoyak bila suka rasa fermentasi yang lebih dalam.',
        'Panggang sebentar sambal dalam wajan agar harum. Koreksi rasa: asam, pedas, dan gurih harus berjalan seimbang.',
        'Suwir atau potong ikan, lalu campur dengan sambal dan irisan mangga muda. Aduk perlahan agar ikan tidak hancur.',
        'Sajikan di piring lebar bersama lalapan dan nasi hangat. Letakkan di tengah meja untuk dimakan bersama.'
      ],
      tips: 'Tempoyak boleh diganti mangga muda atau asam jawa bila ingin rasa asam yang lebih segar. Jangan mengaduk terlalu keras—seruit justru enak ketika tekstur ikannya masih terasa.',
      pairings: ['pindang-baung', 'sambal-tempoyak', 'kopi-robusta']
    },
    {
      id: 'pindang-baung',
      name: 'Pindang Baung',
      origin: 'Pesisir Lampung',
      regencyIds: ['tanggamus', 'pesisir-barat', 'lampung-selatan'],
      type: 'harian',
      types: ['harian'],
      tastes: ['asam', 'pedas', 'gurih', 'segar'],
      spice: 3,
      time: '40 menit',
      serves: 4,
      difficulty: 'Mudah',
      illustration: 'pindang',
      labels: ['Berkuah', 'Asam pedas'],
      summary: 'Sup ikan baung dengan kuah asam pedas, kunyit, dan rempah segar—hangat, tajam, dan mengundang keringat.',
      philosophy: 'Pindang bukan hidangan yang bersembunyi di balik rasa manis. Asamnya membangunkan lidah; pedasnya mengingatkan bahwa makan adalah perayaan atas tubuh yang masih hidup.',
      story: 'Pindang baung populer di rumah-rumah pesisir dan warung makan Lampung. Ikan baung yang hidup di sungai dan rawa dipadukan dengan bumbu asam, kunyit, dan cabai. Versi tiap keluarga bisa berbeda, tergantung ikan dan rempah yang tersedia.',
      flavor: { pedas: 3, asam: 5, gurih: 3, manis: 1, rempah: 3, smoky: 1 },
      ingredients: [
        { qty: 600, unit: 'gram', name: 'ikan baung, bersihkan' },
        { qty: 3, unit: 'buah', name: 'asam kandis / asam jawa' },
        { qty: 6, unit: 'buah', name: 'cabai rawit merah' },
        { qty: 3, unit: 'buah', name: 'cabai merah keriting' },
        { qty: 5, unit: 'siung', name: 'bawang merah' },
        { qty: 3, unit: 'siung', name: 'bawang putih' },
        { qty: 2, unit: 'cm', name: 'kunyit' },
        { qty: 1, unit: 'batang', name: 'serai, memarkan' },
        { qty: 2, unit: 'lembar', name: 'daun salam' },
        { qty: 1, unit: 'sdt', name: 'garam' },
        { qty: 1, unit: 'sdt', name: 'gula pasir' },
        { qty: 800, unit: 'ml', name: 'air' }
      ],
      steps: [
        'Haluskan bawang merah, bawang putih, kunyit, dan cabai merah. Tumis bersama serai dan daun salam sampai harum.',
        'Didihkan air, masukkan bumbu tumis, lalu tambahkan asam kandis. Biarkan kuah mendidih beberapa menit agar rasa asam keluar.',
        'Masukkan ikan baung dengan hati-hati. Masak dengan api sedang hingga ikan matang; jangan terlalu sering diaduk.',
        'Tambahkan cabai rawit utuh, garam, dan gula. Koreksi rasa—kuah harus asam, pedas, dan tidak terlalu pekat.',
        'Angkat dan sajikan panas dengan nasi putih. Nikmati kuahnya perlahan; hidangan ini paling enak saat masih mengepul.'
      ],
      tips: 'Gunakan ikan segar bertekstur padat. Bila tidak ada baung, ikan nila atau patin bisa menjadi alternatif—tetapi nama dan rasanya tentu berbeda.',
      pairings: ['seruit', 'kemplang', 'sambal-tempoyak']
    },
    {
      id: 'gulai-taboh',
      name: 'Gulai Taboh',
      origin: 'Lampung',
      regencyIds: ['lampung-tengah', 'lampung-utara', 'way-kanan', 'tulang-bawang'],
      type: 'adat',
      types: ['adat', 'harian'],
      tastes: ['gurih', 'pedas', 'rempah'],
      spice: 2,
      time: '1 jam',
      serves: 6,
      difficulty: 'Sedang',
      illustration: 'gulai',
      labels: ['Hajatan', 'Santan'],
      summary: 'Gulai santan khas Lampung yang sering hadir di hajatan, berisi ikan atau daging dengan sayuran dan bumbu kuning.',
      philosophy: 'Gulai taboh adalah makanan hajatan: dimasak dalam jumlah besar, diaduk bersama, dan dinikmati banyak orang. Santannya mengingatkan bahwa rezeki yang baik adalah yang bisa dibagi.',
      story: 'Dalam banyak hajatan Lampung, gulai taboh hadir sebagai sahabat nasi dan lauk lain. Nama dan isinya bisa berbeda antardaerah; ada yang memakai ikan, ada yang memakai daging atau sayur. Yang tetap sama adalah kuah santan berbumbu dan semangat untuk menjamu.',
      flavor: { pedas: 2, asam: 1, gurih: 5, manis: 2, rempah: 4, smoky: 1 },
      ingredients: [
        { qty: 800, unit: 'gram', name: 'ikan atau daging pilihan' },
        { qty: 800, unit: 'ml', name: 'santan sedang' },
        { qty: 6, unit: 'siung', name: 'bawang merah' },
        { qty: 4, unit: 'siung', name: 'bawang putih' },
        { qty: 3, unit: 'buah', name: 'cabai merah' },
        { qty: 2, unit: 'cm', name: 'kunyit' },
        { qty: 1, unit: 'cm', name: 'jahe' },
        { qty: 2, unit: 'batang', name: 'serai' },
        { qty: 3, unit: 'lembar', name: 'daun salam' },
        { qty: 2, unit: 'buah', name: 'kentang, potong' },
        { qty: 150, unit: 'gram', name: 'nangka muda atau sayur pilihan' },
        { qty: 1, unit: 'sdt', name: 'garam' },
        { qty: 1, unit: 'sdt', name: 'gula' }
      ],
      steps: [
        'Haluskan bawang merah, bawang putih, cabai, kunyit, dan jahe. Tumis bersama serai serta daun salam sampai harum dan matang.',
        'Masukkan ikan atau daging, aduk hingga berubah warna. Tambahkan sedikit air agar bumbu meresap.',
        'Tuang santan, lalu masukkan kentang dan nangka muda. Masak dengan api kecil sambil sesekali diaduk agar santan tidak pecah.',
        'Bumbui garam dan gula. Biarkan hingga bahan empuk dan kuah mengental. Cicipi; rasa santan harus bulat, tidak didominasi pedas.',
        'Sajikan hangat dengan nasi putih. Untuk hajatan, gulai biasanya dimasak lebih encer agar cukup untuk banyak porsi.'
      ],
      tips: 'Aduk santan searah dan jaga api tetap kecil. Bila memakai ikan, masukkan ikan setelah santan mendidih agar tidak mudah hancur.',
      pairings: ['engkak-ketan', 'seruit', 'kopi-robusta']
    },
    {
      id: 'engkak-ketan',
      name: 'Engkak Ketan',
      origin: 'Lampung',
      regencyIds: ['bandar-lampung', 'lampung-selatan', 'lampung-tengah'],
      type: 'adat',
      types: ['adat'],
      tastes: ['manis', 'gurih'],
      spice: 0,
      time: '1,5 jam',
      serves: 8,
      difficulty: 'Sedang',
      illustration: 'engkak',
      labels: ['Kue adat', 'Ketan'],
      summary: 'Kue ketan berlapis dengan santan dan gula, dipotong rapi dan sering hadir di meja pernikahan atau syukuran.',
      philosophy: 'Engkak ketan menuntut kesabaran: beras harus dikukus, adonan harus dijaga, dan lapisan harus menunggu sebelum dipotong. Ia mengajarkan bahwa hal yang manis biasanya lahir dari waktu.',
      story: 'Kue berbahan ketan dan santan ini termasuk hidangan yang akrab dalam perayaan adat Lampung. Resep dan bentuknya berbeda antarkeluarga; ada yang berlapis, ada yang dipanggang, dan ada yang disajikan dalam potongan kecil.',
      flavor: { pedas: 0, asam: 0, gurih: 4, manis: 5, rempah: 1, smoky: 0 },
      ingredients: [
        { qty: 500, unit: 'gram', name: 'beras ketan' },
        { qty: 400, unit: 'ml', name: 'santan kental' },
        { qty: 200, unit: 'gram', name: 'gula pasir' },
        { qty: 1, unit: 'sdt', name: 'garam' },
        { qty: 2, unit: 'lembar', name: 'daun pandan' },
        { qty: 2, unit: 'butir', name: 'telur (opsional, sesuai resep keluarga)' },
        { qty: 50, unit: 'gram', name: 'tepung beras (bila diperlukan)' }
      ],
      steps: [
        'Rendam beras ketan selama beberapa jam, lalu kukus hingga setengah matang. Sisihkan.',
        'Didihkan santan bersama gula, garam, dan pandan. Aduk sampai gula larut; jangan sampai santan pecah.',
        'Campur ketan dengan sebagian santan, lalu kukus kembali hingga matang dan lembut.',
        'Tuang adonan ke loyang yang dialasi daun atau kertas, padatkan, dan kukus lagi sampai seluruhnya matang.',
        'Dinginkan sepenuhnya sebelum dipotong. Gunakan pisau basah agar potongan rapi. Sajikan dalam suhu ruang.'
      ],
      tips: 'Kue ketan harus benar-benar dingin sebelum dipotong. Simpan di wadah tertutup; teksturnya akan semakin padat dan mudah dipotong keesokan hari.',
      pairings: ['kopi-robusta', 'gulai-taboh']
    },
    {
      id: 'kemplang',
      name: 'Kemplang',
      origin: 'Lampung',
      regencyIds: ['lampung-selatan', 'bandar-lampung', 'tulang-bawang'],
      type: 'oleh-oleh',
      types: ['oleh-oleh', 'harian'],
      tastes: ['gurih', 'pedas', 'smoky'],
      spice: 2,
      time: '30 menit',
      serves: 6,
      difficulty: 'Mudah',
      illustration: 'kemplang',
      labels: ['Kerupuk ikan', 'Oleh-oleh'],
      summary: 'Kerupuk ikan khas Lampung yang renyah, cocok dibakar atau digoreng, dan paling nikmat dengan sambal.',
      philosophy: 'Kemplang adalah camilan yang tidak pernah datang sendirian: ia memanggil sambal, teh, dan obrolan. Renyahnya adalah alasan kecil untuk berhenti sejenak.',
      story: 'Kemplang dibuat dari adonan ikan dan tepung, lalu dijemur dan digoreng atau dibakar. Di Lampung, kemplang sering menjadi oleh-oleh dan teman makan di rumah. Bentuk, ketebalan, serta jenis ikannya berbeda antarpembuat.',
      flavor: { pedas: 2, asam: 1, gurih: 4, manis: 1, rempah: 1, smoky: 3 },
      ingredients: [
        { qty: 500, unit: 'gram', name: 'daging ikan tenggiri atau ikan pilihan' },
        { qty: 500, unit: 'gram', name: 'tepung tapioka' },
        { qty: 3, unit: 'siung', name: 'bawang putih' },
        { qty: 1, unit: 'sdt', name: 'garam' },
        { qty: 1, unit: 'sdt', name: 'kaldu bubuk (opsional)' },
        { qty: 1, unit: 'sdt', name: 'gula pasir' },
        { qty: 200, unit: 'ml', name: 'air' },
        { qty: 500, unit: 'ml', name: 'minyak untuk menggoreng' }
      ],
      steps: [
        'Haluskan ikan bersama bawang putih, garam, gula, dan air hingga menjadi pasta.',
        'Campur pasta ikan dengan tepung tapioka sedikit demi sedikit sampai adonan bisa dibentuk.',
        'Bentuk adonan menjadi lonjong atau bulat pipih, lalu kukus hingga setengah matang. Dinginkan.',
        'Iris tipis adonan, lalu jemur di bawah sinar matahari hingga kering. Simpan dalam wadah tertutup bila belum digoreng.',
        'Goreng dalam minyak panas hingga mekar dan renyah, atau bakar di atas bara. Sajikan dengan sambal favorit.'
      ],
      tips: 'Keringkan kemplang dengan benar sebelum digoreng; sisa air membuatnya keras. Bila membeli, pilih yang berwarna alami dan tidak berbau tengik.',
      pairings: ['seruit', 'sambal-tempoyak', 'kopi-robusta']
    },
    {
      id: 'keripik-pisang',
      name: 'Keripik Pisang',
      origin: 'Lampung',
      regencyIds: ['bandar-lampung', 'lampung-selatan', 'pringsewu', 'lampung-timur'],
      type: 'oleh-oleh',
      types: ['oleh-oleh'],
      tastes: ['manis', 'gurih'],
      spice: 0,
      time: '40 menit',
      serves: 4,
      difficulty: 'Mudah',
      illustration: 'keripik',
      labels: ['Oleh-oleh', 'Renyah'],
      summary: 'Irisan pisang renyah dengan aneka rasa, dari manis klasik sampai gurih asin—camilan yang mudah dibawa pulang.',
      philosophy: 'Pisang tumbuh mudah di banyak tanah. Keripik pisang adalah cara sederhana mengubah hasil bumi menjadi kebahagiaan kecil yang bisa dibagi.',
      story: 'Lampung dikenal dengan keripik pisangnya, terutama dari Bandar Lampung. Pisang kepok atau pisang lain diiris tipis, digoreng, lalu dibumbui. Versi manis, asin, cokelat, dan balado hidup berdampingan di rak toko oleh-oleh.',
      flavor: { pedas: 1, asam: 1, gurih: 3, manis: 4, rempah: 1, smoky: 1 },
      ingredients: [
        { qty: 6, unit: 'buah', name: 'pisang kepok setengah matang' },
        { qty: 500, unit: 'ml', name: 'minyak goreng' },
        { qty: 3, unit: 'sdm', name: 'gula halus (untuk versi manis)' },
        { qty: 1, unit: 'sdt', name: 'garam (untuk versi asin)' },
        { qty: 1, unit: 'sdt', name: 'bubuk cabai (opsional)' }
      ],
      steps: [
        'Kupas pisang, lalu iris sangat tipis menggunakan pisau atau slicer. Usahakan ketebalannya seragam.',
        'Rendam irisan dalam air garam sebentar agar tidak cepat menghitam, lalu tiriskan dan keringkan.',
        'Goreng dalam minyak panas hingga kuning keemasan. Jangan menaruh terlalu banyak irisan sekaligus.',
        'Tiriskan di atas kertas minyak. Selagi hangat, taburi gula halus, garam, atau bubuk cabai sesuai selera.',
        'Dinginkan sepenuhnya sebelum disimpan dalam wadah kedap udara agar tetap renyah.'
      ],
      tips: 'Pilih pisang yang masih agak keras. Untuk rasa yang lebih kompleks, coba campur gula halus dengan sedikit garam sebelum ditaburkan.',
      pairings: ['kopi-robusta', 'lempok-durian']
    },
    {
      id: 'lempok-durian',
      name: 'Lempok Durian',
      origin: 'Lampung',
      regencyIds: ['lampung-barat', 'pesisir-barat', 'tanggamus'],
      type: 'oleh-oleh',
      types: ['oleh-oleh'],
      tastes: ['manis', 'gurih', 'fermentasi'],
      spice: 0,
      time: '1 jam',
      serves: 6,
      difficulty: 'Mudah',
      illustration: 'lempok',
      labels: ['Durian', 'Oleh-oleh'],
      summary: 'Selai durian yang pekat dan manis, dimasak perlahan hingga tahan lama—oleh-oleh khas yang berani.',
      philosophy: 'Durian membelah orang menjadi dua: mencintai atau menghindar. Lempok merayakan yang pertama, mengubah buah musiman menjadi suguhan yang bisa dinikmati lebih lama.',
      story: 'Lempok dibuat dari daging durian yang dimasak dengan gula dan sedikit garam hingga mengental. Di Lampung, durian dari pegunungan dan pesisir diolah menjadi lempok untuk oleh-oleh. Aroma dan tingkat kemanisannya sangat bergantung pada buah yang dipakai.',
      flavor: { pedas: 0, asam: 1, gurih: 3, manis: 5, rempah: 1, smoky: 0 },
      ingredients: [
        { qty: 500, unit: 'gram', name: 'daging durian' },
        { qty: 250, unit: 'gram', name: 'gula pasir' },
        { qty: 1, unit: 'sdt', name: 'garam' },
        { qty: 100, unit: 'ml', name: 'santan (opsional)' },
        { qty: 1, unit: 'lembar', name: 'daun pandan (opsional)' }
      ],
      steps: [
        'Buah durian disuwir atau dihaluskan kasar. Buang biji dan bagian yang terlalu keras.',
        'Masak daging durian dengan gula dan garam di wajan anti lengket. Aduk terus dengan api kecil.',
        'Tambahkan santan dan pandan bila memakai. Masak hingga adonan mengental dan berubah menjadi pasta yang berat.',
        'Uji dengan mengambil sedikit adonan; bila tidak mudah jatuh dan warna menjadi lebih gelap, lempok siap.',
        'Dinginkan, lalu simpan dalam wadah bersih. Sajikan dengan roti, ketan, atau langsung dari sendok.'
      ],
      tips: 'Jangan menambahkan terlalu banyak gula bila durian sudah sangat manis. Api kecil dan adukan sabar adalah kunci lempok yang tidak gosong.',
      pairings: ['kopi-robusta', 'keripik-pisang', 'engkak-ketan']
    },
    {
      id: 'kopi-robusta',
      name: 'Kopi Robusta',
      origin: 'Lampung Barat & Tanggamus',
      regencyIds: ['lampung-barat', 'tanggamus', 'way-kanan'],
      type: 'harian',
      types: ['harian', 'oleh-oleh'],
      tastes: ['pahit', 'gurih', 'smoky'],
      spice: 0,
      time: '10 menit',
      serves: 2,
      difficulty: 'Mudah',
      illustration: 'kopi',
      labels: ['Kopi', 'Dataran tinggi'],
      summary: 'Kopi robusta Lampung dengan tubuh tebal dan rasa kuat, tumbuh di dataran tinggi Liwa, Way Tenong, dan Tanggamus.',
      philosophy: 'Secangkir kopi adalah cara menghentikan dunia sebentar. Di Lampung, kopi juga adalah kerja panjang petani, cuaca, dan tanah yang harus dibayar dengan harga yang adil.',
      story: 'Lampung adalah salah satu daerah penghasil robusta penting di Indonesia. Kopi dari Liwa, Way Tenong, dan Tanggamus dikenal dengan body yang tebal dan rasa yang kuat. Setiap ketinggian dan cara olah memberi karakter berbeda.',
      flavor: { pedas: 0, asam: 2, gurih: 3, manis: 1, rempah: 2, smoky: 4, pahit: 5 },
      ingredients: [
        { qty: 30, unit: 'gram', name: 'biji kopi robusta Lampung, digiling kasar' },
        { qty: 300, unit: 'ml', name: 'air panas (92–96°C)' },
        { qty: 2, unit: 'sdt', name: 'gula (opsional)' },
        { qty: 40, unit: 'ml', name: 'susu (opsional)' }
      ],
      steps: [
        'Panaskan air hingga mendekati didih, lalu diamkan sebentar. Basahi filter dengan air panas.',
        'Masukkan kopi giling ke dalam filter. Tuang sedikit air untuk blooming, tunggu 30 detik.',
        'Tuang air perlahan dalam lingkaran hingga volume yang diinginkan. Jaga agar bubuk kopi tidak meluap.',
        'Angkat filter, aduk ringan, dan sajikan. Untuk versi susu, tambahkan susu panas setelah kopi.',
        'Nikmati sambil mencatat asal kopi dan tanggal sangrai—dua informasi kecil yang membuat rasa lebih bermakna.'
      ],
      tips: 'Robusta lebih nikmat bila tidak diseduh terlalu lama; rasa pahitnya bisa dominan. Simpan biji kopi dalam wadah kedap udara, jauh dari cahaya.',
      pairings: ['engkak-ketan', 'keripik-pisang', 'lempok-durian']
    },
    {
      id: 'sambal-tempoyak',
      name: 'Sambal Tempoyak',
      origin: 'Lampung',
      regencyIds: ['lampung-selatan', 'lampung-tengah', 'pesisir-barat'],
      type: 'harian',
      types: ['harian'],
      tastes: ['pedas', 'asam', 'fermentasi'],
      spice: 4,
      time: '20 menit',
      serves: 4,
      difficulty: 'Mudah',
      illustration: 'sambal',
      labels: ['Fermentasi', 'Pendamping'],
      summary: 'Sambal dari tempoyak—durian fermentasi—yang asam, pedas, dan beraroma dalam. Pendamping ikan yang tak terlupakan.',
      philosophy: 'Tempoyak mengajarkan bahwa waktu bisa menjadi bumbu. Rasa asam dan aromanya yang tajam adalah hasil kesabaran, bukan kebetulan.',
      story: 'Tempoyak dibuat dengan memfermentasi daging durian dan sedikit garam. Di Lampung dan Sumatra, tempoyak diolah menjadi sambal, kuah, atau campuran ikan. Bagi yang baru mencoba, aromanya bisa mengejutkan—bagi yang sudah biasa, ia adalah rasa rumah.',
      flavor: { pedas: 4, asam: 5, gurih: 3, manis: 1, rempah: 1, smoky: 1 },
      ingredients: [
        { qty: 4, unit: 'sdm', name: 'tempoyak' },
        { qty: 8, unit: 'buah', name: 'cabai rawit merah' },
        { qty: 4, unit: 'siung', name: 'bawang merah' },
        { qty: 2, unit: 'siung', name: 'bawang putih' },
        { qty: 1, unit: 'sdt', name: 'terasi bakar' },
        { qty: 1, unit: 'sdt', name: 'gula' },
        { qty: 1, unit: 'sdt', name: 'garam' },
        { qty: 2, unit: 'sdm', name: 'minyak goreng' }
      ],
      steps: [
        'Ulek cabai, bawang merah, bawang putih, terasi, garam, dan gula hingga setengah halus.',
        'Tambahkan tempoyak, lalu ulek perlahan. Jangan terlalu halus—tekstur tempoyak sebaiknya masih terasa.',
        'Panaskan minyak, tumis sambal sebentar sampai harum. Jangan terlalu lama agar aroma fermentasi tetap hidup.',
        'Koreksi rasa: asam dari tempoyak, pedas dari cabai, dan gurih dari terasi harus seimbang.',
        'Sajikan dengan ikan bakar, seruit, atau nasi hangat. Simpan di kulkas dan habiskan dalam beberapa hari.'
      ],
      tips: 'Bila aroma tempoyak terlalu kuat, mulai dengan 2 sendok makan lalu tambahkan sesuai selera. Bagi yang belum terbiasa, campurkan sedikit perasan jeruk limau.',
      pairings: ['seruit', 'pindang-baung', 'kemplang']
    }
  ];

  const ingredients = [
    { id: 'lada', name: 'Lada Hitam', latin: 'Piper nigrum', origin: 'Lampung', role: 'Rempah hangat untuk sup, tumis, dan lauk.', fact: 'Lampung lama dikenal sebagai daerah penghasil lada. Biji yang dipanen setengah matang lalu dikeringkan menjadi lada hitam.', icon: 'pepper' },
    { id: 'kopi', name: 'Kopi Robusta', latin: 'Coffea canephora', origin: 'Liwa, Way Tenong, Tanggamus', role: 'Minuman dan identitas ekonomi dataran tinggi.', fact: 'Body tebal dan rasa kuat membuat robusta Lampung digemari untuk kopi susu dan campuran espresso.', icon: 'coffee' },
    { id: 'kakao', name: 'Kakao', latin: 'Theobroma cacao', origin: 'Lampung', role: 'Bahan cokelat dan produk olahan.', fact: 'Biji kakao difermentasi untuk membentuk aroma cokelat. Lampung termasuk salah satu daerah produksi kakao di Sumatra.', icon: 'cocoa' },
    { id: 'pisang', name: 'Pisang', latin: 'Musa spp.', origin: 'Lampung', role: 'Camilan, kue, dan hidangan sehari-hari.', fact: 'Pisang kepok sangat populer untuk keripik karena teksturnya padat dan tidak terlalu berair.', icon: 'banana' },
    { id: 'singkong', name: 'Singkong', latin: 'Manihot esculenta', origin: 'Lampung', role: 'Sumber karbohidrat dan bahan olahan.', fact: 'Singkong dapat diolah menjadi tape, keripik, dan tepung. Ia menjadi bagian dari ketahanan pangan banyak keluarga.', icon: 'cassava' },
    { id: 'durian', name: 'Durian', latin: 'Durio spp.', origin: 'Lampung Barat, Pesisir Barat, Tanggamus', role: 'Buah musiman, lempok, dan tempoyak.', fact: 'Musim durian menjadi momen sosial. Daging buah yang melimpah sering diawetkan menjadi lempok atau difermentasi menjadi tempoyak.', icon: 'durian' },
    { id: 'terasi', name: 'Terasi', latin: 'Fermented shrimp paste', origin: 'Pesisir Lampung', role: 'Umami untuk sambal dan seruit.', fact: 'Terasi dibuat dari udang kecil yang difermentasi dan dijemur. Aromanya kuat, tetapi rasanya memberi kedalaman pada sambal.', icon: 'shrimp' },
    { id: 'tempoyak', name: 'Tempoyak', latin: 'Fermented durian', origin: 'Lampung', role: 'Bumbu asam-fermentasi untuk sambal dan kuah.', fact: 'Tempoyak adalah cara tradisional mengawetkan durian. Rasanya asam, sedikit pahit, dan sangat khas.', icon: 'tempoyak' }
  ];

  const regions = [
    {
      id: 'pesisir-barat', name: 'Pesisir Barat', capital: 'Krui', adat: 'saibatin', adatLabel: 'Saibatin',
      title: 'Ombak, kopi, dan adat pesisir',
      summary: 'Pesisir Barat membentang di ujung selatan Sumatra, menghadap Samudra Hindia. Krui dan sekitarnya hidup dari laut, kopi, dan tradisi pesisir yang kuat.',
      entries: ['saibatin', 'nyambai', 'tapis'], dishes: ['seruit', 'pindang-baung', 'kopi-robusta'],
      highlights: ['Tari Nyambai', 'Tapis pesisir', 'Seruit ikan segar', 'Kopi dataran tinggi'],
      label: { x: 170, y: 700, anchor: 'middle' }
    },
    {
      id: 'lampung-barat', name: 'Lampung Barat', capital: 'Liwa', adat: 'lintas', adatLabel: 'Lintas adat',
      title: 'Sekura, kopi, dan udara pegunungan',
      summary: 'Lampung Barat dikenal dengan lanskap pegunungan, kopi, dan tradisi Sekura. Wilayah ini menjadi ruang pertemuan berbagai pengaruh budaya.',
      entries: ['sekura', 'tapis', 'lamban-pesagi'], dishes: ['kopi-robusta', 'lempok-durian'],
      highlights: ['Sekura Cakak Buah', 'Kopi Liwa', 'Lempok durian', 'Tapis'],
      label: { x: 260, y: 570, anchor: 'middle' }
    },
    {
      id: 'tanggamus', name: 'Tanggamus', capital: 'Kota Agung', adat: 'saibatin', adatLabel: 'Saibatin',
      title: 'Kota Agung dan jalur pesisir',
      summary: 'Tanggamus menghubungkan pesisir barat dengan dataran Lampung. Kota Agung menjadi simpul perdagangan dan budaya yang dekat dengan laut.',
      entries: ['saibatin', 'nyambai', 'sigeh-pengunten'], dishes: ['pindang-baung', 'seruit', 'kopi-robusta'],
      highlights: ['Pindang baung', 'Nyambai', 'Kopi Tanggamus'],
      label: { x: 385, y: 722, anchor: 'middle' }
    },
    {
      id: 'pesawaran', name: 'Pesawaran', capital: 'Gedong Tataan', adat: 'saibatin', adatLabel: 'Saibatin',
      title: 'Pesisir Teluk dan jalur cerita',
      summary: 'Pesawaran berada di antara Bandar Lampung dan pesisir. Wilayah ini menjadi persimpangan masyarakat, kuliner, dan tradisi pesisir.',
      entries: ['saibatin', 'siger', 'tapis'], dishes: ['seruit', 'kemplang', 'keripik-pisang'],
      highlights: ['Seruit', 'Siger', 'Kemplang'],
      label: { x: 520, y: 704, anchor: 'middle' }
    },
    {
      id: 'pringsewu', name: 'Pringsewu', capital: 'Pringsewu', adat: 'lintas', adatLabel: 'Lintas adat',
      title: 'Pasar rasa dan pertemuan budaya',
      summary: 'Pringsewu tumbuh sebagai wilayah dengan beragam latar budaya. Pasar dan rumah makan menjadi ruang bertemu yang hidup.',
      entries: ['tapis', 'ngakuk-majau', 'siger'], dishes: ['keripik-pisang', 'gulai-taboh'],
      highlights: ['Keripik pisang', 'Tapis', 'Gulai hajatan'],
      label: { x: 472, y: 630, anchor: 'middle' }
    },
    {
      id: 'lampung-selatan', name: 'Lampung Selatan', capital: 'Kalianda', adat: 'saibatin', adatLabel: 'Saibatin',
      title: 'Kalianda, laut, dan tapis',
      summary: 'Lampung Selatan memiliki garis pantai panjang, jejak Krakatau, dan tradisi pesisir yang hidup. Kalianda menjadi salah satu pusat budayanya.',
      entries: ['saibatin', 'tapis', 'siger', 'nyambai'], dishes: ['seruit', 'kemplang', 'pindang-baung'],
      highlights: ['Seruit', 'Tapis', 'Siger', 'Kemplang'],
      label: { x: 720, y: 715, anchor: 'middle' }
    },
    {
      id: 'bandar-lampung', name: 'Bandar Lampung', capital: 'Bandar Lampung', adat: 'lintas', adatLabel: 'Lintas adat',
      title: 'Gerbang kota, museum, dan UMKM budaya',
      summary: 'Bandar Lampung adalah kota pelabuhan dan pusat aktivitas provinsi. Di sini tradisi bertemu pasar, sekolah, museum, dan generasi digital.',
      entries: ['museum-lampung', 'tapis', 'aksara-lampung'], dishes: ['kopi-robusta', 'kemplang', 'keripik-pisang'],
      highlights: ['Museum Lampung', 'Tapis & siger', 'Kopi', 'Kemplang'],
      label: { x: 640, y: 665, anchor: 'end' }
    },
    {
      id: 'lampung-tengah', name: 'Lampung Tengah', capital: 'Gunung Sugih', adat: 'pepadun', adatLabel: 'Pepadun',
      title: 'Jantung adat Pepadun',
      summary: 'Lampung Tengah adalah salah satu pusat masyarakat Pepadun. Begawi, cangget, dan talo balak menjadi bagian dari denyut budaya.',
      entries: ['pepadun', 'begawi', 'cangget', 'gamolan-talo-balak'], dishes: ['gulai-taboh', 'engkak-ketan'],
      highlights: ['Begawi', 'Cangget', 'Gamolan', 'Gulai taboh'],
      label: { x: 600, y: 485, anchor: 'middle' }
    },
    {
      id: 'lampung-timur', name: 'Lampung Timur', capital: 'Sukadana', adat: 'melinting', adatLabel: 'Melinting',
      title: 'Melinting dan jejak masa lampau',
      summary: 'Lampung Timur menyimpan sejarah Keratuan Melinting dan situs purbakala Pugung Raharjo. Budaya pesisir dan pedalaman bertemu di sini.',
      entries: ['melinting', 'pugung-raharjo', 'tapis'], dishes: ['keripik-pisang', 'kemplang'],
      highlights: ['Tari Melinting', 'Pugung Raharjo', 'Keripik pisang'],
      label: { x: 735, y: 560, anchor: 'middle' }
    },
    {
      id: 'metro', name: 'Kota Metro', capital: 'Metro', adat: 'lintas', adatLabel: 'Lintas adat',
      title: 'Kota muda, ruang belajar',
      summary: 'Metro adalah kota yang tumbuh dari semangat pendidikan dan pertanian. Sekolah, komunitas, dan ruang kreatif menjadi tempat budaya diperkenalkan kembali.',
      entries: ['aksara-lampung', 'sastra-lisan', 'tapis'], dishes: ['kopi-robusta', 'keripik-pisang'],
      highlights: ['Aksara Lampung', 'Komunitas belajar', 'Kopi'],
      label: { x: 625, y: 575, anchor: 'start' }
    },
    {
      id: 'lampung-utara', name: 'Lampung Utara', capital: 'Kotabumi', adat: 'pepadun', adatLabel: 'Pepadun',
      title: 'Kotabumi, lada, dan gelar adat',
      summary: 'Lampung Utara terhubung dengan sejarah Pepadun dan perdagangan hasil bumi. Lada dan kopi menjadi bagian dari lanskap ekonominya.',
      entries: ['pepadun', 'begawi', 'tapis'], dishes: ['gulai-taboh', 'kopi-robusta'],
      highlights: ['Begawi', 'Lada', 'Tapis'],
      label: { x: 445, y: 455, anchor: 'middle' }
    },
    {
      id: 'tulang-bawang', name: 'Tulang Bawang', capital: 'Menggala', adat: 'pepadun', adatLabel: 'Pepadun',
      title: 'Sungai, marga, dan tradisi',
      summary: 'Tulang Bawang dikenal sebagai salah satu rumpun Pepadun. Sungai dan tanah agraris membentuk ritme kehidupan warganya.',
      entries: ['pepadun', 'cangget', 'begawi'], dishes: ['gulai-taboh', 'kemplang'],
      highlights: ['Cangget', 'Begawi', 'Gulai taboh'],
      label: { x: 685, y: 325, anchor: 'middle' }
    },
    {
      id: 'tulang-bawang-barat', name: 'Tulang Bawang Barat', capital: 'Panaragan', adat: 'pepadun', adatLabel: 'Pepadun',
      title: 'Panaragan dan tenun adat',
      summary: 'Tulang Bawang Barat adalah wilayah Pepadun yang terus menata identitas budayanya. Tenun, upacara, dan kuliner hajatan hidup berdampingan.',
      entries: ['pepadun', 'tapis', 'cangget'], dishes: ['gulai-taboh', 'seruit'],
      highlights: ['Tapis', 'Cangget', 'Seruit'],
      label: { x: 550, y: 330, anchor: 'middle' }
    },
    {
      id: 'way-kanan', name: 'Way Kanan', capital: 'Blambangan Umpu', adat: 'pepadun', adatLabel: 'Pepadun',
      title: 'Sungai, marga, dan gamolan',
      summary: 'Way Kanan berada di utara Lampung dan terhubung dengan rumpun Pepadun Way Kanan–Sungkai. Musik dan upacara adat menjadi bagian penting.',
      entries: ['pepadun', 'gamolan-talo-balak', 'begawi'], dishes: ['gulai-taboh', 'kopi-robusta'],
      highlights: ['Gamolan', 'Begawi', 'Kopi'],
      label: { x: 345, y: 370, anchor: 'middle' }
    },
    {
      id: 'mesuji', name: 'Mesuji', capital: 'Wiralaga Mulya', adat: 'pepadun', adatLabel: 'Pepadun',
      title: 'Ujung utara, pertemuan budaya',
      summary: 'Mesuji berada di ujung utara Lampung. Sebagai wilayah yang terus berkembang, ia menjadi ruang pertemuan masyarakat Pepadun dan pendatang.',
      entries: ['pepadun', 'lamban-pesagi', 'kerajinan'], dishes: ['gulai-taboh', 'kemplang'],
      highlights: ['Pepadun', 'Kerajinan', 'Gulai'],
      label: { x: 575, y: 215, anchor: 'middle' }
    }
  ];

  const dictionary = [
    { term: 'sai', meaning: 'satu', dialect: 'Umum', category: 'Bilangan', note: 'Bagian dari semboyan Sai Bumi Ruwa Jurai.' },
    { term: 'bumi', meaning: 'bumi, tanah', dialect: 'Umum', category: 'Alam', note: 'Merujuk pada tanah tempat hidup bersama.' },
    { term: 'ruwa', meaning: 'dua', dialect: 'Umum', category: 'Bilangan', note: 'Menunjuk dua garis keturunan dalam semboyan provinsi.' },
    { term: 'jurai', meaning: 'garis keturunan', dialect: 'Umum', category: 'Kekerabatan', note: 'Ruwa Jurai: dua garis keturunan.' },
    { term: 'piil', meaning: 'rasa harga diri', dialect: 'Umum', category: 'Falsafah', note: 'Bagian dari Piil Pesenggiri.' },
    { term: 'pesenggiri', meaning: 'kehormatan, nama baik', dialect: 'Umum', category: 'Falsafah', note: 'Dijaga bersama keluarga dan komunitas.' },
    { term: 'juluk-adok', meaning: 'gelar dan nama kehormatan', dialect: 'Umum', category: 'Adat', note: 'Salah satu unsur Piil Pesenggiri.' },
    { term: 'nemui-nyimah', meaning: 'ramah menerima tamu', dialect: 'Umum', category: 'Falsafah', note: 'Keramahan dan keterbukaan terhadap tamu.' },
    { term: 'nengah-nyappur', meaning: 'bergaul dan berbaur', dialect: 'Umum', category: 'Falsafah', note: 'Kemampuan masuk ke ruang sosial baru.' },
    { term: 'sakai-sambayan', meaning: 'gotong royong', dialect: 'Umum', category: 'Falsafah', note: 'Bekerja bersama dan saling menolong.' },
    { term: 'tabik', meaning: 'salam, permisi', dialect: 'Umum', category: 'Sapaan', note: 'Sering muncul dalam sapaan “tabik pun”.' },
    { term: 'api', meaning: 'apa', dialect: 'A', category: 'Tanya', note: 'Penanda dialek A (Api).' },
    { term: 'nyow', meaning: 'apa', dialect: 'O', category: 'Tanya', note: 'Penanda dialek O (Nyow).' },
    { term: 'mengan', meaning: 'makan', dialect: 'Umum', category: 'Kuliner', note: 'Bentuk kata yang muncul dalam istilah cuak mengan.' },
    { term: 'way', meaning: 'air, sungai', dialect: 'Umum', category: 'Alam', note: 'Banyak nama tempat di Lampung memakai kata ini.' },
    { term: 'balak', meaning: 'besar', dialect: 'Umum', category: 'Sifat', note: 'Muncul pada nuwo balak dan talo balak.' },
    { term: 'lamban', meaning: 'rumah', dialect: 'Umum', category: 'Rumah', note: 'Dikenal dalam istilah lamban pesagi.' },
    { term: 'nuwo', meaning: 'rumah', dialect: 'Umum', category: 'Rumah', note: 'Dikenal dalam istilah nuwo balak dan nuwo sesat.' },
    { term: 'penyimbang', meaning: 'pemimpin adat', dialect: 'Umum', category: 'Adat', note: 'Istilah dalam masyarakat Pepadun.' },
    { term: 'buay', meaning: 'marga, klan', dialect: 'Umum', category: 'Kekerabatan', note: 'Ejaan dan penggunaannya dapat berbeda.' },
    { term: 'marga', meaning: 'kelompok kekerabatan', dialect: 'Umum', category: 'Kekerabatan', note: 'Menjadi salah satu dasar tata adat.' },
    { term: 'siger', meaning: 'mahkota adat', dialect: 'Umum', category: 'Busana', note: 'Umumnya dikenakan pengantin perempuan.' },
    { term: 'tapis', meaning: 'kain tenun bersulam', dialect: 'Umum', category: 'Busana', note: 'Kain khas Lampung dengan sulaman benang emas.' },
    { term: 'begawi', meaning: 'upacara adat Pepadun', dialect: 'Umum', category: 'Adat', note: 'Rangkaian peneguhan gelar atau hajatan adat.' },
    { term: 'cangget', meaning: 'tari adat', dialect: 'Umum', category: 'Seni', note: 'Hadir dalam upacara Pepadun.' },
    { term: 'sekura', meaning: 'topeng', dialect: 'Umum', category: 'Seni', note: 'Tradisi topeng dari Lampung Barat.' },
    { term: 'nyambai', meaning: 'tari pertemuan', dialect: 'Umum', category: 'Seni', note: 'Tari pergaulan dalam adat Saibatin.' },
    { term: 'muli', meaning: 'gadis', dialect: 'Umum', category: 'Kekerabatan', note: 'Istilah dalam adat Lampung.' },
    { term: 'meghanai', meaning: 'bujang', dialect: 'Umum', category: 'Kekerabatan', note: 'Istilah dalam adat Lampung.' },
    { term: 'nayuh', meaning: 'rangkaian pernikahan adat', dialect: 'Umum', category: 'Adat', note: 'Istilah pada masyarakat Saibatin.' },
    { term: 'seruit', meaning: 'ikan dengan sambal', dialect: 'Umum', category: 'Kuliner', note: 'Hidangan bersama khas Lampung.' },
    { term: 'pindang', meaning: 'sup ikan asam', dialect: 'Umum', category: 'Kuliner', note: 'Kuah asam pedas dengan ikan.' },
    { term: 'tempoyak', meaning: 'durian fermentasi', dialect: 'Umum', category: 'Kuliner', note: 'Dipakai sebagai bumbu asam.' },
    { term: 'kemplang', meaning: 'kerupuk ikan', dialect: 'Umum', category: 'Kuliner', note: 'Camilan khas Lampung.' },
    { term: 'gamolan', meaning: 'alat musik pukul', dialect: 'Umum', category: 'Seni', note: 'Instrumen tradisional Lampung.' },
    { term: 'talo balak', meaning: 'ansambel gong', dialect: 'Umum', category: 'Seni', note: 'Mengiringi upacara dan tari.' },
    { term: 'warahan', meaning: 'cerita lisan', dialect: 'Umum', category: 'Sastra', note: 'Salah satu bentuk sastra lisan.' },
    { term: 'pisaan', meaning: 'tutur berirama', dialect: 'Umum', category: 'Sastra', note: 'Berisi nasihat atau sindiran halus.' },
    { term: 'hahiwang', meaning: 'tutur bernuansa duka', dialect: 'Umum', category: 'Sastra', note: 'Bentuk sastra lisan.' },
    { term: 'wawancan', meaning: 'tutur adat', dialect: 'Umum', category: 'Sastra', note: 'Disampaikan dalam upacara.' },
    { term: 'gawi', meaning: 'kegiatan, kerja, hajatan', dialect: 'Umum', category: 'Umum', note: 'Dipakai sebagai nama ruang bermain di situs ini; makna perlu validasi.' },
    { term: 'had lampung', meaning: 'aksara Lampung', dialect: 'Umum', category: 'Aksara', note: 'Sebutan untuk sistem tulisan Lampung.' }
  ];

  const quizzes = [
    {
      q: 'Apa empat unsur utama Piil Pesenggiri?',
      options: ['Juluk-adok, Nemui-nyimah, Nengah-nyappur, Sakai-sambayan', 'Siger, Tapis, Seruit, Gamolan', 'Saibatin, Pepadun, Melinting, Pubian', 'Warahan, Pisaan, Hahiwang, Wawancan'],
      answer: 0,
      explain: 'Empat unsurnya adalah Juluk-adok, Nemui-nyimah, Nengah-nyappur, dan Sakai-sambayan.'
    },
    {
      q: 'Kain tenun bersulam benang emas khas Lampung disebut…',
      options: ['Songket', 'Tapis', 'Ulos', 'Batik'],
      answer: 1,
      explain: 'Tapis adalah kain tenun bersulam benang emas khas Lampung.'
    },
    {
      q: 'Masyarakat adat yang sering dikaitkan dengan wilayah pesisir Lampung adalah…',
      options: ['Pepadun', 'Saibatin', 'Melinting', 'Pubian'],
      answer: 1,
      explain: 'Saibatin kerap disebut sebagai masyarakat adat pesisir. Pepadun lebih sering dikaitkan dengan pedalaman.'
    },
    {
      q: 'Upacara peneguhan gelar adat dalam masyarakat Pepadun dikenal sebagai…',
      options: ['Sekura', 'Nyambai', 'Begawi / Cakak Pepadun', 'Bedana'],
      answer: 2,
      explain: 'Begawi/Cakak Pepadun adalah rangkaian upacara peneguhan gelar dan status adat.'
    },
    {
      q: 'Tari Sigeh Pengunten berfungsi sebagai…',
      options: ['Tari perang', 'Tari penyambutan tamu', 'Tari panen', 'Tari duka'],
      answer: 1,
      explain: 'Sigeh Pengunten adalah tari penyambutan dan penghormatan kepada tamu. Tari ini ditetapkan sebagai WBTb pada 2014.'
    },
    {
      q: 'Tradisi topeng Sekura berasal dari…',
      options: ['Lampung Timur', 'Lampung Barat', 'Pesisir Barat', 'Way Kanan'],
      answer: 1,
      explain: 'Sekura hidup di Lampung Barat dan berlangsung di sekitar perayaan Idulfitri.'
    },
    {
      q: 'Properti yang menjadi penanda dalam Tari Nyambai adalah…',
      options: ['Keris', 'Selendang', 'Payung', 'Tepak'],
      answer: 1,
      explain: 'Selendang dipakai sebagai properti tari sekaligus penentu siapa yang maju menari.'
    },
    {
      q: 'Aksara Lampung termasuk jenis tulisan…',
      options: ['Alfabet', 'Abugida', 'Silabis murni', 'Logografis'],
      answer: 1,
      explain: 'Aksara Lampung adalah abugida: huruf induk membawa vokal bawaan yang dapat diubah anak huruf.'
    },
    {
      q: 'Seruit paling tepat digambarkan sebagai…',
      options: ['Kue berlapis', 'Ikan dengan sambal dan lalapan', 'Sup durian', 'Kopi rempah'],
      answer: 1,
      explain: 'Seruit adalah ikan bakar/goreng yang dicampur sambal, tempoyak/mangga, lalu disantap dengan lalapan.'
    },
    {
      q: 'Semboyan “Sai Bumi Ruwa Jurai” berkaitan dengan…',
      options: ['Dua lautan', 'Dua garis keturunan dalam satu bumi', 'Tujuh pucuk siger', 'Empat unsur adat'],
      answer: 1,
      explain: 'Sai Bumi Ruwa Jurai berarti satu bumi, dua garis keturunan—menggambarkan kesatuan dalam keberagaman adat Lampung.'
    }
  ];

  const agenda = [
    { id: 'sekura', title: 'Sekura Cakak Buah', month: 'Syawal', months: [3, 4], approximate: true, location: 'Lampung Barat', type: 'Festival rakyat', desc: 'Topeng, musik, dan arak-arakan buah merayakan Idulfitri bersama warga.', color: '#a85c3e', icon: 'mask' },
    { id: 'panen-kopi', title: 'Musim Panen Kopi', month: 'Juni–Agustus', months: [5, 6, 7], approximate: true, location: 'Lampung Barat & Tanggamus', type: 'Musim', desc: 'Dataran tinggi memasuki musim petik. Waktu terbaik untuk belajar tentang kopi langsung dari petani.', color: '#6e4331', icon: 'coffee' },
    { id: 'durian', title: 'Musim Durian', month: 'Desember–Februari', months: [11, 0, 1], approximate: true, location: 'Lampung Barat, Pesisir Barat', type: 'Musim', desc: 'Durian lokal memenuhi pasar. Lempok dan tempoyak menemukan bahan terbaiknya.', color: '#b98635', icon: 'durian' },
    { id: 'begawi', title: 'Gawi Adat', month: 'Sepanjang tahun', months: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], approximate: true, location: 'Wilayah Pepadun', type: 'Upacara', desc: 'Hajatan adat bergantung pada kesepakatan keluarga. Tidak semua prosesi terbuka untuk umum.', color: '#6a1c2b', icon: 'throne' },
    { id: 'nyambai', title: 'Rangkaian Nayuh', month: 'Menyesuaikan keluarga', months: [4, 5, 6, 7, 8, 9], approximate: true, location: 'Pesisir Lampung', type: 'Upacara', desc: 'Rangkaian pernikahan Saibatin dengan tari, pantun, dan musyawarah keluarga.', color: '#2b5142', icon: 'dance' },
    { id: 'bedana', title: 'Panggung Bedana', month: 'Sepanjang tahun', months: [0, 2, 4, 6, 8, 10], approximate: true, location: 'Sanggar & sekolah', type: 'Pertunjukan', desc: 'Latihan dan pentas tari pergaulan yang terbuka untuk berbagai usia.', color: '#52705e', icon: 'dance' },
    { id: 'museum', title: 'Museum & Arsip', month: 'Sepanjang tahun', months: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], approximate: true, location: 'Bandar Lampung', type: 'Belajar', desc: 'Kunjungan museum, arsip, dan kelas budaya—cek jadwal terbaru penyelenggara.', color: '#743c4b', icon: 'landmark' }
  ];

  const badges = [
    { id: 'penjelajah', title: 'Penjelajah Baru', icon: 'compass', desc: 'Membuka halaman budaya pertamamu.', xp: 10, rule: 'Buka satu entri budaya.' },
    { id: 'kolektor', title: 'Kolektor Cerita', icon: 'book', desc: 'Menjelajahi lima entri budaya.', xp: 25, rule: 'Buka lima entri budaya.' },
    { id: 'kuis-piil', title: 'Penjaga Piil', icon: 'spark', desc: 'Menyelesaikan Kuis Piil Pesenggiri.', xp: 50, rule: 'Selesaikan kuis budaya.' },
    { id: 'memori-tapis', title: 'Mata Tapis', icon: 'loom', desc: 'Menaklukkan permainan memori motif.', xp: 40, rule: 'Menangkan Cocokkan Tapis.' },
    { id: 'siger-stylist', title: 'Perangkai Siger', icon: 'crown', desc: 'Merias Sai dengan busana adat.', xp: 30, rule: 'Selesaikan Pasang Siger.' },
    { id: 'aksara-cerdas', title: 'Sahabat Aksara', icon: 'glyph', desc: 'Menebak aksara dengan benar.', xp: 35, rule: 'Selesaikan Tebak Aksara.' },
    { id: 'seruit-chef', title: 'Juru Racik Seruit', icon: 'bowl', desc: 'Menyusun seruit dengan urutan yang tepat.', xp: 35, rule: 'Menangkan Meracik Seruit.' },
    { id: 'pecinta-rasa', title: 'Pecinta Rasa', icon: 'leaf', desc: 'Membuka tiga cerita kuliner.', xp: 20, rule: 'Buka tiga hidangan.' }
  ];

  const mascotAttributes = [
    { id: 'gajah', no: '01', title: 'Gajah Sumatra', short: 'Sai', text: 'Fauna identitas Lampung yang dekat dengan Way Kambas. Sai adalah nama kerja maskot: kecil, ingin tahu, dan senang mendengar cerita.', color: '#8fa6a0' },
    { id: 'siger', no: '02', title: 'Siger di kepala', short: 'Kehormatan', text: 'Siger mengingatkan bahwa kehormatan bukan untuk dipamerkan, melainkan untuk dijaga melalui perilaku. Di kepala Sai, ia menjadi mahkota kecil yang tiap hari dipakai belajar.', color: '#d9a94f' },
    { id: 'tapis', no: '03', title: 'Tapis di badan', short: 'Doa & identitas', text: 'Setiap motif tapis membawa doa dan cerita. Sai memakai tapis sebagai syal—cara kecil membawa warisan ke mana pun ia pergi.', color: '#8a2b3d' },
    { id: 'tangan', no: '04', title: 'Tangan terbuka', short: 'Nemui-nyimah', text: 'Tangan terbuka adalah bahasa keramahan: silakan masuk, silakan bertanya, silakan berbeda pendapat. Sai percaya rumah yang baik selalu punya tempat untuk tamu.', color: '#d9a94f' },
    { id: 'lengkap', no: '05', title: 'Sai, pemandu cerita', short: 'Sai Bumi Ruwa Jurai', text: 'Semua atribut bertemu: gajah, siger, tapis, dan tangan terbuka. Sai menemani kita menjelajah 15 kabupaten/kota—tanpa lupa bertanya kepada pemilik cerita.', color: '#f5efe2' }
  ];

  const highlights = [
    { id: 'sekura', type: 'budaya', entryId: 'sekura', label: 'Riang', title: 'Sekura: tawa di balik topeng', desc: 'Topeng, musik, dan syukur warga Lampung Barat di sekitar Idulfitri.', motif: 'mask' },
    { id: 'seruit', type: 'kuliner', dishId: 'seruit', label: 'Gurih', title: 'Seruit: satu piring, banyak cerita', desc: 'Ikan, sambal, dan tempoyak yang mengajak semua orang duduk bersama.', motif: 'seruit' },
    { id: 'tapis', type: 'budaya', entryId: 'tapis', label: 'Warisan', title: 'Tapis: doa yang ditenun', desc: 'Benang emas dan motif pucuk rebung yang menyimpan harapan.', motif: 'loom' },
    { id: 'siger', type: 'budaya', entryId: 'siger', label: 'Sakral', title: 'Siger: mahkota & tanggung jawab', desc: 'Satu ikon Lampung yang mengingatkan pada kehormatan dan peran baru.', motif: 'crown' }
  ];

  const sdgs = [
    { no: 4, title: 'Pendidikan Berkualitas', text: 'Ensiklopedia, kamus, aksara, dan permainan edukatif membuka jalan belajar budaya Lampung untuk siapa saja.' },
    { no: 8, title: 'Pekerjaan Layak & Pertumbuhan Ekonomi', text: 'Visibilitas perajin, penenun, dan UMKM kuliner dibangun dengan prinsip atribusi serta pembagian manfaat.' },
    { no: 11, title: 'Kota & Komunitas Berkelanjutan', text: 'Warisan budaya dan ruang cerita komunitas dirawat sebagai bagian dari masa depan yang berkelanjutan.' }
  ];

  const sources = [
    { title: 'Batas wilayah kabupaten/kota', body: 'Badan Informasi Geospasial (BIG), edisi 2026 Semester 1. Diolah melalui dmxsan/indonesia-admin-boundaries menjadi path SVG sederhana.', url: 'https://tanahair.indonesia.go.id/', license: 'Data batas BIG; pengolahan MIT.' },
    { title: 'Warisan Budaya Takbenda', body: 'Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi — entri Tari Sigeh Pengunten (2014), Tari Melinting (2014), dan Tari Bedana (2018).', url: 'https://warisanbudaya.kemdikbud.go.id/', license: 'Rujukan publik.' },
    { title: 'Aksara Lampung', body: 'Glyph monoline dan logika tampilan diadaptasi dari Lampung Design System (MIT), dikembangkan untuk nama, judul, dan permainan.', url: 'https://github.com/mralifakbar/lampung-design-system', license: 'MIT — lihat third_party/LAMPUNG-DESIGN-SYSTEM-LICENSE.txt.' },
    { title: 'Tipografi', body: 'Fraunces & Plus Jakarta Sans dari Google Fonts, dirilis di bawah SIL Open Font License.', url: 'https://fonts.google.com/', license: 'SIL OFL.' },
    { title: 'Kurasi konten', body: 'Draf editorial Ruwa Jurai, 2026. Sebagian narasi disusun dari rujukan umum dan akan divalidasi oleh dewan kurator, tokoh adat, serta ahli bahasa sebelum rilis resmi.', url: '', license: 'Draf kurasi — jangan dianggap final.' }
  ];

  const entryExt = {
    tapis: 'webp',
    siger: 'webp',
    sekura: 'webp',
    'sigeh-pengunten': 'webp',
    pepadun: 'webp'
  };
  entries.forEach((e) => {
    if (!e.image) e.image = `assets/img/entries/${e.id}.${entryExt[e.id] || 'svg'}`;
  });
  dishes.forEach((d) => {
    if (!d.image) d.image = `assets/img/dishes/${d.id}.webp`;
  });
  ingredients.forEach((ing) => {
    if (!ing.image) ing.image = `assets/img/ingredients/${ing.id}.svg`;
  });
  const agendaImages = {
    sekura: 'assets/img/entries/sekura.webp',
    'panen-kopi': 'assets/img/dishes/kopi-robusta.webp',
    durian: 'assets/img/dishes/lempok-durian.webp',
    begawi: 'assets/img/entries/begawi.svg',
    nyambai: 'assets/img/entries/nyambai.svg',
    bedana: 'assets/img/entries/bedana.svg',
    museum: 'assets/img/entries/museum-lampung.svg'
  };
  agenda.forEach((a) => {
    if (!a.image) a.image = agendaImages[a.id] || 'assets/img/entries/tapis.webp';
  });
  highlights.forEach((h) => {
    if (h.entryId) {
      const e = entries.find((x) => x.id === h.entryId);
      if (e) h.image = e.image;
    } else if (h.dishId) {
      const d = dishes.find((x) => x.id === h.dishId);
      if (d) h.image = d.image;
    }
  });

  window.RJ_DATA = window.RJ_DATA || {};
  Object.assign(window.RJ_DATA, {
    categories, entries, timeline, dishes, ingredients, regions, dictionary,
    quizzes, agenda, badges, mascotAttributes, highlights, sdgs, sources
  });
})();
