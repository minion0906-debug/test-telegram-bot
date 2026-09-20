import {
NextResponse
}
from "next/server";


import {
prisma
}
from "@/lib/prisma";



export async function GET(){


const broadcasts =
await prisma.broadcast.findMany({

orderBy:{

created_at:"desc"

},

include:{

logs:true

}

});



return NextResponse.json(
broadcasts
);

}