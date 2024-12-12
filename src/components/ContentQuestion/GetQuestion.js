import React, { useEffect, useState } from 'react';
import axiosGetQuestion from '../../Api/LocalApi';

export default function GetQuestion() {
    const [questions, setQuestion] = useState([]);
    useEffect(() =>{
        getAllQuestion();
        console.log('Questions: ', questions);
    })
    // Hàm call data from api
    const getAllQuestion = async() => {
        // Gọi api từ dữ liệu
        const rep = await axiosGetQuestion.get("questions")
        console.log('rep: ', rep.data);
        setQuestion(rep.data);
    }
    // render data to element
    const elementQuestion = questions.map((item, index) => {
        return (
            <tr key={index}>
                <td>{item.questionId}</td>
                <td>{item.content}</td>
                <td>{item.chooseA}</td>
                <td>{item.chooseB}</td>
                <td>{item.chooseC}</td>
                <td>{item.chooseD}</td>
                <td>{item.exactly}</td>
                <td>
                    <a href='/#' className='btn btn-success mx-2'>Edit</a>
                    <a href='/#' className='btn btn-danger mx-1'>Delete</a>
                </td>
            </tr>
        );
    })
  return (
    <div>
        <h2>Quản lý câu hỏi</h2>
        <table className='table table-bordered'>
            <thead>
                <tr>
                    <th>Mã câu hỏi</th>
                    <th>Nội dung</th>
                    <th>Đáp án A</th>
                    <th>Đáp án B</th>
                    <th>Đáp án C</th>
                    <th>Đáp án D</th>
                    <th>Đáp án đúng</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {elementQuestion}
            </tbody>
        </table>
    </div>
  )
}
