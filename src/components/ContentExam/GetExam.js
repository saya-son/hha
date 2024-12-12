import React, {useEffect, useState} from 'react';
import axiosGetExam from '../../Api/userApi';
export default function GetExam() {
    const [exams, setExams] = useState([]);
    useEffect(() => {
        getAllExams();
        console.log('Exams: ', exams);
    })
    // Hàm call data from api
    const getAllExams = async() =>{
        // Gọi api lấy dữ liệu
        const rep = await axiosGetExam.get("exams");
        console.log('rep: ', rep.data);
        setExams(rep.data)
    }
    // render data to element
    const elementExams = exams.map((item, index) => {
        return (
            <>
                <tr key={index}>
                    <td>{item.examId}</td>
                    <td>{item.examName}</td>
                    <td>{item.level}</td>
                    <td>{item.time}</td>
                    <td>{item.total}</td>
                    <td>
                        <a href='/#' className='btn btn-success mx-2'>Edit</a>
                        <a href='/#' className='btn btn-danger mx-1'>Delete</a>
                    </td>
                </tr>
            </>
        )
    })
  return (
    <div>
        <h2>Quản lý bài thi</h2>
        <table className=' table table-bordered'>
            <thead>
                <tr>
                    <th>Mã đề thi</th>
                    <th>Tên đề thi</th>
                    <th>Mức độ</th>
                    <th>Thời gian</th>
                    <th>Câu hỏi</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {elementExams}
            </tbody>
        </table>
    </div>
  )
}
