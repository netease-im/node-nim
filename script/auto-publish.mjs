import git_describe from 'git-describe'
import { exec } from 'child_process'

const git_info = git_describe.gitDescribeSync({ match: "*", customArguments: ["--exact-match"] })
if (!git_info.tag) {
    console.log("No tag found, skipping auto-publish")
    process.exit(0)
}
exec(`npm --no-git-tag-version version ${git_info.tag}`, (err, stdout, stderr) => {
    if (err) {
        console.error(err)
        return
    }
    exec(`npm publish --dry-run`)
})