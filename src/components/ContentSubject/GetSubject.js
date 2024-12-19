import React, { useEffect, useState } from 'react';
import axiosGetSubject from '../../Api/userApi';
import { useNavigate } from 'react-router-dom';

export default function GetSubject() {
    const [subjects, setSubject] = useState([]);
    const navigate = useNavigate();

    // Lấy tất cả môn học
    useEffect(() => {
        getAllSubject();
    }, []);

    // Hàm gọi API để lấy dữ liệu môn học
    const getAllSubject = async () => {
        const rep = await axiosGetSubject.get("public/subjects");
        console.log('rep: ', rep.data);
        setSubject(rep.data);
    };

    // Hàm xóa môn học
    const deleteSubject = async (subjectId) => {
        try {
            await axiosGetSubject.delete(`/public/admin/subjects/${subjectId}`);
            // Sau khi xóa thành công, loại bỏ môn học khỏi danh sách
            setSubject((prevSubjects) => prevSubjects.filter(subject => subject.subjectId !== subjectId));
            alert('Môn học đã được xóa thành công!');
        } catch (error) {
            console.error('Lỗi khi xóa môn học:', error.response?.data || error.message);
            alert('Không thể xóa môn học!');
        }
    };

    // Render danh sách môn học
    const elementSubject = subjects.map((item) => {
        return (
            <tr key={item.subjectId}>
                <td>{item.subjectId}</td>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>
                    {/* Nút Xóa môn học */}
                    <button
                        className="btn btn-danger mx-1"
                        onClick={() => deleteSubject(item.subjectId)}
                    >
                        Delete
                    </button>
                </td>
            </tr>
        );
    });

    return (
        <div>
            <h2>Quản lý môn học</h2>

            {/* Nút thêm môn học */}
            <button
                className="btn btn-primary mb-3 float-end"
                onClick={() => navigate('/public/admin/subjects')}
            >
                Thêm môn học
            </button>

            {/* Bảng danh sách môn học */}
            <table className='table table-bordered'>
                <thead>
                    <tr>
                        <th>Mã môn học</th>
                        <th>Tên môn học</th>
                        <th>Mô tả</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {elementSubject}
                </tbody>
            </table>
        </div>
    );
}
