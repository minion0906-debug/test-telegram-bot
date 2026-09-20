import {
NextResponse
}
from "next/server";


import {
prisma
}
from "@/lib/prisma";



export async function POST(

req:Request,

{
params
}:{
params:{
id:string
}
}

){


const user =
await prisma.user.findUnique({

where:{
id:Number(params.id)
}

});



if(!user)
return NextResponse.json(
{
error:"User not found"
},
{
status:404
}
);



const updated =
await prisma.user.update({

where:{
id:user.id
},


data:{

blocked:
!user.blocked

}

});


return NextResponse.json(updated);


}