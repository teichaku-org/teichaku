export const checkBrowser = (): string => {
  let userAgent = window.navigator.userAgent.toLowerCase()

  if (userAgent.indexOf("msie") != -1 || userAgent.indexOf("trident") != -1) {
    return "ie"
  } else if (userAgent.indexOf("edge") != -1) {
    return "edge"
  } else if (userAgent.indexOf("chrome") != -1) {
    return "chrome"
  } else if (userAgent.indexOf("safari") != -1) {
    return "safari"
  } else if (userAgent.indexOf("firefox") != -1) {
    return "firefox"
  } else if (userAgent.indexOf("opera") != -1) {
    return "opera"
  } else {
    return "unknown"
  }
}
