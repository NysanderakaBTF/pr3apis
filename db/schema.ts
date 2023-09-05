const {pgTable, serial, text, varchar, date, integer, primaryKey} = require("drizzle-orm/pg-core");

const {relations} = require("drizzle-orm")

const books = pgTable('books', {
    id: serial('id').primaryKey(),
    title: varchar('title', {length: 255}),
    authorId: integer('author_id').references(() => authors.id).notNull()
})

const bookRelations = relations(books, ({one, many}) => ({
        author: one(authors, {
            fields: [books.authorId],
            references: [authors.id]
        }),
        bookToLibrary: many(libraryToBooks),
    })
)



const authors = pgTable('authors', {
    id: serial('id').primaryKey(),
    full_name: varchar('full_name', {length: 255}),
    birth_date: date('birth_date')
})

const authorsRelations = relations(authors, ({many}) => ({
    books: many(books),
}))



const libraries = pgTable('libraries', {
    id: serial('id').primaryKey(),
    name: varchar('name', {length: 255}),
    address: varchar('address', {length: 1023})
})

const librariesRelation = relations(libraries, ({many}) => ({
    bookToLibrary: many(libraryToBooks)
}))




const libraryToBooks = pgTable('library_to_books', {
    bookId: integer('book_id').notNull().references(() => books.id),
    libraryId: integer('author_id').notNull().references(() => libraries.id)
}, (t) => ({
    pk: primaryKey(t.bookId, t.libraryId)
}))


const libraryToBooksRelations = relations(libraryToBooks, ({one}) => ({
    library: one(libraries, {
        fields: [libraryToBooks.libraryId],
        references: [libraries.id]
    }),
    book: one(books, {
        fields: [libraryToBooks.bookId],
        references: [books.id]
    }),
}))

module.exports.authors = authors;
module.exports.books = books;
module.exports.bookRelations = bookRelations;
module.exports.authorsRelations = authorsRelations;
module.exports.libraries = libraries;
module.exports.librariesRelation = librariesRelation;
module.exports.libraryToBooks = libraryToBooks;
module.exports.libraryToBooksRelations = libraryToBooksRelations;