import React from 'react'
import Footer from './Footer'
import AddTodo from '../containers/AddTodo'
import VisibleTodoList from '../containers/VisibleTodoList'
import {
  Route,
  Switch,
  Link,
  Redirect,
  NavLink,
  BrowserRouter as Router
} from 'react-router-dom'

const App = () => (
  <div>
    <Router>
      <NavLink to='/addtodo' activeClassName='active'>addtodo</NavLink><br></br>
      <NavLink to='/todolist' activeClassName='active'>todolist</NavLink><br></br>
      <Switch>
        <Redirect from="/" exact to="/addtodo" />
        <Route path="/addtodo" render={() => {
          return (
            <div>
              <AddTodo></AddTodo>
              <VisibleTodoList></VisibleTodoList>
              <Footer></Footer>
            </div>
          )
        }} />
        <Route path="/todolist" component={VisibleTodoList} />
      </Switch>
    </Router>
  </div>
)

export default App