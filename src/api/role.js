import service from "@/utils/request";

// 获取角色列表
export function getRoleList(data) {
  return service.request({
    method: "post",
    url: "api/role/getRoleList",
    data
  });
}

// 添加角色
export function addRole(data) {
  return service.request({
    method: "post",
    url: "api/role/addRole",
    data
  });
}

// 删除权限
export function delRole(data) {
  return service.request({
    method: "post",
    url: "api/role/delRole",
    data
  });
}

// 根据 ID 查询某个角色信息
export function getRoleById(data) {
  return service.request({
    method: "post",
    url: "api/role/getRoleById",
    data
  });
}

// 编辑角色
export function updateRole(data) {
  return service.request({
    method: "post",
    url: "api/role/updateRole",
    data
  });
}

// 绑定权限
export function assignPermissions(data) {
  return service.request({
    method: "post",
    url: "api/role/assignPermissions",
    data
  });
}
