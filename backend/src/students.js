const express = require('express');
const mysql = require('mysql');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
});

app.listen(3001)

app.get('/students', (req, res) => {
    connection.query('SELECT s.id, s.name, s.date, s.sex, g.student_id, g.b1, g.b2, g.b3, g.b4 FROM students s LEFT JOIN grades g ON g.student_id = s.id', (error, results, fields) => {
      if (error) throw error;
      let students = [];
      results.forEach(student => {
        const date = {
          id: student.id,
          name: student.name,
          age: convertToAge(student.date),
          sex: student.sex,
          status: calculateResult(student.b1, student.b2, student.b3, student.b4)
        };
        students.push(date);
      });
      res.json(students);
    });
});
  
app.get('/students/:id', (req, res) => {
    connection.query(` SELECT * FROM students WHERE id = ? `, req.params.id, (error, results, fields) => {
      if (error) throw error;
      let students = [];
      results.forEach(student => {
        const date = {
          id: student.id,
          name: student.name,
          date: student.date,
          sex: student.sex,
        };
        students.push(date);
      });
      res.json(students[0]);
    });
});
  
  app.get('/students/:id/grades', (req, res) => {
    connection.query(` SELECT s.id, s.name, g.student_id, g.b1, g.b2, g.b3, g.b4 FROM students s LEFT JOIN grades g ON g.student_id = s.id WHERE s.id = ? `, req.params.id, (error, results, fields) => {
      if (error) throw error
      const response = results[0];
      let grades = {
        id: response.id,
        name: response.name,
        grades: response.student_id == null ? ['','','',''] : [response.b1, response.b2, response.b3, response.b4],
        method: response.student_id == null ? 'POST' : 'PUT'
      };
      res.json(grades);
    });
});
  
  app.post('/students', (req, res) => {
    console.log(req.body);
    connection.query(`INSERT INTO students (name, date, sex) value ('${req.body.name}', '${req.body.date}', '${req.body.sex}')`, (error, results, fields) => {
      if (error) throw error;
      res.json({
        message: 'Estudante cadastrado com sucesso!'
      });
    });
});
  
  app.post('/students/:id/grades', (req, res) => {
    console.log(req.body);
    connection.query(` INSERT INTO grades (student_id, b1, b2, b3, b4) value ( ${req.params.id}, ${req.body.b1}, ${req.body.b2}, ${req.body.b3}, ${req.body.b4} ) `, (error, results, fields) => {
      if (error) throw error;
      res.json({
        message: 'Notas cadastradas com sucesso!'
      });
    });
});
  
  app.put('/students/:id', (req, res) => {
    console.log(req.body);
    connection.query(`UPDATE students SET name = '${req.body.name}', date = '${req.body.date}', sex = '${req.body.sex}' WHERE id = ${req.params.id}`, (error, results, fields) => {
      if (error) throw error;
      res.json({
        message: 'Estudante atualizado com sucesso!'
      });
    });
  });
  
  app.put('/students/:id/grades', (req, res) => {
    console.log(req.body);
    connection.query(` UPDATE grades SET b1 = ${req.body.b1}, b2 = ${req.body.b2}, b3 = ${req.body.b3}, b4 = ${req.body.b4} WHERE student_id = '${req.params.id}' `, (error, results, fields) => {
      if (error) throw error;
      res.json({
        message: 'Notas atualizadas com sucesso!'
      });
    });
  });
  
  app.delete('/students/:id', (req, res) => {
    connection.query(` DELETE FROM students WHERE id = '${req.params.id}' `, (error, results, fields) => {
      if (error) throw error;
      res.json({
        message: 'Estudante removido(a) com sucesso!'
      });
    });
  });
  
  //SELECT * FROM students LEFT JOIN grades ON grades.student_id = students.id
  
  function convertToAge(date) {
    const today = new Date();
    const dateOfBirth = new Date(date);
    const age = today.getFullYear() - dateOfBirth.getFullYear();
    const month = today.getMonth() - dateOfBirth.getMonth();
    const todayDay = today.getDate();
    const birthday = dateOfBirth.getDay();
    if (month < 0 || (month === 0 && todayDay < birthday)) {
        return age-1
    };
    return age
  };
  
  function calculateResult(b1, b2, b3, b4) {
    const sum = b1 + b2 + b3 + b4;
    if(sum == 0){
      return 'Sem nota'
    };
    const average = sum/4;
    const status = average < 6 ? 'Reprovado(a)' : 'Aprovado(a)'
    return status
  };
  
  const connection = mysql.createConnection({
      host     : 'localhost',
      user     : 'nome-usuario',
      password : 'senha123',
      database : 'classroom'
  });
    
  connection.connect();