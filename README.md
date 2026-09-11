# Hugo Baseplate

Build your own Hugo theme without starting from scratch.
Baseplate loads your styles and scripts,
adds page metadata for search and social sharing, and sets up your favicons.
Bring your own layouts and design; Baseplate handles the boilerplate.

## Installation

Initialize the site's module, if needed:

```sh
hugo mod init example.com/my-site
```

Import Baseplate in `hugo.yaml`:

```yaml
module:
  imports:
    - path: github.com/razor-x/hugo-baseplate
```

After selecting a published version with `hugo mod get`,
vendor it to keep the site self-contained:

```sh
hugo mod vendor
```

## Create your first page

Set your site's name, language, and published URL in `hugo.yaml`:

```yaml
title: My Site
locale: en-US
baseURL: https://example.com/
```

Create `content/_index.md` with a title and description for your homepage.
Baseplate uses these in page metadata and social sharing previews:

```markdown
---
title: Home
description: Welcome to my site.
---
```

Create `layouts/_default/home.html` in your site:

```html
{{ define "main" }}
  <h1>{{ site.Title }}</h1>
  <p>Welcome to my site.</p>
{{ end }}
```

Run `hugo server` and open the preview URL to see your homepage.
Replace the heading and paragraph with your own design.
Keep them inside the `main` block;
Baseplate supplies the surrounding page and loads your styles and scripts.

To add navigation above your content, create `layouts/partials/header.html`:

```html
<header>
  <nav><a href="/">Home</a></nav>
</header>
```

To add a shared footer below your content, create `layouts/partials/footer.html`:

```html
<footer>
  <p>Made with Hugo Baseplate.</p>
</footer>
```

To add your own content to the page's `<head>`,
create `layouts/partials/head-extra.html`.
For example:

```html
<meta name="author" content="Your Name">
```
Baseplate includes these files on every page that uses its layout.

## Customize your pages

For a right-to-left site, set `params.languageDir` to `rtl`.
To suggest a color for the browser's interface, set `params.theme.color`:

```yaml
params:
  theme:
    color: "#123456"
```

Add these settings to your existing `params` block rather than creating a second one.

## Adding styles and scripts

Put your CSS and JavaScript files under `assets/`,
then list them in `hugo.yaml` in the order you want them loaded.
Organize files however you prefer.
Add as many files as you need; paths are relative to `assets/`:

```yaml
params:
  css:
    - css/main.css
    - nav/menu.css
  js:
    - js/main.js
    - nav/toggle.js
```

To style the main content area, add a class in `hugo.yaml` and target it in your CSS:

```yaml
params:
  mainClass: container
```

To style an individual page differently,
add body classes to that page's front matter:

```yaml
---
title: About me
classes:
  - about
---
```

Want to use a library alongside your own styles or scripts?
Add its URL to `params.remoteCss` or `params.remoteJs`.
Hugo downloads it during the build and publishes it with your site,
so visitors fetch it from your site rather than a third-party CDN.
Remote styles load before your own styles,
letting you customize a library's appearance.
The [example](example) uses Pico CSS and jQuery this way.

Production builds fingerprint assets with content hashes for cache busting,
so you can use long-lived cache headers while ensuring changed assets get new URLs.
During local preview with `hugo server`,
Baseplate keeps filenames simple and requests readable versions of remote libraries to make debugging easier.

You can also use Hugo template expressions in your local CSS and JavaScript, for example,
to share a configured color between your site and its stylesheet.
Local JavaScript runs as a browser module;
use `remoteJs` for libraries that provide browser globals,
as jQuery does in the example.
Baseplate does not currently minify local CSS or JavaScript or generate source maps.
If you need these, use an asset build tool to write its output into `assets/`,
then list the generated CSS and JavaScript files in `hugo.yaml`.

For files you simply want to publish unchanged, put them under `static/`.

## Adding a favicon

Place your icon at `assets/img/favicon.svg`, `assets/img/favicon.png`, or both.
Baseplate adds the browser icon links to every page automatically.

## Example

The [`example`](example) directory is a minimal site using Baseplate as a local Hugo module.
With Hugo and Go installed, build it with:

```sh
cd example
hugo
```

## Development and Testing

### Quickstart

```sh
git clone https://github.com/razor-x/hugo-baseplate.git
cd hugo-baseplate/example
hugo --panicOnWarning
```

The example uses the module from your local checkout.
Build it after changing the templates to check that they still render successfully.
Run `hugo server` from `example/` to preview your changes in the browser.

### Source code

The [source code] is hosted on GitHub.
Clone the project with

```sh
git clone https://github.com/razor-x/hugo-baseplate.git
```

[source code]: https://github.com/razor-x/hugo-baseplate

### Requirements

[Hugo] and [Go].

[Hugo]: https://gohugo.io
[Go]: https://go.dev

## Contributing

Please submit and comment on bug reports and feature requests.

To submit a patch:

1. Fork it (https://github.com/razor-x/hugo-baseplate/fork).
2. Create your feature branch (`git checkout -b my-new-feature`).
3. Make changes.
4. Commit your changes (`git commit -am 'Add some feature'`).
5. Push to the branch (`git push origin my-new-feature`).
6. Create a new Pull Request.

## License

This Hugo module plugin is licensed under the MIT license.

## Warranty

This software is provided by the copyright holders and contributors "as is" and
any express or implied warranties, including, but not limited to, the implied
warranties of merchantability and fitness for a particular purpose are
disclaimed. In no event shall the copyright holder or contributors be liable for
any direct, indirect, incidental, special, exemplary, or consequential damages
(including, but not limited to, procurement of substitute goods or services;
loss of use, data, or profits; or business interruption) however caused and on
any theory of liability, whether in contract, strict liability, or tort
(including negligence or otherwise) arising in any way out of the use of this
software, even if advised of the possibility of such damage.
