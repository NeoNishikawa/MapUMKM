// Inisialisasi map terpusat di UNTAG Surabaya
const map = L.map('umkmMap').setView([-7.300900, 112.782220], 16);

// Tambahkan tile layer OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 18
}).addTo(map);

// Data UMKM sekitar UNTAG Surabaya
const umkmData = [
    {
        id: 'warung-bu-sari',
        name: 'Warung Makan Bu Sari',
        category: 'makanan',
        location: 'Jl. Semolowaru Elok',
        coordinates: [-7.318500, 112.766200],
        rating: 5,
        address: 'Jl. Semolowaru Elok No. 15, dekat UNTAG',
        description: 'Warung makan dengan masakan rumahan yang enak dan harga terjangkau',
        phone: '081234567890'
    },
    {
        id: 'kedai-kopi-untag',
        name: 'Kedai Kopi 17an',
        category: 'makanan',
        location: 'Depan Kampus UNTAG',
        coordinates: [-7.319000, 112.765800],
        rating: 4,
        address: 'Depan Gerbang UNTAG, Jl. Semolowaru',
        description: 'Kedai kopi cozy dengan WiFi gratis, cocok untuk mahasiswa',
        phone: '081987654321'
    },
    {
        id: 'fotocopy-untag',
        name: 'Fotocopy 17 Agustus',
        category: 'jasa',
        location: 'Samping Kampus',
        coordinates: [-7.319200, 112.764500],
        rating: 5,
        address: 'Samping Fakultas Ekonomi UNTAG',
        description: 'Jasa fotocopy, print, dan penjilidan dengan harga mahasiswa',
        phone: '081112223344'
    },
    {
        id: 'distro-campus',
        name: 'Campus Distro',
        category: 'fashion',
        location: 'Plaza Semolowaru',
        coordinates: [-7.317800, 112.766500],
        rating: 4,
        address: 'Plaza Semolowaru Blok A-12',
        description: 'Toko fashion dengan brand lokal dan merchandise kampus',
        phone: '081556677889'
    },
    {
        id: 'warteg-semolowaru',
        name: 'Warteg Semolowaru',
        category: 'makanan',
        location: 'Jl. Semolowaru Utara',
        coordinates: [-7.318200, 112.765000],
        rating: 4,
        address: 'Jl. Semolowaru Utara No. 25',
        description: 'Warteg dengan berbagai pilihan lauk dan sayur yang lengkap',
        phone: '081998877665'
    },
    {
        id: 'service-laptop',
        name: 'Service Laptop Kampus',
        category: 'teknologi',
        location: 'Jl. Semolowaru Elok',
        coordinates: [-7.318700, 112.766800],
        rating: 5,
        address: 'Jl. Semolowaru Elok No. 8',
        description: 'Service laptop, komputer, dan instalasi software untuk mahasiswa',
        phone: '081443322110'
    }
];

// Marker khusus untuk UNTAG Surabaya (icon berbeda)
const untagIcon = L.divIcon({
    className: 'untag-marker',
    html: '🏛️',
    iconSize: [40, 40],
    iconAnchor: [20, 40]
});

const untagMarker = L.marker([-7.290039210399614, 112.76786554321825], { icon: untagIcon })
    .addTo(map)
    .bindPopup(`
        <div style="text-align: center; min-width: 200px;">
            <h3 style="margin: 0 0 10px 0; color: #2c3e50;">🏛️ UNTAG Surabaya</h3>
            <p style="margin: 5px 0; color: #555;">Universitas 17 Agustus 1945</p>
            <p style="margin: 5px 0; color: #777; font-size: 12px;">Jl. Semolowaru No. 45</p>
            <button onclick="showCampusInfo()" 
                    style="background: #e74c3c; color: white; border: none; padding: 8px 15px; border-radius: 5px; cursor: pointer; margin-top: 10px; width: 100%;">
                📞 Info Kampus
            </button>
        </div>
    `)
    .openPopup();

