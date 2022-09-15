class ServerRequest {
    url: string;
    requestData: any;
    httpMethod: string;
    successCallback?: (responseData: object) => void;
    errorCallback?: (responseData: object, errorReason: string) => void;

    constructor(url: string, requestData: any, httpMethod: string, successCallback?: (response: object) => void,
        errorCallback?: (data: object, errorReason: string) => void) {
        this.url = url;
        this.requestData = requestData;
        this.httpMethod = httpMethod;
        this.successCallback = successCallback;
        this.errorCallback = errorCallback;
    }

    makeServerRequest() {
        const that = this;
        fetch(this.url, {
            method: this.httpMethod,
            body: JSON.stringify(this.requestData),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }).then(function(response) {
            if (response.status == 200) {
                if (typeof that.successCallback === 'function') {
                    that.successCallback(response);
                }
            } else {
                let errorReason = (response.status >= 400 && response.status < 500) ? 'bad_request' : 'server_error';
                if (typeof that.errorCallback === 'function') {
                    that.errorCallback(response, errorReason);
                }
            }
        })
        .catch(function(data) {
            if (typeof that.errorCallback === 'function') {
                that.errorCallback(data, 'error');
            }
        });
    }
}

export default ServerRequest;
