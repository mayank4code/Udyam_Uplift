import React, { useEffect, useState } from 'react'
import { Link} from "react-router-dom";
import { server_origin } from '../../utilities/constants';


const Analytics = () => {
    // get the user and first check it it is admin
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
        verifyUser();
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
            console.log("here: ", result);
            if(result.isAdmin===true){
                setIsAdmin(true);
            }
        }
    }
    
  return (
    <div style={{marginTop:"100px"}}>
        {isAdmin?<>
            <h1 className='my-3'>Hey Admin!</h1>
            <h2 className='my-3'>Welcome to the platform analysis</h2>

            <div className="card w-75 my-5 mx-3">
            <div className="card-body">
                <h5 className="card-title">Questions</h5>
                <p className="card-text">From here you can add, delete or update any question.</p>
                <Link to="/admin/questions" className="btn btn-primary">Questions</Link>
            </div>
            </div>

             <div className="card w-50 my-5 mx-3">
            <div className="card-body">
                <h5 className="card-title">All Users</h5>
                <p className="card-text">Get all the information ragarding the existing users on this platform.</p>
                <Link to="/admin/users" className="btn btn-primary">Users</Link>
            </div>
            </div> 
             
        
        </>: <>
        <div class="alert alert-danger" role="alert">
            Error: You are not authorized to access this page
        </div>
            {/* <h2>Unauthorized</h2> */}
        </>}


    </div>
  )
}

export default Analytics