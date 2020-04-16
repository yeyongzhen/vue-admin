// 账号管理
import service from "@/utils/request";

// 获取账号列表
export function getAccountList(data) {
  return service.request({
    method: "post",
    url: "api/account/getAccountList",
    data
  });
}
