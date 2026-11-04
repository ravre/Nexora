import Link from "next/link";
import {Brand} from "./brand";
import {offers,sectorOrder} from "../../lib/offers";
export function SiteFooter({simple=false}:{simple?:boolean}){
 return <footer className={`site-footer ${simple?"footer-simple":""}`}><div className="footer-inner">{!simple&&<div className="footer-top"><div><Brand compact/><p>Meno passaggi. Più possibilità.</p></div><nav aria-label="Soluzioni per settore">{sectorOrder.map(s=><Link key={s} href={`/${s}`}>{s==="altre-aziende"?"Altre aziende":offers[s].shortName}</Link>)}</nav></div>}<div className="footer-bottom"><span>© {new Date().getFullYear()} NEXORA · Davide Tonello</span><div><Link href="/privacy">Privacy</Link><Link href="/cookie-policy">Cookie policy</Link><Link href="/termini">Termini d’uso</Link><a href="mailto:assistenza@nexora-automation.it">Contatti ↗</a></div></div></div></footer>;
}
