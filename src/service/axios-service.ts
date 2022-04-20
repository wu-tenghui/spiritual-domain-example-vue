import axios, {
    AxiosAdapter,
    AxiosBasicCredentials,
    AxiosInstance,
    AxiosProxyConfig,
    AxiosRequestConfig,
    AxiosResponse,
    AxiosTransformer,
    CancelToken,
    Method,
    ResponseType,
} from 'axios';

export interface CommonResponse<T = any> {
    value: T;
}

export class AxiosRequestConfigure implements AxiosRequestConfig {

    url?: string;
    method?: Method;
    baseURL?: string;
    transformRequest?: AxiosTransformer | AxiosTransformer[];
    transformResponse?: AxiosTransformer | AxiosTransformer[];
    headers?: any;
    params?: any;
    paramsSerializer?: (params: any) => string;
    data?: any;
    timeout?: number;
    timeoutErrorMessage?: string;
    withCredentials?: boolean;
    adapter?: AxiosAdapter;
    auth?: AxiosBasicCredentials;
    responseType?: ResponseType;
    xsrfCookieName?: string;
    xsrfHeaderName?: string;
    onUploadProgress?: (progressEvent: ProgressEvent) => void;
    onDownloadProgress?: (progressEvent: ProgressEvent) => void;
    maxContentLength?: number;
    validateStatus?: ((status: number) => boolean | null);
    maxBodyLength?: number;
    maxRedirects?: number;
    socketPath?: string | null;
    httpAgent?: any;
    httpsAgent?: any;
    proxy?: AxiosProxyConfig | false;
    cancelToken?: CancelToken;
    decompress?: boolean;

    constructor(url: string, method: Method) {
        this.url = url;
        this.method = method;
    }

}

export class AxiosService {

    public axios: AxiosInstance = axios.create();
    public requestInterceptors: number[] = [];
    public responseInterceptors: number[] = [];

    public setRequestInterceptors(
        onFulfilled?: (value: AxiosRequestConfig) => AxiosRequestConfig | Promise<AxiosRequestConfig>,
        onRejected?: (error: any) => any,
    ) {
        this.requestInterceptors.push(this.axios.interceptors.request.use(onFulfilled, onRejected));
    }

    public removeRequestInterceptor(interceptor: number) {
        if (this.requestInterceptors.includes(interceptor)) {
            this.axios.interceptors.request.eject(interceptor);
            delete this.requestInterceptors[interceptor];
        }
    }

    public removeAllRequestInterceptors() {
        for (const index of this.requestInterceptors) {
            this.axios.interceptors.request.eject(index);
            delete this.requestInterceptors[index];
        }
    }

    public setResponseInterceptors(
        onFulfilled?: (value: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>,
        onRejected?: (error: any) => any,
    ) {
        this.responseInterceptors.push(this.axios.interceptors.response.use(onFulfilled, onRejected));
    }

    public removeResponseInterceptor(interceptor: number) {
        if (this.responseInterceptors.includes(interceptor)) {
            this.axios.interceptors.response.eject(interceptor);
            delete this.responseInterceptors[interceptor];
        }
    }

    public removeAllResponseInterceptors() {
        for (const index of this.responseInterceptors) {
            this.axios.interceptors.response.eject(index);
            delete this.responseInterceptors[index];
        }
    }

    public async get<T = any>(url: string, params?: any, headers?: any):
        Promise<AxiosResponse<CommonResponse<T>>> {

        const axiosRequestConfigure: AxiosRequestConfigure = new AxiosRequestConfigure(url, 'GET');
        axiosRequestConfigure.params = params;
        axiosRequestConfigure.headers = headers;

        return await this.request<T>(axiosRequestConfigure);
    }

    public async post<T = any>(url: string, data?: any, params?: any, headers?: any):
        Promise<AxiosResponse<CommonResponse<T>>> {

        const axiosRequestConfigure: AxiosRequestConfigure = new AxiosRequestConfigure(url, 'POST');
        axiosRequestConfigure.data = data;
        axiosRequestConfigure.params = params;
        axiosRequestConfigure.headers = headers;

        return await this.request<T>(axiosRequestConfigure);
    }

    public async put<T = any>(url: string, data?: any, params?: any, headers?: any):
        Promise<AxiosResponse<CommonResponse<T>>> {

        const axiosRequestConfigure: AxiosRequestConfigure = new AxiosRequestConfigure(url, 'PUT');
        axiosRequestConfigure.data = data;
        axiosRequestConfigure.params = params;
        axiosRequestConfigure.headers = headers;

        return await this.request<T>(axiosRequestConfigure);
    }

    public async delete<T = any>(url: string, params?: any, headers?: any):
        Promise<AxiosResponse<CommonResponse<T>>> {

        const axiosRequestConfigure: AxiosRequestConfigure = new AxiosRequestConfigure(url, 'DELETE');
        axiosRequestConfigure.params = params;
        axiosRequestConfigure.headers = headers;

        return await this.request<T>(axiosRequestConfigure);
    }

    public async request<T = any>(axiosRequestConfigure: AxiosRequestConfigure):
        Promise<AxiosResponse<CommonResponse<T>>> {
        return await this.axios.request<CommonResponse<T>>(axiosRequestConfigure);
    }

}

export const axiosService: AxiosService = new AxiosService();

axiosService.setRequestInterceptors((value: AxiosRequestConfig) => {
    console.log("请求参数:\n" + JSON.stringify(value));
    return value;
});

axiosService.setResponseInterceptors((value: AxiosResponse) => {
    console.log("响应结果:\n" + JSON.stringify(value));
    return value;
});
