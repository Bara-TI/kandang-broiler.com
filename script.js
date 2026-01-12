function parseAngka(v) {
    if (!v) return 0;
    return Number(v.replace(/\./g, ""));
}

let data = JSON.parse(localStorage.getItem("DATA_KANDANG")) || {};
let periodeAktif = null;

function simpan() {
    localStorage.setItem("DATA_KANDANG", JSON.stringify(data));
}

function periodeBaru() {
    periodeAktif = "Periode " + new Date().toLocaleString();
    data[periodeAktif] = {
        populasi: 0,
        hari: 0,
        sisaPakan: 0,
        totalDeplesi: 0,
        rekap: []
    };
    simpan();
    loadPeriode();
}

function loadPeriode() {
    const select = document.getElementById("periodeSelect");
    select.innerHTML = "";
    Object.keys(data).forEach(p => {
        const o = document.createElement("option");
        o.value = p;
        o.textContent = p;
        select.appendChild(o);
    });
    if (periodeAktif) select.value = periodeAktif;
}

function gantiPeriode() {
    periodeAktif = document.getElementById("periodeSelect").value;
    render();
}

function mulaiPeriode() {
    const pop = parseAngka(document.getElementById("populasiAwal").value);
    if (pop <= 0) return alert("Jumlah ayam salah");
    data[periodeAktif].populasi = pop;
    simpan();
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("harianBox").style.display = "block";
}

function simpanHarian() {
    const d = data[periodeAktif];
    const mati =
        parseAngka(matiA1.value) +
        parseAngka(matiB1.value) +
        parseAngka(matiA2.value) +
        parseAngka(matiB2.value);

    const terima = parseAngka(pakanTerima.value);
    const pakai = parseAngka(pakanPakai.value);

    d.totalDeplesi += mati;
    d.hari++;
    d.sisaPakan = d.sisaPakan + terima - pakai;

    d.rekap.push({
        hari: d.hari,
        mati,
        sisaAyam: d.populasi - d.totalDeplesi,
        sisaPakan: d.sisaPakan
    });

    simpan();
    render();
}

function render() {
    const d = data[periodeAktif];
    if (!d) return;

    const tbody = document.getElementById("rekapTable");
    tbody.innerHTML = "";
    d.rekap.forEach(r => {
        tbody.innerHTML += `
        <tr>
            <td>${r.hari}</td>
            <td>${r.mati}</td>
            <td>${r.sisaAyam.toLocaleString("id-ID")}</td>
            <td>${r.sisaPakan}</td>
        </tr>`;
    });
}

loadPeriode();
