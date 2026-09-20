"use client";


import {
useState
}
from "react";



export default function BroadcastPage(){


const [message,setMessage]
=
useState("");

const [country,setCountry]
=
useState("");

const [gender,setGender]
=
useState("");

const [result,setResult]
=
useState("");



async function send(){


const res =
await fetch(
"/api/admin/broadcast",
{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

message,

country,

gender

})

}

);


const data =
await res.json();


setResult(
"Sent: "+data.sent
);


}



return (

<div className="p-10">


<h1 className="
text-3xl
font-bold
mb-6
">
Telegram Broadcast
</h1>



<textarea

className="
border
w-full
p-3
h-40
"

placeholder="
Hello {{name}}
"

value={message}

onChange={
e=>setMessage(e.target.value)
}

/>



<div className="
flex
gap-3
mt-4
">


<input

className="border p-2"

placeholder="Country"

value={country}

onChange={
e=>setCountry(e.target.value)
}

/>


<input

className="border p-2"

placeholder="Gender"

value={gender}

onChange={
e=>setGender(e.target.value)
}

/>


</div>



<button

onClick={send}

className="
bg-black
text-white
px-6
py-3
mt-5
"

>
Send Broadcast
</button>



<p className="mt-5">

{result}

</p>


</div>

)

}