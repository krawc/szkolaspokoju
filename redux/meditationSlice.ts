import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Meditation } from '../data/meditations'

export interface Activity {
  // in miliseconds
  duration: number
}
export interface MeditationState {

  categories: {
    [key: string]: Meditation[]
  }
  // When the user meditated, the key is a date string, and the value is the Activity
  activity: {
    [key: string]: Activity
  }
  // Local file paths to the audio files downloaded from the server
  filepaths: string[]
  notes: {
    id: string,
    text: string
  }[],
  favourites: Meditation[]
  recent: Meditation[]
}

const initialState: MeditationState = {
  categories: {},
  activity: {},
  filepaths: [],
  favourites: [],
  notes: [],
  recent: [],
}

const meditationSlice = createSlice({
  name: 'meditation',
  initialState,
  reducers: {
    completed(state, action: PayloadAction<number>) {
      state.activity[Date.now()] = {
        duration: action.payload,
      }
    },
    manualEntry(
      state,
      action: PayloadAction<{
        timestamp: number
        duration: number
      }>
    ) {
      const { duration, timestamp } = action.payload

      // Delete sessions with 0 duration since a single activity is used for manual
      if (duration === 0) {
        delete state.activity[timestamp]
        return
      }

      state.activity[timestamp] = {
        duration,
      }
    },
    addFilePath(state, action) {
      if (!state.filepaths) {
        state.filepaths = []
      }
      state.filepaths.push(action.payload)
    },
    reset: () => initialState,
    updateCategories: (state, action) => {
      state.categories = action.payload
    },
    updateRecent: (state, action) => {
      if (!state.recent || state.recent && state.recent.includes(null)) {
        state.recent = []
      }
      const meditation = action.payload
      const meditationIndex = state.recent.findIndex((item) => item.id === meditation.id)
      const meditationAlreadyRecent = meditationIndex !== -1

      if (meditationAlreadyRecent) {
        state.recent.splice(meditationIndex, 1)
        state.recent.unshift(meditation)
      } else {
        state.recent.unshift(meditation)
      }
    },
    deleteFavourites: (state, action) => {
      state.favourites = []
    },
    deleteRecent: (state, action) => {
      state.recent = []
    },
    updateFavourite: (state, action) => {

      if (!state.favourites || state.favourites && state.favourites.includes(null)) {
        state.favourites = []
      }
      console.log(state.favourites)
      const meditation = action.payload
      const meditationIndex = state.favourites.findIndex((item) => item.id === meditation.id)
      const meditationAlreadyFavourited = meditationIndex !== -1

      if (meditationAlreadyFavourited) {
        state.favourites.splice(meditationIndex, 1)
      } else {
        state.favourites.push(meditation)
      }
    },
    updateNote: (state, action) => {
      //state.notes = []
      if (!state.notes || state.notes && state.notes.includes(null)) {
        state.notes = []
      }
      console.log(state.notes)
      const note = action.payload
      const noteIndex = state.notes.findIndex((item) => item.id === note.id)
      const noteExists = noteIndex !== -1

      if (noteExists) {
        state.notes[noteIndex].text = note.text
      } else {
        state.notes.push(note)
      }
    },
  },
})

export const { completed, manualEntry, reset, addFilePath, updateCategories, updateRecent, updateFavourite, deleteFavourites,deleteRecent, updateNote } =
  meditationSlice.actions
export default meditationSlice.reducer
