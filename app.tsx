// @deno-types="https://deno.land/x/servest@v1.3.1/types/react/index.d.ts"
import React from "https://dev.jspm.io/react/index.js";
// @deno-types="https://deno.land/x/servest@v1.3.1/types/react-dom/server/index.d.ts"
import ReactDOMServer from "https://dev.jspm.io/react-dom/server.js";
import { createApp } from "https://deno.land/x/servest@v1.3.1/mod.ts";

let app = createApp();
let colores:String[] =[]
app.handle("/", async (req) => {

   //console.log(req.url)
   let query = req.url.replace(/\//g, "");
   const params = new URLSearchParams(query);
   let color:any = params.get("color");
   colores.push(color)
  console.log(colores)
  
    const message = (
      <html>
        <head>
          <meta charSet="utf-8" />
          <title>Servest Desafio 47</title>
        </head>
        <body>
        <form>
            <span>Ingresa un color</span>
            <input type="text" id="color" name="color" />
            <button type="submit">Enviar</button>
          </form>
          <ul style={{background:"black"}}>
          {colores.map(function(name, index){
               return <li key={ index} style={{ color: `${name}` }} >{name}</li>;
           })}
          </ul>
          
          
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

});

app.listen({ port: 8080 });