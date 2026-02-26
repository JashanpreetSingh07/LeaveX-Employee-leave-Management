const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

async function test() {
    await mongoose.connect(process.env.MONGO_URI);
    try {
        const user = await User.findOne({});
        if (!user) {
            console.log("No user found");
            return;
        }
        console.log("Found user:", user.email, user.role);
        user.role = user.role === 'Admin' ? 'Employee' : 'Admin';
        await user.save();
        console.log("Updated to:", user.role);
    } catch (e) {
        console.error("Error saving:", e);
    }
    mongoose.disconnect();
}
test();
