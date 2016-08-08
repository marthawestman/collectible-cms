## Requirements

### Install MongoDB

https://docs.mongodb.com/manual/administration/install-community/

## Installation

`git clone https://github.com/delphian/collectible-cms.git`
`cd collectible-cms`
`npm install`
`cp configSample.js config.js`

Edit config.js and replace the tokenSignature value with a custom password.

### Create and view the documentation

`npm apidoc install -g`
`apidoc -i server/ -o apidoc/`

Visit http://localhost:8080/apidoc
