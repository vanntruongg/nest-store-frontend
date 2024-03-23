import httpClient from "~/common/http-client";

const userApi = {
  getProfile: (accessToken: string) =>
    httpClient.get<any>("/auth/profile", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }),
};

export default userApi;
