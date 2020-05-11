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

// 获取角色列表
export function getRoles(data = {}) {
  return service.request({
    method: "post",
    url: "api/account/getRoles",
    data
  });
}

// 更改账号启用状态
export function changeAccountStatus(data = {}) {
  return service.request({
    method: "post",
    url: "api/account/changeAccountStatus",
    data
  });
}

// 根据 ID 查询某个账号信息
export function getAccountById(data = {}) {
  return service.request({
    method: "post",
    url: "api/account/getAccountById",
    data
  });
}

// 更新账号信息
export function updateAccount(data = {}) {
  return service.request({
    method: "post",
    url: "api/account/updateAccount",
    data
  });
}
