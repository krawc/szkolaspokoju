import * as React from 'react'
import { StyleSheet } from 'react-native'

import PlayerIcon from '../PlayerIcon'
import { View, Text } from '../../../components/Themed'
import Slider from '@react-native-community/slider';
import { setPositionTime } from '../../../actions';

interface Props {
  positionTime: string
  durationTime: string
  positionMillis: number,
  durationMills: number,
  isPlaying: boolean
  pause: () => void
  play: () => void
  replay: () => void
  forward: () => void
  setPositionTime: (value: any) => void
}
export default function PlayerControls({
  positionTime,
  durationTime,
  positionMillis,
  durationMills,
  isPlaying,
  pause,
  play,
  replay,
  forward,
  setPositionTime
}: Props) {
  return (
    <View style={styles.container}>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={durationMills}
        value={positionMillis}
        onValueChange={value => setPositionTime(value)}
        minimumTrackTintColor="#222"
        maximumTrackTintColor="#eee"
      />
          <View style={styles.controls}>

      <Text>{positionTime}</Text>
      <PlayerIcon name="replay-10" onPress={replay} size={30} />
      {isPlaying ? (
        <PlayerIcon name="pause-circle-filled" onPress={pause} />
      ) : (
        <PlayerIcon name="play-circle-filled" onPress={play} />
      )}
      <PlayerIcon name="forward-10" onPress={forward} size={30} />
      <Text>{durationTime}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:  {
    flexDirection: 'column'
  },
  slider: {
    width: '100%', 
    height: 40,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
})
