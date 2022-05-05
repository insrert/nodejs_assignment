//  API for testing purpose

app.get('/', (req, res) => {
    res.send('hi')
})

// CRUD API starts 

//Insert
app.post('/CreateEmpDetails', (req, res) => {
   

    const Insert_query = `insert into employee (EId,EName,EAddress,Designation,DOJ,DOR) VALUES('${req.body.EId}','${req.body.EName}','${req.body.EAddress}',
    '${req.body.Designation}','${req.body.DOJ}', '${req.body.DOR}')
    `
    db.query(Insert_query, (err, result) => {
        if (err) {
            res.send('Error while inserting')
        } else {
            res.send('Employee Details inserted succesfully.')
        }
    })
})

app.get('/allEmpDetails', (req, res) => {
   
    const read_query = `select * from employee`
    
    db.query(read_query, (err, result) => {
        if (err) {
            res.send('Error while reading employee details.')
        } else {
            res.send(result)
        }
    })
})

//Read
app.get('/allEmpDetails/:EId', (req, res) => {
   
console.log(req.params.EId)
    const read_query = `select * from employee where EId = '${req.params.EId}'`
    
    db.query(read_query, (err, result) => {
        if (err) {
            res.send('Error while reading employee details.')
        } else {
            res.send(result)
        }
    })
})

//Update
app.put('/updateEmpDetails/:EId', (req, res) => {
   
console.log(req.params.EId)
    const update_query = `update employee set 
    EName='${req.body.EName}',
    EAddress='${req.body.EAddress}',
    Designation='${req.body.Designation}',
    DOJ='${req.body.DOJ}',
    DOR= '${req.body.DOR}'
    where EId = '${req.params.EId}'`
    
    db.query(update_query, (err, result) => {
        if (err) {
            res.send('Error while updating employee details.')
        } else {
            res.send("Employee details has been updated succesfully.")
        }
    })
})

//Delete 
app.delete('/allEmpDetails/:EId', (req, res) => {
   
console.log(req.params.EId)
    const delete_query = `delete from employee where EId = '${req.params.EId}'`
    
    db.query(delete_query, (err, result) => {
        if (err) {
            res.send('Error while deleting employee details.')
        } else {
            res.send("selected employee details has been deleted succesfully.")
        }
    })
})

//CRUD API ENDS
