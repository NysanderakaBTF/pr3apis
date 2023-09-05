const {db} = require('../db/index.ts')
const {authors, books} =require("../db/schema.ts");
const {eq} = require("drizzle-orm");
class BookService {
    static async getAllBooks() {
        return await db.select().from(books)
    }

    static async insertBook(book){
        try {
            var a =  await db.insert(books).values(book).returning()
        }
        catch (e){
            throw e;
        }
        return a;
    }

    static async deleteBook(book_id){
        await db.delete(books).where(eq(books.id, book_id))
    }

    static async getBookById(book_id){
        return await db.select().from(books).where(eq(books.id, book_id))
    }
    static async updateBookById(book_id, book){
        return await db.update(books).set({
            authorId: book.authorId,
            title: book.title
        }).where(eq(books.id, book_id)).returning();
    }


}

module.exports = {BookService:BookService}