const Backend = process.env.REACT_APP_BACKEND_URL

const SummaryApi = {
    Test : {
        url :`${Backend}/api/test`,
        method : "get"
    }
}

export default SummaryApi;