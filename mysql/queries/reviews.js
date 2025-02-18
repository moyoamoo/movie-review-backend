const addNewReview = `INSERT INTO reviews
                        (user_id, book_id, review)
                            VALUES
                                (?, ?, ?); `;
const searchReviews = `SELECT *
                        FROM reviews
                            where reviews.user_id = ?
                                AND reviews.book_id = ?`;
const editReview = `UPDATE reviews
                        SET review = ?
                            WHERE reviews.user_id = ?
                                AND reviews.book_id = ?`;

const searchReviewsById = `SELECT *
                            FROM reviews
                                WHERE reviews.book_id = ?`;
module.exports = {
  addNewReview,
  searchReviews,
  editReview,
  searchReviewsById,
};
