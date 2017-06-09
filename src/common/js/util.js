/**
 * 解析url参数
 * @example ?id=12345&a=abc
 * @return Object{id:12345, a:abc}
 */
export function urlParse() {
  let url = window.location.search;
  let reg = /[?&][^?&]+=[^?&]+/g; // ^非
  let obj = {};
  let arr = url.match(reg);
  // ['?id=12345','&a=abc']
  if (arr) {
    arr.forEach((item) => {
      let tmp = item.substring(1).split('=');
      let key = decodeURIComponent(tmp[0]);
      let val = decodeURIComponent(tmp[1]);
      obj[key] = val;
    });
  }
  return obj;
}
