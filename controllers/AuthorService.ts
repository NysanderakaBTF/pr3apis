const {db} = require('../db/index.ts')
const {authors, books} = require("../db/schema.ts")
const {eq} = require("drizzle-orm");


async function getAllAuthors() {
    const all = await db.select().from(authors)
    return all
}

async function insertAuthor(author) {
    return await db.insert(authors).values(author).returning();
}

async function deleteAuthor(author_id) {
    await db.delete(books).where(eq(books.authorId, author_id))
    await db.delete(authors).where(eq(authors.id, author_id))
}

async function getAuthorWithBooks(author_id) {
    return await db.query.authors.findFirst({
        with: {
            books: {
                columns: {
                    authorId: false
                }
            }
        },
        where: eq(authors.id, author_id)
    })
}

async function updateAuthor(author_id, author) {
    return await db.update(authors).set({
        full_name: author.full_name,
        birth_date: author.birth_date
    }).where(eq(authors.id, author_id)).returning();
}


module.exports.getAllAuthors = getAllAuthors;
module.exports.insertAuthor = insertAuthor;
module.exports.deleteAuthor = deleteAuthor;
module.exports.updateAuthor = updateAuthor;
module.exports.getAuthorWithBooks = getAuthorWithBooks;
