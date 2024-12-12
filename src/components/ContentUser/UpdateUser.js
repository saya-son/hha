import React, { useEffect, useState } from 'react';
import axiosUserApi from '../../Api/userApi';
import { useParams } from 'react-router-dom';

export default function UpdateUser() {
    const { id } = useParams();
    const [user, setUser] = useState([]); // Sửa từ [] thành null
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        fetchUser();
    }, []); // Chỉ chạy 1 lần khi component được mount

    // Hàm lấy thông tin user từ API
    const fetchUser = async () => {
        const rep = await axiosUserApi.get(`users/${id}`);
        setUser(rep.data);
        setFullName(rep.data.fullName); 
        setEmail(rep.data.email);
    };

    // Gửi cập nhật thông tin
    const handleSubmit = async (event) => {
        event.preventDefault();
        const updatedUser = {
            fullname: fullName,
            email: email,
            id: id,
        };
        try {
            await axiosUserApi.put(`users/${id}`, updatedUser);
            alert('Cập nhật thành công');
            fetchUser(); // Cập nhật dữ liệu từ API
        } catch (error) {
            console.error('Lỗi khi cập nhật:', error);
            alert('Có lỗi xảy ra, vui lòng thử lại.');
        }
    };

    return (
        <div>
            <h4 className="alert alert-success">Thông tin tài khoản với ID: {id}</h4>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Họ và tên</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{user.fullName}</td>
                        <td>{user.email}</td>
                    </tr>
                </tbody>
            </table>
            <h4 className="alert alert-success">Cập nhật thông tin tài khoản với ID: {id}</h4>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="fullName" className="form-label">Họ và tên</label>
                    <input
                        type="text"
                        className="form-control"
                        id="fullName"
                        name="fullName"
                        value={fullName}
                        onChange={(ev) => setFullName(ev.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(ev) => setEmail(ev.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-success">
                    Xác nhận
                </button>
            </form>
        </div>
    );
}





// import React, { useEffect, useState } from 'react';
// import axiosUserApi from '../../Api/userApi'
// import { useParams } from 'react-router-dom';

// export default function UpdateUser() {
//     const {id} = useParams();
//     const [user, setUser] = useState([]);
//     const [fullName, setFullName] = useState('');
//     const [number, setNumber] = useState('');
//     const [email, setEmail] = useState('');
//     const [gender, setGender] = useState('');
    
//     useEffect(() => {
//         fetchUser();
//     },[])
//     // Hàm lấy thông tin user từ Api
//     const fetchUser = async () => {
//         const rep = await axiosUserApi.get(`users/${id}`);
//         setUser(rep.data);
//         setFullName(rep.data.fullname);
//         setNumber(rep.data.number);
//         setEmail(rep.data.email);
//         setGender(rep.data.gender);
//     }
//     // Gửi cập nhật thông tin
//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         const updatedUser = {
//             "fullname": fullName,
//             "number": number,
//             "email": email,
//             "gender": gender,
//             "id": id
//         }
//         try {
//             await axiosUserApi.put(`users/${id}`, updatedUser);
//             alert('Cập nhật thành công');
//             fetchUser(); // Cập nhật dữ liệu từ API
//         } catch (error) {
//             console.error('Lỗi khi cập nhật:', error);
//             alert('Có lỗi xảy ra, vui lòng thử lại.');
//         }
//     }

//   return (
//     <div>
//         <h4 className='alert alert-success'>Thông tin tài khoản với ID: {id}</h4>
//         <table className='table table-bordered'>
//             <thead>
//                 <tr>
//                     <th>Mã tài khoản</th>
//                     <th>Họ và tên</th>
//                     <th>Số điện thoại</th>
//                     <th>Email</th>
//                     <th>Giới tính</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 <tr>
//                     <td>{user.id}</td>
//                     <td>{user.fullname}</td>
//                     <td>{user.number}</td>
//                     <td>{user.email}</td>
//                     <td>{user.gender}</td>
//                 </tr>
//             </tbody>
//     </table>
//     <h4 className='alert alert-success'>Cập nhật thông tin tài khoản với ID: {id}</h4>
//     <form>
//                 <div className="mb-3">
//                     <label htmlFor="fullName" className="form-label">Name</label>
//                     <input type='text' 
//                     className='form-control'
//                     id='fullName'
//                     name='fullName' 
//                     value={fullName} 
//                     onChange={(ev) =>
//                     setFullName(ev.target.value)}/>
//                 </div>
//                 <div className="mb-3">
//                     <label htmlFor="number" className="form-label">Số điện thoại</label>
//                     <input type='number' 
//                     className='form-control'
//                     id='number'
//                     name='number' 
//                     value={number} 
//                     onChange={(ev) =>
//                     setNumber(ev.target.value)}/>
//                 </div>
//                 <div className="mb-3">
//                     <label htmlFor="email" className="form-label">Email</label>
//                     <input type='text' 
//                     className='form-control'
//                     id='email'
//                     name='email' 
//                     value={email} 
//                     onChange={(ev) =>
//                     setEmail(ev.target.value)}/>
//                 </div>
//                 <div className="mb-3">
//                     <label htmlFor="gender" className="form-label">Giới tính</label>
//                     <input type='text' 
//                     className='form-control'
//                     id='gender'
//                     name='gender' 
//                     value={gender} 
//                     onChange={(ev) =>
//                     setGender(ev.target.value)}/>
//                 </div>
//                 <input type='submit' className='btn btn-success' value={'Xác nhận'} onClick={handleSubmit}/>
//             </form>
// </div>
//   )
// }
