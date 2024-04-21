export function RefreshCookiesConfig() {
  return {
    httpOnly: true,
    signed: true,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
  };
}

export function AccessCookiesConfig() {
  return {
    httpOnly: true,
    signed: true,
    expires: new Date(Date.now() + 1000 * 60 * 15),
  };
}
