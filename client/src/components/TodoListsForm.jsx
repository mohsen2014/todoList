import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';


const TodoListsForm = ({
  onSubmit,
  onChange,
  errors,
	todoList,
	RepeatTodo,
	list,
	listLoaded
}) => (
  <div className="row">
		<div className="col-sm-4">
			<form  onSubmit={onSubmit}>
				<div className="form-group ">
					<div className="field-line">
						<TextField
							floatingLabelText="Title"
							name="title"
							errorText={errors.title}
							onChange={onChange}
							value={todoList.title}
						/>
					</div>
					<div className="field-line">
						<TextField
							floatingLabelText="description"
							name="description"
							errorText={errors.description}
							onChange={onChange}
							value={todoList.description}
						/>
					</div>
					<div className="button-line">
							<RaisedButton type="submit" label="Add TODO" primary />
					</div>
				</div>
			</form>
		</div>
		<div className="col-sm-8">
			{listLoaded ? (
				<RepeatTodo items={list}></RepeatTodo>
			):(
				<span>
				Empty List
				</span>
			)}
		</div>
	</div>
);

TodoListsForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
	todoList : PropTypes.object.isRequired
};

export default TodoListsForm;