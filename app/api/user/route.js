import prisma from "@/../_Lib/prisma"
import bcrypt from "bcrypt"

// Helper function untuk response error
function ErrorResponse(message, status = 400) {
    return new Response(JSON.stringify({ error: message }), {
        status,
        headers: { "Content-Type": "application/json" }
    })
}

// Helper function untuk response success
function SuccessResponse(data, status = 200) {
    return new Response(JSON.stringify(data), {
        status,
        headers: { "Content-Type": "application/json" }
    })
}

export async function GET() {
    try {
        // Coba Mengambil User 
        const Users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                role: true
            }
        })
        return SuccessResponse(Users)
    } catch (error) {
        // Handler Error
        console.log("GET /api/user error:", error)
        return ErrorResponse("Failed to fetch Users", 500)
    }
}

export async function POST(request) {

    try {
        const { name, email, password } = await request.json()
        
        // Mengecek field yang dibutuhkan
        if (!name || !email || !password) {
            return ErrorResponse("Missing required fields", 400)
        }
        
        // Validasi format email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            return ErrorResponse("Format Email tidak valid", 400)
        }
        
        // Validasi password minimal 8 karakter
        if (password.length < 8) {
            return ErrorResponse("Password minimal harus 8 karakter", 400)
        }
        
        // Check apakah email sudah terdaftar
        const existingUser = await prisma.user.findUnique({
            where: { email: email }
        })
        
        if (existingUser) {
            return ErrorResponse("Email sudah terdaftar", 409)
        }
        
        // Hash password menggunakan bcrypt (salt rounds: 10)
        const hashedPassword = await bcrypt.hash(password, 10)
        
        // Mulai membuat user baru
        const newUser = await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: hashedPassword
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true
            }
        })
        return SuccessResponse(newUser, 201)
    }catch (error) {
        // Handler Error
        console.log("POST /api/user error:", error)
        
        // Handle error spesifik dari Prisma
        if (error.code === "P2002") {
            return ErrorResponse("Email sudah terdaftar", 409)
        }
        
        return ErrorResponse("Failed to create User", 500)
    }  
}