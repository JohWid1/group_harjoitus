const db = require('../database');
const bcrypt = require('bcryptjs');

const saltRounds=10;
const student={
  getAll: function(callback) {
    return db.query('select * from student', callback);
  },
  getByUser_name: function(user_name, callback) {
    return db.query('select * from student where user_name=?', [user_name], callback);
  },
  add: function(student, callback) {
    bcrypt.hash(student.password, saltRounds, function(err, hash) {
      return db.query('insert into student (first_name, last_name, user_name, password) values(?,?,?,?)',
      [student.first_name,student.last_name,student.user_name, hash], callback);
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
  },
  checkPassword:function(user_name, callback){
    return db.query('select password from student where user_name=?',[user_name],callback);
  }

}
          
module.exports = student;