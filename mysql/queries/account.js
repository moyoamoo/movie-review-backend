const addUser = `INSERT INTO users
                  (email, password)
                    VALUES
                      (?, ?);`;

const addToken = `INSERT INTO sessions
                    (user_id, token)
                        VALUES
                            (?, ?);`;

const findUser = `SELECT * FROM users
                    WHERE email = ?
                        AND password = ?`;

const checkToken = `SELECT users.id FROM users
                        JOIN sessions ON users.id = sessions.user_id
                          WHERE token = ?`;

const deleteToken = `DELETE FROM sessions
                          WHERE token LIKE ?;`;

const deleteUser = `DELETE users, sessions FROM users
                      JOIN sessions ON users.id = sessions.user_id
                        WHERE token = ?`;

module.exports = {
  addUser,
  findUser,
  addToken,
  checkToken,
  deleteUser,
  deleteToken,
};
