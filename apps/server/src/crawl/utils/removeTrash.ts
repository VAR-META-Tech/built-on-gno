export function removeTrash(fileChanges: Array<string>) {
  if (fileChanges.includes('projects/projects.json')) {
    const files = fileChanges.filter(
      (value) => value !== 'projects/projects.json',
    )

    return files
  }

  return fileChanges
}
