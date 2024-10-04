import { openURL as expoOpenURL } from 'expo-linking'
import { selectFilePaths } from '../redux/selectors'
import { useAppSelector } from '../hooks'

export const openURL = async (url: string) => {
  try {
    await expoOpenURL(url)
  } catch (error) {
    console.error(error)
  }
}

export const checkDownloaded = (filepaths: any, meditation: any) => {


  const filename = (path: string) => {
    let _filename = path.split('/').pop()
    if (!_filename) {
      return
    }
    return _filename
  }

  if (filepaths.length > 0 && meditation) {

    let name = filename(meditation.uri) || ''
    let isDownloaded = filepaths.find((a) => filename(a) === name)
    if (isDownloaded) {
      return true
    }
    return false
  }
}
