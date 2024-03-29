const mongoose  = require('mongoose');
const db = process.env.MONGO_URI ;

const connectDB = async () => {
    try {
        await mongoose.connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true
        });
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}

connectDB().then(r =>

    console.log('MongoDB Connected...'
    ))