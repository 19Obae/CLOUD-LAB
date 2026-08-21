const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Nhớ thay thế chuỗi URI dưới đây bằng chuỗi Connection String thật của em ở Câu 30 nhé!
const URI = "mongodb+srv://Khoa:1234@cluster0.ilcx6ar.mongodb.net/?appName=Cluster0";

mongoose.connect(URI)
    .then(() => console.log('Đã kết nối thành công với MongoDB Atlas!'))
    .catch((err) => console.error('Lỗi kết nối MongoDB:', err));

// Câu 22: Tạo API GET /api/hello
app.get('/api/hello', (req, res) => {
    res.json({ message: "Backend đang hoạt động ngon lành trên Linux Server!" });
});

// Câu 21: Khởi chạy Server
app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
});