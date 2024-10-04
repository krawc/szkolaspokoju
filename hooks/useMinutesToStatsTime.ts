/** Receives a number of minutes and return a friendly string for easier reading */
export function useMinutesToStatsTime(minutes: number) {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60

  if (h && m) {
    return `${h}h ${m}m`
  } else if (h) {
    return `${h} h${h === 1 ? '' : ''}`
  } else {
    return `${m} min${m === 1 ? '' : ''}`
  }
}
