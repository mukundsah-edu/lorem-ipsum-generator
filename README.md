# Lorem Ipsum Shortcut Generator

A lightweight Chrome extension for quickly adding lorem ipsum placeholder text while writing in the browser. Type a shortcut like `~lo9` in a text field and it expands into 9 lorem ipsum words.

It is useful for designers, developers, writers, and testers who need quick dummy text in forms, CMS editors, prototypes, admin panels, or web apps.

## Examples

- `~lo9` becomes `lorem ipsum dolor sit amet consectetur adipiscing elit sed`
- `~lo25` becomes 25 lorem ipsum words

## Features

- Generate lorem ipsum words directly inside browser text fields.
- Use simple shortcuts such as `~lo9`, `~lo25`, or `~lo100`.
- Works in regular inputs, textareas, and most rich text editors that use `contenteditable`.
- Ignores password fields.
- Only checks a field after `~` is typed, so it stays quiet during normal typing.
- Caps output at 1000 words to prevent accidental huge inserts.

## Load in Chrome

1. Open `chrome://extensions`.
2. Turn on **Developer mode**.
3. Click **Load unpacked**.
4. Select this project folder.

## How It Works

The extension listens for the `~lo<number>` pattern in supported editable fields. When the pattern is found at the cursor, it replaces the shortcut with the requested number of lorem ipsum words.

The shortcut accepts 1 to 4 digits.
