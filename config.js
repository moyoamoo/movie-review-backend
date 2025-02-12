const salt = process.env.SALT;

const apiKey = process.env.SALT;

const url = (searchTerm) => {
  return `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`;
};

module.exports = { salt, apiKey, url};
