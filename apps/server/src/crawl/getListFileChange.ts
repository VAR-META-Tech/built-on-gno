// get the ID of 2 command in git log --oneline

// run get diff, get the output

import { exec } from 'child_process'

function getIDsMergeAction(output: string) {
  const array = output.split('\n')

  const id0 = array[0].split(' ')[0]
  const id1 = array[1].split(' ')[0]
  return {
    recent: id0,
    past: id1,
  }
}

function listProjectChanges(output: string): Array<string> {
  const array = output.split('\n')
  const projectsRaw = array.filter((value) => value.includes('projects/'))
  if (projectsRaw.length == 0) return []

  const projects = projectsRaw.map((data) => {
    const arr = data.split('|')
    return arr[0].trim()
  })
  return projects
}

export function getListFileChange(): Promise<Array<string>> {
  return new Promise((res, rej) => {
    exec('git log --oneline', (error, stdout, stderr) => {
      const merge = getIDsMergeAction(stdout)

      exec(
        `git diff --name-only ${merge.past} ${merge.recent}`,
        (error, stdout, stderr) => {
          res(listProjectChanges(stdout))
        },
      )
    })
  })
}