// Tambahkan circle radius sekitar kampus (area pencarian UMKM)
const campusRadius = L.circle([-7.290039210399614, 112.76786554321825], {
    color: '#3498db',
    fillColor: '#3498db',
    fillOpacity: 0.1,
    radius: 400 // 400 meter radius sekitar kampus
}).addTo(map);

// Tambahkan marker untuk setiap UMKM
umkmData.forEach(umkm => {
    const umkmIcon = L.divIcon({
        className: 'umkm-marker',
        html: getCategoryIcon(umkm.category),
        iconSize: [30, 30],
        iconAnchor: [15, 30]
    });

    const marker = L.marker(umkm.coordinates, { icon: umkmIcon })
        .addTo(map)
        .bindPopup(`
            <div style="text-align: center; min-width: 180px;">
                <h4 style="margin: 0 0 8px 0; color: #2c3e50;">${umkm.name}</h4>
                <div style="color: #f39c12; margin-bottom: 5px;">${getRatingStars(umkm.rating)}</div>
                <p style="margin: 3px 0; color: #666; font-size: 12px;">📍 ${umkm.address}</p>
                <p style="margin: 3px 0; color: #666; font-size: 12px;">📞 ${umkm.phone}</p>
                <button onclick="showUMKMDetail('${umkm.id}')" 
                        style="background: #27ae60; color: white; border: none; padding: 6px 12px; border-radius: 5px; cursor: pointer; margin-top: 8px; width: 100%; font-size: 12px;">
                    ℹ️ Lihat Detail
                </button>
            </div>
        `);
});

// Fungsi untuk mendapatkan icon berdasarkan kategori
function getCategoryIcon(category) {
    const icons = {
        'makanan': '🍔',
        'fashion': '👕',
        'jasa': '🔧',
        'kerajinan': '🎨',
        'teknologi': '💻',
        'pertanian': '🌱'
    };
    return icons[category] || '🏪';
}

// Fungsi untuk mendapatkan bintang rating
function getRatingStars(rating) {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
}

// Fungsi untuk mendapatkan nama kategori lengkap
function getCategoryName(category) {
    const categories = {
        'makanan': 'Makanan & Minuman',
        'fashion': 'Fashion',
        'jasa': 'Jasa',
        'kerajinan': 'Kerajinan Tangan',
        'teknologi': 'Teknologi',
        'pertanian': 'Pertanian'
    };
    return categories[category] || category;
}

// Fungsi untuk menampilkan detail UMKM
function showUMKMDetail(umkmId) {
    const umkm = umkmData.find(u => u.id === umkmId);
    if (umkm) {
        // Zoom ke lokasi UMKM
        map.setView(umkm.coordinates, 18);
        
        // Tampilkan detail dalam alert (bisa diganti modal nanti)
        const detailMessage = `
🛍️ ${umkm.name}

⭐ Rating: ${umkm.rating}/5
📍 Alamat: ${umkm.address}
📞 Telepon: ${umkm.phone}
🏷️ Kategori: ${getCategoryName(umkm.category)}
📝 Deskripsi: ${umkm.description}

Jarak: ±${calculateDistance(umkm.coordinates).toFixed(1)} km dari UNTAG
        `;
        
        alert(detailMessage);
    }
}

// Fungsi info kampus UNTAG
function showCampusInfo() {
    const campusInfo = `
🏛️ UNIVERSITAS 17 AGUSTUS 1945 SURABAYA

📍 Alamat: 
    Jl. Semolowaru No. 45, Surabaya

📞 Kontak:
    Telepon: (031) 5931800
    Website: www.untag-sby.ac.id
    Email: info@untag-sby.ac.id

🎓 Fakultas:
    - Fakultas Teknik
    - Fakultas Ekonomi
    - Fakultas Hukum
    - Fakultas Ilmu Sosial & Ilmu Politik
    - Dan lain-lain

Lokasi Anda: Kampus utama UNTAG Surabaya
    `;
    
    alert(campusInfo);
}

