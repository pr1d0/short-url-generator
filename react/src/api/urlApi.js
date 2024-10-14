import Api from "@/utils/api"

class UrlApi {
    static async generateUrl ( origin ) {
        return Api.post('url', { origin })
    }
}

export default UrlApi