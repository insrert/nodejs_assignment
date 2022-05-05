require('dotenv').config();
const express = require('express')
const mysql = require('mysql')
const bodyparser = require('body-parser')
const cors = require('cors')

const port = process.env.PORT;
const app = express()

app.use(cors())
app.use(bodyparser.json())

app.listen(port, () => console.log(`Server started on port ${port}..`))


// Your Requiremets starts from here

// 1. Database creation

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'organaization'
})


//Schema
// USE organaization;
// CREATE TABLE `employee`(
// `EId` VARCHAR(45),
// `EName` VARCHAR(45),
// `EAddress` VARCHAR(45),
// `Designation` VARCHAR(45) ,
// `DOJ` VARCHAR(45)  ,
// `DOR`  VARCHAR(45),
// PRIMARY KEY(`EId`)
// )ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


//Testing Connetion

db.connect((err) => {
    if (err) {
    console.log("Please re-check the connection.")
    }
        console.log("Database connected succesfully.")
    
    });


// 2. Table creation

db.query("insert into employee (EId,EName,EAddress,Designation,DOJ,DOR) VALUES ('E-1','Jon Doe ','Abc City,NYC','Sr.Dev','2020-4-4',NULL),( 'E-2', 'Jane Doe' ,'Bcd City, LAC', 'P Manager','2018-4-10',NULL),('E-3', 'Jon Foe' ,'Cde City, London','T Lead','2019-10-4',NULL ),('E-4' ,'Janet Hoe','Def City, Liverpool','Sr.Dev','2020-4-10', '2021-5-3'),('E-5','Son Yun','Efg City, Amsterdam','Dev','2021-5-5',NULL),('E-6', 'Fred Q','Fgh City,Bosnia', 'Dev','2021-8-10',NULL),('E-7', 'Albus D','Ghi City, Tokyo','Intern','2022-4-4 ',NULL),('E-8', 'Tom B','Hij City, Madrid','Dev','2019-5-10','2021-5-12' ),('E-9', 'Pablo E','Ijk City, Istanbul','Sr.Dev','2020-6-6',NULL)",(err,result, fields) =>{
if (err) {
console.log("Something went wrong while inserting please re-check the syntax!!")
}
else{
    console.log("Employee details inserted succesfully.")
} 
});
    




// 3. Get all the employee name and designation from the table based on seniority.


db.query(`select EName, Designation from employee where designation like 's%'`,(err,result, fields) =>{
    if(err){
        return console.log(err)
    }
    return console.log(result)
})



//4.Get the details of the senior employee joined in a specific time period, update the designation and return the employee details

// **Getting details
db.query(`select * from employee where DOJ = '2020-6-6'`,(err,result, fields) =>{
     if(err){
        return console.log(err)
    }
    return console.log(result)
 })


// **Updating Designation
db.query(`update employee set designation = "HR" where DOJ = '2020-6-6'`,(err,result, fields) =>{
     if(err){
        return console.log(err)
    }
    return console.log("designation updated succesfully.")
})


// // **returning updated employee details 
db.query(`select * from employee where DOJ = '2020-6-6'`,(err,result, fields) =>{
     if(err){
        return console.log(err)
    }
    return console.log(result)
 })



// 5. Get the full data of all the employees working in the organization.

db.query(`select * from employee `,(err,result, fields) =>{
   if(err){
       return console.log(err)
     }
     return console.log(result)
  })



// 6. Total number of employees working in the organization

db.query(`select count(EId) from employee `,(err,result, fields) =>{
    if(err){
        return console.log(err)
      }
      return console.log(result)
   })





// 7. Promoting the 3 seniors to Manager role, update the database and return the data.

db.query(`update employee set designation = "Manager" where designation = 'Sr.Dev'`,(err,result, fields) =>{
      if(err){
         return console.log(err)
     }
     return console.log("designation updated succesfully.")
 })

 db.query(`select * from employee where designation = 'Manager'`,(err,result, fields) =>{
      if(err){
         return console.log(err)
     }
     return console.log(result)
  })




// 8. An employee has left the organization, update the database

db.query(`delete from employee  where EName = 'Tom B'`,(err,result, fields) =>{
       if(err){
          return console.log(err)
      }
      return console.log("database updated succesfully.")
  })




// 9. A new employee has joined the organization, update the database with theemployee details.


 db.query("insert into employee (EId,EName,EAddress,Designation,DOJ,DOR) VALUES ('E-8','wajid ','Bengaluru','Dev','2019-5-5','2021-5-5')" ,(err,result, fields) =>{
 if (err) {
    console.log("Something went wrong while inserting please re-check the syntax!!")
    }
    else{
        console.log("Employee details inserted succesfully.")
    } 
    });
    




// 10. Get the details of a particular employee, update the address and return the new data.

// **Getting details
db.query(`select * from employee where EName = 'wajid'`,(err,result, fields) =>{
     if(err){
        return console.log(err)
    }
    return console.log(result)
 })


// **Updating address
db.query(`update employee set EAddress = "Mahadevpura,india" where EName = 'wajid'`,(err,result, fields) =>{
     if(err){
        return console.log(err)
    }
    return console.log("designation updated succesfully.")
})

// **returning new data 
db.query(`select * from employee where EName = 'wajid'`,(err,result, fields) =>{
     if(err){
        return console.log(err)
    }
    return console.log(result)
 })



// 11. Remove the records of the employees from the table, who has left the organization 1 year before(1 year completed after relieving).

// **getting last year DOR employee records through year

db.query(`select * from employee where DOR like '2021%'`,(err,result, fields) =>{
    if(err){
        return console.log(err)
    }
    return console.log(result)
})



// 12. Employee id 4 was left the organaization 1 year before on dated DOR: '2021-5-3'  (1 year completed after relieving).

db.query(`delete from employee WHERE EId ='E-4'`,(err,result, fields) =>{
       if(err){
          return console.log(err)
      }
      return console.log("Records deleted and database updated succesfully.")
  })



// End of the requirement