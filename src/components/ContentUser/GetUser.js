import React, { useEffect, useState } from 'react';
import axiosGetUser from '../../Api/userApi';
import { NavLink } from 'react-router-dom';

export default function GetUser() {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 9; // Số người dùng mỗi trang
    const maxPageButtons = 5; // Số nút trang tối đa hiển thị

    useEffect(() => {
        getAllUsers();
    }, []);

    // Hàm call API lấy danh sách người dùng
    const getAllUsers = async () => {
        const resp = await axiosGetUser.get("users");
        setUsers(resp.data);
    };

    // Tính toán các user hiển thị trên trang hiện tại
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    // Tổng số trang
    const totalPages = Math.ceil(users.length / usersPerPage);

    // Hàm chuyển trang
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Xóa người dùng
    const deleteUser = async (userId) => {
        const confirmDelete = window.confirm('Bạn có muốn xóa người dùng không');
        if (confirmDelete) {
            try {
                await axiosGetUser.delete(`users/${userId}`);
                setUsers(users.filter((user) => user.userId !== userId));
                alert('Xóa người dùng thành công');
                window.location.reload();
            } catch (error) {
                console.error(`Lỗi khi xóa người dùng có Id ${userId}:`, error);
                alert('Đã xảy ra lỗi khi xóa người dùng');
            }
        }
    };

    // Logic hiển thị nút trang với dấu `...` và `>>`
    const getPageNumbers = () => {
        const pages = [];
        const startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
        const endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

        if (startPage > 1) pages.push(1, "...");

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        if (endPage < totalPages) pages.push("...", totalPages);

        return pages;
    };

    const handleNextFivePages = () => {
        setCurrentPage((prev) => Math.min(prev + 5, totalPages));
    };

    const handlePrevFivePages = () => {
        setCurrentPage((prev) => Math.max(prev - 5, 1));
    };

    const pagination = (
        <nav>
            <ul className="pagination">
                <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                    <button className="page-link" onClick={() => paginate(1)}>First</button>
                </li>
                <li className={`page-item ${currentPage <= 5 ? "disabled" : ""}`}>
                    <button className="page-link" onClick={handlePrevFivePages}>{"<<"}</button>
                </li>
                {getPageNumbers().map((number, index) => (
                    <li
                        key={index}
                        className={`page-item ${
                            number === currentPage ? "active" : ""
                        } ${number === "..." ? "disabled" : ""}`}
                    >
                        {number === "..." ? (
                            <span className="page-link">{number}</span>
                        ) : (
                            <button
                                onClick={() => paginate(number)}
                                className="page-link"
                            >
                                {number}
                            </button>
                        )}
                    </li>
                ))}
                <li className={`page-item ${currentPage >= totalPages - 4 ? "disabled" : ""}`}>
                    <button className="page-link" onClick={handleNextFivePages}>{">>"}</button>
                </li>
                <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                    <button className="page-link" onClick={() => paginate(totalPages)}>Last</button>
                </li>
            </ul>
        </nav>
    );

    // Hiển thị danh sách người dùng
    const elementUsers = currentUsers.map((item, index) => (
        <tr key={index}>
            <td>{item.userId}</td>
            <td>{item.username}</td>
            <td>{item.fullName}</td>
            <td>{item.email}</td>
            <td>{item.role}</td>
            <td>
                <NavLink to={`/users/${item.id}`} className="btn btn-success mx-2">Edit</NavLink>
                <button
                    className="btn btn-danger mx-1"
                    onClick={() => deleteUser(item.id)}
                >
                    Delete
                </button>
            </td>
        </tr>
    ));

    return (
        <div>
            <h2>Quản lý User</h2>
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
                <tbody>{elementUsers}</tbody>
            </table>
            {pagination}
        </div>
    );
}



// import React, { useEffect, useState } from 'react';
// import axiosGetUser from '../../Api/userApi';
// import {NavLink} from 'react-router-dom';

// export default function GetUser() {
//     const [users, setUsers] = useState([]);
//     useEffect(() =>{
//         getAllUsers();
//         console.log("UserLocal:", users);
//     },[])
//     // hàm call data from api
//     const getAllUsers = async() => {
//         // gọi api lấy dữ liệu
//         const resp = await axiosGetUser.get("users");
//         console.log("resp:", resp.data);
//         setUsers(resp.data)
//     }
//     // Hàm xóa người dùng
//     const deleteUser = async (id) => {
//         const confirmDelete = window.confirm('Bạn có muốn xóa người dùng không')
//         if(confirmDelete) {
//             try {
//                 await axiosGetUser.delete(`users/${id}`);// gửi yêu cầu delete
//                 setUsers(users.filter((user) => user.id !== id));// cập nhập danh sách người dùng
//                 alert('Xóa người dùng thành công'); // thông báo sau khi xóa
//             } catch (error) {
//                 console.error(`Lỗi khi xóa người dùng có ID ${id}:`, error);
//                 alert('Đã xảy ra lỗi khi xóa người dùng'); // thông báo lỗi
//             }
//         }
//     };
//     // render data to element
//     const elementUsers = users.map((item, index) =>{
//         return (
//             <>
//                 <tr key={index}>
//                     <td>{item.id}</td>
//                     <td>{item.fullname}</td>
//                     <td>{item.number}</td>
//                     <td>{item.email}</td>
//                     <td>{item.gender?"Nam":"Nữ"}</td>
//                     <td>{item.create}</td>
//                     <td>{item.edit}</td>
//                     <td>
//                         <NavLink to ={`/users/${item.id}`} className='btn btn-success mx-2'>Edit</NavLink>
//                         <button 
//                             className='btn btn-danger mx-1'
//                             onClick={() =>deleteUser(item.id)}
//                         >
//                             Delete
//                         </button>
//                     </td>
//                 </tr>
//             </>
//         )
//     })
//     return (
//         <div>
//             <h2>Quản lý User</h2>
//             <table className='table table-bordered'>
//                 <thead>
//                     <tr>
//                         <th>Mã tài khoản</th>
//                         <th>Họ và tên</th>
//                         <th>Số điện thoại</th>
//                         <th>Email</th>
//                         <th>Giới tính</th>
//                         <th>Ngày tạo</th>
//                         <th>Ngày sửa</th>
//                         <th>Action</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {elementUsers}
//                 </tbody>
//             </table>
//         </div>
//     );
// }
