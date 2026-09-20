import {NextRequest, NextResponse} from 'next/server';
import {prisma} from '@/lib/prisma';
import {sendMessage} from '@/lib/telegram';
import {renderBroadcast} from '@/lib/broadcast';

export async function POST(req:NextRequest){
 const {message,country,gender}=await req.json();
 const users=await prisma.telegramUser.findMany({where:{country:country||undefined,gender:gender||undefined,blocked:false}});
 let sent=0, failed=0;
 const broadcast=await prisma.broadcast.create({data:{message,country,gender,total:users.length,status:'RUNNING'}});
 for(const user of users){
  try{
   const result=await sendMessage(user.telegramId,renderBroadcast(message,user));
   const ok=result?.ok===true;
   await prisma.broadcastLog.create({data:{userId:user.id,broadcastId:broadcast.id,success:ok}});
   ok?sent++:failed++;
  }catch(e){
   failed++;
  }
 }
 await prisma.broadcast.update({where:{id:broadcast.id},data:{sentCount:sent,failedCount:failed,status:'COMPLETED'}});
 return NextResponse.json({sent,failed});
}
