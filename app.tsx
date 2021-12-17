// @deno-types="https://deno.land/x/servest@v1.3.1/types/react/index.d.ts"
import React from "https://dev.jspm.io/react/index.js";
// @deno-types="https://deno.land/x/servest@v1.3.1/types/react-dom/server/index.d.ts"
import ReactDOMServer from "https://dev.jspm.io/react-dom/server.js";
import { createApp } from "https://deno.land/x/servest@v1.3.1/mod.ts";

let app = createApp();

app.handle("/", async (req) => {
  //console.log(req.url)
   let query = req.url.replace(/\//g, "");
   let params = new URLSearchParams(query);
  // console.log(params)
   let color:any = params.get("color");
  // console.log(color)
  const fraseDeco:any = decodeURIComponent(color);
  let textos: string[] = [];
    textos.push(fraseDeco)
  if (color) {

    const message = (
      <html>
        <head>
          <meta charSet="utf-8" />
          <title>Servest Desafio 47</title>
        </head>
        <body>
        <form>
            <span>Ingresa un color</span>
            <input type="text" id="color" placeholder="Color"></input>
            <button type="submit">Enviar</button>
          </form>
          <h1>{textos}</h1>
        </body>
      </html>
    );

    await req.respond({
      
      status: 200,
      headers: new Headers({
        "content-type": "text/html; charset=UTF-8",
      }),
      body: ReactDOMServer.renderToString(message)
    });
  }
  else {
    const message = (
      <html>
        <head>
          <meta charSet="utf-8" />
          <title>servest</title>
        </head>
        <body>
          <form>
          <span>Ingresa un color</span>
            <input type="text" id="color" placeholder="Color"></input>
            <button type="submit">Enviar</button>
          </form>
        </body>
      </html>
    );

    await req.respond({
      status: 200,
      headers: new Headers({
        "content-type": "text/html; charset=UTF-8",
      }),
      body: ReactDOMServer.renderToString(message)
    });
  }
});

app.listen({ port: 8080 });