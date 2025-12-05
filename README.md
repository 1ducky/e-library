# E-Library

Aplikasi perpustakaan digital yang dibangun dengan Next.js, Prisma, dan MySQL. Sistem ini memungkinkan pengelolaan koleksi buku dan peminjaman buku secara efisien.

## 🛠 Tech Stack

Project ini menggunakan teknologi modern berikut:

### Frontend & Framework
- **Next.js** v16.0.7 - React framework untuk production
- **React** v19.2.0 - JavaScript library untuk UI
- **React DOM** v19.2.0 - React package untuk web
- **TypeScript** v5 - Superset dari JavaScript dengan static typing
- **Tailwind CSS** v4 - Utility-first CSS framework
- **PostCSS** v4 - Tool untuk transformasi CSS

### Backend & Database
- **Prisma** v7.1.0 - ORM (Object Relational Mapping) untuk database
- **Prisma Client** v7.1.0 - Database client otomatis
- **MySQL** v5.7+ - Database relasional

### Development Tools
- **ESLint** v9 - JavaScript linter
- **Node.js** v16+ - JavaScript runtime

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

Instal semua package yang diperlukan sesuai dengan `package.json`:

```bash
npm install
```

Atau jika menggunakan yarn:

```bash
yarn install
```

Package yang akan diinstal:
- **Production**: Next.js, React, Prisma Client
- **Development**: TypeScript, Tailwind CSS, ESLint, dan type definitions

### 3. Setup Database MySQL

Buat database baru di MySQL:

```bash
mysql -u root -p
```

Kemudian jalankan SQL berikut:

```sql
CREATE DATABASE e_library CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 4. Konfigurasi Environment Variables

Buat file `.env.local` di root project:

```bash
cp .env.example .env.local  # Jika ada file .env.example
# Atau buat manual file .env.local
```

Tambahkan konfigurasi database:

```
DATABASE_URL="mysql://username:password@localhost:3306/e_library"
```

**Catatan:** 
- Ganti `username` dengan username MySQL Anda
- Ganti `password` dengan password MySQL Anda
- Pastikan database `e_library` sudah dibuat

### 5. Setup Prisma Schema

Prisma schema sudah ada di `prisma/schema.prisma` dengan konfigurasi:

```prisma
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}
```

### 6. Jalankan Prisma Migration

Jalankan migrasi database untuk membuat tabel:

```bash
npx prisma migrate dev --name init
```

Atau jika sudah ada migration sebelumnya:

```bash
npx prisma migrate deploy
```

### 7. (Opsional) Buka Prisma Studio

Untuk melihat dan manage data database secara visual:

```bash
npx prisma studio
```

Akan membuka interface di [http://localhost:5555](http://localhost:5555)

### 8. Jalankan Development Server

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
- ✅ Interface responsif dengan Tailwind CSS
- ✅ Type-safe dengan TypeScript

## 🛠 Struktur Project

```
e-library/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes
│   │   └── book/
│   │       └── route.js          # Book API endpoints
│   ├── page.tsx                  # Homepage
│   ├── layout.tsx                # Layout utama
│   └── globals.css               # Global styles
├── prisma/                       # Prisma ORM
│   ├── schema.prisma             # Database schema
│   └── migrations/               # Database migrations
├── public/                       # Static assets
├── _Lib/                         # Library utilities
│   └── prisma.js                 # Prisma client instance
├── _Component/                   # Reusable React components
├── _Assets/                      # Asset statis
├── package.json                  # Dependencies & scripts
├── next.config.ts                # Next.js configuration
├── tsconfig.json                 # TypeScript configuration
├── tailwind.config.js            # Tailwind CSS configuration
├── postcss.config.mjs            # PostCSS configuration
├── eslint.config.mjs             # ESLint configuration
└── .env.local                    # Environment variables (jangan push ke git)
```

## 📚 API Endpoints

### User Endpoints

#### 1. GET /api/user - Ambil Semua User

**Request:**
```bash
curl http://localhost:3000/api/user
```

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "STUDENT"
  },
  {
    "id": 2,
    "name": "Jane Smith",
    "email": "jane@example.com",
    "role": "ADMIN"
  }
]
```

**Note:** Password tidak ditampilkan untuk keamanan

---

#### 2. POST /api/user - Buat User Baru

**Request:**
```bash
curl -X POST http://localhost:3000/api/user \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alice Johnson",
    "email": "alice@example.com",
    "password": "SecurePass123"
  }'
```

**Validasi yang Dijalankan:**
- ✅ Email format harus valid (contoh: user@example.com)
- ✅ Password minimal 8 karakter
- ✅ Email harus unik (belum terdaftar)

**Response (201 Created) - Success:**
```json
{
  "id": 3,
  "name": "Alice Johnson",
  "email": "alice@example.com",
  "role": "STUDENT"
}
```

**Response (400 Bad Request) - Missing Fields:**
```json
{
  "error": "Missing required fields"
}
```

**Response (400 Bad Request) - Invalid Email:**
```json
{
  "error": "Email format tidak valid"
}
```

**Response (400 Bad Request) - Weak Password:**
```json
{
  "error": "Password minimal harus 8 karakter"
}
```

**Response (409 Conflict) - Duplicate Email:**
```json
{
  "error": "Email sudah terdaftar"
}
```

**Security Features:**
- 🔒 Password di-hash menggunakan bcrypt (salt rounds: 10)
- 🔒 Password tidak pernah ditampilkan di response
- 🔒 Email validation dan uniqueness check

