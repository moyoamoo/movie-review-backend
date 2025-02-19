const addRating = `INSERT into ratings
                    (user_id, username, book_id, rating)
                        VALUES
                            (?, ?, ?, ?)`;
module.exports = {
  addRating,
};
