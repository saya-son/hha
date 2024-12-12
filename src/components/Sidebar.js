import React from 'react'
import {BiHome, BiUser, BiMessage, BiSolidReport, BiStats, BiTask, BiLogOut} from 'react-icons/bi';
import { NavLink, Route, Routes, Navigate} from 'react-router-dom';
import '../styles/sidebar.css';

export default function Sidebar() {
  return (
<div className='menu'>
        <div className='logo'>
            <BiUser className='logo-icon'/>
            <h2>Admin</h2>
        </div>
        
        <div className='menu--list'>
            <NavLink to = '/home' className='item'>
                <BiHome className='icon'/>
                Home
            </NavLink>
            <NavLink to = '/users' className='item'>
                <BiTask className='icon'/>
                Quản lý user
            </NavLink>
            <NavLink to = '/exams' className='item'>
                <BiSolidReport className='icon'/>
                Quản lý bài thi
            </NavLink>
            <NavLink to = '/subjects' className='item'>
                <BiStats className='icon'/>
                Quản lý môn học
            </NavLink>
            <NavLink to ='/questions' className='item'>
                <BiMessage className='icon'/>
                Quản lý câu hỏi
            </NavLink>
            <NavLink to ='/LogOut' className='item'>
                <BiLogOut className='icon'/>
                Đăng xuất
            </NavLink>
        </div>
    </div>
  )
}
