import { cookies } from "next/headers";
import { verifyToken } from "./auth";
import { prisma } from "./prisma";


export async function getCurrentAdmin(){

const token =
cookies().get("admin_token")?.value;


if(!token)
return null;


const valid =
await verifyToken(token);


if(!valid)
return null;



// For now token only proves login.
// Later Part 6C will attach admin id.

const admin =
await prisma.admin.findFirst();


return admin;

}