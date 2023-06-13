import express from 'express'
import mysql from 'mysql'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import multer from 'multer'
import path from 'path'


const app = express();
app.use(cors({
   
    origin: 'http://localhost:5173', // Defina a origem permitida,
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true
  }));
app.use(cookieParser());
app.use(express.json());
app.use(express.static('public'));


const con = mysql.createConnection({
    host: "db4free.net",
    user: "adsunicesumar",
    password: "unicesumar",
    database: "ads5semestre"
})

const storage = multer.diskStorage({
    destination: (req, file, cb ) => {
        cb(null, 'public/images')
    },
    filename:(req, file, cb ) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({
    storage: storage
})

con.connect(function(err){
    if (err) {
        console.log("erro de conexao");
    }else{
        console.log("conectado");
    }
})

app.get('/getEmployee', (req, res) => {
    const sql = "SELECT * FROM employee";
    con.query(sql, (err, result) => {
        if(err) return res.json({Erro: "get erro"})
        return res.json({Status: "sucesso", Result: result})
    })
})

app.get('/get/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM employee where id = ?";
    con.query(sql, [id], (err, result) => {
        if(err) return res.json({Erro: "get erro"})
        return res.json({Status: "sucesso", Result: result})

    })
})

app.put('/update/:id', (req, res) => {
    const id = req.params.id;
    const sql = "UPDATE employee SET name =?,email =?, password =?, address = ?, salary = ? WHERE id = ? "
    con.query(sql, [req.body.name,req.body.email,req.body.password,req.body.address, req.body.salary,   id], (err, result)=>{
        if(err) return res.json({Erro: "update erro"})
        return res.json({Status: "sucesso"})
    })
})

app.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM employee WHERE id = ? "
    con.query(sql, [id], (err, result)=>{
        if(err) return res.json({Erro: "DELETE erro"})
        return res.json({Status: "sucesso"})
    })
})

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if(!token) {
        return res.json({Error: "token nao autenticado"});
    } else {
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if(err) return res.json({Error: "Token errado"});
            req.role = decoded.role;
            req.id = decoded.id;
            next();
        } )
    }
}

app.get('/dashboard',verifyUser, (req, res) => {
    return res.json({Status: "sucesso", role: req.role, id: req.id})
})

app.get('/adminCount', (req, res) => {
    const sql = "Select count(id) as admin from user";
    con.query(sql, (err, result) => {
        if(err) return res.json({Error: "Error na query"});
        return res.json(result);
    })
})

app.get('/employeeCount', (req, res) => {
    const sql = "Select count(id) as employee from employee";
    con.query(sql, (err, result) => {
        if(err) return res.json({Error: "Error na query"});
        return res.json(result);
    })
})


app.post('/login', (req, res) => {
    const sql = "SELECT * FROM user Where email = ? AND  password = ?";
    con.query(sql, [req.body.email, req.body.password], (err, result) => {
        if(err) return res.json({Status: "Error", Error: "Error in runnig query"});
        if(result.length > 0) {
            const id = result[0].id;
            const token = jwt.sign({role: "admin"}, "jwt-secret-key", {expiresIn: '1d'});
            res.cookie('token', token);
            return res.json({Status: "sucesso"})
        } else {
            return res.json({Status: "Error", Error: "Wrong Email or Password"});
        }
    })
})
app.post('/employeelogin', (req, res) => {
    const sql = "SELECT * FROM employee Where email = ?";
    con.query(sql, [req.body.email], (err, result) => {
        if(err) return res.json({Status: "Error", Error: "Error in runnig query"});
        if(result.length > 0) {
            bcrypt.compare(req.body.password.toString(), result[0].password, (err, response)=> {
                if(err) return res.json({Error: "senha errada"});
                    const token = jwt.sign({role: "employee", id: result[0].id},"jwt-secret-key", {expiresIn: '1d'});
                    res.cookie('token', token);
                    return res.json({Status: "sucesso", id: result[0].id})
                }) 
                 }else {
                    return res.json({Status: "Error", Error: "senha ou email errado"});
                }
                
            })
        })


app.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({status: "sucesso"});
})

app.post('/create', upload.single('image'),  (req, res) => {
   const sql = "INSERT INTO employee (`name`, `email`, `password`,`address`, `salary` , `image`) VALUES (?)";
   bcrypt.hash(req.body.password.toString(), 10, (err, hash) => {
    if(err) return res.json({Error: "senha errada"});
    const values = [
        req.body.name,
        req.body.email,
        hash,
        req.body.address,
        req.body.salary,
        req.file.filename
    ]
    con.query(sql, [values], (err, result) => {
        if(err) return res.json({Error:"erro na query"});
        return res.json({Status: "sucesso"});
    })
   })
})


app.listen(8081, () =>{
    console.log('Servidor rodando na porta 8081')
})