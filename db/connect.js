const mongoose = require("mongoose");
const PORT = 8080;

exports.launch = async(app)=>{
try{
await mongoose.connect(process.env.MONGO_ACCESS,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});
console.debug("--SERVER LAUNCHED--");
}catch(err){
console.debug(err);
return
}
app.listen(PORT);
}