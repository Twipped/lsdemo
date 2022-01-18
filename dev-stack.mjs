/* global process */
/* eslint no-console: 0 */

import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


import { watch } from 'rollup';
import rollupConfig from './rollup.config.mjs';

import express from 'express';
import proxy from 'express-http-proxy';
const app = express();

app.use(express.static(path.resolve(__dirname, 'dist')));
app.get('/favicon.con', (req, res) => {
  res.status(200);
  res.send('');
});
app.use((req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist/index.html'), {
    lastModified: false,
    cacheControl: false,
  });
});

(async () => {

  var server = app.listen(
    process.env.PORT || 4000,
    process.env.HOST || '0.0.0.0',
    function () {
      console.log(`Server listening at http://localhost:${this.address().port} in ${app.settings.env} mode`);
    },
  );


  const watcher = await watch(rollupConfig);

  watcher.on('event', (event) => {
    if (event.result) event.result.close();

    if (event.code === 'ERROR') console.error('\n' + (event.error.formatted || event.error.message));
    if (event.code === 'BUNDLE_START') process.stdout.write('Building bundle...');
    if (event.code === 'BUNDLE_END') process.stdout.write('Finished\n');
  });

  async function shutdown () {
    watcher.close();

    var closed = new Promise((resolve) => server.on('close', resolve));
    server.close();

    await closed;

    console.log('Server halted.');

    var promises = [];
    process.emit('graceful stop', promises);

    await Promise.allSettled(promises);
    console.log('Shutdown');
    process.exit();
  }

  process.on('SIGUSR2', shutdown);
  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
  process.on('uncaughtException', (err) => {
    console.error(err, 'Encountered an unhandled exception error, restarting process');
    process.exit(-1);
  });

})().catch(console.error);
