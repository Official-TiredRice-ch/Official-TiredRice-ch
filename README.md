# Hi — I'm Official-TiredRice-ch 👋

Welcome — this is my profile README! I upgraded the design with a dark theme, prominent stats, language highlights, project callouts, and places to show real code snippets.

---

<!-- HEADER / BADGES -->
<p align="center">
  <img alt="header" src="https://capsule-render.vercel.app/api?type=waving&color=0:1f2937,100:111827&height=120&section=header&text=Official-TiredRice-ch&fontSize=40&fontColor=ffffff" />
</p>

<p align="center">
  <a href="https://github.com/Official-TiredRice-ch"><img alt="GitHub followers" src="https://img.shields.io/github/followers/Official-TiredRice-ch?style=social" /></a>
  <a href="https://www.facebook.com/tiredrice.official"><img alt="Facebook" src="https://img.shields.io/badge/Facebook-Visit-blue?logo=facebook" /></a>
  <a href="#"><img alt="Resume" src="https://img.shields.io/badge/Resume-Add_link_github-dark?style=flat&logo=file" /></a>
  <a href="mailto:replace-this-with-your-email@example.com"><img alt="Email" src="https://img.shields.io/badge/Email-replace--this--with--your--email-red?logo=gmail" /></a>
</p>

---

## About me
I build tools, small services, and automation that make development faster and less painful. I work across C#, JavaScript/TypeScript, Python, Go and more — and I'm always learning something new.

- 🔭 Currently: building automation & developer tools  
- 🌱 Learning: Rust, systems tooling  
- ✨ Favorite: solving real problems with pragmatic code

---

## Dark-theme GitHub Stats & Languages
<p align="left">
  <img src="https://github-readme-stats.vercel.app/api?username=Official-TiredRice-ch&show_icons=true&theme=dark&hide_border=true" alt="GitHub stats" />
  &nbsp;
  <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=Official-TiredRice-ch&layout=compact&theme=dark&hide_border=true" alt="Top Languages" />
</p>

Note: the "Top Languages" card above automatically shows your languages breakdown. If you'd like a single-line "Top language" highlight auto-updated, I can add a GitHub Action to compute and inject that into the README.

---

## Top language (highlight)

/**
 * Simple script to:
 *  - list repos for the owner
 *  - fetch languages for each repo
 *  - sum bytes per language and pick the top language
 *  - replace the placeholder in README.md between <!--TOP_LANGUAGE--> markers
 *
 * Requires: npm install @octokit/rest
 */

const fs = require('fs');
const path = require('path');
const { Octokit } = require('@octokit/rest');

const token = process.env.GITHUB_TOKEN;
if (!token) {
  console.error('GITHUB_TOKEN is required in environment');
  process.exit(1);
}

const owner = process.env.GITHUB_OWNER;
if (!owner) {
  console.error('GITHUB_OWNER is required in environment');
  process.exit(1);
}

const octokit = new Octokit({ auth: token });

