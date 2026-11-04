import {legal} from "./legal";
import {offers} from "./offers";
import type {LeadData} from "./lead-schema";
export const LEAD_RECIPIENT="assistenza@nexora-automation.it";
export function leadEmailPayload(data:LeadData,accessKey:string){
 const offer=offers[data.sector];
 return {
  access_key:accessKey,subject:`NEXORA — richiesta ${offer.shortName}`,from_name:"NEXORA Automation",name:data.name,email:data.email,
  Azienda:data.company,Settore:offer.shortName,"Settore specifico":data.businessType||offer.category,Ruolo:data.role,Telefono:data.phone||"Non fornito",
  "Dimensione / volume":`${offer.volumeLabel} ${data.volume}`,"Priorità":data.challenge,"Dettaglio":data.message||"Non fornito",
  "Riferimento richiesta":data.id,"Informativa privacy":legal.version,"Presa visione informativa":"Sì, richiedo il ricontatto","Data invio":new Date().toISOString(),
  message:`Nuova richiesta NEXORA — ${offer.shortName}\n\nNome: ${data.name}\nEmail: ${data.email}\nTelefono: ${data.phone||"Non fornito"}\nAzienda: ${data.company}\nSettore: ${data.businessType||offer.category}\nRuolo: ${data.role}\n${offer.volumeLabel} ${data.volume}\nPriorità: ${data.challenge}\nDettaglio: ${data.message||"Non fornito"}\nRiferimento: ${data.id}`,
  botcheck:false,
 };
}
export async function sendLeadEmail(data:LeadData,accessKey:string,send:typeof fetch=fetch){
 if(!accessKey)throw new Error("Invio email non ancora attivato.");
 const response=await send("https://api.web3forms.com/submit",{method:"POST",headers:{"Content-Type":"application/json","Accept":"application/json"},body:JSON.stringify(leadEmailPayload(data,accessKey)),signal:AbortSignal.timeout(20000)});
 const result=await response.json() as {success?:boolean};
 if(!response.ok||result.success!==true)throw new Error("L’invio email non è stato confermato. Riprova tra poco oppure scrivici a assistenza@nexora-automation.it.");
}
