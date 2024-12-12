import React, { useEffect, useState } from 'react';
import axiosGetSubject from '../../Api/LocalApi';

export default function GetSubject() {
    const [subjects, setSubject] = useState([]);
    useEffect(() =>{
        getAllSubject();
        console.log("Subject: ", subjects);
    })
    // Hàm call data from api
    const getAllSubject = async() => {
        // Gọi api lấy dữ liệu
        const rep = await axiosGetSubject.get("subjects");
        console.log('rep: ', rep.data);
        setSubject(rep.data)
    }
    // render data to element
    const elementSubject = subjects.map((item, index) =>{
        return (
            <tr key={index}>
                <td>{item.subjectId}</td>
                <td>{item.subjectName}</td>
                <td>{item.describe}</td>
                <td>
                    <a href='/#' className='btn btn-success mx-2'>Edit</a>
                    <a href='/#' className='btn btn-danger mx-1'>Delete</a>
                </td>
            </tr>
        )
    })
  return (
    <div>
        <h2>Quản lý môn học</h2>
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
  )
}
