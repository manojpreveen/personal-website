# personal-website

My personal website - [manojpreveen.com](https://manojpreveen.com)

A polished, static multi-page portfolio (plain HTML/CSS/JS, no build step),
hosted on **GitHub Pages**.

## Structure

```
.
├── index.html            -> manojpreveen.com/        (home)
├── about/index.html      -> manojpreveen.com/about
├── work/index.html       -> manojpreveen.com/work
├── contact/index.html    -> manojpreveen.com/contact
├── assets/
│   ├── css/styles.css    full design system + components (light/dark theme)
│   └── js/script.js      theme toggle, sticky header, mobile menu,
│                         scroll-reveal, counters, GA4 event tracking
├── CNAME                 custom domain config for GitHub Pages
├── LICENSE
└── README.md
```

Each page lives in its own folder as `index.html`, which gives clean,
extensionless URLs (`/about` instead of `/about.html`). Links and asset
references are **root-relative** (`/about`, `/assets/css/styles.css`) so they
resolve correctly from any page.

The header and footer are repeated in each page (no build step); when you edit
one, mirror the change across the pages. The active nav link is marked with
`class="... is-active"` per page. Analytics is Google Analytics 4
(`G-1KL61C6P6J`); the gtag snippet is in each page's `<head>`.

## Editing content

Open the relevant page's `index.html` and edit the text directly. Commit and
push to `master`, and the live site updates automatically within a minute or
two. After editing CSS/JS, bump the `?v=N` cache-buster on its `<link>`/`<script>`
reference in every page so browsers fetch the new file.

## Local preview

Run a simple server from the project root (root-relative paths need a server,
not `file://`):

```bash
python3 -m http.server 8000
# then visit http://localhost:8000  (clean URLs like /about work too)
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
