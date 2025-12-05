# Debug User API - Simulasi & Analisis

## 📝 Test Cases dengan Data Palsu

### TEST 1: GET /api/user - Fetch Semua User

**Request:**
```bash
GET /api/user
```

**Expected Response (Success - 200):**
```json
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "password": "$2b$10$...",
    "role": "STUDENT"
  },
  {
    "id": 2,
    "name": "Jane Smith",
    "email": "jane@example.com",
    "password": "$2b$10$...",
    "role": "ADMIN"
  }
]
```

**Possible Issues:**
- ❌ **Password Exposed**: Password disimpan di response (SECURITY RISK!)
  - **Solusi**: Jangan return password di GET request
  - **Fix**: Gunakan `select` untuk exclude password

---

### TEST 2: POST /api/user - Create User dengan Data Valid

**Request:**
```json
{
  "name": "Alice Johnson",
  "email": "alice@example.com",
  "password": "SecurePass123"
}
```

**Expected Response (Success - 201):**
```json
{
  "id": 3,
  "name": "Alice Johnson",
  "email": "alice@example.com",
  "password": "SecurePass123",
  "role": "STUDENT"
}
```

**Possible Issues:**
- ⚠️ **Plain Text Password**: Password tidak di-hash (SECURITY RISK!)
  - **Solusi**: Hash password menggunakan bcrypt sebelum disimpan
- ⚠️ **Password di Response**: Password di-return ke client (SECURITY RISK!)
  - **Solusi**: Exclude password dari response

---

### TEST 3: POST /api/user - Duplicate Email

**Request:**
```json
{
  "name": "Bob Wilson",
  "email": "alice@example.com",
  "password": "AnotherPass123"
}
```

**Expected Response (Error - 400/409):**
```json
{
  "error": "Email sudah terdaftar"
}
```

**Actual Response (Error - 500):**
```json
{
  "error": "Failed to create User"
}
```

**Issues:**
- ❌ **No Email Validation**: Email tidak dicek apakah sudah ada
  - **Error dari Prisma**: `Unique constraint failed on the fields: ('email')`
  - **Problem**: Error tidak di-handle dengan baik, hanya return generic "Failed to create User"
  - **Solusi**: Catch error khusus untuk duplicate email

---

### TEST 4: POST /api/user - Missing Field

**Request:**
```json
{
  "name": "Charlie Brown",
  "email": "charlie@example.com"
}
```

**Expected Response (Error - 400):**
```json
{
  "error": "Missing required fields"
}
```

**Status**: ✅ **WORKING** - Validasi sudah ada

---

### TEST 5: POST /api/user - Empty/Invalid Email

**Request:**
```json
{
  "name": "David Lee",
  "email": "invalid-email",
  "password": "Pass123"
}
```

**Expected Response (Error - 400):**
```json
{
  "error": "Email format tidak valid"
}
```

**Actual Response**: ❌ **No validation** - Email diterima meski format invalid

**Issues:**
- ❌ **No Email Format Validation**
  - **Solusi**: Gunakan regex atau library untuk validasi email

---

### TEST 6: POST /api/user - Weak Password

**Request:**
```json
{
  "name": "Emma Davis",
  "email": "emma@example.com",
  "password": "123"
}
```

**Status**: ❌ **ACCEPTED** - Tidak ada validasi password strength

**Issues:**
- ❌ **No Password Strength Validation**
  - **Solusi**: Validasi minimal length dan complexity

---

## 🚨 Summary: Issues yang Ditemukan

| # | Severity | Issue | Impact | Solusi |
|---|----------|-------|--------|--------|
| 1 | 🔴 CRITICAL | Password plain text | Semua password terlihat di database | Hash dengan bcrypt |
| 2 | 🔴 CRITICAL | Password di response | User credentials terekspos | Exclude password dari response |
| 3 | 🟠 HIGH | Duplicate email tidak di-handle | Error handling tidak jelas | Check email unique sebelum create |
| 4 | 🟠 HIGH | Email format validation | Invalid email diterima | Validasi format email |
| 5 | 🟡 MEDIUM | Password strength validation | User bisa set password "123" | Min length & complexity check |
| 6 | 🟡 MEDIUM | Error message generic | Sulit debug kesalahan | Return error message spesifik |

---

## 💡 Rekomendasi Perbaikan

### Priority 1: Security Critical ⚠️
1. **Hash Password dengan bcrypt**
2. **Exclude Password dari Response**
3. **Handle Duplicate Email Error**

### Priority 2: Validation 🔍
4. **Email Format Validation**
5. **Password Strength Check**

### Priority 3: Error Handling 📋
6. **Better Error Messages**

---

## 📌 Code Changes Yang Diperlukan

### Tambah bcrypt dependency:
```bash
npm install bcrypt
```

### Update .env untuk secret/config (optional):
```
PASSWORD_MIN_LENGTH=8
PASSWORD_REQUIRE_UPPERCASE=true
PASSWORD_REQUIRE_NUMBER=true
```
