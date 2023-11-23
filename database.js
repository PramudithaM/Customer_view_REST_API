const sqlite3 = require('sqlite3');
const DBSOURCE = 'db.sqlite';

let db = new sqlite3.Database(DBSOURCE,(err)=>{
    if(err){
        //can not open database
        console.error(err.message);
        throw err;
    }else{
        console.log("Connected to the Sqlite Database....!");
        db.run(
            `CREATE TABLE customer (
                  id INTEGER PRIMARY KEY AUTOINCREMENT,
                  name text, 
                  address text,
                  email text,
                  dateOfBirth text,
                  gender text,
                  age INTEGER,
                  cardHolderName text,
                  cardNumber INTEGER,
                  expirytDate text,
                  cvv INTEGER,
                  timeStamp text
                  )`,
            (err) => {
              if (err) {
                // Table already created
              } else {
                // Table just created, creating some rows
                var insert =
                  "INSERT INTO customer (name,address,email,dateOfBirth,gender,age,cardHolderName,cardNumber,expirytDate,cvv,timeStamp) VALUES (?,?,?,?,?,?,?,?,?,?,?)";
                db.run(insert, [
                  "Pramuditha Madura",
                  "No 09 wasundara strrt polonnaruwa",
                  "pramuditham8@gmail.com",
                  "1994-03-26",
                  "Male",
                  29,
                  "PRAMUDITHA",
                  123456789123,
                  "2024-12",
                  789,
                  "2023-11-14 10:10:20"
                ]);
              }
            }
        );
    }
});

module.exports = db;