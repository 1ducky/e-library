import prisma from "@/../_Lib/prisma"
import { skip } from "node:test";

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
        const {searchparams} = new URL(request.url);
        const limit = searchparams.get('limit') || 10;
        const offset = searchparams.get('offset') || 0;


        // Coba Mengambil Buku
        const Books = await prisma.book.findMany(
            {
                skip: Number(offset),
                take: Number(limit)
            }
        )
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
        const { title, author, category, stock } = await request.json()
        // Mengecek field yang dibutuhkan
        if (!title || !author || !category || stock == null) {
            return ErrorResponse("Missing required fields", 400)
        }
        // Mulai membuat buku baru
        const newBook = await prisma.book.create({
            data: {
                title: title,
                author: author,
                category: category,
                stock: Number(stock)
            }
        })
        return SuccessResponse(newBook, 201)

    }catch (error) {
        // Handler Error
        console.log("POST /api/book error:", error)
        return ErrorResponse("Failed to create Book", 500)
    }
}

export async function UPDATE(request) {

    try {
        const { id, title, author, category, stock } = await request.json()
        // Mengecek field yang dibutuhkan
        if (!title || !author || !category || stock == null) {
            return ErrorResponse("Missing required fields", 400)
        }
        // Mulai memperbarui buku
        const updatedBook = await prisma.book.update({
            where: { id: Number(id) },
            data: {
                title: title,
                author: author,
                category: category,
                stock: Number(stock)
            }
        })
        return SuccessResponse(updatedBook, 200)    
    }catch (error) {
        // Handler Error
        console.log("UPDATE /api/book error:", error)
        return ErrorResponse("Failed to update Book", 500)
    }   
}

export async function DELETE(request) {

    try {   
        const { id } = await request.json()
        // Mulai menghapus buku
        const deletedBook = await prisma.book.delete({
            where: { id: Number(id) }
        })
        return SuccessResponse(deletedBook, 200)    
    }
    catch (error) {
        // Handler Error
        console.log("DELETE /api/book error:", error)
        return ErrorResponse("Failed to delete Book", 500)
    }
}