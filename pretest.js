// Soal 1 - printOdds(x)
function printOdds(x) {
    // Inisialisasi array kosong
    var ganjil = [];

    // Rumus -> 1+2i
    for (let i = 0; i < x; i++) {
        ganjil.push(1 + (2 * i));
    }

    // Output
    return (ganjil);
}

// Soal 2 - countEvens(list)
function countEvens(list) {
    // Inisialisasi penghitung
    var counter = 0;

    // Setiap mendapatkan bilangan genap, tambah 1 pada counter
    for (let i = 0; i < list.length; i++) {
        if (list[i] % 2 === 0) {
            counter++;
        }
    }

    // Output
    return (counter);
}

// Soal 3 - getMax(list)
function getMax(list) {
    // Inisialisasi variabel
    var max = 0;

    // Mencari bilangan terkecil untuk dijadikan patokan oleh variabel max - handling apabila semua input merupakan bilangan negatif tidak menghasilkan 0
    for (let i = 0; i < list.length; i++) {
        if (list[i] <= max) {
            max = list[i];
        }
    }

    // Setelah didapat nilai patokan max yang terkecil, lakukan pencarian ulang bilangan terbesar
    for (let i = 0; i < list.length; i++) {
        if (list[i] > max) {
            max = list[i];
        }
    }

    // Output
    return (max);
}

// Soal 4 - getAscending(list) - Menggunakan algoritma bubble sort
function getAscending(list) {
    // Inisialisasi array untuk output
    var sort = [];
    // Inisialisasi variabel pembanding
    var compare = false;
    while (!compare) {
        compare = true;
        for (let i = 1; i < list.length; i++) {
            // Bandingkan dengan value pada index sebelumnya
            if (list[i - 1] > list[i]) {
                compare = false;

                // Menggunakan temp array pindahkan dulu value index i-1
                var temp = list[i - 1];

                // Ganti value pada index i-1 dengan value index i
                list[i - 1] = list[i];

                // Masukkan value index i-1 ke index i (Pertukaran antara i-1 dan i)
                list[i] = temp;
            }
        }
    }
    return (list);
}