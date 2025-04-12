// prettier-ignore
type FetchAsyncReturn<S> = (
  { ok: true, data: S } | 
  { ok: false, message: string }
) &
  { status: number }

// prettier-ignore
export const fetchAsync = async <S>(input: RequestInfo | URL, init?: RequestInit): Promise<FetchAsyncReturn<S>> => {
	try {
		const res = await fetch(input, init)
		if (res.ok) return res.json()
	
		const str = await res.text()
		const data: FetchAsyncReturn<S> = 
      str ? 
        JSON.parse(str) : 
        { 
          ok: false,
          status: 406,
          error: new Error("Parsing failed."),
          message: JSON.stringify({ requestPayload: init, responseText: str })
        }
		return { ...data, status: res.status }
	} catch (error: any) {
		return {
			ok: false,
			status: 500,
			message: String(error?.message ?? error)
		}
	}
}

// prettier-ignore
export const get = <S>(input: RequestInfo | URL, init?: Omit<RequestInit, "method">) =>
	fetchAsync<S>(input, { ...init, method: "GET" })

// prettier-ignore
export const post = <S>(input: RequestInfo | URL, init?: Omit<RequestInit, "method">) =>
	fetchAsync<S>(input, {...init, method: "POST" })

// prettier-ignore
export const put = <S>(input: RequestInfo | URL, init?: Omit<RequestInit, "method">) =>
	fetchAsync<S>(input, {...init, method: "PUT" })

// prettier-ignore
export const del = <S>(input: RequestInfo | URL, init?: Omit<RequestInit, "method">) =>
	fetchAsync<S>(input, {...init, method: "DELETE" })

// prettier-ignore
export const patch = <S>(input: RequestInfo | URL, init?: Omit<RequestInit, "method">) =>
	fetchAsync<S>(input, {...init, method: "PATCH" })
