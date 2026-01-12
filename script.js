// ===== FUNGSI BACA ANGKA (33.000 → 33000)
function angka(v) {
    if (!v) return 0;
    return Number(v.toString().replace(/\./g, ""));
}

// ===== VARIABEL GLOBAL
let populasiAwal = 0;
let totalDeplesi = 0;
let hari = 0;
let sisaPakan = 0;
let rekap = [];

// ===== MULAI PERIODE
function mulaiPeriode() {
    populasiAwal = angka(document.getElementById("populasiAwal").value);

    if (populasiAwal <= 0) {
        alert("Jumlah ayam tidak valid");
        return;
    }

    // RESET
    totalDeplesi = 0;
    hari = 0;
    sisaPakan = 0;
    rekap = [];

    document.getElementById("loginBox").style.display = "none";
    document.getElementById("harianBox").style.display = "block";
}

// ===== SIMPAN DATA HARIAN
function simpanHarian() {
    hari++;

    const mati = angka(document.getElementById("mati").value);
    const afkir = angka(document.getElementById("afkir").value);

    totalDeplesi += (mati + afkir);

    let sisaAyam = populasiAwal - totalDeplesi;
    if (sisaAyam < 0) sisaAyam = 0;

    const terima = angka(document.getElementById("pakanTerima").value);
    const pakai = angka(document.getElementById("pakanPakai").value);

    sisaPakan = sisaPakan + terima - pakai;
    if (sisaPakan < 0) sisaPakan = 0;

    rekap.push({
        hari,
        mati,
        afkir,
        sisaAyam,
        sisaPakan
    });

    renderTabel();
}

// ===== TAMPILKAN TABEL (TIDAK TERBALIK)
function renderTabel() {
    const tbody = document.getElementById("tabelRekap");
    tbody.innerHTML = "";

    rekap.forEach(d => {
        tbody.innerHTML += `
        <tr>
            <td>${d.hari}</td>
            <td>${d.mati.toLocaleString("id-ID")}</td>
            <td>${d.afkir.toLocaleString("id-ID")}</td>
            <td>${d.sisaAyam.toLocaleString("id-ID")}</td>
            <td>${d.sisaPakan.toLocaleString("id-ID")}</td>
        </tr>`;
    });
}

// ===== PANEN
function tampilJenisPanen() {
    document.getElementById("jenisPanenBox").style.display = "block";
}

function simpanPanen() {
    const jenis = document.getElementById("jenisPanen").value;

    if (!jenis) {
        alert("Pilih jenis panen");
        return;
    }

    if (jenis === "habis") {
        alert("Periode selesai");
        location.reload();
    } else {
        alert("Panen penjarangan dicatat");
    }
}
