import React, { useState } from 'react';
import axiosGetSubject from '../../Api/userApi';
import { useNavigate } from 'react-router-dom';

export default function AddSubject() {
    const [newSubject, setNewSubject] = useState({
        name: '',
        description: ''
    });
    const navigate = useNavigate();

    // Hàm thêm môn học mới
    const addSubject = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosGetSubject.post("/public/admin/subjects", newSubject);
            console.log('Thêm môn học thành công: ', response.data);
            setNewSubject({
                name: '',
                description: ''
            });
            navigate('/public/subjects'); // Quay về trang danh sách môn học sau khi thêm
        } catch (error) {
            console.error('Lỗi khi thêm môn học: ', error);
            alert('Không thể thêm môn học!');
        }
    };

    return (
        <div>
            <h2>Thêm môn học</h2>
            <form onSubmit={addSubject}>
                <div className="form-group mb-3">
                    <label>Tên môn học:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={newSubject.name}
                        onChange={(e) => setNewSubject({ ...newSubject, name: e.target.value })}
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label>Mô tả:</label>
                    <textarea
                        className="form-control"
                        value={newSubject.description}
                        onChange={(e) => setNewSubject({ ...newSubject, description: e.target.value })}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-success">Lưu</button>
                <button type="button" className="btn btn-secondary mx-2" onClick={() => navigate('/public/subjects')}>Hủy</button>
            </form>
        </div>
    );
}
