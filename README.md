# personal-website

My personal website - [manojpreveen.com](https://manojpreveen.com)

A polished, static multi-page portfolio (plain HTML/CSS/JS, no build step),
hosted on **GitHub Pages**.

## Pages

- `index.html` - home: hero, what I'm building at Purands, stats, focus areas
- `about.html` - bio, principles, skills, education, languages
- `work.html` - Purands deep-dive + experience timeline
- `contact.html` - contact and social links

## Shared files

- `styles.css` - full design system + components (light/dark theme)
- `script.js` - theme toggle, sticky header, mobile menu, scroll-reveal, counters
- `CNAME` - custom domain config for GitHub Pages

The header and footer are repeated in each HTML file (no build step); when you
edit one, mirror the change across the pages. The active nav link is marked with
`class="... is-active"` per page.

## Editing content

Open the relevant `.html` file and edit the text directly. Commit and push to
`master`, and the live site updates automatically within a minute or two.

## Local preview

Just open `index.html` in a browser, or run a simple server:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Hosting (GitHub Pages)

1. Push to the `master` branch.
2. In the repo: **Settings → Pages → Build and deployment**.
3. Source: **Deploy from a branch**, Branch: **master**, Folder: **/ (root)**.
4. Under **Custom domain**, `manojpreveen.com` is set via the `CNAME` file.
5. Enable **Enforce HTTPS** once the certificate is issued.

## DNS (GoDaddy)

Point the domain at GitHub Pages with these records:

| Type  | Name | Value                  |
|-------|------|------------------------|
| A     | @    | 185.199.108.153        |
| A     | @    | 185.199.109.153        |
| A     | @    | 185.199.110.153        |
| A     | @    | 185.199.111.153        |
| CNAME | www  | manojpreveen.github.io |
