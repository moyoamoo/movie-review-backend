const salt = process.env.SALT;

const apiKey = process.env.API_KEY;

const searchByTermUrl = (searchTerm) => {
  return `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`;
};

const searchByIdUrl = (id, apiKey) => {
  return `https://www.googleapis.com/books/v1/volumes/${id}?key=${apiKey}`;
};

module.exports = { salt, apiKey, searchByTermUrl, searchByIdUrl };
