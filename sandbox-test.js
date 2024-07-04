const text = "RNM VTMS CTRSMU WMOL LRNM WO ZHCMHEDH TPH NMAT UHSADGH FQQD BKE UDN WI HMUMMV IV KIA SAZDDQVE";

const text_no_space = text.split(" ").join("");
console.log(`Num characters: ${text_no_space.length} ${text_no_space}`);

const split_strategy = 2;

const split_strategy_List = [];
const split_strategy_Hash = {};

for (let i = 0; i < text_no_space.length - (split_strategy - 1); i++) {
  console.log(text_no_space.substr(i, split_strategy));
  const tempSplitKey = text_no_space.substr(i, split_strategy);
  split_strategy_List.push(tempSplitKey);

  const existingKey = Object.keys(split_strategy_Hash).find((x) => {
    return x === tempSplitKey;
  });
  if (existingKey !== undefined) {
    split_strategy_Hash[tempSplitKey] = split_strategy_Hash[tempSplitKey] + 1;
  } else {
    split_strategy_Hash[tempSplitKey] = 1;
  }
}

Object.keys(split_strategy_Hash).forEach((hashkey) => {
  console.log(`${hashkey}: ${split_strategy_Hash[hashkey]}`);
});
