import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { nextDispatch, previousDispatch, repeatDispatch, stopDispatch, ingredientsDispatch } from '../actions/actionCreators'
//, , fetchRecipe, wholeRecipeDispatch, ingredientsDispatch, listeningDispatch

class Listener extends Component {


  componentDidMount() {
    if (annyang) {
      console.log('starting listening')
         // OPTIONAL: activate debug mode for detailed logging in the console
      annyang.debug();

      annyang.setLanguage('en-NZ');

      // Let's define our first command. First the text we expect, and then the function it should call
      var commands = {
        'cc next': () => { this.props.nextDispatch() },
        'cc previous': () => { this.props.previousDispatch() },
        'cc repeat': () => { this.props.repeatDispatch(true) },
        'cc ingredients': () => { this.props.ingredientsDispatch(this.props.ingredients_audio_path) }
      };
      // Add our commands to annyang
      annyang.addCommands(commands);
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log('Listener receiving new props', nextProps.listening)
          // Start listening. You can call this here, or attach this call to an event, button, etc.
    if (nextProps.listening) {
      console.log('annyang starting')
      annyang.start()
    } else {
      console.log('annyang pausing')
      // annyang.pause()
      annyang.abort()

    }
  }

  componentWillUnmount() {
    if (annyang) annyang.abort()
  }

  render() {
    return (
      <div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    listening: state.recipe.listening,
    ingredients_audio_path: state.recipe.ingredients_audio_path
  }
}

const mapDispatchToProps = (dispatch) => {
  //bindActionCreators is unknown. keep in mind
  return bindActionCreators(
    { nextDispatch,  previousDispatch, repeatDispatch, stopDispatch, ingredientsDispatch }, // , wholeRecipeDispatch, ingredientsDispatch, listeningDispatch
    dispatch
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Listener)
