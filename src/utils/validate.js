/**
 * 过滤特殊字符、空格
 *
 * @param {string} s
 */
export function stripScript(s) {
  var pattern = new RegExp(
    "[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？ ]"
  );
  var rs = "";
  for (var i = 0; i < s.length; i++) {
    rs = rs + s.substr(i, 1).replace(pattern, "");
  }

  return rs;
}

// /**
//  * 验证邮箱格式
//  *
//  * @param {string} value
//  */
// export function validateEmail(value) {
//   var pattern = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]){2,4})$/;

//   return !pattern.test(value) ? false : true;
// }

/**
 * 验证手机号格式
 *
 * @param {string} value
 */
export function validatePhone(value) {
  let pattern = /^1\d{10}$/;

  return pattern.test(value);
}

/**
 * 验证密码格式
 *
 * @param {string} value
 */
export function validatePass(value) {
  // 密码正则：至少1个大写英文字母、至少1个小写英文字母、至少1位数字、长度 6-15个字符
  let pattern = /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,}).{6,15}$/;

  return pattern.test(value);
}
