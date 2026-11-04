import {notFound} from "next/navigation";
import type {Metadata} from "next";
import {offers,sectorOrder,isSector} from "../../lib/offers";
import {OfferPage} from "../components/offer-page";
export function generateStaticParams(){return sectorOrder.map(settore=>({settore}));}
export async function generateMetadata({params}:{params:Promise<{settore:string}>}):Promise<Metadata>{const {settore}=await params;if(!isSector(settore))return {};const o=offers[settore];return {title:`${o.shortName} | NEXORA Automation`,description:o.description,alternates:{canonical:`/${settore}`},openGraph:{title:`NEXORA ${o.shortName}`,description:o.description,url:`https://www.nexora-automation.it/${settore}`}};}
export default async function SectorPage({params}:{params:Promise<{settore:string}>}){const {settore}=await params;if(!isSector(settore))notFound();return <OfferPage key={settore} offer={offers[settore]}/>;}
