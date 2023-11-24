const minimist = require('minimist')
const http = require('http')
const fs = require('fs')

const args = minimist(process.argv.slice(2),
  {
    alias: {
      port: 'p'
    },
    default: {
      port: 3000
    }
  }
)
let homeContent = ''
let projectContent = ''
let registrationContent = ''

fs.readFile('home.html', (err, home) => {
  if (err) {
    console.error(err)
  } else {
    homeContent = home
  }
})

fs.readFile('project.html', (err, project) => {
  if (err) {
    console.error(err)
  } else {
    projectContent = project
  }
})

fs.readFile('registration.html', (err, registration) => {
  if (err) {
    console.error(err)
  } else {
    registrationContent = registration
    // console.log(registrationContent.toString())
  }
})

http
  .createServer((req, res) => {
    const url = req.url
    res.writeHead(200, { 'Content-Type': 'text/html' })
    switch (url) {
      case '/project':
        res.write(projectContent)
        res.end()
        break
      case '/registration':
        res.write(registrationContent)
        res.end()
        break
      default:
        res.write(homeContent)
        res.end()
        break
    }
    res.end()
  })
  .listen(args.port)
