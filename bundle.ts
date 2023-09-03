import { bundle } from "https://deno.land/x/emit@0.27.0/mod.ts";
const { code } = await bundle("main.ts", {
  compilerOptions: {
    inlineSourceMap: true,
    inlineSources: true,
  },
});
await Deno.writeTextFile("public/main.js", code);
