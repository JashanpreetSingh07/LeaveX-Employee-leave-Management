const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const jwt = require('jsonwebtoken');

dotenv.config();

async function test() {
    await mongoose.connect(process.env.MONGO_URI);
    try {
        const admin = await User.findOne({ role: 'Admin' });
        if (!admin) {
            console.log("No admin found in DB!");
            mongoose.disconnect();
            return;
        }
        console.log("Found Admin:", admin.email);
        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '30d' });

        const nonAdmin = await User.findOne({ role: { $ne: 'Admin' } });
        if (!nonAdmin) {
            console.log("No non-admin found to update!");
            mongoose.disconnect();
            return;
        }
        console.log("Target user:", nonAdmin.email, "Current role:", nonAdmin.role);

        // Fetch using fetch API
        const res = await fetch(`http://localhost:5000/api/users/${nonAdmin._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
            body: JSON.stringify({ role: 'Manager' })
        });
        console.log("Status:", res.status);
        if (!res.ok) {
            console.log("Body:", await res.text());
        } else {
            console.log("Success:", await res.json());
        }

    } catch (e) {
        console.error("API Error:", e);
    }
    mongoose.disconnect();
}
test();
