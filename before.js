import React, { Component } from 'react'
import { ScrollView, Text, View } from 'react-native'

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

  render() {
    return this.buildPage()
  }
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

export default SeriesPage