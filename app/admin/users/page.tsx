 "use client";

import { useEffect, useState } from "react";

export default function UsersPage(){
 const [users,setUsers]=useState<any[]>([]);
 const [search,setSearch]=useState("");

 async function load(){
  const r=await fetch(`/api/admin/users?search=${encodeURIComponent(search)}`);
  const d=await r.json();
  setUsers(d.users || []);
 }

 useEffect(()=>{load()},[]);

 return <main className="p-8">
  <h1 className="text-3xl font-bold mb-5">Users CRM</h1>

  <div className="flex gap-2 mb-5">
   <input className="border p-2" placeholder="Search..." value={search}
    onChange={e=>setSearch(e.target.value)}/>
   <button className="border px-4" onClick={load}>Search</button>
  </div>

  <table className="w-full border">
   <thead>
    <tr>
     <th className="border p-2">ID</th>
     <th className="border p-2">Name</th>
     <th className="border p-2">Username</th>
     <th className="border p-2">Phone</th>
     <th className="border p-2">Country</th>
     <th className="border p-2">Created</th>
    </tr>
   </thead>
   <tbody>
    {users.map(u=><tr key={u.id}>
      <td className="border p-2">{u.telegramId}</td>
      <td className="border p-2">{u.firstName} {u.lastName}</td>
      <td className="border p-2">{u.username}</td>
      <td className="border p-2">{u.phone}</td>
      <td className="border p-2">{u.country}</td>
      <td className="border p-2">{new Date(u.createdAt).toLocaleString()}</td>
    </tr>)}
   </tbody>
  </table>
 </main>
}
