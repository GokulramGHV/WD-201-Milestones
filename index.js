const http = require('http');
const fs = require('fs');

let homeContent = '';
let projectContent = '';
let formContent = '';

fs.readFile('pages/home.html', function (err, home) {
  if (err) {
    throw err;
  }
  homeContent = home;
});

fs.readFile('pages/projects.html', function (err, project) {
  if (err) {
    throw err;
  }
  projectContent = project;
});

fs.readFile('pages/registration.html', function (err, registration) {
  if (err) {
    throw err;
  }
  formContent = registration;
});

http
  .createServer(function (request, response) {
    let url = request.url;
    response.writeHeader(200, { 'Content-Type': 'text/html' });
    switch (url) {
      case '/project':
        response.write(projectContent);
        response.end();
        break;
      case '/registration':
        response.write(formContent);
        response.end();
        break;
      default:
        response.write(homeContent);
        response.end();
        break;
    }
  })
  .listen(3000);
