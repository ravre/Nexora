import {spawn} from "node:child_process";
import {existsSync} from "node:fs";
const input=process.argv.slice(2),args=[];
// The managed preview passes Vite-style flags; preview the verified production build when available.
const command=input.includes("--strictPort")&&existsSync(".next/BUILD_ID")?"start":"dev";
for(let i=0;i<input.length;i++){
 if(input[i]==="--strictPort")continue;
 args.push(input[i]==="--host"?"--hostname":input[i]);
}
if(!args.includes("--hostname"))args.push("--hostname","127.0.0.1");
const child=spawn(process.execPath,["node_modules/next/dist/bin/next",command,...args],{stdio:"inherit",env:process.env});
for(const signal of ["SIGINT","SIGTERM"])process.on(signal,()=>child.kill(signal));
child.on("exit",code=>process.exit(code??0));
