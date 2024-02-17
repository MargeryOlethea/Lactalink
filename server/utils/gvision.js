const vision = require("@google-cloud/vision")

const config = {
  credentials: {
    private_key: process.env.GV_PRIVATE_KEY,
    client_email: process.env.GV_CLIENT_EMAIL,
  }
}

const client = new vision.ImageAnnotatorClient(config)

const readTextFromImage = async (file) => {
  let [response] = await client.textDetection(file)

  let result
  response.textAnnotations?.forEach(el => {
    if (!isNaN(+el.description) && el.description?.length == 16) {
      result = el.description
    }
  })
  return result
}

module.exports = readTextFromImage