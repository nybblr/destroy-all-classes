import React, { Component } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { branch, renderComponent } from 'recompose'

import Loading from 'components/loading'
import Video from 'components/video'
import API from 'services/api'

let withModel = (model, initial) => BaseComponent =>
  class WithModel extends Component {
    constructor(props) {
      super(props)
      this.state = { data: initial }
    }

    async componentWillMount() {
      this.setState({ data: await model(this.props) })
    }

    render() {
      return <BaseComponent data={this.state.data} />
    }
  }

let model = async ({ id }) => {
  let res = await API.getSeries(id)
  let json = await res.json()
  return json.series
}

let VideoListBase = ({ videos }) =>
  <View>
    { videos.map(video =>
      <Video key={video.id} data={video} />
    ) }
  </View>

let NoVideosFound = () =>
  <View>
    <Text>No videos found</Text>
  </View>

let VideoList = branch(
  ({ videos }) => videos.length === 0,
  renderComponent(NoVideosFound)
)(VideoListBase)

let SeriesPage = ({ data }) => {
  if (data) {
    return (
      <ScrollView>
        <View>
          <Text>{data.title}</Text>
          { data.description ? <Text>{data.description}</Text> : null }
        </View>
        <View>
          <VideoList videos={data.videos} />
        </View>
      </ScrollView>
    )
  } else {
    return <Loading />
  }
}

let enhance =
  withModel(model, null)

export default enhance(SeriesPage)