const addNewReview = `INSERT INTO reviews
                        (user_id, book_id, review)
                            VALUES
                                (?, ?, ?); `;
const searchReviews = `SELECT *
                        FROM reviews
                            where reviews.user_id = ?
                                AND reviews.book_id = ?`;
module.exports = {
  addNewReview,
  searchReviews
};
