const ghpages = require('gh-pages');
const token = process.env.GH_TOKEN;

if (!token) {
  console.error('Missing GH_TOKEN environment variable. Cannot publish gh-pages.');
  process.exit(1);
}

ghpages.publish(
  'dist/angular-ngx-treeview',
  { repo: `https://${token}@github.com/Charmedme/ngx-treeview.git` },
  function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log('published gh-pages');
    }
  }
);
