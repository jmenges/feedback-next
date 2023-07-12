export { default } from "next-auth/middleware";

export const config = { matcher: ["/feedback/add", "/feedback/(.+)/edit"] };
