import React, { Component } from 'react'
import { ScrollView, Text, View } from 'react-native'

import Loading from 'components/loading'
import Video from 'components/video'
import API from 'services/api'

class SeriesPageContainer extends Component {
  constructor(props) {
    super(props)
    this.state = { data: null }
  }

  async componentWillMount() {
    this.setState({ data: await model(this.props) })
  }

  render() {
    return <SeriesPage data={this.state.data} />
  }
}

let model = async ({ id }) => {
  let res = await API.getSeries(id)
  let json = await res.json()
  return json.series
}

let VideoList = ({ videos }) => {
  if(videos.length > 0) {
    return videos.map(video =>
      <Video key={video.id} data={video} />
    )
  } else {
    return (
      <View>
        <Text>No videos found</Text>
      </View>
    )
  }
}

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

export default SeriesPageContainer