import service from "../utils/request";

/**
 * 登录
 */
export function login(data) {
  return service.request({
    method: "post",
    url: "api/auth/login",
    data
  });
}
