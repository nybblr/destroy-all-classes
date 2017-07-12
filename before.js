import React, { Component } from 'react'
import {
  ScrollView,
  Text,
  View
} from 'react-native'

import Loading from 'components/loading'
import Video from 'components/video'
import API from 'services/api'

class SeriesPage extends Component {
  constructor(props) {
    super(props)
    this.state = { data: null }
  }

  async fetchData(id) {
    let res = await API.getSeries(id)
    let json = await res.json()
    this.setState({ data: json.series })
  }

  componentWillMount() {
    this.fetchData(this.props.id)
  }

  renderVideo(video) {
    return (
      <Video key={video.id} data={video} />
    )
  }

  renderVideoList() {
    if(this.state.data.videos.length > 0) {
      return this.state.data.videos.map(video => this.renderVideo(video))
    } else {
      return(
        <View>
          <Text>No videos found</Text>
        </View>
      )
    }
  }

  buildPage() {
    if (this.state.data) {
      return (
        <ScrollView>
          <View>
            <Text>{this.state.data.title}</Text>
            { this.state.data.description ? <Text>{this.state.data.description}</Text> : null }
          </View>
          <View>
            {this.renderVideoList()}
          </View>
        </ScrollView>
      )
    } else {
      return <Loading />
    }
  }

  render() {
    return this.buildPage()
  }
}

export default SeriesPage