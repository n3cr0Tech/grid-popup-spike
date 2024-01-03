/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {      
        AUTH_TOKEN_HEADER_NAME : process.env.AUTH_TOKEN_HEADER_NAME,
        AUTH_SECRET : process.env.AUTH_SECRET,
        GOOGLE_API_KEY : process.env.GOOGLE_API_KEY,
        GOOGLE_ID : process.env.GOOGLE_ID,
        GOOGLE_SECRET : process.env.GOOGLE_SECRET,

        SERVER_BASE_URL : process.env.SERVER_BASE_URL,
        CREATE_ORDER_URL : process.env.CREATE_ORDER_URL,
        ORDER_QUERY_URL : process.env.ORDER_QUERY_URL,
        LOGIN_URL : process.env.LOGIN_URL,
        GET_EMPLOYEE_URL :process.env. GET_EMPLOYEE_URL,
        SERVER_API_KEY : process.env.SERVER_API_KEY,
    }
}

module.exports = nextConfig
