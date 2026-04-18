# Expense Tracker DApp (Stellar Soroban)

**Expense Tracker DApp** adalah aplikasi pencatatan keuangan terdesentralisasi berbasis blockchain Stellar menggunakan Soroban SDK. Aplikasi ini memungkinkan pengguna untuk mencatat pemasukan dan pengeluaran secara transparan, aman, dan tidak dapat dimodifikasi secara sepihak.

---

## Deskripsi Proyek

Expense Tracker DApp dibangun menggunakan smart contract Soroban (Rust) dan frontend React. Sistem ini menyimpan data keuangan pengguna langsung di blockchain Stellar, sehingga semua transaksi bersifat transparan, permanen, dan terverifikasi.

Setiap pengguna memiliki data keuangan masing-masing yang dipisahkan berdasarkan address wallet, sehingga privasi dan kepemilikan data tetap terjaga.

---

## Visi Proyek

Kami bertujuan untuk menciptakan sistem manajemen keuangan yang:

- **Terdesentralisasi**: Tidak bergantung pada server pusat
- **Transparan**: Semua data tercatat di blockchain
- **Aman**: Data hanya dapat diakses oleh pemilik wallet
- **Immutable**: Data tidak dapat diubah oleh pihak lain
- **Sederhana**: Mudah digunakan untuk pencatatan harian

Dengan ini, pengguna dapat memiliki kontrol penuh atas data keuangan mereka.

---

## Fitur Utama

### 1. Manajemen Pengeluaran
- Menambahkan pemasukan dan pengeluaran
- Menyimpan judul, jumlah, dan kategori
- Kategori: Food, Transport, Shopping, Salary, Other

### 2. Penyimpanan Blockchain
- Data disimpan di Stellar Soroban
- Setiap user memiliki data terpisah berdasarkan wallet address
- Counter ID otomatis untuk setiap transaksi

### 3. Pengambilan Data
- Menampilkan seluruh transaksi pengguna
- Data real-time dari smart contract
- Sinkronisasi langsung dengan blockchain

### 4. Penghapusan Data
- Menghapus transaksi berdasarkan ID
- Update langsung ke storage blockchain

### 5. Wallet Integration
- Login menggunakan wallet Stellar
- Autentikasi menggunakan `require_auth()`
- Data hanya bisa diakses pemilik wallet

---

## Smart Contract

### Struktur Data Expense

```rust
pub struct Expense {
    pub id: u64,
    pub title: String,
    pub amount: i64,
    pub category: String,
}