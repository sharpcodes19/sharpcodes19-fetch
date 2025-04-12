import axios, { AxiosRequestConfig } from "axios"

type AxiosAsyncReturn<S> = ({ ok: true; data: S } | { ok: false; message: string }) & {
	status: number
}

// prettier-ignore
export const axiosAsync = async <S>(config: AxiosRequestConfig): Promise<AxiosAsyncReturn<S>> => {
  try {
    const response = await axios(config)
    return { ok: true, data: response.data, status: response.status }
  } catch (error: any) {
    return axios.isAxiosError(error) ? 
      { ok: false, status: error.status ?? 500, message: error.message } :
      { ok: false, status: 500, message: String(error?.message ?? error) }
  }
}

// prettier-ignore
export const get = <S>(url: string, config?: AxiosRequestConfig) =>
	axiosAsync<S>({ ...config, method: "GET", url })

// prettier-ignore
export const post = <S>(url: string, config?: AxiosRequestConfig) =>
	axiosAsync<S>({...config, method: "POST", url })

// prettier-ignore
export const put = <S>(url: string, config?: AxiosRequestConfig) =>
	axiosAsync<S>({...config, method: "PUT", url })

// prettier-ignore
export const del = <S>(url: string, config?: AxiosRequestConfig) =>
	axiosAsync<S>({...config, method: "DELETE", url })

// prettier-ignore
export const patch = <S>(url: string, config?: AxiosRequestConfig) =>
	axiosAsync<S>({...config, method: "PATCH", url })
