export { default } from "next-auth/middleware"

export const config = { matcher: ["/cart/checkout/:path*", '/user/:path*','/profile/:path*'] }