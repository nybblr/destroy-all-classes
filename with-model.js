import React, { Component } from 'react'
import { compose, withState } from 'recompose'

let fetchData = model => BaseComponent =>
  class FetchData extends Component {
    async componentWillMount() {
      this.props.setData(await model(this.props))
    }

    render() {
      return <BaseComponent {...this.props} />
    }
  }

export default (model, initial) =>
  compose(
    withState('data', 'setData', initial),
    fetchData(model)
  )