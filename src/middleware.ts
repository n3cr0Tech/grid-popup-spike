// Ref: https://next-auth.js.org/configuration/nextjs#advanced-usage
import { withAuth, NextRequestWithAuth  } from "next-auth/middleware"

// withAuth will put the user's token into the request
export default withAuth(
    function middleware(request: NextRequestWithAuth){
        console.log("!!! Middleware logs: ");
        console.log(request.nextUrl.pathname); //whatever pathname is being requested by the user
        console.log(request.nextauth.token);        
    },
    {
        callbacks: {
            //middleware function ONLY executes if authorized() returns true
            authorized: ({ token }) => token?.role === "admin" //if there is a token AND the role is admin
        }
    }
)






// without defined matcher, this line will protect the ENTIRE site with next-auth
// was deprecated since we're using withAuth
//export {default} from "next-auth/middleware";




// Applies only to next-auth routes
// See https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = { matcher: ["/private_pages" ] }