// Fungsi untuk menghitung jarak dari kampus
function calculateDistance(umkmCoords) {
    const campusCoords = [-7.290039210399614, 112.76786554321825];
    const R = 6371; // Radius bumi dalam km
    
    const dLat = (umkmCoords[0] - campusCoords[0]) * Math.PI / 180;
    const dLon = (umkmCoords[1] - campusCoords[1]) * Math.PI / 180;
    
    const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(campusCoords[0] * Math.PI / 180) * Math.cos(umkmCoords[0] * Math.PI / 180) *
        Math.sin(dLon/2) * Math.sin(dLon/2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    
    return distance;
}

// Fungsi filter by kategori
function filterByCategory(category) {
    // Reset semua marker
    map.eachLayer(layer => {
        if (layer instanceof L.Marker && layer !== untagMarker) {
            map.removeLayer(layer);
        }
    });
    
    // Highlight kategori yang dipilih
    document.querySelectorAll('.category-item').forEach(item => {
        item.style.borderColor = 'transparent';
        item.style.background = 'white';
    });
    
    const selectedItem = document.querySelector(`.category-item[onclick*="${category}"]`);
    if (selectedItem) {
        selectedItem.style.borderColor = '#e74c3c';
        selectedItem.style.background = '#ffeaa7';
    }
    
    // Tampilkan hanya UMKM dengan kategori yang dipilih
    const filteredUMKM = category === 'all' ? umkmData : umkmData.filter(umkm => umkm.category === category);
    
    filteredUMKM.forEach(umkm => {
        const umkmIcon = L.divIcon({
            className: 'umkm-marker',
            html: getCategoryIcon(umkm.category),
            iconSize: [30, 30],
            iconAnchor: [15, 30]
        });

        L.marker(umkm.coordinates, { icon: umkmIcon })
            .addTo(map)
            .bindPopup(`
                <div style="text-align: center; min-width: 180px;">
                    <h4 style="margin: 0 0 8px 0; color: #2c3e50;">${umkm.name}</h4>
                    <div style="color: #f39c12; margin-bottom: 5px;">${getRatingStars(umkm.rating)}</div>
                    <p style="margin: 3px 0; color: #666; font-size: 12px;">📍 ${umkm.address}</p>
                    <button onclick="showUMKMDetail('${umkm.id}')" 
                            style="background: #27ae60; color: white; border: none; padding: 6px 12px; border-radius: 5px; cursor: pointer; margin-top: 8px; width: 100%; font-size: 12px;">
                        ℹ️ Lihat Detail
                    </button>
                </div>
            `);
    });
    
    if (filteredUMKM.length === 0) {
        alert(`Tidak ada UMKM kategori "${getCategoryName(category)}" di sekitar UNTAG Surabaya`);
    }
}

// Search functionality
document.getElementById('searchInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        const searchTerm = this.value.toLowerCase().trim();
        if (searchTerm) {
            const found = umkmData.find(umkm => 
                umkm.name.toLowerCase().includes(searchTerm) ||
                umkm.category.toLowerCase().includes(searchTerm) ||
                umkm.location.toLowerCase().includes(searchTerm) ||
                getCategoryName(umkm.category).toLowerCase().includes(searchTerm)
            );
            
            if (found) {
                map.setView(found.coordinates, 18);
                this.value = '';
            } else {
                alert('🔍 UMKM tidak ditemukan di sekitar UNTAG Surabaya!\nCoba kata kunci lain seperti: makanan, jasa, fashion');
            }
        }
    }
});

// Event listener untuk view map button
function toggleMapView() {
    const mapArea = document.querySelector('.map-area');
    mapArea.scrollIntoView({ behavior: 'smooth' });
}

// CSS untuk custom marker (bisa ditambahkan di style.css)
const style = document.createElement('style');
style.textContent = `
    .untag-marker {
        font-size: 24px;
        text-align: center;
        background: rgba(231, 76, 60, 0.9);
        border-radius: 50%;
        width: 50px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 3px solid white;
        box-shadow: 0 2px 10px rgba(0,0,0,0.3);
    }
    
    .umkm-marker {
        font-size: 16px;
        text-align: center;
        background: rgba(52, 152, 219, 0.9);
        border-radius: 50%;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
    }
`;
document.head.appendChild(style);