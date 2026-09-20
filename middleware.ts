import {NextRequest,NextResponse} from "next/server";
import {verifyToken} from "@/lib/auth";

export async function middleware(req:NextRequest){
 const token=req.cookies.get("admin_token")?.value;
 const login=req.nextUrl.pathname.includes("/admin/login");

 if(req.nextUrl.pathname.startsWith("/admin")&&!login){
  if(!token || !(await verifyToken(token)))
   return NextResponse.redirect(new URL("/admin/login",req.url));
 }
 return NextResponse.next();
}

export const config={matcher:["/admin/:path*"]};