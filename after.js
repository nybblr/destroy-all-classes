import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import { pure, compose, branch, renderComponent } from 'recompose'

import Loading from 'components/loading'
import Video from 'components/video'
import API from 'services/api'
import withModel from 'lib/with-model'

let SeriesPage = ({ data }) =>
  <ScrollView>
    <View>
      <Text>{data.title}</Text>
      { data.description ? <Text>{data.description}</Text> : null }
    </View>
    <View>
      <VideoListWithEmptyState videos={data.videos} />
    </View>
  </ScrollView>

let VideoList = ({ videos, navigator }) =>
  <View>
    { videos.map(video =>
      <Video key={video.id} data={video} />
    ) }
  </View>

let NoVideosFound = () =>
  <View>
    <Text>No videos found</Text>
  </View>

let VideoListWithEmptyState = branch(
  ({ videos }) => videos.length === 0,
  renderComponent(NoVideosFound)
)(VideoList)

let model = async ({ id }) => {
  let res = await API.getSeries(id)
  let json = await res.json()
  return json.series
}

let enhance = compose(
  withModel(model, null),
  branch(
    ({ data }) => !data,
    renderComponent(Loading)
  )
)

export default enhance(SeriesPage)
