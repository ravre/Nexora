import {z} from "zod";
import {offers} from "./offers";
export const leadSchema=z.object({
 id:z.string().uuid(),sector:z.enum(["distributori","cliniche","hvac","altre-aziende"]),
 name:z.string().trim().min(2).max(120),email:z.string().trim().email().max(254),
 phone:z.union([z.literal(""),z.string().trim().regex(/^[+\d\s().-]{6,30}$/)]),
 company:z.string().trim().min(2).max(160),role:z.enum(["Titolare / Amministratore","Direttore / Responsabile operativo","Responsabile commerciale","Referente del team","Altro"]),
 businessType:z.string().trim().max(160),volume:z.string().min(1).max(100),challenge:z.string().min(1).max(160),message:z.string().trim().max(1200),
 consent:z.literal(true),website:z.string().max(0),
}).superRefine((d,ctx)=>{
 const o=offers[d.sector];
 if(!o.volumes.includes(d.volume))ctx.addIssue({code:"custom",path:["volume"],message:"Seleziona una fascia valida."});
 if(!o.challenges.includes(d.challenge))ctx.addIssue({code:"custom",path:["challenge"],message:"Seleziona una priorità valida."});
 if(d.sector==="altre-aziende"&&d.businessType.length<2)ctx.addIssue({code:"custom",path:["businessType"],message:"Indica il tuo settore."});
});
export type LeadData=z.infer<typeof leadSchema>;
