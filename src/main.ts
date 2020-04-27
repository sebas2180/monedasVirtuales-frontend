import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

//   const path = require('path');
// const express = require('express');
// const app = express();

// // Serve static files
// app.use(express.static(__dirname + '/dist/cryptoInfo'));

// // Send all requests to index.html
// app.get('/*', function(req, res) {
//   res.sendFile(path.join(__dirname + '/dist/cryptoInfo/index.html'));
// });

// // default Heroku port
// app.listen(process.env.PORT || 5000);
