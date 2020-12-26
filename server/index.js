const express = require('express');
const cors = require('cors')
const path = require('path');
const { getUsers, getUserByName, addUsers } = require('./rest-crud-queries');
const isDev = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || 5000;

// pool.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
//   if (err) throw err;
//   for (let row of res.rows) {
//     console.log(JSON.stringify(row));
//   }

// });

const app = express();
app.use(cors())
app.use(express.json());
// app.use(function (req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//   res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
//   next();
// });

app.get('/api/users', getUsers)
app.get('/api/users/:id', getUserByName)
app.post('/api/users', addUsers)

app.listen(PORT, function () {
  console.error(`App listening on port ${PORT}`);
});
