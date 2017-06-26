import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import Auth from '../modules/Auth';

const Base = ({ children }) => (
  <div>
    <nav className="navbar navbar-default">
      <div className="container-fluid">
        <div className="navbar-header">
          <a className="navbar-brand" href="/">
            Todo List
          </a>
        </div>
        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          {Auth.isUserAuthenticated() ? (
            <ul className="nav navbar-nav navbar-right">
              <li ><Link to="/logout">Log out</Link></li>              
          </ul>            
            ) : (
            <ul  className="nav navbar-nav navbar-right">
              <li ><Link to="/login">Log in</Link></li>
              <li><Link to="/signup">Sign up</Link></li> 
            </ul>
            )}

        </div>
      </div>
    </nav>
    {children}

  </div>
);

Base.propTypes = {
  children: PropTypes.object.isRequired
};

export default Base;