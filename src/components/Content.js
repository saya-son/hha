import React from 'react';
import { Route, Routes } from 'react-router-dom';
import '../styles/content.css';
import GetExam from './ContentExam/GetExam';
import { ContentHeader } from './ContentHeader';
import ContentHome from './ContentHome/ContentHome';
import GetQuestion from './ContentQuestion/GetQuestion';
import GetSubject from './ContentSubject/GetSubject';
import EditUser from './ContentUser/EditUser';
import GetUser from './ContentUser/GetUser';
import UpdateUser from './ContentUser/UpdateUser';
import Login from './Test/Login';
import AddUser from './ContentUser/AddUser';
import AddSubject from './ContentSubject/AddSubject';
import GetChapter from './ContentChapter/GetChapter';
import AddChapter from './ContentChapter/AddChapter';
import AddQuestion from './ContentQuestion/AddQuestion';

export default function Content() {
  return (
    <div className='content'>
        <ContentHeader />
        <Routes>

          <Route path='/home' element={<ContentHome />} />

          <Route path='/admin/users' element={<GetUser />} />
          <Route path='/public/admin/add/user' element={<AddUser />} />


          <Route path='/exams' element={<GetExam />} />

          <Route path='/public/subjects' element={<GetSubject />} />
          <Route path='/public/admin/subjects' element={<AddSubject />} />

          <Route path='/public/subject/chapters' element={<GetChapter />} />
          <Route path='/public/admin/add/chapter' element={<AddChapter />} />

          <Route path='/public/chapter/questions' element={<GetQuestion />} />
          <Route path='/public/admin/questions' element={<AddQuestion />} />

          <Route path='/page' element={<EditUser />} />
          <Route path='/auth/login' element={<Login />} />
        </Routes>       
    </div>
  )
}
