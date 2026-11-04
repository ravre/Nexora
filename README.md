# NEXORA Automation — sito multisettore per Vercel

Versione 2.0. Il progetto sostituisce il precedente pacchetto della sola landing Clinics. Non modifica il sito attualmente online né i DNS.

## Il percorso del visitatore

1. Home: «In che settore è la tua azienda?» con quattro scelte.
2. Landing dedicata: offerta specifica, benefici, moduli, esempio interattivo, metodo, domande frequenti e CTA.
3. Modulo in tre passaggi: contatti, azienda, priorità. Dopo la conferma di Web3Forms si passa al Calendly NEXORA da 30 minuti.

Pagine:
- `/` — scelta del settore.
- `/distributori` — preventivi rapidi, follow-up, ordini e ampliamenti.
- `/cliniche` — recupero agenda, richieste, segreteria e ampliamenti.
- `/hvac` — recupero richieste, segreteria, manutenzioni e ampliamenti.
- `/altre-aziende` — esempi di automazioni trasversali e analisi del processo.
- `/privacy`, `/cookie-policy`, `/termini` — informative adattate alla nuova struttura.

## Pubblicazione

1. Estrai lo ZIP. Carica il CONTENUTO estratto in un repository GitHub privato (per esempio `nexora-automation`). `package.json`, `package-lock.json`, `next.config.ts`, `tsconfig.json`, `app`, `lib`, `scripts` e `public` devono essere alla radice. Carica anche `.gitignore`, se visibile. Non caricare lo ZIP come unico file. Se aggiorni il vecchio repository, sostituisci il progetto con questo contenuto, senza lasciare le vecchie pagine Clinics alla radice.
2. Vercel → Add New → Project → collega GitHub → Import del repository.
3. Framework Next.js. Root Directory `./`. Node.js 22.x. Build `npm run build` o default. Output Directory default. Install `npm ci` o default.
4. L’identificativo pubblico Web3Forms già fornito dal titolare è configurato in `lib/form-config.ts`, associato a `assistenza@nexora-automation.it`. Non serve una password della casella. Per sostituirlo, imposta `WEB3FORMS_ACCESS_KEY` nelle Environment Variables di Vercel (Production e Preview) ed esegui Redeploy. È un identificativo pubblico del modulo, destinato all’uso nel browser.
5. Deploy. Sul link `.vercel.app`, controlla tutti e quattro i percorsi e invia una richiesta dimostrativa riconoscibile: verifica ricezione email, anche nello spam, e apertura di Calendly.
6. Prima del lancio completa i dati e le verifiche delle policy descritti sotto.
7. Solo dopo il test: Settings → Domains → aggiungi `www.nexora-automation.it` e `nexora-automation.it`. Seleziona www come principale e reindirizza l’apex a www, per coerenza con canonical e sitemap.
8. Su GoDaddy modifica solo i record web in conflitto usando ESATTAMENTE i valori A/CNAME indicati da Vercel. Preserva MX, SPF, DKIM, DMARC e i record della posta. Il dominio rimane su GoDaddy; non occorre trasferirlo.
9. Dopo l’attivazione del dominio e del certificato, prova HTTPS con e senza www e il modulo sul dominio definitivo. Poi configura Search Console e invia `/sitemap.xml`.

Per l’uso commerciale di NEXORA verifica il piano Vercel adatto e imposta i controlli di spesa. Hobby è riservato all’uso personale non commerciale.

## Modulo ed email

Il settore è presente nell’oggetto e nel contenuto dell’email. Domande su volumi e priorità cambiano con il percorso; per le altre aziende viene richiesto il settore specifico. Le risposte includono recapiti, azienda, ruolo, settore, volume/dimensione, priorità, dettaglio facoltativo, riferimento richiesta, versione dell’informativa e data.

`/api/leads` valida origine, campi, settore, fascia, priorità, dimensione e honeypot. Non usa un database e non registra le risposte nei log applicativi. Il browser invia a Web3Forms; solo una risposta HTTP positiva con `success: true` avvia il passaggio al Calendly. In caso di errore il modulo rimane disponibile. Un errore di rete dopo un invio può lasciare l’esito incerto: il riferimento richiesta aiuta a riconoscere eventuali doppioni, senza garanzia di deduplicazione del provider. Il servizio di posta può classificare un messaggio come spam.

Destinatario: assistenza@nexora-automation.it.
Calendly: https://calendly.com/assistenza-nexora-automation/30min.

Il calendario si apre esternamente, senza incorporamento e senza recapiti nei parametri del link. Nessun contatto storico o pannello admin è incluso nel progetto.

## Contenuti e logo

Il logo è l’originale fornito dal titolare: `public/nexora-logo.jpg`. Non è stato rigenerato. Il ritaglio nell’header avviene solo via CSS. I caratteri sono ospitati localmente, con le licenze in `public/fonts`.

Le proposte derivano dai documenti NEXORA Distributori B2B, Clinics e HVAC del 3 novembre 2026. La pagina pubblica presenta i servizi senza trasformare listini proposti e garanzie ancora da confermare in impegni contrattuali. Non sono stati inventati clienti, testimonial, risultati ottenuti o statistiche. Il pannello interattivo è indicato come esempio illustrativo; avanza ogni 4 secondi, si ferma all’ultimo passaggio e permette pausa e selezione manuale. Con movimento ridotto l’avvio automatico è disabilitato.

## Informative ancora da completare

`lib/legal.ts` contiene Davide Tonello e il recapito email già forniti. Mancano indirizzo/recapito del titolare, verifica di fornitori e trasferimenti, conservazione e inventario degli strumenti tecnici. Le policy restano esplicitamente bozze. Non impostare `processingReviewed: true` senza aver completato la verifica effettiva. Nessun analytics, pixel, newsletter o CRM è stato aggiunto.

## Sviluppo

Node.js 22.x. `npm ci`, poi `npm run dev`. Per verificare: `npm run build` (include TypeScript) e `npm run typecheck`.
Il wrapper dev traduce i flag dell’anteprima gestita; nell’uso locale esegue il normale Next.js dev. Vercel usa il normale `next build`.

## Verifica di questa versione

- Build di produzione e TypeScript completati.
- Controllati nel browser home, percorsi dedicati, apertura del modulo e domande specifiche; verifica a larghezza mobile di 375 px senza overflow orizzontale.
- Verificati tutti e quattro i payload, la selezione delle fasce/priorità, i campi obbligatori, il controllo origine, l’honeypot e la gestione degli errori.
- Verificati logo originale, pagine legali, canonical, sitemap e risposta 404.
- I test email sono stati effettuati con risposte simulate: nessuna nuova email reale è stata inviata. Il test di consegna nella casella e il passaggio completo a Calendly vanno completati sul link Vercel prima di modificare i DNS.
