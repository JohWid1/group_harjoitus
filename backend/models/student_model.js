const db = require('../database');
const bcrypt = require('bcryptjs');

const saltRounds=10;
const student={
  getAll: function(callback) {
    return db.query('select * from student', callback);
  },
  getById: function(id, callback) {
    return db.query('select * from student where idstudent=?', [id], callback);
  },
  add: function(student, callback) {
    bcrypt.hash(student.password, saltRounds, function(err, hash) {
      return db.query('insert into student (first_name, last_name, user_name, password) values(?,?,?,?)',
      [student.first_name, student.last_name, student.user_name, hash], callback);
    });
  },
  delete: function(id, callback) {
    return db.query('delete from student where idstudent=?', [id], callback);
  },
  update: function(id, student, callback) {
    bcrypt.hash(student.password, saltRounds, function(err, hash) {
      return db.query('update student set first_name=?, last_name=?, user_name=?, password=? where idstudent=?',
      [student.first_name, student.last_name, student.user_name, hash, id], callback);
    });
  }

}
          
module.exports = student;