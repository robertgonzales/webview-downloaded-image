import * as FileSystem from "expo-file-system"
import { useEffect, useState } from "react"
import { ActivityIndicator, Dimensions } from "react-native"
import { WebView } from "react-native-webview"

const directory = FileSystem.documentDirectory + "downloads/"

const html = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Image Download Test</title>
  </head>
  <body>
    <h1>Image Download Test</h1>
    <img src="${directory}image.jpg" alt="image?" />
  </body>
</html>
`

const image = `https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Pachysentis_lenti.jpg/440px-Pachysentis_lenti.jpg`

export default function App() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    downloadImage()
  }, [])

  async function downloadImage() {
    await FileSystem.deleteAsync(directory, { idempotent: true })
    await FileSystem.makeDirectoryAsync(directory)
    await FileSystem.downloadAsync(image, directory + "image.jpg")
    setReady(true)
  }

  if (!ready) {
    return <ActivityIndicator style={{ flex: 1 }} />
  }

  console.log(directory + "image.jpg") // pasting this in your browser loads the image just fine

  return (
    <WebView
      style={Dimensions.get("window")}
      source={{ html }}
      originWhitelist={["*"]}
      mixedContentMode="always"
      allowingReadAccessToURL="*"
      javaScriptEnabled={true}
      allowFileAccess={true}
      allowFileAccessFromFileURLs={true}
      allowUniversalAccessFromFileURLs={true}
    />
  )
}
