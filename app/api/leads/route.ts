import {leadSchema} from "../../../lib/lead-schema";
import {PUBLIC_FORM_ACCESS_KEY} from "../../../lib/form-config";
export async function POST(request:Request){
 const headers={"Cache-Control":"no-store"};
 let sameOrigin=false;
 try{const origin=new URL(request.headers.get("origin")||"");sameOrigin=["http:","https:"].includes(origin.protocol)&&origin.host===(request.headers.get("host")||new URL(request.url).host).toLowerCase();}catch{}
 if(!sameOrigin)return Response.json({error:"Richiesta non consentita."},{status:403,headers});
 const raw=await request.text();
 if(raw.length>10000)return Response.json({error:"Richiesta troppo lunga."},{status:413,headers});
 let payload;
 try{payload=leadSchema.safeParse(JSON.parse(raw));}catch{return Response.json({error:"Controlla i dati inseriti."},{status:400,headers});}
 if(!payload.success){
  const labels:Record<string,string>={name:"nome",email:"email",phone:"telefono",company:"azienda",role:"ruolo",sector:"settore",businessType:"settore dell’azienda",volume:"fascia indicata",challenge:"priorità",message:"dettaglio",consent:"informativa",website:"verifica antispam",id:"sessione del modulo"};
  const fields=[...new Set(payload.error.issues.map(issue=>labels[String(issue.path[0])]||"dati"))];
  return Response.json({error:`Controlla: ${fields.join(", ")}.`},{status:400,headers});
 }
 const accessKey=process.env.WEB3FORMS_ACCESS_KEY||PUBLIC_FORM_ACCESS_KEY;
 if(!accessKey)return Response.json({error:"L’invio email non è ancora configurato. Puoi contattarci a assistenza@nexora-automation.it."},{status:503,headers});
 // Validation only: lead delivery is browser-to-Web3Forms, with no application database.
 return Response.json({ok:true,emailDelivery:{accessKey}},{headers});
}
