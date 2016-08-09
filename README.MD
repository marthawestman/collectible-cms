# Collectible CMS

A Content Management System for stamps, coins, comic books, and other collectibles.

## Requirements

* Install MondoDB from https://docs.mongodb.com/manual/administration/install-community/
* A bash shell. Using windows? Try Cygwin.

## Installation

* `git clone https://github.com/delphian/collectible-cms.git`
* `cd collectible-cms`
* `npm install`
* `cp samples/config.js.sample ./config.js`
* `cp samples/apidoc.json.sample ./apidoc.json`

Edit config.js and apidoc.js, replacing the default values with more appropriate domain specific ones. _tokenSignature in config.js must be replaced or the site will NOT be secure_.

### Create and view the documentation

* `npm install apidoc -g`
* `apidoc -i server/ -o apidoc/`

Visit http://localhost:8080/apidoc
