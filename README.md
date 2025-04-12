# HTTP Utils

A small, type-safe collection of utility functions to simplify working with both **Axios** and native **Fetch**. These wrappers offer unified response formatting and cleaner async handling in TypeScript.

---

## 🚀 Features

- ✅ Unified response shape: `{ ok, status, data | message }`
- ✅ Supports Axios and Fetch with identical method names
- ✅ Handles common HTTP methods: `GET`, `POST`, `PUT`, `DELETE`, `PATCH`
- ✅ Type-safe with generics for strong response typing
- ✅ Graceful error handling and parsing

---

## 📦 Installation

Install `axios` (required for Axios utils):

```bash
npm install sharpcodes19-fetch axios
```

---

## 📘 Usage

### Axios Wrapper

```typescript
import { get } from "sharpcodes19-fetch/axios"

const response = await get<MyResponseType>("/api/data")
if (response.ok) {
	console.log("Data:", response.data)
} else {
	console.error("Error:", response.message)
}
```

### Fetch Wrapper

```typescript
import { get } from "sharpcodes19-fetch/fetch"

const response = await get<MyResponseType>("/api/data")
if (response.ok) {
	console.log("Success:", response.data)
} else {
	console.error("Failed:", response.message)
}
```
