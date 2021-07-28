const path=require('path')
const express=require('express');
const { resolve } = require('path');
const app=express()
const a=path.join(__dirname,'./')
console.log(a)

app.set('view engine','hbs');
app.use(express.static('./'));
app.use(express.static('./aa'));

app.get('',(req,res)=>{
    res.render('index')
})

app.get('/Index',(req,res)=>{
    res.render('index')
})


app.get('/RawMaterial',(req,res)=>{
    res.render('RawMaterial')
})

app.get('/ManufacturingDetails',(req,res)=>{
   res.render('ManufacturingDetails')
})

app.get('/QualityAssurance',(req,res)=>{
    res.render('QualityAssurance')
 })

app.get('/Customer',(req,res)=>{
    res.render('Customer')
})

app.get('/tracking',(req,res)=>{

    res.render('tracking')

   // res.send('<h1>hello world</h1>')

})

app.get('/weather',(req,res)=>{
    console.log(req.query)
    if(!req.query.search){
        return res.send({
            error:'you must provide some info'
        })

    }
   const main=require('../application/AddRawMaterial')
    res.send({
        forecast:'Add Raw Material API Successful'
    })
})


app.listen(3000,()=>{

    console.log('server is up=',a)

})


app.get('/pharmacy',(req,res)=>{
    console.log(req.query)
    if(!req.query.DrugID){
        return res.send({
            error:'Provide Drug ID'
        })
    }
    //DrugID, DrugName, RawMaterialName, RawMaterialQuantity, RawMaterialSource
   const main=require('../application/AddRawMaterial')
   const m=main(req.query.DrugID,req.query.DrugName,req.query.RawMaterialName,req.query.RawMaterialQuantity, req.query.RawMaterialSource)
    res.send({
        forecast:'Pharmacy Get API called!'
    })

})


app.get('/manufacturing',(req,res)=>{
    console.log(req.query)
    if(!req.query.DrugID){
        return res.send({
            error:'Provide Drug ID'
        })
    }
    //DrugID, DrugName, RawMaterialName, RawMaterialQuantity, RawMaterialSource
   const main=require('../application/AddManufacturingDetails')
   const m=main(req.query.DrugID,req.query.DrugName,req.query.RawMaterialUsedName,req.query.RawMaterialUsedQuantity)
    res.send({
        forecast:'Pharmacy Get API called!'
    })

})


app.get('/packaging',(req,res)=>{
    console.log(req.query)
    if(!req.query.DrugID){
        return res.send({
            error:'Packaging: Provide Drug ID'
        })
    }
    //DrugID, DrugName, RawMaterialName, RawMaterialQuantity, RawMaterialSource
   const main=require('../application/AddPackagingDetails')
   const m=main(req.query.DrugID,req.query.DrugName,req.query.ManufacturedDate,req.query.ExpiryDate, req.query.Price)
    res.send({
        forecast:'Packaging API called!'
    })

})


/*
app.get('/pharmacy1',(req,res)=>{
    console.log(req.query)
    if(!req.query.DrugID1){
        return res.send({
            error:'Provide Drug ID'
        })
    }
    //DrugID, DrugName, RawMaterialName, RawMaterialQuantity, RawMaterialSource
   const main=require('../application/AddManufacturingDetails')
   const m=main(req.query.DrugID1,req.query.DrugName1,req.query.RawMaterialUsedName,req.query.RawMaterialUsedQuantity)
    res.send({
        forecast:'Pharmacy2 Get API called!'
    })

})*/


//////////////////////////////////////////////////////////////////////////

app.get('/search',(req,res)=>{

    console.log(req.query)

  //  main()

    if(!req.query.rawMaterial){



        return res.send({

            error:'you must provide some info'

        })

    }

   //main()
  
   const main=require('../application/ReadDrug')
   const m=  main(req.query.rawMaterial).then((msg)=>

    res.send(msg)
    

   );
 
})
