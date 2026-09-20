export function renderBroadcast(template:string, user:any){
  return template
    .replaceAll('{{name}}', user.firstName || 'User')
    .replaceAll('{{username}}', user.username ? '@'+user.username : '');
}
