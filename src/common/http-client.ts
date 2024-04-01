import { IAuthResponse } from "~/common/model/auth.model";
import { tokenStorage } from "~/common/utility/auth.util";
import { normalizaPath } from "~/lib/utils";
import { EErrorCode } from "./utility/enum.util";
import { redirect } from "next/navigation";
export class HttpError extends Error {
  status: number;
  payload: {
    message: string;
    [key: string]: any;
  };
  constructor({ status, payload }: { status: number; payload: any }) {
    super("Http Error");
    this.status = status;
    this.payload = payload;
  }
}

export class EntityError extends HttpError {
  status: EErrorCode.FORM_ERROR;
  payload: any;

  constructor({
    status,
    payload,
  }: {
    status: EErrorCode.FORM_ERROR;
    payload: any;
  }) {
    super({ status, payload });
    this.status = status;
    this.payload = payload;
  }
}

type CustomOptions = RequestInit & {
  baseUrl?: string;
};

const request = async <Response>(
  method: "GET" | "POST" | "PUT" | "DELETE",
  url: string,
  options?: CustomOptions | undefined
) => {
  const body = options?.body ? JSON.stringify(options.body) : undefined;
  const baseHeaders = {
    "Content-Type": "application/json",
    Authorization: tokenStorage.value.rawToken.accessToken
      ? `Bearer ${tokenStorage.value.rawToken.accessToken}`
      : "",
  };

  const baseUrl =
    options?.baseUrl === undefined ? "http://localhost:9000" : options.baseUrl;

  const fullUrl = url.startsWith("/")
    ? `${baseUrl}${url}`
    : `${baseUrl}/${url}`;

  const res = await fetch(fullUrl, {
    ...options,
    headers: {
      ...baseHeaders,
      ...options?.headers,
    },
    body,
    method,
  });

  if (!res.ok) {
    if (res.status === EErrorCode.UNAUTHORIZED) {
      if (typeof window !== "undefined") {
        await fetch("/api/auth/logout", {
          method: "POST",
          body: JSON.stringify({ force: true }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        tokenStorage.clearToken();

        location.href = "/login";
      } else {
        const accessToken = (options?.headers as any).Authorization.split(
          " "
        )[1];
        redirect(`/logout?accesstoken=${accessToken}`);
      }
    }
  }
  const payload: Response = await res.json();

  const data = {
    status: res.status,
    payload,
  };
  // console.log(res);
  if (!res.ok) {
    if (res.status === EErrorCode.FORM_ERROR) {
      throw new EntityError(
        data as {
          status: EErrorCode.FORM_ERROR;
          payload: any;
        }
      );
    } else {
      throw new HttpError(data);
    }
  }
  // console.log("Payload", payload);

  if (typeof window !== "undefined") {
    if (
      ["auth/login", "auth/register"].some(
        (item) => item === normalizaPath(url)
      )
    ) {
      tokenStorage.value.rawToken.accessToken = (
        payload as any
      ).data.accessToken;
      tokenStorage.value.rawToken.refreshToken = (
        payload as any
      ).data.refreshToken;
    } else if ("auth/logout" === normalizaPath(url)) {
      tokenStorage.value.rawToken.accessToken = "";
      tokenStorage.value.rawToken.refreshToken = "";
    }
  }

  return data;
};

const httpClient = {
  get<Response>(url: string, options?: CustomOptions | undefined) {
    return request<Response>("GET", url, options);
  },
  post<Response>(
    url: string,
    body?: any,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("POST", url, { ...options, body });
  },
  put<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("PUT", url, { ...options, body });
  },
  delete<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("DELETE", url, { ...options, body });
  },
};

export default httpClient;
