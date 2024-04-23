const knex = require('./knex');

class Fellow {
  static async create(fellowName) {
    const { rows } = await knex.raw(`
      INSERT INTO fellows (name)
      VALUES (?)
      RETURNING *;
    `, [fellowName]);
    return rows[0];
  }

  static async list() { // Get all
    const { rows } = await knex.raw(`
      SELECT * 
      FROM fellows;
    `)
    return rows;
  }

  static async find(id) { // Get one
    const { rows } = await knex.raw(`
      SELECT *
      FROM fellows
      WHERE id=?
    `, [id]);
    return rows[0];
  }

  // Fellow.editName(1, 'BEN!!!')
  static async editName(id, newName) { // Update
    const { rows } = await knex.raw(`
      UPDATE fellows
      SET name=?
      WHERE id=?
      RETURNING *;
    `, [newName, id]);
    console.log(rows);
    console.log(rows[0]);
    return rows[0];
  }

  // Fellow.delete(1)
  static async delete(id) { // Delete
    const { rows } = await knex.raw(`
      DELETE FROM fellows
      WHERE id=?
      RETURNING *;
    `, [id]);
    return rows[0];
  }
}

// const test = async () => {
//   console.log(await Fellow.editName(1, 'BEN!!!'))
//   console.log(await Fellow.list());
// }
// test();


// Create
module.exports = Fellow;