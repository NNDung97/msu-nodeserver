import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const url = process.env.MONGO_URL;
        if (!url) throw new Error("❌ Biến môi trường MongoURL không được định nghĩa!");

        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("✅ Mongoose connected successfully!");
    } catch (error) {
        console.error("❌ Lỗi kết nối MongoDB:", error);
        process.exit(1);
    }
}

export default connectDB