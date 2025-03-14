import { getAuthToken } from "@/helper/storage";
import axios, { AxiosResponse } from "axios";

export type HeaderResponse = {
  code: string | null;
  errorMessage: string | null;
  timestamp: number;
  traceId: string;
  timeElapsed: string;
  memoryPeak: string;
};

type Response<T> = {
  data: T;
  header: HeaderResponse;
};

export type Params = {
  [KEY in string]: unknown;
};

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export function useRequest() {
  
  axios.interceptors.request.use(
    (config) => {
      const token = getAuthToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  class Request {
    static post<T>(
      url: string,
      params?: Params,
      config = null
    ): Promise<Response<T>> {
      return new Promise<Response<T>>((resolve, reject) => {
        axios
          .post<Response<T>>(
            url,
            params,
            config || {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((response: AxiosResponse) => {
            resolve(response.data);
          })
          .catch((e) => {
            reject(e.response.data);
          });
      });
    }
    static get<T>(
      url: string,
      params?: Params,
      config?: object
    ): Promise<Response<T>> {
      return new Promise<Response<T>>((resolve, reject) => {
        axios
          .get<Response<T>>(
            url,
            config || {
              headers: {
                "Content-Type": "application/json",
              },
              params,
            }
          )
          .then((response: AxiosResponse) => {
            resolve(response.data);
          })
          .catch((e) => {
            reject(e.response.data);
          });
      });
    }
    static put<T>(
      url: string,
      params?: Params,
      config = null
    ): Promise<Response<T>> {
      return new Promise<Response<T>>((resolve, reject) => {
        axios
          .put<Response<T>>(
            url,
            params,
            config || {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((response: AxiosResponse) => {
            resolve(response.data);
          })
          .catch((e) => {
            reject(e.response.data);
          });
      });
    }
    static del(
      url: string,
      params?: Params,
      data?: Params
    ): Promise<Response<boolean>> {
      return new Promise<Response<boolean>>((resolve, reject) => {
        axios
          .delete<Response<boolean>>(url, {
            ...(data ? { data } : {}),
            headers: {
              "Content-Type": "application/json",
            },
            params,
          })
          .then((response: AxiosResponse) => {
            resolve(response.data);
          })
          .catch((e) => {
            reject(e.response.data);
          });
      });
    }
  }

  return { Request };
}
