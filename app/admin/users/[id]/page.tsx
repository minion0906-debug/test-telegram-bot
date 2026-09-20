"use client";


import {
useEffect,
useState
}
from "react";


import {
useParams
}
from "next/navigation";



export default function UserDetail(){


const params =
useParams();


const [user,setUser]
=
useState<any>();



useEffect(()=>{

fetch(
"/api/admin/users/"+params.id
)
.then(r=>r.json())
.then(setUser);


},[]);



if(!user)
return <div>
Loading...
</div>;



return (

<div className="p-10">


<h1 className="
text-3xl
font-bold
mb-6
">
User Detail
</h1>


<div className="
space-y-3
border
p-6
rounded
">


<p>
Telegram ID:
{user.telegram_id}
</p>


<p>
Name:
{user.first_name}
{user.last_name}
</p>


<p>
Username:
{user.username}
</p>


<p>
Phone:
{user.phone}
</p>


<p>
Country:
{user.country}
</p>


<p>
Gender:
{user.gender}
</p>


<p>
Created:
{
new Date(
user.created_at
)
.toLocaleString()
}
</p>


<p>
Status:
{
user.blocked
?
"Blocked"
:
"Active"
}
</p>


</div>


</div>

)

}