export function getCookie(name: string) {
  const escape = (string: string) =>
    string.replace(/([.*+?\^${}()|\[\]\/\\])/g, "\\$1");
  const match = document.cookie.match(
    RegExp("(?:^|;\\s*)" + escape(name) + "=([^;]*)")
  );
  return match ? match[1] : null;
}

export function deleteCookie(name: string) {
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}