---

### Book Endpoints

#### 1. GET /api/book - Ambil Semua Buku

**Request:**
```bash
curl http://localhost:3000/api/book
```

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "title": "Clean Code",
    "author": "Robert C. Martin",
    "category": "Programming",
    "stock": 5
  },
  {
    "id": 2,
    "title": "Design Patterns",
    "author": "Gang of Four",
    "category": "Programming",
    "stock": 3
  }
]
```

---

#### 2. POST /api/book - Tambah Buku Baru

**Request:**
```bash
curl -X POST http://localhost:3000/api/book \
  -H "Content-Type: application/json" \
  -d '{
    "title": "The Pragmatic Programmer",
    "author": "David Thomas, Andrew Hunt",
    "category": "Programming",
    "stock": 7
  }'
```

**Required Fields:**
- `title` (string) - Judul buku
- `author` (string) - Nama penulis
- `category` (string) - Kategori buku
- `stock` (number) - Jumlah stok

**Response (201 Created) - Success:**
```json
{
  "id": 3,
  "title": "The Pragmatic Programmer",
  "author": "David Thomas, Andrew Hunt",
  "category": "Programming",
  "stock": 7
}
```

**Response (400 Bad Request) - Missing Fields:**
```json
{
  "error": "Missing required fields"
}
```

---

## 📊 Data Models

### User Model

```prisma
model User {
  id        Int      @id @default(autoincrement())
  name      String?
  email     String   @unique
  password  String   // Hashed with bcrypt
  role      String   @default("STUDENT")
  borrows   Borrow[]
}
```

### Book Model

```prisma
model Book {
  id            Int       @id @default(autoincrement())
  title         String
  author        String
  category      String
  stock         Int
  borrow Borrow[]
}
```

### Borrow Model

```prisma
model Borrow {
  id         Int      @id @default(autoincrement())
  user       User     @relation(fields: [userId], references: [id])
  userId     Int
  book       Book     @relation(fields: [bookId], references: [id])
  bookId     Int
  borrowDate DateTime @default(now())
  returnDate DateTime?
  status     String   @default("BORROWED")
}
```

---

## 🔐 Security Notes

- **Password Hashing**: Semua password di-hash menggunakan bcrypt dengan salt rounds 10
- **Password Validation**: Minimum 8 karakter
- **Email Validation**: Format email yang valid dan unique constraint
- **Password Never Exposed**: Password tidak pernah di-return dalam API response
- **Error Handling**: Error messages yang spesifik untuk debugging

---

## 💡 Contoh Penggunaan

### Menggunakan fetch API di Frontend

```javascript
// Create User
async function createUser(userData) {
  const response = await fetch('/api/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData)
  })
  
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error)
  }
  
  return await response.json()
}

// Usage
try {
  const newUser = await createUser({
    name: 'John Doe',
    email: 'john@example.com',
    password: 'SecurePassword123'
  })
  console.log('User created:', newUser)
} catch (error) {
  console.error('Error:', error.message)
}
```

---

### Menggunakan Postman

1. **Create User**
   - Method: POST
   - URL: `http://localhost:3000/api/user`
   - Body (raw JSON):
     ```json
     {
       "name": "John Doe",
       "email": "john@example.com",
       "password": "SecurePassword123"
     }
     ```

2. **Get All Users**
   - Method: GET
   - URL: `http://localhost:3000/api/user`

3. **Create Book**
   - Method: POST
   - URL: `http://localhost:3000/api/book`
   - Body (raw JSON):
     ```json
     {
       "title": "Clean Code",
       "author": "Robert C. Martin",
       "category": "Programming",
       "stock": 5
     }
     ```

4. **Get All Books**
   - Method: GET
   - URL: `http://localhost:3000/api/book`

---

## 📜 Available Scripts

```bash
# Development server dengan hot reload
npm run dev

# Build untuk production
npm run build

# Jalankan production build
npm start

# Run ESLint untuk check code quality
npm run lint

# Prisma commands
npx prisma migrate dev --name <migration-name>  # Buat migration baru
npx prisma migrate deploy                       # Deploy migration
npx prisma studio                               # Buka Prisma Studio
npx prisma generate                             # Generate Prisma Client
```

## 🔍 Troubleshooting

### Error: "database connection refused"
```bash
# Pastikan MySQL server sudah running
# Windows: 
mysql.server start

# Linux:
sudo service mysql start

# macOS:
brew services start mysql
```

Periksa kredensial di `.env.local` dan pastikan database sudah dibuat.

### Error: "relation not found" atau "Table doesn't exist"
```bash
# Deploy migration
npx prisma migrate deploy

# Atau reset database (hati-hati, akan menghapus semua data)
npx prisma migrate reset
```

### Error: "Port 3000 sudah digunakan"
```bash
npm run dev -- -p 3001
```

### Error: "EACCES permission denied" saat npm install
```bash
# Coba dengan sudo
sudo npm install

# Atau fix npm permissions
npm cache clean --force
```

## 📖 Dokumentasi Resmi

- [Next.js 16 Documentation](https://nextjs.org/docs)
- [React 19 Documentation](https://react.dev)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [MySQL Documentation](https://dev.mysql.com/doc/)

## 📝 Lisensi

Project ini dilisensikan di bawah MIT License.

## 👤 Author

**1ducky** - [GitHub](https://github.com/1ducky)
