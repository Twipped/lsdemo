
const IGNORES = [
  'privacy',
];

export default function ({ attributes, bundle, meta, files, publicPath }) {
  const links = (files.css || [])
    .map(({ fileName }) => {
      const attrs = makeHtmlAttributes(attributes.link);
      return `<link href="/${publicPath}${fileName}" rel="stylesheet"${attrs}>`;
    });

  const scripts = [];
  for (const file of (files.js || [])) {
    const originalName = bundle[file.fileName].name;
    if (IGNORES.includes(originalName)) continue;

    const attrs = makeHtmlAttributes(attributes.script);
    if (file.isEntry) {
      scripts.push(`<script src="/${publicPath}${file.fileName}"${attrs}></script>`);
    } else {
      links.push(`<link rel="modulepreload" href="/${publicPath}${file.fileName}"${attrs}>`);
    }
  }

  const metas = meta
    .map((input) => {
      const attrs = makeHtmlAttributes(input);
      return `<meta${attrs}>`;
    });

  return `
<!DOCTYPE html>
<html${makeHtmlAttributes(attributes.html)}>
  <head>
    <meta http-equiv="content-type" content="text/html; charset=utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta charset="UTF-8">
    <meta name="author" content="Jocelyn Badgley">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    ${metas.join('\n')}
    <title>Lifespark Demo</title>
    ${links.join('\n')}
  </head>
  <body>
    ${scripts.join('\n')}
  </body>
</html>
  `;
}

function makeHtmlAttributes (attributes) {
  if (!attributes) {
    return '';
  }

  const keys = Object.keys(attributes);
  return keys.reduce((result, key) => (result += ` ${key}="${attributes[key]}"`), '');
}
