// import axios, { AxiosRequestConfig } from "axios";

// import { verifyRefreshToken } from "~/lib/auth";

// interface QueuedRequest {
//   config: AxiosRequestConfig; // Type for Axios request configuration
//   promise: Promise<any>; // Promise object representing the request
// }

// type TokenType = "accessToken" | "refreshToken";
// export const getToken = (type: TokenType) => {
//   // const cookieStore = cookies();
//   // const token = cookies().get(type);
//   // const accessToken = cookieStore.get("accessToken")?.value || "";
//   // const refreshToken = cookieStore.get("refreshToken")?.value || "";
//   // const { accessToken, refreshToken } = useAppTokenContext();
//   // return type === "accessToken" ? accessToken : refreshToken;
//   // return token;
// };

// const axiosClient = axios.create({
//   baseURL: "http://localhost:9000",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// let isRefreshing = false;
// let refreshTokenQueue: QueuedRequest[] = [];

// const hasHeaders = (
//   request: QueuedRequest
// ): request is QueuedRequest & { config: { headers: any } } => {
//   return request.config !== undefined && request.config.headers !== undefined;
// };

// const refreshToken = async (failedRequest: QueuedRequest) => {
//   if (isRefreshing) {
//     return new Promise((resolve) => {
//       refreshTokenQueue.push(failedRequest);
//       resolve;
//     });
//   }

//   isRefreshing = true;

//   try {
//     const refreshToken = localStorage.getItem("refreshToken") || "";
//     verifyRefreshToken(refreshToken);
//     const response = await authApi.refreshToken(refreshToken);

//     await axios.post("/api/auth", response.data);

//     refreshTokenQueue.forEach((request) => {
//       if (hasHeaders(request)) {
//         request.config.headers.Authorization = `Bearer ${response.data.accessToken}`;
//       }
//       request.promise = axios(request.config);
//     });

//     refreshTokenQueue = []; // Clear queue after successful refresh
//   } catch (error) {
//     console.error("Refresh token error:", error);
//   } finally {
//     isRefreshing = true;
//   }
// };

// axiosClient.interceptors.request.use(
//   (config) => {
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// axiosClient.interceptors.response.use(
//   (response) => {
//     return response.data;
//   },
//   async (error) => {
//     const originalRequest = error.config;
//     console.log("Error", error);

//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       try {
//         await refreshToken(originalRequest);
//         return originalRequest.promise;
//       } catch (error) {
//         console.error("Failed to refresh token: ", error);
//         return Promise.reject(error);
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// export default axiosClient;
