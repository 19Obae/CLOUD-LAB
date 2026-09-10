import { useState, useEffect, useCallback } from 'react';

function App() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({ studentId: '', name: '', email: '' });

  const fetchStudents = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:5000/api/students');
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu:", error);
    }
  }, []);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('http://localhost:5000/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      setFormData({ studentId: '', name: '', email: '' });
      fetchStudents();
    } catch (error) {
      console.error("Lỗi khi thêm sinh viên:", error);
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
        <button type="submit" style={{ padding: '6px 15px', cursor: 'pointer' }}>Thêm sinh viên</button>
      </form>
      <table border="1" width="100%" style={{ borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr>
            <th style={{ padding: '8px' }}>MSSV</th>
            <th style={{ padding: '8px' }}>Họ tên</th>
            <th style={{ padding: '8px' }}>Email</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student._id}>
              <td style={{ padding: '8px' }}>{student.studentId}</td>
              <td style={{ padding: '8px' }}>{student.name}</td>
              <td style={{ padding: '8px' }}>{student.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;