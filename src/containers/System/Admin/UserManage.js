import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';
import InfoUser from './InfoUser';
import * as actions from '../../../store/actions';
import Sort from './Sort';
import Pagination from './Pagination';

const UserManage = (props) => {
    const [selectInfoUser, setSelectInfoUser] = useState([]);
    const [isOpenModalUser, setIsOpenModalUser] = useState(false);
    const [isOpenModalEditUser, setIsOpenModalEditUser] = useState(false);
    const [isOpenModalInfoUser, setIsOpenModalInfoUser] = useState(false);
    const [userEdit, setUserEdit] = useState('');

    //fetch data
    const dispatch = useDispatch();
    const listUsers = useSelector(state => state.admin.users);

    useEffect(() => {
        dispatch(actions.fetchAllUser());
    }, [dispatch]);
    
    // Create users
    const handleAddNewUser=()=> {
        setIsOpenModalUser(!isOpenModalUser);
    }

    const AddNewUser=(data)=> {
        dispatch(actions.createNewUser(data));
    }

    //delete user 
    const deleteUser=(user)=>{
        dispatch(actions.deleteUser(user.id));
    }

    //edit user
    const handleEditUser=(user)=>{
        setUserEdit(user);
        setIsOpenModalEditUser(!isOpenModalEditUser);
    }

    const editUser=(data)=>{
        dispatch(actions.editUser(data));
    }

    //info user
    const handleInfoUser=(user)=>{
        setSelectInfoUser(user);
        setIsOpenModalInfoUser(!isOpenModalInfoUser);
    }

    return (
        <div className="mx-2">
            <ModalUser
                isOpen={isOpenModalUser} 
                toggleFromParent={handleAddNewUser}
                AddNewUser={AddNewUser}
            />

            {
                <ModalEditUser
                    isOpen={isOpenModalEditUser} 
                    toggleFromParent={handleEditUser}
                    currentUser={userEdit}
                    editUser={editUser}
                />
            }

            <InfoUser
                isOpen={isOpenModalInfoUser} 
                toggleFromParent={handleInfoUser}
                details={selectInfoUser}
            />
            
            <div className="h5 text-dark mb-4">Quản lý thành viên</div>

            <div className="d-flex mb-3 justify-content-between">
                <button onClick ={() => handleAddNewUser()}  type="button" className="btn btn-success col-2">
                    <i className="fas fa-plus mr-2"></i> Thêm thành viên
                </button>
                <Sort />
            </div>
            
            {/* list user  */}
            <div className="text-dark">Danh sách thành viên  (<b>{listUsers.length}</b>) </div>

            <table className="table table-striped table-bordered table-hover">
                <thead className="text-white" style={{background: 'rgb(58 158 229)'}}>
                    <tr>
                        <th scope="col">Tick</th>
                        <th scope="col">STT</th>
                        <th scope="col">Avatar</th>
                        <th scope="col">Họ tên</th>
                        <th scope="col">Email</th>
                        <th scope="col">Số ĐT</th>
                        <th scope="col">Địa chỉ</th>
                        <th scope="col">Giới tính</th>
                        <th scope="col">TuổI</th>
                        <th scope="col">Nghề nghiệp</th>
                        <th scope="col">Chức danh</th>
                        <th scope="col">Tác vụ</th>
                    </tr>
                </thead>
                {
                    listUsers && listUsers.length >0 &&
                    listUsers.map((item, index) => {
                        //endCode image
                        let imageBase64='';
                        if(item.image){
                            imageBase64=new Buffer(item.image, 'base64').toString('binary')
                        }

                        return (
                            <tbody key={index}>
                                <tr>
                                    <th scope='row'>
                                        <div className="form-group">
                                            <input type="checkbox" className="w-100" />
                                        </div>
                                    </th>
                                    <td>{index + 1}</td>
                                    <td style={{backgroundImage: `url(${imageBase64})`, backgroundPosition: 'center', backgroundSize: 'cover',backgroundRepeat: 'no-repeat', height: '45px',
                                    width: '45px', borderRadius: '50%', display: 'flex', margin: '0 auto'}}></td>
                                    <td className='text-primary'>{item.username}</td>
                                    <td>{item.email}</td>
                                    <td>{item.phoneNumber}</td>
                                    <td>{item.address}</td>
                                    <td>{item.gender}</td>
                                    <td>24</td>
                                    <td>{item.roleId}</td>
                                    <td>{item.positionId}</td>
                                    <td>
                                        <button onClick={()=> handleInfoUser(item)} type="button" className="btn text-success">
                                            <i className="fas fa-info-circle"></i>
                                        </button>
                                        <button onClick={()=> handleEditUser(item)} type="button" className="btn text-primary mx-2">
                                            <i className="fas fa-pencil-alt"></i>
                                        </button>
                                        <button onClick={()=> deleteUser(item)} type="button" className="btn text-danger">
                                            <i className="fas fa-trash-alt"></i>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        )
                    })
                }

                {   
                    listUsers && listUsers.length ===0 &&
                    <tbody>
                        <tr><td className="">Không có dữ liệu</td></tr> 
                    </tbody> 
                }
            </table>
            <Pagination />
        </div>
    );
}
export default UserManage;
