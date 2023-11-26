const mongoose = require('mongoose')

const connectDB = async () => {
    try{
        const conn = await mongoose.connect("mongodb+srv://test1:abcde@cluster0.dblqz3t.mongodb.net/?retryWrites=true&w=majority");
        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
    }catch(error){
        console.log(`Error:${error.message}`.red.underline.bold);
        process.exit(1)
    }
}

module.exports = connectDB