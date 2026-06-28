# Lorem Ipsum Shortcut Generator

![Lorem Ipsum Shortcut Generator logo](icons/icon-128.png)

A lightweight Chrome extension for quickly adding lorem ipsum placeholder text while writing in the browser. Type a shortcut like `~lo9` in a text field and it expands into 9 lorem ipsum words.

It is useful for designers, developers, writers, and testers who need quick dummy text in forms, CMS editors, prototypes, admin panels, or web apps.

## Examples

- `~lo9` becomes `lorem ipsum dolor sit amet consectetur adipiscing elit sed`
- `~lo25` becomes 25 lorem ipsum words

## Features

- Generate lorem ipsum words directly inside browser text fields.
- Use simple shortcuts such as `~lo9`, `~lo25`, or `~lo100`.
- Click the extension icon to open a popup generator with copy support.
- Works in regular inputs, textareas, and most rich text editors that use `contenteditable`.
- Ignores password fields.
- Only checks a field after `~` is typed, so it stays quiet during normal typing.
- Caps output at 1000 words to prevent accidental huge inserts.

## Pro Roadmap

Future Pro features may include custom shortcuts, paragraph and sentence generation, custom word lists, saved templates, a popup generator, right-click actions, and team branding snippets.

See [PRO_FEATURES.md](PRO_FEATURES.md) for the full roadmap.

## Support

Support and donation page: [donate.html](donate.html)

Update the `DONATION_URL` value in [donate.js](donate.js) with your real donation link before publishing the page.

## Load in Chrome

1. Open `chrome://extensions`.
2. Turn on **Developer mode**.
3. Click **Load unpacked**.
4. Select this project folder.
5. Pin the extension and click the toolbar icon to open the generator popup.

## How It Works

The extension listens for the `~lo<number>` pattern in supported editable fields. When the pattern is found at the cursor, it replaces the shortcut with the requested number of lorem ipsum words.

The shortcut accepts 1 to 4 digits.
