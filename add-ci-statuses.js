var Octo = require('octokat');
var octo = new Octo({token: });
var repo = octo.repos('philschatz/gh-demo-books');


repo.commits.fetch({sha:'add-words'}).then(function(commits) {
  // add a status message to all (TODO: don't add if it already has one)
  console.log('creating statuses for commit_count=', commits.length);
  return Promise.all(commits.map(function(commit) {
    // create the status
    console.log('creating status for', commit.sha);
    return repo.statuses(commit.sha).create({state:'success', target_url:'http://philschatz.com/gh-demo-books/build1/', description: 'PDF generated', context: 'continuous-integration/pdfgen'}).then(function() {
      console.log('created status for', commit.sha);
    });
  }));
});
