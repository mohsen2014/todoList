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
  }

  /**
   * Render the component.
   */
  render() {
    return (<Dashboard secretData={this.state.secretData} />);
  }

}

export default DashboardPage;