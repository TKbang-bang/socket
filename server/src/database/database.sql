CREATE TABLE IF NOT EXISTS users(
    user_id VARCHAR(100) NOT NULL PRIMARY KEY,
    user_name VARCHAR(30)
);

CREATE TABLE IF NOT EXISTS messages(
    message_id INT NOT NULL AUTO_INCREMENT,
    user_id VARCHAR(100),
    message_content VARCHAR(100),
    FOREIGN KEY user_id REFERENCES users(user_id)
);