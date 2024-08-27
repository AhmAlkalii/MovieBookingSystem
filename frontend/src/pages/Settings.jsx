import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useAuthContext } from '../hooks/useAuthContext';
import {setSettings, getSettingsError, getSettingsStatus, updateSettings, deleteUser } from '../redux/setting'; 
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';


const Settings = () => {
    const { user } = useAuthContext();
    const [em, setEmail] = useState('');
    const [fname, setFName] = useState('');
    const [lname, setLName] = useState('');
    const [pword, setPassword] = useState('');
    const [rword, setRpassword] = useState('');
    const [num, setNumber] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {logout} = useLogout();

    
    const handleSubmit = async(e) => {
        e.preventDefault();
        const settingsData = {
            firstname: fname,
            lastname: lname,
            email: em,
            number: num,
        };
    
        dispatch(updateSettings({ settingsInfo: settingsData, id: user.theid }))
            .unwrap()
            .then(response => {
                console.log('Settings updated:', response);
                setFName('')
                setLName('')
                setNumber('')
                setEmail('')
                toast.success('Updated Personal Info Successfully!');
            })
            .catch(error => {
                console.error('Error updating personal info:', error);
                toast.error('Error updating personal info');
            });
    };

    const handlePsubmit = async(e) => {
        e.preventDefault();

        const passwordData = {
            password: rword
        }

        if(rword === pword){
            dispatch(updateSettings({ settingsInfo: passwordData, id: user.theid }))
            .unwrap()
            .then(response => {
                console.log('Password updated:', response);
                setPassword('')
                setRpassword('')
                toast.success('Updated Password Successfully!');
            })
            .catch(error => {
                console.error('Error updating password:', error);
                toast.error('Error updating password');
            });
        }
        else{
            toast.error("Please make sure passwords match.");
        }
    }
    
    const handleDelete = async(e) => {
        e.preventDefault();

        dispatch(deleteUser({id: user.theid}))
        .then(response => {
        console.log('Account Deleted:', response);
        toast.success('Account Deleted!');
        logout()
        })
        .catch(error => {
        console.error('Error deleting account:', error);
        toast.error('Error deleting account');
        });
    }
    
 

  return (
    <div>
        <div className='heading'>
           <h2>Account Settings</h2>    
        </div>  

        <div className='one'>
            
            <Form className='wrapper2' onSubmit={handleSubmit}>
                <h1>Update your personal information</h1>
                <Row className="mb-3">
                    <Form.Group as={Col} xs={6}>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control 
                    type="text" 
                    placeholder="First Name" 
                    onChange={(e) => setFName(e.target.value)}
                    value={fname}
                    required 
                    />
                    </Form.Group>

                    <Form.Group as={Col} xs={6}>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Last Name"
                        onChange={(e) => setLName(e.target.value)}
                        value={lname}
                        required
                    />

                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} xs={6}>
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                    type="email"
                    placeholder="Enter email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={em}
                    required
                    />
                    </Form.Group>

                    <Form.Group as={Col} xs={6}>
                    <Form.Label>Number</Form.Label>
                    <Form.Control 
                    type="text" 
                    placeholder="Number" 
                    onChange={(e) => setNumber(e.target.value)}
                    value={num}
                    required
                    />
  
                    </Form.Group>
                </Row>

            
                <Button variant="primary" type="submit">
                    Save Changes
                </Button>
            </Form>


            <Form className='wrapperr' onSubmit={handlePsubmit}>

                <h1>Update your password</h1>

                <Form.Group as={Col} xs={14}>
                    <Form.Label>New Password</Form.Label>
                    <Form.Control type="password" placeholder="New Password" 
                    onChange={(e) => setPassword(e.target.value)}
                    value={pword}
                    required
                    />
                </Form.Group>
                <Form.Group as={Col} xs={14}>
                    <Form.Label>Repeat New Password</Form.Label>
                    <Form.Control type="password" placeholder="Repeat New Password" 
                    onChange={(e) => setRpassword(e.target.value)}
                    value={rword}
                    required
                    />
                </Form.Group>

                <Button variant="primary" type="submit" style={{marginTop:12}}>
                    Save Changes
                </Button>
            </Form>
        </div>

        <div className='one'>
            <Form className='wrapperr' onSubmit={handleDelete}>
                <h2>Delete your Account</h2>

                <p>Deleting your account is permanent and cannot be reversed</p>

                <Button variant="danger" type="submit" style={{marginTop:12}}>
                    Delete Account
                </Button>
            </Form>
        </div>
        

    </div>
  )
}

export default Settings