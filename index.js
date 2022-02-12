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
function populateResultElement(text) {
  if (document.getElementById("result-text")) {
    document.getElementById("result-text").value = text;
  }
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
const normalMorseMap = {
  A: ".-",
  B: "-...",
  C: "-.-.",
  D: "-..",
  E: ".",
  F: "..-.",
  G: "--.",
  H: "....",
  I: "..",
  J: ".---",
  K: "-.-",
  L: ".-..",
  M: "--",
  N: "-.",
  O: "---",
  P: ".--.",
  Q: "--.-",
  R: ".-.",
  S: "...",
  T: "-",
  U: "..-",
  V: "...-",
  W: ".--",
  X: "-..-",
  Y: "-.--",
  Z: "--..",
  1: ".----",
  2: "..---",
  3: "...--",
  4: "....-",
  5: ".....",
  6: "-....",
  7: "--...",
  8: "---..",
  9: "----.",
  0: "-----",
};

const morseCodeWordDelimiter = "|";
const normalMorseCodeWordDelimiter = " / ";

function textToMorseCode(text, ditNdahMap, delimiter) {
  const morseCode = text
    .split(" ")
    .map((textPart) => {
      return textPart
        .split("")
        .map((character) => {
          return ditNdahMap[character.toUpperCase()];
        })
        .join(" ");
    })
    .join(delimiter);
  populateResultElement(morseCode);
  return morseCode;
}

function morseCodeToText(morseCode, ditNdahMap, delimiter) {
  const decodedText = morseCode
    .split(delimiter)
    .map((textPart) => {
      return textPart
        .split(" ")
        .map((morseSegment) => {
          return getKeyByValue(ditNdahMap, morseSegment);
        })
        .join("");
    })
    .join(" ");
  populateResultElement(decodedText);
  return decodedText;
}

// positive shifts right -> negative shifts left <-
function shiftSingleLetter(letter, shift, encode) {
  let base_index = BASE_ALPHABET.indexOf(letter.toUpperCase());
  let shift_index = BASE_ALPHABET.indexOf(shift.toUpperCase());
  if (encode) {
    shift_index *= -1;
  }
  let modified_shift_index = (base_index - shift_index) % BASE_ALPHABET.length;
  // wrap it in the negative direction (i think abs() can fix this somehow)
  if (modified_shift_index < 0) {
    modified_shift_index = BASE_ALPHABET.length + modified_shift_index;
  }
  // apply the shift to get the actual character
  const shifted_letter = BASE_ALPHABET[modified_shift_index];
  // console.log(
  //   `Base Index: ${base_index} | Shift Index: ${shift_index} | Modified Shift : ${modified_shift_index} | Shifted letter: ${shifted_letter}`
  // );
  return shifted_letter;
}

function multiAlphabetCeaserCipher(encode, text_to_cipher, ceaser_cipher_shift_keys) {
  let cipher_shift_counter = 0; // this helps keep a distinct count so empty spaces don't mess up encryption/decryption
  let rotating_ceaser_shift = 0;
  let answer = "";
  for (let i = 0; i < text_to_cipher.length; i++) {
    const base_index = BASE_ALPHABET.indexOf(text_to_cipher[i].toUpperCase());
    if (base_index > -1) {
      // based on the current encoded character, what is the ceaser cipher shift index to use
      rotating_ceaser_shift = cipher_shift_counter % ceaser_cipher_shift_keys.length;

      // select the index for the ceaser shifted alphabet to use
      const ceaser_shifted_alphabet = ceaser_cipher_shift_keys[rotating_ceaser_shift];

      let shifted_letter = shiftSingleLetter(text_to_cipher[i], ceaser_shifted_alphabet, encode);

      answer = answer.concat(shifted_letter);
      cipher_shift_counter++;
    } else {
      // pass through punctuation or anything not in the base alphabet
      answer = answer.concat(text_to_cipher[i]);
    }
  }
  populateResultElement(answer);
  return answer;
}

function encryptClick() {
  const userText = document.getElementById("user-text").value;
  const encryptionType = document.querySelector("input[name=cipher-keys]:checked").value;

  if (encryptionType === "sexy-morse") {
    textToMorseCode(userText, morseMap, morseCodeWordDelimiter);
  } else if (encryptionType === "normal-morse") {
    textToMorseCode(userText, normalMorseMap, normalMorseCodeWordDelimiter);
  } else if (encryptionType === "singlecaeser") {
    const multiCipherKey = document.getElementById("single-key-text").value;
    multiAlphabetCeaserCipher(true, userText, BASE_ALPHABET[multiCipherKey]);
  } else if (encryptionType === "multicaeser") {
    const multiCipherKey = document.getElementById("multi-key-text").value;
    multiAlphabetCeaserCipher(true, userText, multiCipherKey);
  }
}
function decryptClick() {
  const userText = document.getElementById("user-text").value;
  const encryptionType = document.querySelector("input[name=cipher-keys]:checked").value;
  if (encryptionType === "sexy-morse") {
    morseCodeToText(userText, morseMap, morseCodeWordDelimiter);
  } else if (encryptionType === "normal-morse") {
    morseCodeToText(userText, normalMorseMap, normalMorseCodeWordDelimiter);
  } else if (encryptionType === "singlecaeser") {
    const multiCipherKey = document.getElementById("single-key-text").value;
    multiAlphabetCeaserCipher(false, userText, BASE_ALPHABET[multiCipherKey]);
  } else if (encryptionType === "multicaeser") {
    const multiCipherKey = document.getElementById("multi-key-text").value;
    multiAlphabetCeaserCipher(false, userText, multiCipherKey);
  }
}

function checkValues(actualResult, expectedResult, origin) {
  if (actualResult === expectedResult) {
    console.log(`Test: Encryption Succeeded on ${origin} --> ${actualResult}`);
  } else {
    console.log(`Test: Encryption Failed on ${origin} --> ${actualResult} \n Expected: ${expectedResult}`);
  }
}

function myTests() {
  let originalMessage = "SOS";
  let modifiedMessage = textToMorseCode(originalMessage, normalMorseMap, normalMorseCodeWordDelimiter);
  checkValues(modifiedMessage, "... --- ...", originalMessage);

  originalMessage = "SOS";
  modifiedMessage = textToMorseCode(originalMessage, morseMap, morseCodeWordDelimiter);
  checkValues(modifiedMessage, "\u00B0\u00B0\u00B0 \u00AC\u00AC\u00AC \u00B0\u00B0\u00B0", originalMessage);

  originalMessage = "this is a test for my tool";
  modifiedMessage = textToMorseCode(originalMessage, normalMorseMap, normalMorseCodeWordDelimiter);
  checkValues(modifiedMessage, "- .... .. ... / .. ... / .- / - . ... - / ..-. --- .-. / -- -.-- / - --- --- .-..", originalMessage);

  originalMessage = "- .... .. ... / .. ... / .- / - . ... - / ..-. --- .-. / -- -.-- / - --- --- .-..";
  modifiedMessage = morseCodeToText(originalMessage, normalMorseMap, normalMorseCodeWordDelimiter);
  checkValues(modifiedMessage, "this is a test for my tool".toUpperCase(), originalMessage);

  originalMessage = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  modifiedMessage = multiAlphabetCeaserCipher(true, originalMessage, "b");
  checkValues(modifiedMessage, "BCDEFGHIJKLMNOPQRSTUVWXYZA", originalMessage);

  originalMessage = "THIS MESSAGE SHOULD BE SHIFTED BY 3";
  modifiedMessage = multiAlphabetCeaserCipher(true, originalMessage, "d");
  checkValues(modifiedMessage, "WKLV PHVVDJH VKRXOG EH VKLIWHG EB 3", originalMessage);
  originalMessage = "WKLV PHVVDJH VKRXOG EH VKLIWHG EB 3";
  modifiedMessage = multiAlphabetCeaserCipher(false, modifiedMessage, "d");
  checkValues(modifiedMessage, "THIS MESSAGE SHOULD BE SHIFTED BY 3", originalMessage);

  originalMessage = "ZOHYHPQ SLLV AKL HE...IVXY PLQ, AKYHL ZVPLQ; HZHUL...WOHF PHUJK AZV EF WDR. AKLB DLSO ZRVQ RQVZ DKF...WOULH NULDA ELDZWZ IVOSRD WOHPU ZLE...VPA MDSO, URUH DLSO SLCH.";
  modifiedMessage = multiAlphabetCeaserCipher(false, originalMessage, "dh");
  checkValues(
    modifiedMessage,
    "Wherein lies the ex...Four men, three women; aware...They march two by two. They will soon know why...Three great beasts follow their six...six fall, none will live.".toUpperCase(),
    originalMessage
  );

  originalMessage = "Wherein lies the ex...Four men, three women; aware...They march two by two. They will soon know why...Three great beasts follow their six...six fall, none will live.";
  modifiedMessage = multiAlphabetCeaserCipher(true, originalMessage, "dh");
  checkValues(modifiedMessage, "ZOHYHPQ SLLV AKL HE...IVXY PLQ, AKYHL ZVPLQ; HZHUL...WOHF PHUJK AZV EF WDR. AKLB DLSO ZRVQ RQVZ DKF...WOULH NULDA ELDZWZ IVOSRD WOHPU ZLE...VPA MDSO, URUH DLSO SLCH.", originalMessage);

  originalMessage = "zvze cf wkgkuht d sicfc xhe qzbbru";
  modifiedMessage = multiAlphabetCeaserCipher(false, originalMessage, "gormund");
  checkValues(modifiedMessage, "this is testing a multi key cipher".toUpperCase(), originalMessage);

  originalMessage = "this is testing a multi key cipher";
  modifiedMessage = multiAlphabetCeaserCipher(true, originalMessage, "gormund");
  checkValues(modifiedMessage, "zvze cf wkgkuht d sicfc xhe qzbbru".toUpperCase(), originalMessage);
}

myTests();
