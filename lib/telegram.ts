export async function sendMessage(telegramId:string,text:string){
 const res = await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,{
  method:'POST',
  headers:{'Content-Type':'application/json'},
  body:JSON.stringify({chat_id:telegramId,text})
 });
 return res.json();
}
