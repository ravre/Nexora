import type {Metadata} from "next";
import "./globals.css";
export const metadata:Metadata={
 title:"NEXORA Automation | L’AI parte dal tuo lavoro",description:"Automazioni AI per distributori B2B, cliniche, imprese HVAC e altri settori. Scegli il tuo settore e scopri come semplificare i processi della tua azienda.",
 metadataBase:new URL("https://www.nexora-automation.it"),icons:{icon:"/nexora-logo.jpg"},robots:{index:true,follow:true},alternates:{canonical:"/"},
 openGraph:{title:"NEXORA Automation",description:"Meno attività ripetitive. Più spazio per il tuo business.",url:"https://www.nexora-automation.it/",siteName:"NEXORA Automation",locale:"it_IT",type:"website",images:[{url:"/nexora-logo.jpg",width:1000,height:1000,alt:"NEXORA Automation"}]},
};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="it"><body>{children}</body></html>;}
