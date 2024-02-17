const ImageKit = require("imagekit")

const imageKit = new ImageKit({
  publicKey: "ypublic_jwiawwIebn5jB+97qQddgIAQpoY=",
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: "https://ik.imagekit.io/8vatwgskr"
})

module.exports = imageKit