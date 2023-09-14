import axios, {
    AxiosRequestConfig,
    AxiosResponse,
    InternalAxiosRequestConfig,
} from "axios"
import { baseURL } from "../utils/config"

interface AxiosAuthConfig extends AxiosRequestConfig {
    withCredentials?: boolean
    _isRetry?:boolean
}

interface AuthResponse {
    accessToken: string
}

const $api = axios.create({
    withCredentials: true,
    baseURL: `${baseURL}/api`,
})

$api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("accessToken")}`
    return config
})

$api.interceptors.response.use(
    (config: AxiosResponse) => {
        return config
    },
    async (error) => {
        const originalRequest = error.config as AxiosAuthConfig
        if (
            error.response &&
            error.response.status === 401 &&
            originalRequest &&
            !originalRequest?._isRetry
        ) {
            originalRequest._isRetry = true
            try {
                const response = await axios.post<AuthResponse>(
                    `${baseURL}/api/auth/refresh`,
                    {},
                    { withCredentials: true }
                )
                localStorage.setItem("accessToken", response.data.accessToken)
                return $api.request(originalRequest)
            } catch (e) {
                localStorage.removeItem("accessToken")
                window.location.href = '/auth'; 
            }
        }
        throw error
    }
)


export default $api