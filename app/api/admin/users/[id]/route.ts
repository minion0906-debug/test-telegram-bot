import {
NextRequest,
NextResponse
}
from "next/server";


import {
prisma
}
from "@/lib/prisma";



export async function GET(

req:NextRequest,

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
error:"Not found"
},
{
status:404
}
);



return NextResponse.json(user);

}

export async function PATCH(

req:NextRequest,

{
params
}:{
params:{
id:string
}
}

){


const body =
await req.json();



const user =
await prisma.user.update({

where:{
id:Number(params.id)
},


data:{

first_name:
body.first_name,

last_name:
body.last_name,

username:
body.username,

phone:
body.phone,

country:
body.country,

gender:
body.gender

}

});


return NextResponse.json(user);

}

export async function DELETE(

req:NextRequest,

{
params
}:{
params:{
id:string
}
}

){


await prisma.user.delete({

where:{
id:Number(params.id)
}

});


return NextResponse.json({

success:true

});


}