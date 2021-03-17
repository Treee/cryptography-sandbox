function getKeyByValue(object, value) {
  return Object.keys(object).find((key) => {
    // console.log(`value of key: ${object[key]} key: ${key} value: ${value}`);
    return object[key] === value;
  });
}
function copyToClipboard() {
  var copyText = document.getElementById("result-text");

  /* Select the text field */
  copyText.select();
  copyText.setSelectionRange(0, 99999); /* For mobile devices */

  /* Copy the text inside the text field */
  document.execCommand("copy");
}
const BASE_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
// . = ° \u00B0 and - = ¬ \u00AC
const morseMap = {
  A: "\u00B0\u00AC",
  B: "\u00AC\u00B0\u00B0\u00B0",
  C: "\u00AC\u00B0\u00AC\u00B0",
  D: "\u00AC\u00B0\u00B0",
  E: "\u00B0",
  F: "\u00B0\u00B0\u00AC\u00B0",
  G: "\u00AC\u00AC\u00B0",
  H: "\u00B0\u00B0\u00B0\u00B0",
  I: "\u00B0\u00B0",
  J: "\u00B0\u00AC\u00AC\u00AC",
  K: "\u00AC\u00B0\u00AC",
  L: "\u00B0\u00AC\u00B0\u00B0",
  M: "\u00AC\u00AC",
  N: "\u00AC\u00B0",
  O: "\u00AC\u00AC\u00AC",
  P: "\u00B0\u00AC\u00AC\u00B0",
  Q: "\u00AC\u00AC\u00B0\u00AC",
  R: "\u00B0\u00AC\u00B0",
  S: "\u00B0\u00B0\u00B0",
  T: "\u00AC",
  U: "\u00B0\u00B0\u00AC",
  V: "\u00B0\u00B0\u00B0\u00AC",
  W: "\u00B0\u00AC\u00AC",
  X: "\u00AC\u00B0\u00B0\u00AC",
  Y: "\u00AC\u00B0\u00AC\u00AC",
  Z: "\u00AC\u00AC\u00B0\u00B0",
  1: "\u00B0\u00AC\u00AC\u00AC\u00AC",
  2: "\u00B0\u00B0\u00AC\u00AC\u00AC",
  3: "\u00B0\u00B0\u00B0\u00AC\u00AC",
  4: "\u00B0\u00B0\u00B0\u00B0\u00AC",
  5: "\u00B0\u00B0\u00B0\u00B0\u00B0",
  6: "\u00AC\u00B0\u00B0\u00B0\u00B0",
  7: "\u00AC\u00AC\u00B0\u00B0\u00B0",
  8: "\u00AC\u00AC\u00AC\u00B0\u00B0",
  9: "\u00AC\u00AC\u00AC\u00AC\u00B0",
  0: "\u00AC\u00AC\u00AC\u00AC\u00AC",
};
const morseCodeWordDelimiter = "|";

function textToMorseCode(text) {
  const morseCode = text
    .split(" ")
    .map((textPart) => {
      return textPart
        .split("")
        .map((character) => {
          return morseMap[character.toUpperCase()];
        })
        .join(" ");
    })
    .join(morseCodeWordDelimiter);
  document.getElementById("result-text").value = morseCode;
}

function morseCodeToText(morseCode) {
  const decodedText = morseCode
    .split(morseCodeWordDelimiter)
    .map((textPart) => {
      return textPart
        .split(" ")
        .map((morseSegment) => {
          return getKeyByValue(morseMap, morseSegment);
        })
        .join("");
    })
    .join(" ");
  document.getElementById("result-text").value = decodedText;
}

function encryptClick() {
  const userText = document.getElementById("user-text").value;
  const encryptionType = document.querySelector(
    "input[name=cipher-keys]:checked"
  ).value;

  if (encryptionType === "morse") {
    textToMorseCode(userText);
  }
}
function decryptClick() {
  const userText = document.getElementById("user-text").value;
  const encryptionType = document.querySelector(
    "input[name=cipher-keys]:checked"
  ).value;
  if (encryptionType === "morse") {
    morseCodeToText(userText);
  }
}
// test scripts
// console.log(textToMorseCode("sos sos sos"));
// console.log(textToMorseCode("testing a sample string"));

