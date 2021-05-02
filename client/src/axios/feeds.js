import axios from 'axios'

const CORS_URL = 'https://api.rss2json.com/v1/api.json?rss_url='
const RSS_URL = 'https://feeds.yle.fi/uutiset/v1/majorHeadlines/YLE_UUTISET.rss'

export const getFeed = async () => {
    const res = await axios.get(`${CORS_URL}${RSS_URL}`)
    return res.data
}

