const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());

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

const Student = require('./models/student');

// Câu 36: Lấy danh sách sinh viên
app.get('/api/Students', async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Câu 37: Thêm sinh viên
app.post('/api/Students', async (req, res) => {
    try {
        const newStudent = await Student.create(req.body);
        res.status(201).json(newStudent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Câu 38: Cập nhật sinh viên
app.put('/api/Students/:id', async (req, res) => {
    try {
        const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedStudent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Câu 39: Xóa sinh viên
app.delete('/api/Students/:id', async (req, res) => {
    try {
        await Student.findByIdAndDelete(req.params.id);
        res.json({ message: "Đã xóa sinh viên thành công" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});