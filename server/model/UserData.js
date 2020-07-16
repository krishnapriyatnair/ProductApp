const mongoose=require('mongoose')
mongoose.connect('mongodb://localhost:27017/ProductDb');
const Schema=mongoose.Schema;

var UserSchema=new Schema({
    
    userName:String,
    userUName:String,
    userPassword:String,
    userEmail:String,

});

var Userdata=mongoose.model('user',UserSchema);
module.exports=Userdata;
