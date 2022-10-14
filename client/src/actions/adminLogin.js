import axios from 'axios';
import { setAlert } from './alert';
import { 
  
  LOGIN_SUCCESS,
  LOGIN_FAIL
} from './types';

export const adminLogin = (formData,history) => async (dispatch) => {
    const config = {
      headers: {
       
        'Content-Type':'application/json',
  
      },
    };
    
    
    try {
      const res=await axios.post('/api/admin2',formData,config);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      dispatch(setAlert("Admin Login",'success'));
      history.push('/admin2Dashboard');
      
      
  
      
    } catch (err) {
      
      
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: LOGIN_FAIL,
    });
    }
};