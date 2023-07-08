import * as FileSystem from "expo-file-system"
import { useEffect, useState } from "react"
import { ActivityIndicator } from "react-native"
import { WebView } from "react-native-webview"

const image = `https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Pachysentis_lenti.jpg/440px-Pachysentis_lenti.jpg`

const imagePath = FileSystem.documentDirectory + "image.jpg"

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
    <img src="${imagePath}" alt="image?" />
  </body>
</html>
`

const htmlPath = FileSystem.documentDirectory + "index.html"

export default function App() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    downloadImage()
  }, [])

  async function downloadImage() {
    await FileSystem.writeAsStringAsync(htmlPath, html)
    await FileSystem.downloadAsync(image, imagePath)
    setReady(true)
  }

  if (!ready) {
    return <ActivityIndicator style={{ flex: 1 }} />
  }

  return (
    <WebView
      style={{ flex: 1 }}
      source={{ uri: htmlPath }}
      originWhitelist={["*"]}
      mixedContentMode="always"
      // allowingReadAccessToURL="*"
      javaScriptEnabled={true}
      allowFileAccess={true}
      allowFileAccessFromFileURLs={true}
      allowUniversalAccessFromFileURLs={true}
    />
  )
}
