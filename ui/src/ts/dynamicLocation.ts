export class PageLocation {
    windowLocation;
    hostname;
    href;
    protocol;
    port;
    origin;
    baseURL;
    apiPrefix;

    // If you want to hard code baseURL, modify the return value.

    constructor() {
        this.apiPrefix = 'api';
        this.windowLocation = window.location;
        this.origin = this.windowLocation.origin;
        this.hostname = this.windowLocation.hostname;
        this.href = this.windowLocation.href;
        this.protocol = this.windowLocation.protocol;
        this.port = this.windowLocation.port;
        if (this.port === '') {
            if (this.protocol === 'http:') {
                this.port = '80';
            }
            if (this.protocol === 'https:') {
                this.port = '443';
            }
        }
        let customBaseURL = this.customBaseURL();
        if (customBaseURL.hardCode) {
            this.baseURL = customBaseURL.baseURL;
        } else {
            this.baseURL = this.origin + '/' + this.apiPrefix;
        }
    }

    // In general, hardCode mode is used in develepment while dynamic mode is used in production.
    customBaseURL() {
        if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
            return {
                baseURL: 'http://localhost:8080/api',
                hardCode: true,
            };
        } else if (process.env.NODE_ENV === 'production') {
            return {
                baseURL: '',
                hardCode: false,
            };
        } else {
            throw new Error('Unknown NODE_ENV: ' + process.env.NODE_ENV);
        }

    }
}
