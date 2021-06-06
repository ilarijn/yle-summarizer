import axios from "axios"

const CORS_URL = "https://api.rss2json.com/v1/api.json?rss_url="
const RSS_URL = "https://feeds.yle.fi/uutiset/v1/majorHeadlines/YLE_UUTISET.rss"

const LANGSERVER_URL = "http://localhost:5000/api"

export const getFeed = async () => {
  const res = await axios.get(`${CORS_URL}${RSS_URL}`)
  return res.data
}

export const getStem = async (word) => {
  const res = await axios.post(`${LANGSERVER_URL}/stem`, { data: word })
  return res
}

export const postText = async (text) => {
  const res = await axios.post(`${LANGSERVER_URL}/post_text`, { data: text })
  return res
}

export const summarize = async (text) => {
  const res = await axios.post(`${LANGSERVER_URL}/summarize`, { data: text })
  return res
}
