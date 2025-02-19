const addRating = `INSERT into ratings
                    (user_id, username, book_id, rating)
                        VALUES
                            (?, ?, ?, ?)`;

const searchRatings = `SELECT *
                        FROM ratings
                            where ratings.user_id = ?
                                AND ratings.book_id = ?`;
module.exports = {
  addRating,
  searchRatings,
};
