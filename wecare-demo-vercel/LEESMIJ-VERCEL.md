# weCare demo op Vercel (Hobby)

Dit is een demoversie. De site wordt niet geïndexeerd door Google (noindex), de formulieren tonen alleen een demomelding en de knop "Toon placeholders" staat aan.
Voor de echte site op Mijndomein gebruik je wecare-website.zip.

## Optie A: via de terminal (snelst, geen GitHub nodig)
Vereist Node.js (https://nodejs.org).

    cd pad/naar/wecare-demo
    npx vercel login
    npx vercel --prod

Beantwoord de vragen met Enter (standaardinstellingen zijn goed; geen build command, output directory = ./).
Je krijgt een link zoals https://wecare-demo.vercel.app

## Optie B: via GitHub
1. Maak een nieuwe (private) repository op github.com en upload de inhoud van deze map (Add file > Upload files).
2. Ga naar vercel.com/new, kies de repository en klik Deploy. Framework preset: Other.

## Tips
- Iedere bezoeker met de link kan de demo zien, maar Google indexeert hem niet.
- Projectnaam bepaalt de link: noem het project bijv. "wecare-demo" (Settings > General).
- Na de demo: project verwijderen via Settings > Advanced > Delete Project.
