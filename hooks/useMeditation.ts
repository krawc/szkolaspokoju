import { Meditation } from '../data/meditations'

export const useMeditation = (id: string, meditations: Meditation[]): Meditation | undefined => {
  if (meditations) {
    const arr = Object.values(meditations).flat()
    const meditation = arr.find((m: Meditation) => m.id === id)
    return meditation
  }
}
