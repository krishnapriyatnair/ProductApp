const express= require('express');
const jwt=require('jsonwebtoken');
const ProductData= require('./model/ProductData');
const UserData= require('./model/UserData');
const cors=require('cors');
const bodyParser=require('body-parser');
const port=3000;

const app=express();

app.use(cors());
app.use(bodyParser.json());
 

function verifyToken(req,res,next){
    if(!req.headers.authorization){
        return res.status(401).send("Unauthorized request");
    }
    let token=req.headers.authorization.split( ' ' )[1]
    if(token=== 'null'){
return res.status(401).send('Unauthorised request');
    }
    let payload=jwt.verify(token, 'key');
    if(!payload){
        return res.status(401).send('Unauthorised request');
    }
    req.userId=payload.subject
    next()
}




app.get('/products',function(req,res){
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTION")
ProductData.find()
.then(function(products){
    res.send(products);
});
});

app.post('/product',function(req,res){
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTION")
    const id=req.body.id;

    ProductData.findOne({_id:id})
.then(function(product)
{
    res.send(JSON.parse(JSON.stringify(product)));
});

});

app.post('/insert', verifyToken,function(req,res){
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTION")
    console.log(req.body);
    var product={
        productID:req.body.product.productID,
    productName:req.body.product.productName,
    productCode:req.body.product.productCode,
   releaseDate:req.body.product.releaseDate,
  description:req.body.product.description,
  price:req.body.product.price,
  starRating:req.body.product.starRating,
  imageUrl:req.body.product.imageUrl
    }
    var product=new ProductData(product);
product.save();

});


app.post('/remove',verifyToken,function(req,res){
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTION")
   const id=req.body.id;

   ProductData.deleteOne({_id:id})
   .then((product)=>
   {
       res.send("deleted product with id");
   })

    
});




app.post('/edit',verifyToken,(req,res)=>
{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");

    var product=
{
  _id:req.body.product['_id'],
  productId:req.body.product['productId'],
  productName:req.body.product['productName'],
  productCode:req.body.product['productCode'],
  releaseDate:req.body.product['releaseDate'],
  description:req.body.product['description'],
  price:req.body.product['price'],
  starRating:req.body.product['starRating'],
  imgUrl:req.body.product['imgUrl']
} 
ProductData.updateOne({_id:product._id},
                      {
                        $set:
                        {
                          productId:product.productId,
                          productName:product.productName,
                          productCode:product.productCode,
                          releaseDate:product.releaseDate,
                          description:product.description,
                          price:product.price,
                          starRating:product.starRating,
                          imgUrl:product.imgUrl
                        }
                      })
.then((product)=>
{
    console.log(product);
res.send("Updated One Document!");
})
});


app.post('/signup',function(req,res){
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTION")
    
    var user={
        userName:req.body.user.userName,
    userUName:req.body.user.userUName,
    userPassword:req.body.user.userPassword,
    userEmail:req.body.user.userEmail
    }
    console.log(user);
   
                var usersign=new UserData(user);
                usersign.save((err,registerdData )=>{
                    if(err){
                        console.log(err);
                    }
                    else{
                        let payload={ subject:registerdData._id}
                        let token=jwt.sign(payload,"key")
                        res.status(200).send({token});
                    }
                })
               
});

app.post('/login',function(req,res){
 res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTION")
    let user=req.body;
    

    var password=req.body.user.userPassword;
    // console.log(userPassword);
     
    var email=req.body.user.userEmail;
    // console.log(userEmail);
    let status="invalid";
    UserData.findOne({userEmail:email,userPassword:password},(err,userdata)=>{
     if (err){
     console.log(err) ; 
     res.send({status});
     }
     else{ 
         if(!userdata){
         console.log("invalid entry") ;
        res.send({status});    
        }
     else{
      let payload={subject:userdata._id}
     let token=jwt.sign(payload,"key")
     res.status(200).send({token});
    
     }
    }
    
 });
    
              
});

   
app.listen(3000,function(){
    console.log('listening to port 3000');
});
