import Link from "next/link";
import {Brand} from "./brand";
import {offers,sectorOrder,type Sector} from "../../lib/offers";
import {ChevronDown,ArrowUpRight} from "lucide-react";
export function SiteHeader({sector,onContact}:{sector?:Sector;onContact?:()=>void}){
 return <header className="site-header"><div className="header-inner"><Brand/><div className="header-actions">{sector?<details className="sector-menu"><summary>{offers[sector].shortName}<ChevronDown size={13}/></summary><nav aria-label="Cambia settore">{sectorOrder.map(s=><Link key={s} href={`/${s}`} aria-current={sector===s?"page":undefined}>{offers[s].cardTitle}<ArrowUpRight size={14}/></Link>)}<Link href="/">Tutti i settori</Link></nav></details>:<span className="header-note"><span/> PROGETTATO INTORNO A TE</span>}{onContact&&<button className="header-contact" onClick={onContact}>Parliamone<ArrowUpRight size={15}/></button>}</div></div></header>;
}
