import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function GetChapterSubject() {
    const { subjectId } = useParams(); // Lấy subjectId từ URL
    const [chapters, setChapters] = useState([]);

    // Lấy dữ liệu các chương
    useEffect(() => {
        if (subjectId) {
            fetchChapters(subjectId);
        }
    }, [subjectId]);

    // Hàm gọi API để lấy danh sách các chương
    const fetchChapters = async (subjectId) => {
        try {
            const response = await axios.get(`http://localhost:8080/public/subject/chapters/${subjectId}`);
            if (response.data && response.data.length > 0) {
                setChapters(response.data);
            } else {
                setChapters([]);  // Trường hợp không có chương nào
                alert('Không có chương nào cho môn học này!');
            }
        } catch (error) {
            console.error('Lỗi khi lấy danh sách chương:', error.response?.data || error.message);
            alert('Không thể lấy danh sách chương!');
        }
    };

    return (
        <div>
            <h2>Danh sách chương</h2>

            {/* Nút thêm chương */}
            <button
                className="btn btn-primary mb-3 float-end"
                onClick={() => window.location.href = `/public/admin/add/chapter/${subjectId}`}
            >
                Thêm chương
            </button>

            {/* Kiểm tra xem có chương nào không */}
            {chapters.length === 0 ? (
                <p>Không có chương nào cho môn học này.</p>
            ) : (
                // Bảng danh sách chương
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Mã chương</th>
                            <th>Tên chương</th>
                            <th>Số chương</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {chapters.map((chapter) => (
                            <tr key={chapter.chapterId}>
                                <td>{chapter.chapterId}</td>
                                <td>{chapter.name}</td>
                                <td>{chapter.chapterNumber}</td>
                                <td>
                                    <button className="btn btn-danger">
                                        Xóa
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
