import React, { useEffect, useState } from 'react';
import axiosGetQuestion from '../../Api/LocalApi';

export default function GetQuestion() {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        getAllQuestions();
    }, []);

    const getAllQuestions = async () => {
        try {
            const rep = await axiosGetQuestion.get("questions");
            setQuestions(rep.data);
        } catch (error) {
            console.error("Error fetching questions:", error);
        }
    };

    // render data to element
    const elementQuestion = questions.map((item) => (
        <tr key={item.questionId}>
            <td>{item.questionId}</td>
            <td>{item.content}</td>
            <td>{item.difficulty}</td>
            <td>{item.chapterName}</td>
            {item.answers.map((answer, index) => (
                <td key={index}>{answer.content}</td>
            ))}
            <td>
                {
                    item.answers.find(answer => answer.isCorrect)?.content ||
                    "No correct answer"
                }
            </td>
            <td>
                <button className="btn btn-success mx-2">Edit</button>
                <button className="btn btn-danger mx-1">Delete</button>
            </td>
        </tr>
    ))
    console.log(elementQuestion);

    return (
        <div>
            <h2>Quản lý câu hỏi</h2>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Mã câu hỏi</th>
                        <th>Nội dung</th>
                        <th>Mức độ</th>
                        <th>Tên chương</th>
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
    );
}
