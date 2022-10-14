import React, { Fragment, useState } from 'react';

import { connect } from 'react-redux';
import { adminLogin } from '../../actions/adminLogin'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const Login1 = ({ adminLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
   
  });
  const history = useHistory();
  const { email, password} = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
      e.preventDefault();
      adminLogin(formData,history);
  };

  return (
    <Fragment>
        <h1 className="large text-primary">Admin</h1>
      <p className="lead"><i className="fas fa-user"></i> Account</p>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input type="email" placeholder="Email Address" name="email" value={email} onChange={e => onChange(e)} required/>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password} onChange={e => onChange(e)}
            minLength="6"
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
    </Fragment>
    );
};

Login1.propTypes = {
  adminLogin: PropTypes.func.isRequired,
  
}



export default connect(null, { adminLogin })(Login1);
