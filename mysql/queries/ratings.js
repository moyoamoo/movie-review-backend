const addRating = `INSERT into ratings
                    (user_id, username, book_id, rating)
                        VALUES
                            (?, ?, ?, ?)`;

const searchRatings = `SELECT *
                        FROM ratings
                            where ratings.user_id = ?
                                AND ratings.book_id = ?`;

const searchRatingsById = `SELECT *
                                FROM ratings
                                    WHERE ratings.book_id = ?`;

const editRating = `UPDATE ratings
                        SET rating = ?
                            WHERE ratings.user_id = ?
                                AND ratings.book_id = ?`;

const deleteRating = `DELETE FROM ratings
                                WHERE id = ?
                                    AND user_id = ?`;

module.exports = {
  addRating,
  searchRatings,
  searchRatingsById,
  editRating,
  deleteRating,
};
