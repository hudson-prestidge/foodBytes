import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchRecipes } from '../actions/actionCreators'
import { Router, Route, hashHistory, Link } from 'react-router'
import RecipeList from './RecipeList'
import Nav from './layout/Nav';

class App extends Component {

  constructor (props) {
    super(props)
  }

  componentDidMount () {
    const { fetchRecipes } = this.props
    fetchRecipes()
  }

  render() {
    const { location } = this.props;

    return (
      <div>
        <Nav />
        {this.props.children}
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    data: state.recipe
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchRecipes }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
