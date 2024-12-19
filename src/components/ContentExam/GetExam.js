import React, { useEffect, useState } from 'react';
import axiosGetExam from '../../Api/userApi';

export default function GetExam() {
    const [exams, setExams] = useState([]); // Lưu danh sách bài thi
    const [loading, setLoading] = useState(true); // Trạng thái tải dữ liệu

    useEffect(() => {
        getAllExams();
    }, []); // Thêm dependency [] để tránh gọi API lặp lại.

    const getAllExams = async () => {
        try {
            // Gọi API lấy dữ liệu bài thi
            const response = await axiosGetExam.get("/admin/exams");
            console.log('Response: ', response.data);
            setExams(response.data); // Lưu dữ liệu vào state
        } catch (error) {
            console.error('Error fetching exams: ', error);
        } finally {
            setLoading(false); // Đặt trạng thái tải dữ liệu thành false
        }
    };

    // Render dữ liệu ra bảng
    const elementExams = exams.map((item, index) => (
        <tr key={index}>
            <td>{item.examDto.subjectId}</td>
            <td>{item.examDto.title}</td>
            <td>{item.examDto.description}</td>
            <td>{item.examDto.duration} phút</td>
            <td>{item.numberOfQuestion}</td>
            <td>
                <a href='/#' className='btn btn-success mx-2'>Edit</a>
                <a href='/#' className='btn btn-danger mx-1'>Delete</a>
            </td>
        </tr>
    ));

    return (
        <div>
            <h2>Quản lý bài thi</h2>
            {loading ? (
                <p>Đang tải dữ liệu...</p>
            ) : (
                <table className='table table-bordered'>
                    <thead>
                        <tr>
                            <th>Mã môn học</th>
                            <th>Tên bài thi</th>
                            <th>Mô tả</th>
                            <th>Thời gian</th>
                            <th>Số câu hỏi</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {elementExams}
                    </tbody>
                </table>
            )}
        </div>
    );
}
