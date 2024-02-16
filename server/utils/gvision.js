const vision = require("@google-cloud/vision")

const CREDENTIALS = JSON.parse(JSON.stringify({
  "type": "service_account",
  "project_id": "lactalink",
  "private_key_id": "f7b57125c7221be45bd26b32544f013d9e6227e2",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC43T/trYOkqdJG\nrTd12zIQJaacn72fp5f0bj/BT5N2/z4ryRz6ZEkjrXFPORtDiB2IpSFPlptWoNK5\nXTh4qKCfxOfHPK9h4etcSXDCmF1jHT5yOkeXcOcldgndnQ0W4ZDsRCvvHRpDuDC/\n1lqxuRcpmcZUQa/o9isTzRtIGFjoAyhrl9adc60uyO024AnFWd6BegCXe+NHV+Ki\nrtq0YHcC38/mzQz/VGjHtYAeWbQxhIDgoDK2URo4dIjCfAI25X2nWiSyzb+ekjOS\nz/ZQ8a6odn6nZmLsyLKp9luQ47EqTWBCrIJdavgQhJ55hvmJs4YqTTKHFYf9lilH\nBPlEpu4dAgMBAAECggEAV9U3ZJQGchwFvnLaYPLObIGXEd+L1uln90jSneRTKjzH\nq0IYtJclcQAdUAjP/VwUvDHJC+mA0L4EoPG7vQhRmNeTUERzB8yxaN2z56FA7bCd\nVOR/02JfUJsuwM63w2FU3Azf2vI24moHL36HBN3uNWPMqYe0LrmXagcPqUd4JnNY\ngAocxQlVNZktlRELZR0OJIvDg4+o5wu+c3g1WnWsetrxbKC1nn7puwWIfZgigJ9q\nrEGKqZFnTQfM93xo8tKX61D0wTszsWsfvufgORF2sTv33hntVYFSf0dm2bcT+Gjd\nc1tdT6lD7VEVlM65qwqdxsn+zUfV2/e2pX0Q34Of+QKBgQD9joTkHwIw12E7ocHf\nQOxmQQTfUZKNxMniSMURwT6dDETLAe6yRgdIxBbUqg3kPrjScu2sG89IKf9pSqEN\nLJEfjvMA7JTMNsYiMvBop0rs3kb2VVM6SqQCJO5gLScqoySC+hRKL3z6IAj/SrsQ\nqGGMp5UuFudcZUHYQNRLFvsxowKBgQC6pUcyO9UHeU6kMii8LxXJI0nePaW/8HQ0\n4FyVLpCi29Mi9ImfNxXXkS7coDXHKWMHJAw25UGSI6S1czUC9RbMk3zLZFq/94Sh\nVQYm75op5pPCch+xYKEYw00oBeF5sLQ8XwhSZb+ovmfmO8zkcUaW5AvhMMVrYPgy\nufaNONTdPwKBgC+nQmiRP1soj3iinQo1bHiHTcAe15lXW83weUEt/XOMo703nsHY\nkXPmjpfnYfb8psW+ndaT33AjnIIQaZZNQvUYa6lHzWtX/ALfaflxP46m89VGEf9J\nmethP3/J3KuRv8Hx+DA9HpLvxGEejWvDCZpiwJHJ8i+WRDq9bGi0Z/9bAoGBAIAZ\nt8eucQN0KplfI74kwtsNsUErJnuZ2OgBpQlusC5WmY7AL0RrVj5hkrwx6TcMHL9l\n6kwzBNH8TKuMqrGg7UjzYQ9njTF7/DeOV26ZvEFN09P85+uh2m9Ye7ggcSRINyvI\nPbnvw59ZL45BNNsFM+GUGuMvyg9sumx2XdWHT/GZAoGAOtuewAk19u3GwQOXs+fg\n/6xU26e2f7ei8BlXT2i7TP9mntsYMcpnjA5UUKQ5lH/wDiUSDkzPlna1jN6PeMsK\nRSK/cR6I2jnBjDXV5TE8QfkazE0Y7viQkPV4kgqwDW13WfPbLJ+5tEBXC4feOhhh\n9kKDm60W+OR+19NbG9LSu34=\n-----END PRIVATE KEY-----\n",
  "client_email": "lactalink@lactalink.iam.gserviceaccount.com",
  "client_id": "108403313441499297791",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/lactalink%40lactalink.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}
))

const config = {
  credentials: {
    private_key: CREDENTIALS.private_key,
    client_email: CREDENTIALS.client_email,
  }
}
// const config = {
//   credentials: {
//     private_key: process.env.GV_PRIVATE_KEY,
//     client_email: process.env.GV_CLIENT_EMAIL,
//   }
// }

const client = new vision.ImageAnnotatorClient(config)

// const sebuahFungsi = async (file) => {
//   let [hasil] = await client.documentTextDetection(file)
//   console.log(hasil)
// }

const sebuahFungsi = async (file) => {
  let [hasil] = await client.textDetection(file)
  console.log(hasil.textAnnotations)

  let result
  hasil?.textAnnotations?.forEach(el => {
    if (!isNaN(+el.description) && el.description.length == 16) {
      result = el.description
    }
  })

  return result
}

async function buatasync() {
  const asd = await sebuahFungsi("https://ik.imagekit.io/8vatwgskr/ktp-suriah.jpeg?updatedAt=1708070390721")
  console.log(asd)
}

// console.log(sebuahFungsi("https://ik.imagekit.io/8vatwgskr/ktp-suriah.jpeg?updatedAt=1708070390721"))

buatasync()