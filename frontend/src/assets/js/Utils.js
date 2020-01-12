class Utils {
    static isEmptyString(str) {
        return typeof str === 'undefined' || str == null || str.trim() === '' || str === undefined
    }

    static getRandomNumber() { return Math.floor(Math.random() * 10000) }

    static getUser() {
        // var req = new Utils.Request()
        // const endpoint = '/user'
        // const response = req.GET(endpoint)
        return true
    }

    static logout() {
        window.localStorage.clear();
        window.sessionStorage.clear()
        window.location.reload(true);
    }

    static get ERROR_MESSAGE() { return "Error processing request. Please contact admin." }

    static Request = class {
        static abortController = null
        constructor(NOT_JSON = false, api_address = 'http://localhost:5000') {
            this.headers = NOT_JSON ? {} : { 'Content-Type': 'application/json' }
            this.api_address = api_address
        }

        setAuthorization(token) {
            this.headers['Authorization'] = token;
        }

        setOtherHeader(key, value) {
            this.headers[key] = value;
        }

        static abortProcesses() {
            if (Utils.Request.abortController != null) {
                Utils.Request.abortController.abort();
            }
        }

        GET(endpoint) {
            Utils.Request.abortController = new AbortController()
            try {
                return fetch(this.api_address + endpoint, {
                    signal: Utils.Request.abortController.signal,
                    headers: this.headers,
                });
            } catch (err) {
                alert(Utils.ERROR_MESSAGE + err)
                return null;
            }
        }

        POST(endpoint, body) {
            Utils.Request.abortController = new AbortController()
            try {
                return fetch(this.api_address + endpoint, {
                    signal: Utils.Request.abortController.signal,
                    method: "POST",
                    headers: this.headers,
                    body: body
                });
            } catch (err) {
                alert(Utils.ERROR_MESSAGE + err)
                return null;
            }
        }


        PUT(endpoint, body) {
            Utils.Request.abortController = new AbortController()
            try {
                return fetch(this.api_address + endpoint, {
                    signal: Utils.Request.abortController.signal,
                    method: "PUT",
                    headers: this.headers,
                    body: body
                });
            } catch (err) {
                alert(Utils.ERROR_MESSAGE + err)
                return null;
            }
        }

        PATCH(endpoint, body) {
            Utils.Request.abortController = new AbortController()
            try {
                return fetch(this.api_address + endpoint, {
                    signal: Utils.Request.abortController.signal,
                    method: "PATCH",
                    headers: this.headers,
                    body: body
                });
            } catch (err) {
                alert(Utils.ERROR_MESSAGE + err)
                return null;
            }
        }

        DELETE(endpoint, body) {
            Utils.Request.abortController = new AbortController()
            try {
                return fetch(this.api_address + endpoint, {
                    signal: Utils.Request.abortController.signal,
                    method: "DELETE",
                    headers: this.headers,
                    body: body
                });
            } catch (err) {
                alert(Utils.ERROR_MESSAGE + err)
                return null;
            }
        }
    }
}

export default Utils