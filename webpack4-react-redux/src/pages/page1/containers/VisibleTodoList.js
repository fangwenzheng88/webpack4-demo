import React, { Component } from 'react'
import { connect } from 'react-redux'
import { toggleTodo } from '../actions'
import Todo from '../components/Todo'

const getVisibleTodos = (todos, filter) => {
    switch (filter) {
        case 'SHOW_COMPLETED':
            return todos.filter(t => t.completed)
        case 'SHOW_ACTIVE':
            return todos.filter(t => !t.completed)
        case 'SHOW_ALL':
        default:
            return todos
    }
}

const mapStateToProps = state => {
    return {
        todos: getVisibleTodos(state.todos, state.visibilityFilter)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTodoClick: id => {
            dispatch(toggleTodo(id))
        }
    }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class VisibleTodoList extends Component {
    render() {
        return (
            <ul>
                {this.props.todos.map(todo => (
                    <Todo key={todo.id} {...todo} onClick={() => this.props.onTodoClick(todo.id)} />
                ))}
            </ul>
        );
    }
}