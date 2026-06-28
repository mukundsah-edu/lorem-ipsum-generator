const LOREM_WORDS = [
  "lorem",
  "ipsum",
  "dolor",
  "sit",
  "amet",
  "consectetur",
  "adipiscing",
  "elit",
  "sed",
  "do",
  "eiusmod",
  "tempor",
  "incididunt",
  "ut",
  "labore",
  "et",
  "dolore",
  "magna",
  "aliqua",
  "enim",
  "ad",
  "minim",
  "veniam",
  "quis",
  "nostrud",
  "exercitation",
  "ullamco",
  "laboris",
  "nisi",
  "aliquip",
  "ex",
  "ea",
  "commodo",
  "consequat"
];

const MAX_WORDS = 1000;
const countInput = document.getElementById("word-count");
const shortcutCount = document.getElementById("shortcut-count");
const output = document.getElementById("output");
const status = document.getElementById("status");
const generateButton = document.getElementById("generate");
const copyButton = document.getElementById("copy");

function getCount() {
  const value = Number.parseInt(countInput.value, 10);

  if (Number.isNaN(value)) {
    return 1;
  }

  return Math.max(1, Math.min(value, MAX_WORDS));
}

function makeLorem(wordCount) {
  const words = [];

  for (let index = 0; index < wordCount; index += 1) {
    words.push(LOREM_WORDS[index % LOREM_WORDS.length]);
  }

  return words.join(" ");
}

function render() {
  const count = getCount();

  countInput.value = String(count);
  shortcutCount.textContent = String(count);
  output.value = makeLorem(count);
  status.textContent = "";
}

async function copyOutput() {
  output.select();
  output.setSelectionRange(0, output.value.length);

  try {
    await navigator.clipboard.writeText(output.value);
  } catch (_error) {
    document.execCommand("copy");
  }

  status.textContent = "Copied to clipboard.";
}

countInput.addEventListener("input", render);
generateButton.addEventListener("click", render);
copyButton.addEventListener("click", copyOutput);

render();
