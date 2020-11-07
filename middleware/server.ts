import { proxy } from "https://deno.land/x/oak_http_proxy@1.1.1/mod.ts";
import { Application } from "https://deno.land/x/oak@v6.2.0/mod.ts";

const app = new Application();

app.use(
  proxy((ctx) => {
    console.log(ctx);
    return new URL(
      "https://j9ogf83xx7.execute-api.eu-west-2.amazonaws.com/default/wish-list-service"
    );
  })
);

await app.listen({ port: 8000 });
