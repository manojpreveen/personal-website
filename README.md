# personal-website

My personal website — [manojpreveen.com](https://manojpreveen.com)

A clean, static single-page site (plain HTML/CSS/JS), hosted on **GitHub Pages**.

## Files

- `index.html` — page content and structure
- `styles.css` — styling (with light/dark theme)
- `CNAME` — custom domain config for GitHub Pages

## Editing content

Open `index.html` and edit the text directly — your name, role, the about
paragraph, and the links. Commit and push, and the live site updates
automatically within a minute or two.

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
