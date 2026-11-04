import Link from "next/link";
export function Brand({compact=false}:{compact?:boolean}){
 return <Link href="/" className={`brand ${compact?"brand-compact":""}`} aria-label="NEXORA, torna alla scelta del settore"><span className="brand-symbol"><img src="/nexora-logo.jpg" alt="" width="1000" height="1000"/></span><span className="brand-word">NEXORA<span>AUTOMATION</span></span></Link>;
}
