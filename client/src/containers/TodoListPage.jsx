import React, { PropTypes } from 'react';
import TodoListForm from '../components/TodoListsForm.jsx';
import Auth from '../modules/Auth';
import $ from 'jquery';
import Checkbox from 'material-ui/Checkbox';
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
      },
      list: [],
      listLoaded: false
    };

    $.ajax({
      method: 'get',
      url: 'http://0.0.0.0:3001/api/todoLists/byuser?userid=' + localStorage.getItem('userid'),
      dataType: 'JSON'
    }).done((data)=>{
      this.setState({
        list: data.id,
        listLoaded: true
      });
    });


    this.RepeatTodo = React.createClass({
      getInitialState: function() {
        return {}
      },
      componentDidMount:function(){
        
      },
      render: function() {
        // console.log(this.props);
        let items = this.props.items;
        var listItems = items.map(function(item) {
          return (
            <li key={item.id} style={{listStyle: 'none'}}>
              <div> 
                <Checkbox
                  label={item.title}
                  labelPosition="right"
                  style={{
                      block: {
                        maxWidth: 250,
                      },
                      checkbox: {
                        marginBottom: 16,
                      },
                    }}
                  title={item.description}
                />
                </div>
            </li>
          );
        });

        return (
          <div>
            <ul>
              {listItems}
            </ul>
          </div>
        );
      }
    });
    
    this.processForm = this.processForm.bind(this);
    this.changeList = this.changeList.bind(this);
    // this.getData = getData;
        
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
    // console.log(formData);
    $.ajax({
      method: 'post',
      url: 'http://0.0.0.0:3001/api/todoLists',
      data: {
          "userId": userId,
          "title": title,
          "description": description
        },
      dataType: 'JSON'
    }).done(
      function(data){
        let temp = self.state.list;
        temp.push(data);
        self.setState({
          list: temp,
          todo: {
            title: '',
            description: '',
            userId: ''
          }
        });
      }
    ).fail(
      function(res){
        console.log(err);
      }
    )
  }




  // getData();
  /**
   * Change the todoList object.
   *
   * @param {object} event - the JavaScript event object
   */
  changeList(event) {
    
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
        RepeatTodo={this.RepeatTodo}
        list={this.state.list}
        listLoaded={this.state.listLoaded}
      />
    );
  }

}

export default TodoListPage;