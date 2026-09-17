import { useState, useEffect, useCallback } from 'react';

function App() {
  const [students, setStudents] = useState([]);
  // Bổ sung thêm _id: null để theo dõi trạng thái đang sửa hay thêm mới
  const [formData, setFormData] = useState({ studentId: '', name: '', email: '', _id: null });

  const fetchStudents = useCallback(async () => {
    try {
      const response = await fetch('https://congenial-space-engine-x5xvg9gqwj6p3vww5-5000.app.github.dev/api/students');
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu:", error);
    }
  }, []);

  // Đã sửa lỗi thiếu lệnh fetchStudents() bên trong useEffect
  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Logic Sửa sinh viên (Câu 77)
  const handleEdit = (student) => {
    setFormData({
      studentId: student.studentId,
      name: student.name,
      email: student.email,
      _id: student._id // Lưu lại ID để biết đang cập nhật sinh viên nào
    });
  };

  // Logic Xóa sinh viên (Câu 78)
  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sinh viên này?")) {
      try {
        await fetch(`https://congenial-space-engine-x5xvg9gqwj6p3vww5-5000.app.github.dev/api/students/${id}`, {
          method: 'DELETE',
        });
        fetchStudents(); // Tải lại danh sách sau khi xóa
      } catch (error) {
        console.error("Lỗi khi xóa:", error);
      }
    }
  };

  // Gom chung xử lý Thêm và Cập nhật vào nút Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData._id) {
        // Nếu form có _id -> Đang ở trạng thái Cập nhật (PUT)
        await fetch(`https://congenial-space-engine-x5xvg9gqwj6p3vww5-5000.app.github.dev/api/students/${formData._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
      } else {
        // Nếu form không có _id -> Đang ở trạng thái Thêm mới (POST)
        await fetch('https://congenial-space-engine-x5xvg9gqwj6p3vww5-5000.app.github.dev/api/students', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
      }
      
      // Reset form và tải lại danh sách
      setFormData({ studentId: '', name: '', email: '', _id: null });
      fetchStudents();
    } catch (error) {
      console.error("Lỗi khi lưu sinh viên:", error);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>Quản lý Sinh viên</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input 
          type="text" name="studentId" placeholder="MSSV" 
          value={formData.studentId} onChange={handleChange} required 
          style={{ marginRight: '10px', padding: '5px' }}
        />
        <input 
          type="text" name="name" placeholder="Họ tên" 
          value={formData.name} onChange={handleChange} required 
          style={{ marginRight: '10px', padding: '5px' }}
        />
        <input 
          type="email" name="email" placeholder="Email" 
          value={formData.email} onChange={handleChange} required 
          style={{ marginRight: '10px', padding: '5px' }}
        />
        <button type="submit" style={{ padding: '6px 15px', cursor: 'pointer', backgroundColor: formData._id ? '#ffc107' : '#4CAF50', color: formData._id ? 'black' : 'white', border: 'none' }}>
          {/* Nút bấm tự đổi tên tùy trạng thái */}
          {formData._id ? 'Cập nhật' : 'Thêm sinh viên'}
        </button>
        
        {/* Nút Hủy hiển thị khi đang sửa */}
        {formData._id && (
          <button type="button" onClick={() => setFormData({ studentId: '', name: '', email: '', _id: null })} style={{ marginLeft: '10px', padding: '6px 15px', cursor: 'pointer' }}>
            Hủy
          </button>
        )}
      </form>

      <table border="1" width="100%" style={{ borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr>
            <th style={{ padding: '8px' }}>MSSV</th>
            <th style={{ padding: '8px' }}>Họ tên</th>
            <th style={{ padding: '8px' }}>Email</th>
            <th style={{ padding: '8px', textAlign: 'center' }}>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student._id}>
              <td style={{ padding: '8px' }}>{student.studentId}</td>
              <td style={{ padding: '8px' }}>{student.name}</td>
              <td style={{ padding: '8px' }}>{student.email}</td>
              <td style={{ padding: '8px', textAlign: 'center' }}>
                <button onClick={() => handleEdit(student)} style={{ marginRight: '5px', padding: '4px 8px', cursor: 'pointer' }}>Sửa</button>
                <button onClick={() => handleDelete(student._id)} style={{ padding: '4px 8px', cursor: 'pointer', backgroundColor: '#f44336', color: 'white', border: 'none' }}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;