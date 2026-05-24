Mental Math Journey - Adaptive Practice Build

Open this file to run the app:

  index.html

This top-level index.html is the production build and can be opened directly in a browser.
The source code is included in the source/ folder.

Audit notes:
- The earlier package exposed the Vite source index.html at the root. That file points to /src/main.tsx and requires a dev server, so opening it directly can show a blank page.
- This package puts the built app at the root.
- vite.config.ts now uses base: './' so built asset paths are relative and work from a local folder.
- The unwanted local.adguard.org script tag that was present in the source index.html was removed before rebuilding.

To develop from source:
1. cd source
2. npm install
3. npm run dev

To rebuild:
1. cd source
2. npm install
3. npm run lint
4. npm run build