async function main() {
  try {
    // list repos for the owner (public + private depending on token)
    const repos = [];
    for await (const response of octokit.paginate.iterator(octokit.repos.listForUser, { username: owner, per_page: 100 })) {
      repos.push(...response.data);
    }

    // If owner is org, use repos.listForOrg instead. Try user first; fallback to org.
    if (repos.length === 0) {
      for await (const resp of octokit.paginate.iterator(octokit.repos.listForOrg, { org: owner, per_page: 100 })) {
        repos.push(...resp.data);
      }
    }

    const totals = Object.create(null);

    // fetch languages for each repo
    for (const r of repos) {
      try {
        const { data: langs } = await octokit.repos.listLanguages({
          owner,
          repo: r.name,
        });
        for (const [lang, bytes] of Object.entries(langs)) {
          totals[lang] = (totals[lang] || 0) + bytes;
        }
      } catch (err) {
        console.warn(`Skipping languages for repo ${r.name}: ${err.message}`);
      }
    }

    if (Object.keys(totals).length === 0) {
      console.log('No language data found.');
      return;
    }

    // determine top language
    const topLanguage = Object.entries(totals).sort((a, b) => b[1] - a[1])[0][0];
    console.log('Top language computed:', topLanguage);

    // update README.md placeholder
    const readmePath = path.join(process.cwd(), 'README.md');
    let readme = fs.readFileSync(readmePath, 'utf8');

    const startMarker = '<!--TOP_LANGUAGE-->';
    const regex = new RegExp(`${startMarker}[\\s\\S]*?${startMarker}`, 'm');

    const replacement = `${startMarker}${topLanguage}${startMarker}`;

    if (regex.test(readme)) {
      readme = readme.replace(regex, replacement);
    } else if (readme.includes('Top language:')) {
      // fallback: replace after "Top language:" line
      readme = readme.replace(/(Top language:).*/i, `$1 ${topLanguage}`);
    } else {
      // append a small note
      readme += `\n\n## Top language (auto)\n:star2: Top language: ${topLanguage}\n`;
    }

    fs.writeFileSync(readmePath, readme, 'utf8');
    console.log('README.md updated with top language.');
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

main();

:star2: Top language: **(auto-detected — see Top Languages card above)**

If you want this to show as a single badge (e.g., "Top language: C#"), I can:
- Add a GitHub Action that computes your top language and updates this README automatically, or
- You can set it manually here.

Want me to add the automatic update Action? Reply "add action" and I'll create the workflow and commit it.

---

## Featured Projects
Below are a few highlights. Tell me which repos / files to pull real snippets from and I’ll embed trimmed code examples (default 15 lines).

- Project Alpha — short description.  
  Repo: https://github.com/Official-TiredRice-ch/project-alpha

- Project Beta — short description.  
  Repo: https://github.com/Official-TiredRice-ch/project-beta

- C# Utility — short description.  
  Repo: https://github.com/Official-TiredRice-ch/csharp-utility

- Automation Scripts — short description.  
  Repo: https://github.com/Official-TiredRice-ch/automation-scripts

---

## Code examples (quick previews)
Replace these placeholders by pasting files or giving repo/path pairs — I'll insert real snippets trimmed to 15 lines.

Example: C# (placeholder)
```cs
// repo-name/Program.cs (placeholder)
using System;

namespace ExampleApp {
    class Program {
        static void Main(string[] args) {
            Console.WriteLine("Hello from C#!");
        }
    }
}
```

Example: TypeScript (placeholder)
```ts
// repo-name/src/index.ts (placeholder)
export function greet(name: string) {
  return `Hello, ${name}!`;
}
console.log(greet("World"));
```

Example: Python (placeholder)
```py
# repo-name/scripts/util.py (placeholder)
def add(a, b):
    return a + b

print(add(2, 3))
```

How to give me real snippets:
- Paste file contents in the chat using this format:
  Project: repo-name — file: path/to/file.ext
  ```<language>
  (file contents)
  ```
- OR provide repo-name: path/to/file.ext lines (for public repos) and I’ll fetch them (if you authorize repo listing).

---

## Visual & social extras
Want these added?
- Language badges (C#, .NET, TypeScript, Python): yes / no  
- Pinned repos with short descriptions: yes / no  
- Animated contribution graph / streak widget: yes / no

Tell me which and I'll add them.

---

## Option: Auto-update README with your Top Language (GitHub Action)
I can add a workflow that:
- Runs on push/schedule
- Uses the GitHub REST API to compute language bytes per repo
- Updates the README replacing a placeholder with the computed top language

Say "add action" and I'll create and commit that workflow for you.

---

Thanks — want me to:
1) Replace the placeholder code examples with your pasted files now? (Paste them using the format I gave.)  
2) Or add the GitHub Action to auto-update the "Top language" line?  
3) Or commit this README.md as-is (I can push it to main when you confirm)?
