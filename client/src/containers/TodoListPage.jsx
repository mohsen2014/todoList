import React, { PropTypes } from 'react';
import TodoListForm from '../components/TodoListsForm.jsx';
import Auth from '../modules/Auth';
import $ from 'jquery';
import { browserHistory, Router } from 'react-router';

class TodoListPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);

    // set the initial component state
    this.state = {
      errors: {},
      todo: {
        title: '',
        description: '',
        userId: ''
      }
    };

    this.processForm = this.processForm.bind(this);
    this.changeList = this.changeList.bind(this);
  }

  /**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  processForm(event) {
    let self = this;
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();

    // // create a string for an HTTP body message
    const userId = encodeURIComponent(localStorage.getItem('userid'));
    const title = encodeURIComponent(this.state.todo.title);
    const description = encodeURIComponent(this.state.todo.description);    
    const formData = `userid=${userId}&title=${title}&description=${description}`;
    console.log(formData);
    $.ajax({
      method: 'post',
      url: 'http://0.0.0.0:3000/api/todoLists',
      data: {
          "userId": userId,
          "title": title,
          "description": description
        },
      dataType: 'JSON'
    }).done(
      function(data){
        console.log(data);
      }
    ).fail(
      function(res){
        console.log(err);
      }
    )
  }

  /**
   * Change the todoList object.
   *
   * @param {object} event - the JavaScript event object
   */
  changeList(event) {
    console.log(event.target.name);
    console.log(event.target.value);
    
    const field = event.target.name;
    const todo = this.state.todo;
    todo[field] = event.target.value;

    this.setState({
      todo
    });
  }
  /**
   * Render the component.
   */
  render() {
    return (
      <TodoListForm
        onSubmit={this.processForm}
        onChange={this.changeList}
        errors={this.state.errors}
        todoList={this.state.todo}
      />
    );
  }

}

export default TodoListPage;