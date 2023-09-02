import './style.css'

const getRandomItem = (items: Array<string>): string => items[Math.floor(Math.random()*items.length)]

const prepareData = async (): Promise<Array<Array<string>>> => {
  const data: string = await fetch("https://pad.medialepfade.net/6-2-1-Generator/download").then(r => r.text());
  const dataArray: Array<string> = data.split("\n")
  const parsedData = dataArray.filter(row => row.includes("{x}"));

  // @todo be sure items are unique? 
  const rulesRaw: Array<string> = [getRandomItem(parsedData), getRandomItem(parsedData), getRandomItem(parsedData)];

  const rules = [
    prepareRow(rulesRaw[0]),
    prepareRow(rulesRaw[1]),
    prepareRow(rulesRaw[2], false),
  ]

  const app = document.querySelector("#app");
  if (app) {
    app.innerHTML = rules.map((rule: Array<string>) => `<p>${rule.join("")}</p>`).join("");
  }

  return rules;
}

const prepareRow = (row: string, isPlural: boolean = true): Array<string> => {
  const prepred = row.split(';').map((el: string) => {
    let pretty = el.replace(/{x}/g, "").trim();

    const match = pretty.match(/\[.*\]/);
    // check for substring with singular/plural informaiton
    const pluralSubstring = match?.[0];
    if (pluralSubstring) {
      const splitted = pluralSubstring.replace("[", "").replace("]", "").split("|");
      // first item is plural
      let subStr = splitted[0];

      // rewrite subStr, if singular should be used
      if (!isPlural && splitted.length === 2) {
        subStr = splitted[1];
      }

      // replace string
      pretty = match?.input?.replace(/\[.*\]/, subStr) ?? pretty;
    }
   
    return pretty;
  });

  return prepred;
}



const rules = await prepareData().then(rules => rules);


console.log({rules});
