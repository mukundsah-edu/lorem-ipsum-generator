(function () {
  "use strict";

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

  const TRIGGER_PATTERN = /~lo(\d{1,4})$/;
  const PARTIAL_TRIGGER_PATTERN = /~(?:l(?:o\d{0,4})?)?$/;
  const MAX_WORDS = 1000;
  const SUPPORTED_INPUT_TYPES = new Set([
    "email",
    "search",
    "tel",
    "text",
    "url"
  ]);
  const activeTargets = new WeakSet();

  function makeLorem(wordCount) {
    const count = Math.max(1, Math.min(Number(wordCount), MAX_WORDS));
    const words = [];

    for (let index = 0; index < count; index += 1) {
      words.push(LOREM_WORDS[index % LOREM_WORDS.length]);
    }

    return words.join(" ");
  }

  function replaceInInput(element) {
    const cursor = element.selectionStart;

    if (typeof cursor !== "number" || element.selectionStart !== element.selectionEnd) {
      return "inactive";
    }

    const beforeCursor = element.value.slice(0, cursor);
    const match = beforeCursor.match(TRIGGER_PATTERN);

    if (!match) {
      return PARTIAL_TRIGGER_PATTERN.test(beforeCursor) ? "pending" : "inactive";
    }

    const replacement = makeLorem(match[1]);
    const start = cursor - match[0].length;

    element.setRangeText(replacement, start, cursor, "end");
    element.dispatchEvent(new Event("input", { bubbles: true }));

    return "replaced";
  }

  function isSupportedInput(element) {
    if (element instanceof HTMLTextAreaElement) {
      return true;
    }

    return element instanceof HTMLInputElement && SUPPORTED_INPUT_TYPES.has(element.type);
  }

  function inputContainsTriggerStart(event) {
    return typeof event.data === "string" && event.data.includes("~");
  }

  function getEditableRoot(node) {
    if (!node || node.nodeType !== Node.ELEMENT_NODE) {
      return null;
    }

    return node.closest("[contenteditable=''], [contenteditable='true'], [contenteditable='plaintext-only']");
  }

  function getTextBeforeRange(range, root) {
    const beforeRange = range.cloneRange();
    beforeRange.selectNodeContents(root);
    beforeRange.setEnd(range.endContainer, range.endOffset);

    return beforeRange.toString();
  }

  function replaceInContentEditable(root) {
    const selection = window.getSelection();

    if (!selection || selection.rangeCount === 0 || !selection.isCollapsed) {
      return "inactive";
    }

    const range = selection.getRangeAt(0);

    if (!root.contains(range.endContainer)) {
      return "inactive";
    }

    const beforeCursor = getTextBeforeRange(range, root);
    const match = beforeCursor.match(TRIGGER_PATTERN);

    if (!match) {
      return PARTIAL_TRIGGER_PATTERN.test(beforeCursor) ? "pending" : "inactive";
    }

    const replacement = document.createTextNode(makeLorem(match[1]));
    const triggerStart = beforeCursor.length - match[0].length;
    const replaceRange = document.createRange();
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let textOffset = 0;
    let startNode = null;
    let startOffset = 0;

    while (walker.nextNode()) {
      const node = walker.currentNode;
      const nextOffset = textOffset + node.nodeValue.length;

      if (triggerStart >= textOffset && triggerStart <= nextOffset) {
        startNode = node;
        startOffset = triggerStart - textOffset;
        break;
      }

      textOffset = nextOffset;
    }

    if (!startNode) {
      return "inactive";
    }

    replaceRange.setStart(startNode, startOffset);
    replaceRange.setEnd(range.endContainer, range.endOffset);
    replaceRange.deleteContents();
    replaceRange.insertNode(replacement);

    range.setStartAfter(replacement);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);

    root.dispatchEvent(new InputEvent("input", { bubbles: true, inputType: "insertText", data: replacement.data }));

    return "replaced";
  }

  function handleInput(event) {
    const target = event.target;

    if (isSupportedInput(target)) {
      if (inputContainsTriggerStart(event)) {
        activeTargets.add(target);
      }

      if (!activeTargets.has(target)) {
        return;
      }

      const result = replaceInInput(target);

      if (result !== "pending") {
        activeTargets.delete(target);
      }

      return;
    }

    const editableRoot = getEditableRoot(target);

    if (editableRoot) {
      if (inputContainsTriggerStart(event)) {
        activeTargets.add(editableRoot);
      }

      if (!activeTargets.has(editableRoot)) {
        return;
      }

      const result = replaceInContentEditable(editableRoot);

      if (result !== "pending") {
        activeTargets.delete(editableRoot);
      }
    }
  }

  document.addEventListener("input", handleInput, true);
})();
