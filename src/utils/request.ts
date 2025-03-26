import axios, { AxiosError } from "axios";

interface IErrorResponse {
    error: boolean
    data: any;
    status: number;
}

function request(
    method = "get", url: string, 
    data: Record<string, any> | string = {}
): Promise<any | IErrorResponse> {
    return new Promise((resolve) => {
        const config = {
            method,
            url,
            [(method.toLowerCase() === 'get') ? 'params': 'data']: data
        }
        axios(config).then(({data}) => {
            resolve(data);
        }).catch((err: AxiosError) => {
            resolve({
                error: true,
                data: err.response?.data,
                status: err.status
            });
        });
    });
}

export default request;