// console.log(
//   morseCodeToText(
//     "^ # ### ^ ## ^# ^^#|#^|### #^ ^^ #^^# #^## #|### ^ #^# ## ^# ^^#"
//   )
// );

// const text_to_cipher = "RNM VTMS CTRSMU WMOL LRNM WO ZHCMHEDH TPH NMAT UHSADGH FQQD BKE UDN WI HMUMMV IV KIA SAZDDQVE";
// const text_to_cipher = "RNM VTMS CTRSMU WMOL LRNM WO ZHCMHEDH TPH NMAT UHSADGH UEHB TKM MDV OI PEUUEV IT KQS SIRDLIVM";
// const text_to_cipher = "ONE STEP CLOSER WELL DONE TO RECEEEVE THE NEXT MESSAGZ MEET THE MAN OF HERMES AT HIS PARADISE";
// const text_to_cipher = "COLLECTIVE OPERATION ICHOR ACTIVATE GATHER NBC MASK FILTER BLOOD BAG";
// const text_to_cipher = "SYRINGE TEST KIT MEET AT THE HIGHEST PEAK WAIT FOR THE SIGNAL";
const text_to_cipher = "PORTLAND PROVIDES";
// const text_to_cipher = "MEET THE MAN OF HERMES AT HIS PARADISE";
const encode = true;

let ceaser_cipher_shift_keys = "038";
const ceaser_cipher_shift_keys_reverse_indexs = [555];
let cipher_shift_counter = 0; // this helps keep a distinct count so empty spaces don't mess up encryption/decryption

let answer = "";

for (let i = 0; i < text_to_cipher.length; i++) {
  const base_index = BASE_ALPHABET.indexOf(text_to_cipher[i]);
  if (base_index > -1) {
    const reverse_index = ceaser_cipher_shift_keys_reverse_indexs.find(
      (value) => {
        return value === i;
      }
    );
    if (reverse_index !== undefined) {
      ceaser_cipher_shift_keys = ceaser_cipher_shift_keys
        .split("")
        .reverse()
        .join("");
    }
    // based on the current encoded character, what is the ceaser cipher shift index to use
    let rotating_ceaser_shift =
      cipher_shift_counter % ceaser_cipher_shift_keys.length;
    // select the index for the ceaser shifted alphabet to use
    const ceaser_shifted_alphabet = parseInt(
      ceaser_cipher_shift_keys[rotating_ceaser_shift]
    );

    // the ceaser shift index that maps to the base index (the % at the end wraps the selection) (this is how we get to the real message)
    // added a switch to allow for encoding and decoding.
    let modified_shift_index =
      (base_index - ceaser_shifted_alphabet) % BASE_ALPHABET.length;
    if (encode) {
      modified_shift_index =
        (base_index + ceaser_shifted_alphabet) % BASE_ALPHABET.length;
    }
    // wrap it in the negative direction (i think abs() can fix this somehow)
    if (modified_shift_index < 0) {
      modified_shift_index = BASE_ALPHABET.length + modified_shift_index;
    }
    // apply the shift to get the actual character
    const shifted_letter = BASE_ALPHABET[modified_shift_index];

    answer = answer.concat(shifted_letter);
    cipher_shift_counter++;
    // console.log(
    //   `Index: ${i} Ceaser Shift: ${rotating_ceaser_shift} Ceaser Key: ${ceaser_shifted_alphabet} BaseIndex: ${base_index} Cipher Letter: ${text_to_cipher[i]} shifted_letter: ${shifted_letter} modified_shift_index: ${modified_shift_index}`
    // );
  } else {
    answer = answer.concat(" ");
    // console.log(`Ceaser Shift: ? Ceaser Key: ? BaseIndex: ${base_index} Cipher Letter: ' ' shifted_letter: ? modified_shift_index: ?`);
  }
}

// console.log(answer);
