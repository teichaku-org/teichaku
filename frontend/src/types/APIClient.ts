import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios"

export interface HttpClient {
  get: (path: string, params: any) => Promise<void | AxiosResponse<any, any>>
  post: (path: string, params: any) => Promise<void | AxiosResponse<any, any>>
  put: (path: string, params: any) => Promise<void | AxiosResponse<any, any>>
  delete: (path: string, params: any) => Promise<void | AxiosResponse<any, any>>
}

export class APIClient implements HttpClient {
  static baseUrl: string = "https://asia-northeast1-teichaku-fa2a9.cloudfunctions.net"

  public async get(path: string, params: any) {
    const options: AxiosRequestConfig = {
      baseURL: APIClient.baseUrl,
      url: path,
      method: "get",
      params: params,
    }

    const res: AxiosResponse | void = await axios(options).catch((e: AxiosError<{ error: string }>) => {
      console.log(e.message)
    })
    return res
  }

  public async post(path: string, params: any) {
    const options: AxiosRequestConfig = {
      baseURL: APIClient.baseUrl,
      url: path,
      method: "post",
      data: params,
    }

    const res: AxiosResponse | void = await axios(options).catch((e: AxiosError<{ error: string }>) => {
      console.log(e.message)
    })

    return res
  }

  public async put(path: string, params: any) {
    const options: AxiosRequestConfig = {
      baseURL: APIClient.baseUrl,
      url: path,
      method: "put",
      data: params,
    }

    const res: AxiosResponse | void = await axios(options).catch((e: AxiosError<{ error: string }>) => {
      console.log(e.message)
    })
    return res
  }

  public async delete(path: string, params: any) {
    const options: AxiosRequestConfig = {
      baseURL: APIClient.baseUrl,
      url: path,
      method: "delete",
      data: params,
    }

    const res: AxiosResponse | void = await axios(options).catch((e: AxiosError<{ error: string }>) => {
      console.log(e.message)
    })
    return res
  }
}
