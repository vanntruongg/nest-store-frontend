enum EAllAllowHttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

enum EUserStatus {
  "Active" = "ACTIVE",
}

enum ERole {
  "ROLE_ADMIN" = "Quản trị viên",
  "ROLE_USER" = "Người dùng",
}

enum EErrorCode {
  "UNAUTHORIZED" = 401,
  "FORM_ERROR" = 420,
}

export { EAllAllowHttpMethod, EUserStatus, ERole, EErrorCode };
