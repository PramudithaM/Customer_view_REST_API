const express = require('express');
const db = require('./database');
const validator = require('validator');
const bodyParser = require("body-parser");
const app = express();

//app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.json());


app.get('/register',(req,res,next)=>{
    try{
        //sql query to select all data 
        var sql = "select * from customer";
        var params = [];

        //Running the sql query
        db.all(sql,params,(err,rows) =>{
            //Error respones
            if (err){
                res.status(400).json({error: err.message});
            }
            else{
                //success respones
                console.log("GET Method Runnig Successfully.....")
                res.status(200).json({
                    message: "success",
                    data: rows,
                })
            }
        })
    }catch(E){
        res.status(400).send(E);
    }

});

app.post('/register',(req,res,next)=>{
     try {
        const{name,address,email,dateOfBirth,gender,age,cardHolderName,cardNumber,expirytDate,cvv,timeStamp} = req.body
        
        // Email validation
        if (!validator.isEmail(email)) {
            console.log("Invalid email address")
            return res.status(400).json({ error: "Invalid email address" });
        }

        // Card number length validation
        const cardNumberString = cardNumber.toString();
        if(cardNumberString.length !== 12){
            console.log(cardNumberString.length)
            console.log("Invalid card number length")
            return res.status(400).json({ error: "Invalid card number length" });
        }

        //sql query to select all data 
        var sql = "INSERT INTO customer (name,address,email,dateOfBirth,gender,age,cardHolderName,cardNumber,expirytDate,cvv,timeStamp) VALUES (?,?,?,?,?,?,?,?,?,?,?)";
        var params = [name,address,email,dateOfBirth,gender,age,cardHolderName,cardNumber,expirytDate,cvv,timeStamp];
            
        //Running the sql query
        db.all(sql,params,(err,rows) =>{
        //Error respones
        if (err){
            res.status(400).json({error: err.message});
        }
        else{
                db.get("SELECT last_insert_rowid() as lastId", (err, row) => {
                    if (err) {
                        return res.status(400).json({ error: err.message });
                    }

                    // Log the last inserted row ID
                    console.log("Post Method Running..... \n Last customer ID:", row.lastId);

                    // Success response with customer 
                    console.log("POST Method Runnig Successfully......")
                    res.status(201).json({
                        message: "Customer " + name + " has registered",
                        data:res.rows,
                        customerId: row.lastId,
                        //'id':this.lastId,
                    });
                });
            }
        })
    } catch (E) {
        res.status(400).send(E);
    }
});

//put mrthod update the data
app.put("/update/:id",(req,res,next)=>{
    try {

        const id = req.params.id;
        console.log(id);
        
        // const existingCustomer = db.findCustomerById(id);

        // if(!existingCustomer){
        //     console.log("customer not found");
        //     return res.status(404).json({ success: false, message: "Customer not found" });
            
        // }


        // const customer = db.find((customer) => customer.id === Number(id));
        // if(!customer){
        //     return res.status(400).json({Success : false,message : error});
        // }
        //Updat database querys
        const{name,address,email,dateOfBirth,gender,age,cardHolderName,cardNumber,expirytDate,cvv,timeStamp} = req.body
        var sql = "UPDATE customer set name = ?, address = ?, email = ?,dateOfBirth = ?, gender = ?,age = ?,cardHolderName = ?, cardNumber = ?, expirytDate = ?, cvv = ?, timeStamp = ?";
        var params = [name,address,email,dateOfBirth,gender,age,cardHolderName,cardNumber,expirytDate,cvv,timeStamp];
        //database update 
        db.run(sql,params,(err,rows) =>{
            if(err){
                return res.status(400).json({error: err.message});
            }else{
                console.log("PUT Method Running Successfully");
                res.status(200).json({
                    message:"success",
                    //data : row,
                });
            }
        });
    } catch (E) {
        res.status(400).send(E);
    }
});

// DELETE method to delete a customer
app.delete('/delete/:id', (req, res,next) => {
    try {
        //const { id } = req.params;
        var params = req.params.id;
        // Delete from the database using a DELETE SQL query
        var sql = "DELETE FROM customer WHERE id=?";
        //var params = [id];
        db.run(sql, params, (err) => {
            if (err) {
                return res.status(400).json({ error: err.message });
            }else{
                console.log("DELETE Method Running Successfully......")
                res.send("Data deleted successfully");
            }
        });
    } catch (E) {
        res.status(400).send(E);
    }
});

//const port = process.env.PORT || 3000
app.listen(3000,()=>{
    console.log("Server Running PORT 3000......!");
});