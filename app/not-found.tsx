import Link from "next/link";
import {SiteHeader} from "./components/site-header";
import {SiteFooter} from "./components/site-footer";
export default function NotFound(){return <div className="home-page"><SiteHeader/><main className="not-found"><p className="eyebrow">404 / PAGINA NON TROVATA</p><h1>Ripartiamo<br/>dal tuo settore.</h1><p>Questo indirizzo non corrisponde a una pagina NEXORA.</p><Link className="primary-button" href="/">Scegli il tuo settore →</Link></main><SiteFooter simple/></div>;}
