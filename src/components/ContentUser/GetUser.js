// GetUser.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Pagination from '../../components/Pagination';  // Import component phân trang

export default function GetUser() {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 7; // Số lượng người dùng mỗi trang
    const navigate = useNavigate();

    // Hàm lấy danh sách người dùng
    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8080/public/admin/users');
            setUsers(response.data);
            console.log('Danh sách người dùng:', response.data);
        } catch (error) {
            console.error('Lỗi API:', error.response?.data || error.message);
            alert('Không thể lấy danh sách người dùng!');
        }
    };

    // Hàm xóa người dùng
    const deleteUser = async (userId) => {
        try {
            console.log(`Xóa người dùng với ID: ${userId}`);
            await axios.delete(`http://localhost:8080/public/admin/delete/users/${userId}`);
            setUsers((prevUsers) => prevUsers.filter((user) => user.userId !== userId));
            alert('Xóa người dùng thành công!');
        } catch (error) {
            console.error('Lỗi khi xóa người dùng:', error.response?.data || error.message);
            alert('Không thể xóa người dùng!');
        }
    };

    // Tính toán người dùng cho trang hiện tại
    const startIndex = (currentPage - 1) * pageSize;
    const currentUsers = users.slice(startIndex, startIndex + pageSize);
    
    // Tính tổng số trang
    const totalPages = Math.ceil(users.length / pageSize);

    // Hàm thay đổi trang
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Lấy danh sách người dùng khi component được render
    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div>
            <h2>Quản lý User</h2>

            {/* Nút chuyển đến trang thêm người dùng */}
            <button
                className="btn btn-primary mb-3 float-end"
                onClick={() => navigate(`/public/admin/add/user`)}
            >
                Add
            </button>

            {/* Bảng danh sách người dùng */}
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Mã tài khoản</th>
                        <th>Tên tài khoản</th>
                        <th>Họ và tên</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currentUsers.map((user, index) => (
                        <tr key={index}>
                            <td>{user.userId}</td>
                            <td>{user.username}</td>
                            <td>{user.fullName}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>
                                <button
                                    className="btn btn-danger mx-1"
                                    onClick={() => deleteUser(user.userId)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Phân trang */}
            <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
        </div>
    );
}
