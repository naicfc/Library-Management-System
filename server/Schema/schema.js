const mongoose = require("mongoose");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLSchema,
  GraphQLList,
  GraphQLEnumType,
  GraphQLNonNull,
} = require("graphql");
const BookCopy = require("../models/BookCopy");
const Books = require("../models/Books");
const Borrowed_Book = require("../models/BorrowedBook");
const Ratings = require("../models/Ratings");
const Reserved_Book = require("../models/ReservedBook");
const User = require("../models/User");

//User Type
const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
    password: { type: GraphQLString },
    address: { type: GraphQLString },
    role: { type: GraphQLString },
  }),
});

//Books Type
const BooksType = new GraphQLObjectType({
  name: "Books",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    author: { type: GraphQLString },
    description: { type: GraphQLString },
    image_url: { type: GraphQLString },
    genre: { type: GraphQLList(GraphQLString) },
    copies: { type: GraphQLString },
  }),
});

//BookCopy Type
const BookCopyType = new GraphQLObjectType({
  name: "BookCopy",
  fields: () => ({
    id: { type: GraphQLID },
    number: { type: GraphQLString },
    status: { type: GraphQLString },
    book: {
      type: BooksType,
      resolve(parent, args) {
        return Books.findById(parent.bookId);
      },
    },
  }),
});

//Borrowed Book Type
const BorrowedBookType = new GraphQLObjectType({
  name: "BorrowedBook",
  fields: () => ({
    id: { type: GraphQLID },
    book: {
      type: BookCopyType,
      resolve(parent, args) {
        return BookCopy.findById(parent.bookId);
      },
    },
    user: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.userId);
      },
    },
    borrow_date: { type: GraphQLString },
    due_date: { type: GraphQLString },
    return_date: { type: GraphQLString },
  }),
});

//Reserved Book Type
const ReservedBookType = new GraphQLObjectType({
  name: "ReservedBook",
  fields: () => ({
    id: { type: GraphQLID },
    book: {
      type: BookCopyType,
      resolve(parent, args) {
        return BookCopy.findById(parent.bookId);
      },
    },
    user: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.userId);
      },
    },
    reservation_date: { type: GraphQLString },
    status: { type: GraphQLString },
  }),
});

//Ratings Type
const RatingsType = new GraphQLObjectType({
  name: "Ratings",
  fields: () => ({
    id: { type: GraphQLID },
    book: {
      type: BooksType,
      resolve(parent, args) {
        return Books.findById(parent.bookId);
      },
    },
    user: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.userId);
      },
    },
    rating: { type: GraphQLString },
    review: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    books: {
      type: new GraphQLList(BooksType),
      resolve(parent, args) {
        return Books.find();
      },
    },
    bookcopy: {
      type: BookCopyType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return BookCopy.findById(args.id);
      },
    },
  },
});

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    //add a book
    addBooks: {
      type: BooksType,
      args: {
        title: { type: GraphQLNonNull(GraphQLString) },
        author: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) },
        image_url: { type: GraphQLNonNull(GraphQLString) },
        genre: { type: GraphQLNonNull(GraphQLList(GraphQLString)) },
        copies: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        const books = new Books({
          title: args.title,
          author: args.author,
          description: args.description,
          image_url: args.image_url,
          genre: args.genre,
          copies: args.copies,
        });

        return books.save();
      },
    },
    //add a book copy
    addBook: {
      type: BookCopyType,
      args: {
        number: { type: GraphQLNonNull(GraphQLString) },
        status: {
          type: new GraphQLEnumType({
            name: "BookStatus",
            values: {
              available: { value: "Available" },
              checked: { value: "Checked out" },
              reserved: { vaue: "Reserved" },
            },
          }),
          defaultValue: "Available",
        },
        bookId: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        const bookcopy = new BookCopy({
          number: args.number,
          status: args.status,
          bookId: args.bookId,
        });
        return bookcopy.save();
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
