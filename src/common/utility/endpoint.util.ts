export class EndpointUtil {
  public static NEST = {
    AUTH: {
      LOGIN: "/auth/login",
      REGISTER: "/auth/register",
      LOGOUT: "/auth/logout",
      REFRESH_TOKEN: "/auth/refresh-token",
    },
    USER: {
      GET_PROFILE: "/auth/profile",
      UPDATE_USER: "/auth/user/update",
      // CHANGE_PASSWORD: "/auth/change-p"
    },
  };
}
