
import React,{ Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import DashboardActions from './AdminDashboardActions';

const Landing1 = () => {
 

  return (
    <section className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <h1  style={{color:'#F69A16',fontSize:'60px'}}className='x-large lead'>HealthCare System</h1>
          <p className='lead'>Welcome Admin</p>
          <div className='buttons'>
            {/* <a href="register.html" className="btn btn-primary">Sign Up</a> */}
            <Fragment>
            <DashboardActions />
           </Fragment> 
            {/* <Link to="/addEmployee" className="btn btn-light">Test</Link> */}
          </div>
        </div>
      </div>
    </section>
  );
};
Landing1.propTypes = {
   
    
  }


export default connect(null)(Landing1);