import service from "@/utils/request";

// 获取权限列表
export function getPermissionList(data) {
  return service.request({
    method: "post",
    url: "api/permission/getPermissionList",
    data
  });
}

// 添加权限
export function addPermission(data) {
  return service.request({
    method: "post",
    url: "api/permission/addPermission",
    data
  });
}

// 删除权限
export function delPermission(data) {
  return service.request({
    method: "post",
    url: "api/permission/delPermission",
    data
  });
}

// 根据 ID 查询某个权限信息
export function getPermissionById(data) {
  return service.request({
    method: "post",
    url: "api/permission/getPermissionById",
    data
  });
}

// 编辑权限
export function updatePermission(data) {
  return service.request({
    method: "post",
    url: "api/permission/updatePermission",
    data
  });
}
