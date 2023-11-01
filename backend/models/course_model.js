const db = require('../database');

const course = {
  getAll: function(callback) {
    return db.query('select * from course', callback);
  },
  getById: function(id, callback) {
    return db.query('select * from course where id_course=?', [id], callback);
  },
  add: function(course, callback) {
    return db.query(
      'insert into course (name,author,isbn) values(?,?,?)',
      [course.name, course.author, course.isbn],
      callback
    );
  },
  delete: function(id, callback) {
    return db.query('delete from course where id_course=?', [id], callback);
  },
  update: function(id, course, callback) {
    return db.query(
      'update course set name=?,author=?, isbn=? where id_course=?',
      [course.name, course.author, course.isbn, id],
      callback
    );
  }
};
module.exports = course;