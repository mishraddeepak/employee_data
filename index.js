const express=require('express');
const port=4000;
const path = require('path');
const {createObjectCsvWriter}=require('csv-writer');


const mongoose = require('./config/mongoose');
const Contact=require('./models/contact');


const app=express();
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(express.urlencoded());
app.use(express.static('assets'));


app.get('/',(req,res)=>{
    console.log("got a request");
Contact.find({})
.then(Contact=>{
    return res.render('home',{
        title:"Add Employee",
        contact_list:Contact
    });
})
.catch(err=>{
    console.error('err',err)
    res.status(500).send("internal server erroe")
    return res.redirect('/')
    
}) ;  
});

app.post('/create-contact',(req,res)=>{
Contact.create({
    name:req.body.name,
    phone:req.body.phone
})
.then(newContact=>{
    console.log('newContact created')
    return res.redirect('/')
})
.catch(err=>{
    console.log('error in sending the data',err)
    return res.status(500).send('internal server error')
});
});

app.get('/download-contacts',(req,res)=>{
    Contact.find({},'name phone')
    .then(contacts=>{
        const csvHeader=[
            {id:'name',title:'Name'},
            {id:'phone',title:'Phone'}
        ];

        const csvWriter = createObjectCsvWriter({
            path:'contacts.csv',
            header:csvHeader
        });

        csvWriter.writeRecords(contacts)
        .then(()=>{
            console.log("csvfile created successfully")
            res.download('contacts.csv','contacts.csv',(err)=>{
                if(err){
                    console.error("error in downloding file",err)
                    res.status(500).send('internal server error')
                };
            });
        })
        .catch(error=>{
            console.error('Error in writing Csv record',error)
            res.status(500).send('Internal server error');
        });
    })
    .catch(error=>{
        console.error('Error in fetching contact',error)
        res.status(500).send('Internal server error')
    });

});
const PORT = process.env.PORT

app.listen(PORT,(err)=>{
    if(err){
        console.log("getting error")
        return
    };
    console.log("your server is fired up successfully", + PORT);
});