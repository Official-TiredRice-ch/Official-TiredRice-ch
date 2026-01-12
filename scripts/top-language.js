const fs = require("fs");
const path = require("path");
const { Octokit } = require("@octokit/rest");

const token = process.env.GITHUB_TOKEN;
const owner = process.env.GITHUB_OWNER;

const octokit = new Octokit({ auth: token });

async function run() {
  const repos = [];

  for await (const res of octokit.paginate.iterator(
    octokit.repos.listForUser,
    { username: owner, per_page: 100 }
  )) {
    repos.push(...res.data);
  }

  const totals = {};

  for (const repo of repos) {
    const { data } = await octokit.repos.listLanguages({
      owner,
      repo: repo.name,
    });

    for (const [lang, bytes] of Object.entries(data)) {
      totals[lang] = (totals[lang] || 0) + bytes;
    }
  }

  const topLanguage = Object.entries(totals)
    .sort((a, b) => b[1] - a[1])[0][0];

  const readmePath = path.join(process.cwd(), "README.md");
  let readme = fs.readFileSync(readmePath, "utf8");

  readme = readme.replace(
    /<!--TOP_LANGUAGE-->[\s\S]*?<!--TOP_LANGUAGE-->/,
    `<!--TOP_LANGUAGE-->\n**${topLanguage}**\n<!--TOP_LANGUAGE-->`
  );

  fs.writeFileSync(readmePath, readme);
}

run();
