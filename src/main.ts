import './style.css'

const getRandomItem = (items: Array<string>): string => items[Math.floor(Math.random()*items.length)]

const prepareData = async (): Promise<Array<string>> => {
  const data: string = await fetch("https://pad.medialepfade.net/6-2-1-Generator/download").then(r => r.text());
  const dataArray: Array<string> = data.split("\n")
  const startIndex = dataArray.findIndex(item => item === "## Rows");
  // slice data and cleanup empty values
  const parsedData: Array<string> = dataArray.slice(startIndex+1, data.length).filter(item => item);

  // @todo be sure items are unique? 
  const rulesRaw: Array<string> = [getRandomItem(parsedData), getRandomItem(parsedData), getRandomItem(parsedData)];

  const rules = [
    rulesRaw[0].replace(/{x}/g, "6"),
    rulesRaw[1].replace(/{x}/g, "2"),
    rulesRaw[2].replace(/{x}/g, "1"),
  ];

  const app = document.querySelector("#app");
  if (app) {
    app.innerHTML = rules.map(rule => `<p>${rule}</p>`).join("");
  }

  return rules;
}

const generateSvg = (rules: Array<string>): void => {
  // @todo
}


const rules = await prepareData();
generateSvg(rules);


console.log({rules});
