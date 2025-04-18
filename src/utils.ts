// helper function to append query parameters to a URL for fetch
export function addUrlQueryParams (endpoint: string, params: Record<string, string>) {
  let url = endpoint
  if (typeof params === 'object') {
    // append URL query paramenters
    const keys = Object.keys(params)
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]
      const value = params[key]
      if (i === 0) {
        url += '?'
      } else {
        url += '&'
      }
      url += encodeURIComponent(key) + '=' + encodeURIComponent(value)
    }
  }
  return url
}

// convert CSV string data to JSON array
export function csvStringToArray (data: string) {
  const re = /(,|\r?\n|\r|^)(?:"([^"]*(?:""[^"]*)*)"|([^,\r\n]*))/gi
  const result: string[][] = [[]]
  let matches
  while ((matches = re.exec(data))) {
    if (matches[1].length && matches[1] !== ',') {
      result.push([])
    }
    if (matches[2] !== undefined) {
      result[result.length - 1].push(
        matches[2].replace(/""/g, '"')
      )
    } else {
      result[result.length - 1].push(matches[3])
    }
  }
  return result
}

// parse a JWT payload into a JSON object
export function parseJwt(token: string) {
  const base64Url = token.split('.')[1]
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  return JSON.parse(window.atob(base64))
}
