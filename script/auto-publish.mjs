import git from 'git-rev-sync'
import { exec } from 'child_process'

const git_tag = git.tag()
exec(`npm --no-git-tag-version version ${git_tag}`, (err, stdout, stderr) => {
    if (err) {
        console.error(err)
        return
    }
    exec(`npm publish`)
})