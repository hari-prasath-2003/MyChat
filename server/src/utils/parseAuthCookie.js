export default function parseAuthCookie(authCookie = "") {
  return authCookie.replace("Authorization=Bearer%20", "");
}
