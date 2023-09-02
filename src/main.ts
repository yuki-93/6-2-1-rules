import './style.css'

const getRandomItem = (items: Array<string>) => items[Math.floor(Math.random()*items.length)]

const prepareData = async () => {
  const data = await fetch("https://pad.medialepfade.net/6-2-1-Generator/download").then(r => r.text());
  const dataArray = data.split("\n")
  const startIndex = dataArray.findIndex(item => item === "## Rows");
  // slice data and cleanup empty values
  const parsedData = dataArray.slice(startIndex+1, data.length).filter(item => item);

  // @todo be sure items are unique? 
  const rulesRaw = [getRandomItem(parsedData), getRandomItem(parsedData), getRandomItem(parsedData)];

  const rules = [
    rulesRaw[0].replace(/{x}/g, "6"),
    rulesRaw[1].replace(/{x}/g, "2"),
    rulesRaw[2].replace(/{x}/g, "1"),
  ]



  console.log({parsedData, rules});
}

prepareData();