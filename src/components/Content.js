import React from 'react';
import { Route, Routes } from 'react-router-dom';
import '../styles/content.css';
import AddChapter from './ContentChapter/AddChapter';
import GetChapter from './ContentChapter/GetChapter';
import AddExam from './ContentExam/AddExam';
import GetExam from './ContentExam/GetExam';
import { ContentHeader } from './ContentHeader';
import ContentHome from './ContentHome/ContentHome';
import AddQuestion from './ContentQuestion/AddQuestion';
import GetQuestion from './ContentQuestion/GetQuestion';
import AddSubject from './ContentSubject/AddSubject';
import GetSubject from './ContentSubject/GetSubject';
import AddUser from './ContentUser/AddUser';
import EditUser from './ContentUser/EditUser';
import GetUser from './ContentUser/GetUser';
import Login from './Test/Login';
import AddChapterSubject from './ContentSubject/GetChapterSubject';
import GetChapterSubject from './ContentSubject/GetChapterSubject';

export default function Content() {
  return (
    <div className='content'>
        <ContentHeader />
        <Routes>

          <Route path='/home' element={<ContentHome />} />

          <Route path='/admin/users' element={<GetUser />} />
          <Route path='/public/admin/add/user' element={<AddUser />} />


          <Route path='/public/admin/exams' element={<GetExam />} />
          <Route path='/public/admin/add/exams' element={<AddExam />} />

          <Route path='/public/subjects' element={<GetSubject />} />
          <Route path='/public/admin/subjects' element={<AddSubject />} />
          <Route path='/public/subjects/chapters/:subjectId' element={<GetChapterSubject />} />

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
