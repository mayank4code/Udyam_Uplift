import {React, useEffect, useState} from 'react'
import { server_origin } from '../../utilities/constants';


const AdminUsers = () => {
    const [isAdmin, setIsAdmin] = useState(false);

    const [users, setUsers] = useState([]);


    useEffect(() => {
        verifyUser(); 
        getUsers();
    }, [])

    const verifyUser = async()=>{
        if(localStorage.getItem('token')){
            const response = await fetch(`${server_origin}/api/user/verify-user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                },
            });
    
            const result = await response.json()
            if(result.isAdmin===true){
                setIsAdmin(true);
            }
        }
    }

    const getUsers = async ()=>{
        if(localStorage.getItem("token")){
            const response = await fetch(`${server_origin}/api/admin/get-users`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                },
            });
            const result = await response.json();
            setUsers(result.allUsers);
        }
    }

  return (
    <>
    { isAdmin &&
        <div>
      <h1 className="my-5">Users Information</h1>
      

      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Mobile</th>
            <th scope="col">Age</th>
            <th scope="col">City</th>
            <th scope="col">Country</th>
            {/* <th scope="col">Role</th> */}
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.mobile}</td>
                <td>{user.age}</td>
                <td>{user.city}</td>
                <td>{user.country}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
    }
    
    </>
  );
};

export default AdminUsers;
