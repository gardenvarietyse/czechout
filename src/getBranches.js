const { exec } = require('../util/exec');

const GIT_BRANCH_LIST = 'git branch --format "%(refname:short)"';

let branches;

const listBranches = async () => {
  if (branches) {
    return;
  }

  const { stdout, stderr } = await exec(GIT_BRANCH_LIST);
  if (stderr) {
    throw new Error(stderr);
  }

  const lines = stdout.split('\n');
  branches = lines.filter(l => l.length > 0);
};

const getBranches = async filter => {
  await listBranches();

  return filter
    ? branches.filter(item => item.indexOf(filter) > -1)
    : branches;
};

module.exports = {
  getBranches,
};
