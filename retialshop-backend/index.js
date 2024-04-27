const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
require("dotenv").config();
// const Student = require("./Student");
// const path = require("path");
const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(reqLogger);
app.use(cors());
// app.use(express.static(path.join(__dirname)));

// let students = []; //pseudo database not fo real
function reqLogger(req, res, next) {
  console.log(`${req.method}: ${req.url}`);
  next();
}

app.get("/", (req, res) => {
  // res.sendFile(path.join(__dirname, "index.html"));
  return res.json("From Backend API");
});

// my sql sb connected
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.KEY,
  database: process.env.DATABASE,
});

//get items
app.get("/api/items", (req, res) => {
  const sql = "SELECT * FROM items";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
// app.get("/api/students", (req, res) => {
//   res.status(200).json({ message: "All students fetched", students });
// });

// app.get("/api/students/:regNo", (req, res) => {
//   const { regNo } = req.params;
//   const student = students.find((ele) => ele.regNo === regNo);

//   if (student) {
//     res.status(200).json({ message: "Student Found", student });
//   } else {
//     res.status(404).json({ message: "Student not exits" });
//   }
// });

//post items
app.post("/api/items", (req, res) => {
  const { id, name, quantity } = req.body;

  const sql = "INSERT INTO items (id, name, quantity) VALUES (?, ?, ?)";
  const values = [id, name, quantity];
  db.query(sql, values, (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error inserting data into database" });
    }
    return res.status(200).json({ message: "Data inserted successfully" });
  });
});
// app.post("/api/students", (req, res) => {
//   const { name, dept, regNo } = req.body;

//   const newStudent = new Student(name, dept, regNo);
//   students.push(newStudent);
//   res.status(201).json({ message: "student created" });
// });

//Update items
app.patch("/api/items/:id", (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const sql = "UPDATE items SET name = ?, quantity = ? WHERE id = ?";
  const values = [name, quantity, id];
  db.query(sql, values, (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Error updating data in database" });
    }

    return res.status(200).json({ message: "Data updated successfully" });
  });
});

// app.patch("/api/students/:regNo/name", (req, res) => {
//   const { regNo } = req.params;
//   const { name } = req.body;

//   students = students.map((student) => {
//     if (student.regNo === regNo) {
//       student.name = name;
//     }
//     return student;
//   });
//   res.status(200).json({ message: "Student Updated" });
// });

//delete items
app.delete("/api/items/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM items WHERE id=?";
  const values = [id];
  db.query(sql, values, (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error deleting data into database" });
    }
    return res.status(200).json({ message: "Data deleted successfully" });
  });
});
// app.delete("/api/students/:regNo", (req, res) => {
//   const { regNo } = req.params;
//   const index = students.findIndex((ele) => ele.regNo === regNo);
//   if (index > -1) {
//     students.splice(index, 1);
//     res.status(200).json({ message: "Student Deleted" });
//   } else {
//     res.status(404).json({ message: "Student does not exist" });
//   }
// });

app.listen(PORT, () => {
  console.log("server running on port", PORT);
});
