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


// 添加账号
export function addAccount(data) {
  return service.request({
    method: "post",
    url: "api/account/addAccount",
    data
  });
}