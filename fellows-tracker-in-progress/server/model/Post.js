const knex = require('./knex');

class Post {
  static async create(userId, message) {
    // 1. execute the SQL query (maybe with some dynamic values)
    // 2. figure out if i want to return the entire array
    // or just one value
    const { rows } = await knex.raw(`
      INSERT INTO posts (message, user_id)
      VALUES (?, ?)
      RETURNING id, message, user_id;
    `, [message, userId]);
    return rows[0]
  }

  static async list() {
    const { rows } = await knex.raw(`
      SELECT * FROM posts
    `);
    return rows;
  }

  static async findById(postId) {
    const { rows } = await knex.raw(`
      SELECT * FROM posts
      WHERE id=?
    `, [postId]);
    return rows[0];
  }

  // give me all posts by a fellow
  static async findByFellowId(fellowId) {
    const { rows } = await knex.raw(`
      SELECT * FROM posts
      WHERE user_id=?
    `, [fellowId]);
    return rows;
  }

  static async delete(postId) {
    const { rows } = await knex.raw(`
      DELETE FROM posts
      WHERE id=?
      RETURNING *
    `, [postId]);
    return rows[0];
  }

  static async deleteAllPostsForFellow(fellowId) {
    const { rows } = await knex.raw(`
      DELETE FROM posts
      WHERE user_id=?
      RETURNING *
    `, [fellowId]);
    return rows;
  }
}

// const test = async () => {
//   console.log(await Post.deleteAllPostsForFellow(1));
// }
// test();

module.exports = Post;