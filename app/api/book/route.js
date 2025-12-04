import prisma from "@/../_Lib/prisma"

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

// GET Method Mengambil semua buku
export async function GET() {
    try {
        // Coba Mengambil Buku
        const Books = await prisma.book.findMany()
        return SuccessResponse(Books)
    } catch (error) {
        // Handler Error
        console.log("GET /api/book error:", error)
        return ErrorResponse("Failed to fetch Books", 500)
    }
}

// POST Method Menambahkan buku baru
export async function POST(request) {

    try {
        const { Title, Author, Category, Stock } = await request.json()
        // Mengecek field yang dibutuhkan
        if (!Title || !Author || !Category || Stock == null) {
            return ErrorResponse("Missing required fields", 400)
        }
        // Mulai membuat buku baru
        const newBook = await prisma.book.create({
            data: {
                title: Title,
                author: Author,
                category: Category,
                Stock: Number(Stock)
            }
        })
        return SuccessResponse(newBook, 201)

    }catch (error) {
        // Handler Error
        console.log("POST /api/book error:", error)
        return ErrorResponse("Failed to create Book", 500)
    }
}