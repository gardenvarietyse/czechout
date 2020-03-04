const inquirer = require('inquirer');
const inquirerAutocomplete = require('inquirer-autocomplete-prompt');
const { getBranches } = require('./src/getBranches');
const { exec } = require('./util/exec');

const AUTOCOMPLETE_TYPE = 'autocomplete';
const GIT_CHECKOUT_BRANCH = 'git checkout';

inquirer.registerPrompt(AUTOCOMPLETE_TYPE, inquirerAutocomplete);

const czechout = () => {
  inquirer.prompt([{
    type: AUTOCOMPLETE_TYPE,
    name: 'branch',
    message: 'Check out which branch?',
    source: (answersSoFar, input) => getBranches(input),
  }]).then(({ branch }) => {
    exec(`${GIT_CHECKOUT_BRANCH} ${branch}`)
  });
};

if (!module.parent) {
  czechout();
}

module.exports = czechout;
  