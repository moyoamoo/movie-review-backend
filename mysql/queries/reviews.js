const addNewReview = `INSERT INTO reviews
                        (user_id, book_id, review)
                            VALUES
                                (?, ?, ?); `;
module.exports = {
  addNewReview
};
