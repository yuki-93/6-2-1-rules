const getRandomItem = (items: Array<string>): string =>
  items[Math.floor(Math.random() * items.length)];

const prepareData = async (): Promise<Array<Array<string>>> => {
  const storage = window.sessionStorage.getItem("rawData");
  let data = storage ?? "";
  if (!storage) {
    data = await fetch("/rules.txt").then((r) => r.text());
    window.sessionStorage.setItem("rawData", data ?? "");
  }
  const dataArray = data.split("\n");
  const parsedData = dataArray.filter((row) => row.includes("{x}"));

  const rulesRaw: Array<string> = [];
  while (rulesRaw.length < 3) {
    const item = getRandomItem(parsedData);
    if (rulesRaw.every((rule) => rule !== item)) {
      rulesRaw.push(item);
    }
  }

  const rules = [
    prepareRow(rulesRaw[0]),
    prepareRow(rulesRaw[1]),
    prepareRow(rulesRaw[2], false),
  ];

  const app = document.querySelector("#app>#content");
  if (app) {
    app.innerHTML = [
      `<p class="number-label">6</p><p class="rule-label">${
        rules[0].join("&nbsp;")
      }</p>`,
      `<p class="number-label">2</p><p class="rule-label">${
        rules[1].join("&nbsp;")
      }</p>`,
      `<p class="number-label">1</p><p class="rule-label">${
        rules[2].join("&nbsp;")
      }</p>`,
    ].join("");
  }

  const text6 = document.querySelector("#sticker_6_text");
  if (text6) {
    const ruleParts = rules[0][0].split(/[ ]/);
    text6.childNodes.forEach((node, index) => {
      const rulePart = ruleParts[index];
      if (rulePart) {
        (node as HTMLElement).innerHTML = ruleParts[index];
      }
    });
  }
  const text2 = document.querySelector("#sticker_2_text");
  if (text2) {
    const ruleParts = rules[1][0].split(/[ ]/);
    text2.childNodes.forEach((node, index) => {
      const rulePart = ruleParts[index];
      if (rulePart) {
        (node as HTMLElement).innerHTML = ruleParts[index];
      }
    });
  }
  const text1 = document.querySelector("#sticker_1_text");
  if (text1) {
    const ruleParts = rules[2][0].split(/[ ]/);
    text1.childNodes.forEach((node, index) => {
      const rulePart = ruleParts[index];
      if (rulePart) {
        (node as HTMLElement).innerHTML = ruleParts[index];
      }
    });
  }

  const emoji6 = document.querySelector("#sticker_6_emoji>tspan");
  if (emoji6) {
    emoji6.innerHTML = rules[0][1];
  }
  const emoji2 = document.querySelector("#sticker_2_emoji>tspan");
  if (emoji2) {
    emoji2.innerHTML = rules[1][1];
  }
  const emoji1 = document.querySelector("#sticker_1_emoji>tspan");
  if (emoji1) {
    emoji1.innerHTML = rules[2][1];
  }

  return rules;
};

const prepareRow = (row: string, isPlural = true): Array<string> => {
  const prepred = row.split(";").map((el) => {
    // drop placeholder, remove blanks
    let pretty = el.replace(/{x}/g, "").trim();

    const match = pretty.match(/\[.*\]/);
    // check for substring with singular/plural informaiton
    const pluralSubstring = match?.[0];
    if (pluralSubstring) {
      const splitted = pluralSubstring
        .replace("[", "")
        .replace("]", "")
        .split("|");
      // first item is plural
      let pluralizationStr = splitted[0];

      // rewrite subStr, if singular should be used
      if (!isPlural && splitted.length === 2) {
        pluralizationStr = splitted[1];
      } else if (!isPlural && splitted.length === 1) {
        // singular form is substring of whole word
        pluralizationStr = "";
      }

      // replace string
      pretty = match?.input?.replace(/\[.*\]/, pluralizationStr) ?? pretty;
    }

    return pretty;
  });

  return prepred;
};

(async () => {
  const rules = await prepareData();
  console.log(rules);
})();
