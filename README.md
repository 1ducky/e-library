# E-Library

Aplikasi perpustakaan digital yang dibangun dengan Next.js, Prisma, dan MySQL. Sistem ini memungkinkan pengelolaan koleksi buku dan peminjaman buku secara efisien.

## 📋 Persyaratan Sistem

Sebelum memulai, pastikan Anda telah menginstal:

- **Node.js** v16 atau lebih tinggi ([Download](https://nodejs.org/))
- **npm** atau **yarn** (biasanya sudah termasuk dengan Node.js)
- **MySQL** v5.7 atau lebih tinggi ([Download](https://www.mysql.com/downloads/))
- **Git** ([Download](https://git-scm.com/))

## 🚀 Langkah-Langkah Instalasi

### 1. Clone Repository

```bash
git clone https://github.com/1ducky/e-library.git
cd e-library
```

### 2. Install Dependencies

Instal semua package yang diperlukan:

```bash
npm install
```

Atau jika menggunakan yarn:

```bash
yarn install
```

### 3. Setup Database MySQL

Buat database baru di MySQL:

```sql
CREATE DATABASE e_library;
```

### 4. Konfigurasi Environment Variables

Buat file `.env.local` di root project dan tambahkan konfigurasi database:

```
DATABASE_URL="mysql://username:password@localhost:3306/e_library"
```

**Catatan:** Ganti `username` dan `password` dengan kredensial MySQL Anda.

### 5. Setup Prisma

Jalankan migrasi database untuk membuat tabel:

```bash
npx prisma migrate dev --name init
```

Atau jika sudah ada migration:

```bash
npx prisma migrate deploy
```

### 6. (Opsional) Generate Prisma Client

```bash
npx prisma generate
```

### 7. Jalankan Development Server

Mulai aplikasi dalam mode development:

```bash
npm run dev
```

Atau dengan yarn:

```bash
yarn dev
```

Aplikasi akan berjalan di [http://localhost:3000](http://localhost:3000)

## 📱 Fitur Aplikasi

- ✅ Manajemen Buku (Create, Read, Update, Delete)
- ✅ Manajemen User (Registrasi, Login)
- ✅ Sistem Peminjaman Buku
- ✅ History Peminjaman
- ✅ Kategori Buku

## 🛠 Struktur Project

```
e-library/
├── app/                 # Next.js App Router
│   ├── api/            # API Routes
│   ├── page.tsx        # Homepage
│   └── layout.tsx      # Layout utama
├── prisma/             # Prisma ORM
│   └── schema.prisma   # Database schema
├── _Lib/               # Library utilities
├── _Component/         # Komponen Reusable
├── _Assets/            # Asset statis
├── package.json        # Dependencies
└── .env.local          # Environment variables (jangan push ke git)
```

## 📚 API Endpoints

### Books

- `GET /api/book` - Ambil semua buku
- `POST /api/book` - Tambah buku baru

### Contoh Request POST:

```json
{
  "title": "Clean Code",
  "author": "Robert C. Martin",
  "category": "Programming",
  "stock": 5
}
```

## 🔍 Troubleshooting

### Error: "database connection refused"
- Pastikan MySQL server sudah running
- Periksa kredensial di `.env.local`
- Cek apakah port MySQL (3306) tidak terblokir

### Error: "relation not found"
- Jalankan: `npx prisma migrate deploy`
- Atau reset: `npx prisma migrate reset`

### Port 3000 sudah digunakan
```bash
npm run dev -- -p 3001
```

## 📖 Dokumentasi Lebih Lanjut

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [MySQL Documentation](https://dev.mysql.com/doc/)

## 📝 Lisensi

Project ini dilisensikan di bawah MIT License.

## 👤 Author

**1ducky** - [GitHub](https://github.com/1ducky)
