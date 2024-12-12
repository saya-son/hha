import React from 'react'
import '../styles/content.css';
import { ContentHeader } from './ContentHeader';
import ContentHome from './ContentHome/ContentHome';
import GetUser from './ContentUser/GetUser';
import { NavLink, Route, Routes, Navigate, useParams} from 'react-router-dom';
import GetExam from './ContentExam/GetExam';
import GetSubject from './ContentSubject/GetSubject';
import GetQuestion from './ContentQuestion/GetQuestion';
import UpdateUser from './ContentUser/UpdateUser';
import EditUser from './ContentUser/EditUser'

export default function Content() {
  return (
    <div className='content'>
        <ContentHeader />
        <Routes>
          <Route path='/home' element={<ContentHome />} />
          <Route path='/users' element={<GetUser />} />
          <Route path='/exams' element={<GetExam />} />
          <Route path='/subjects' element={<GetSubject />} />
          <Route path='/questions' element={<GetQuestion />} />
          <Route path='/users/:id' element={<UpdateUser />} />
          <Route path='/page' element={<EditUser />} />
        </Routes>       
    </div>
  )
}
