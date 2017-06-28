import React from 'react';
import Auth from '../modules/Auth';
import Dashboard from '../components/Dashboard.jsx';
import $ from 'jquery';


class DashboardPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);
    
    this.state = {
      secretData: ''
    };
  }
  /**
   * This method will be executed after initial rendering.
   */
  componentDidMount() {
    let self = this;
    $.ajax({
      method: 'post',
      url: '/api/dashbord',
      dataType: 'json',
      beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
      }
    }).done(
      function(data){
        self.setState({
          secretData: data.response.message
        });
      });
    // const xhr = new XMLHttpRequest();
    // xhr.open('get', '/api/dashboard');
    // xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // // set the authorization HTTP header
    // xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    // xhr.responseType = 'json';
    // xhr.addEventListener('load', () => {
    //   if (xhr.status === 200) {
    //     this.setState({
    //       secretData: xhr.response.message
    //     });
    //   }
    // });
    // xhr.send();
  }

  /**
   * Render the component.
   */
  render() {
    return (<Dashboard secretData={this.state.secretData} />);
  }

}

export default DashboardPage;