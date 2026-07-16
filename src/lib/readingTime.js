// Rough reading time from the raw markdown body, same 200 wpm as BlogPost.
export function readingMinutes(body = '') {
  const words = body.trim() ? body.trim().split(/\s+/).length : 0
  return Math.max(1, Math.ceil(words / 200))
}
