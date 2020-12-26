[![Build Status](https://travis-ci.org/foxworth42/casparcg-html-templates.svg?branch=master)](https://travis-ci.org/github/foxworth42/casparcg-html-templates)

# CasparCG HTML Templates

This repo is a collection of HTML based templates for use in the [CasparCG media playout system](https://www.casparcg.com/).

Templates here have been tested under [CasparCG 2.2.0](https://github.com/CasparCG/server/releases/tag/v2.2.0-stable).

Most templates support at least some amount of customization by specifying template data inside the CasparCG client, but to work properly template data **must be sent as JSON** for the template to read the data correctly.

----
### Compiling Templates

Requirements:
- NodeJS

To simplify doing style development locally the command `npm run dev-css` will monitor all SCSS files for changes and recompile styles. 

Build styles: `npm run build`

Lint JS files: `npm run lint`

Test JS files: `npm run test`

Precommit hooks are in place to enforce code linting and test running prior to commit.

