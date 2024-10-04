import dayjs from 'dayjs'
import { RootState } from './store'

interface Calendar {
  [key: string]: {
    selected: boolean
  }
}
export const selectFilePaths = (state: RootState) => state.meditation.filepaths || []
export const selectActivity = (state: RootState) => state.meditation.activity

export const selectLoggedIn = (state: RootState) => state.auth.loggedIn
export const selectSubscribed = (state: RootState) => state.auth.subscribed

export const selectUser = (state: RootState) => state.auth.user
export const selectCategories = (state: RootState) => state.meditation.categories || []

export const selectRecent = (state: RootState) => state.meditation.recent || []
export const selectFavourites = (state: RootState) => state.meditation.favourites || []
export const selectNotes = (state: RootState) => state.meditation.notes || []
export const selectTotalSessions = (state: RootState) =>
  Object.keys(state.meditation.activity).length || 0
export const selectTotalDuration = (state: RootState) => {
  let total: number = 0
  Object.values(state.meditation.activity).forEach((a) => {
    if (a.duration) {
      total += a.duration
    }
  })
  return total
}
export const selectCalendar = (state: RootState) => {
  const { activity } = state.meditation
  const calendar: Calendar = {}
  Object.keys(activity).forEach((k) => {
    const date = dayjs(parseInt(k, 10)).format('YYYY-MM-DD')
    calendar[date] = {
      selected: true,
    }
  })
  return calendar
}
export const selectStreak = (state: RootState) => {
  const calendar = selectCalendar(state)
  let streak = 0

  let n = 0
  while (true) {
    const date = dayjs().subtract(n, 'day').format('YYYY-MM-DD')
    if (!calendar[date] && n !== 0) {
      break
    }
    if (calendar[date]) {
      streak += 1
    }
    n += 1
  }

  return streak
}
