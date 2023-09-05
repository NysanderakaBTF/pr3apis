const {BookService} =require("./BookService.ts");

const {db} = require('../db/index.ts')
const {books, libraryToBooks, libraries} =require("../db/schema.ts");
const {eq, and} = require("drizzle-orm");

class LibraryService {
    static async getAllLibraries() {
        const all = await db.select().from(libraries)
        return all
    }

    static async insertLibraryr(lib) {
        return await db.insert(libraries).values(lib).returning();
    }

    static async deleteLibrary(lib_id) {
        await db.delete(libraryToBooks).where(eq(libraryToBooks.libraryId, lib_id))
        await db.delete(libraries).where(eq(libraries.id, lib_id))
    }

    // static async getLibraryWithBooks(lib_id: number) {
    //     return await db.query.libraries.findFirst({
    //         with: {
    //             bookToLibrary:{
    //                 columns:{
    //                     bookId: true,
    //                     libraryId: false
    //                 }
    //             }
    //         },
    //         where: eq(libraries.id, lib_id)
    //     })
    // }
    static async getLibraryWithBooks(lib_id) {
        return await db.selectDistinct().from(libraryToBooks)
            .leftJoin(libraries, eq(libraryToBooks.libraryId, libraries.id))
            .leftJoin(books, eq(libraryToBooks.bookId, books.id))
            .where(eq(libraries.id, lib_id))
    }

    static async updateLibrary(lib_id, lib) {
        return await db.update(libraries).set({
            name: lib.name, address: lib.address
        }).where(eq(libraries.id, lib_id)).returning();
    }

    static async addBookToLibrary(lib_id, book_id) {
        let lib = null;
        let book = null;
        try {
            lib = await this.getLibraryWithBooks(lib_id)
        }catch (e){
            console.log(e);
        }
        try {
            book = await BookService.getBookById(book_id);
        }catch (e){
            console.log(e);
        }

        if (lib && book){
            return await db.insert(libraryToBooks).values({bookId: book_id, libraryId: lib_id}).returning();
        }

    }

    static async deleteBookFromLibrary(lib_id, book_id) {
        await db.delete(libraryToBooks).where(and(eq(libraryToBooks.libraryId, lib_id),
            eq(libraryToBooks.bookId, book_id)))
    }
}

module.exports = {LibraryService:LibraryService}