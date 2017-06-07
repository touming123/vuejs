export function formatDate(time, str) {
  time = new Date(time);
  if (/(Y+)/.test(str)) {
    str = str.replace(RegExp.$1, (time.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let rep = {
    'M+': time.getMonth() + 1,
    'D+': time.getDate(),
    'h+': time.getHours(),
    'm+': time.getMinutes(),
    's+': time.getSeconds()
  };
  for (let key in rep) {
    if (new RegExp(`(${key})`).test(str)) {
      let val = rep[key];
      str = str.replace(RegExp.$1, RegExp.$1.length === 1 ? '0' + (val + '') : (val + ''));
    }
  }
  return str;
}
