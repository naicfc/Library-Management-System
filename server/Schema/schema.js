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
const Book = require("../models/Book");
const Books = require("../models/Books");
const Borrowed_Book = require("../models/BorrowedBook");
const Genre = require("../models/Genre");
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

//Genre Type
const GenreType = new GraphQLObjectType({
  name: "Genre",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
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
    genre: {
      type: GenreType,
      resolve(parent, args) {
        return Genre.findById(parent.genreId);
      },
    },
    copies: { type: GraphQLString },
  }),
});

//Book Type
const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    number: { type: GraphQLString },
    status: { type: GraphQLString },
    details: {
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
    book: {
      type: BookType,
      resolve(parent, args) {
        return Book.findById(parent.bookId);
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
    book: {
      type: BookType,
      resolve(parent, args) {
        return Book.findById(parent.bookId);
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
