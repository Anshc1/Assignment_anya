const {faker} = require('@faker-js/faker');
const Author = require('../models/Author'); 
const Book = require('../models/Book'); 
const mongoose = require('mongoose');

const createMockData = async () => {
  await Author.deleteMany({});
  await Book.deleteMany({});
  for (let i = 0; i < 10; i++) {
    const author = new Author({
      name: faker.person.fullName() ,
      email: faker.internet.email(),
      phone_no: faker.phone.number(),
      password: 'password' 
    });

    await author.save();

    for (let j = 0; j < 5; j++) {
      const book = new Book({
        title: faker.string.alpha(3) ,
        author: author._id,
        likes: faker.number.int({ min: 0, max: 100 }) 
      });
      await book.save();
    }
  }
  console.log('Mock data created!');
};
module.exports = createMockData;  