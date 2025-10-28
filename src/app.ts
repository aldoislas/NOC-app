import { ServerApp } from './presentation/server.js';
import { envs } from './config/plugins/envs.plugin.js';

(async () => {
  main();
})();

function main() {
  // ServerApp.start();
  console.log('App is running');
  console.log('env', envs);
  console.log('PORT', envs.PORT);
  
}
