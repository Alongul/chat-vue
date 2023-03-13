// 存入cookie
export function setCookie(key: string, value?: string): void {
  if (!key) {
    return;
  }

  // 先置空
  document.cookie = `${key.toLowerCase()}=${encodeURIComponent("")};path=/`;

  document.cookie = `${key.toLowerCase()}=${encodeURIComponent(
    value ?? ""
  )};path=/`;
}

// 取cookie
export function getCookie(key: string): string | undefined {
  const reg = new RegExp(`(^| )${key.toLowerCase()}=([^;]*)(;|$)`, "i");
  const match = document.cookie.match(reg) ?? "";
  if (match.length > 2) {
    return decodeURIComponent(match[2]);
  }
}
