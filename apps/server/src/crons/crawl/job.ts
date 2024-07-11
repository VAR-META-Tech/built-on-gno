import {exec} from "child_process"

export function crawlJob(){
    const path = `${__dirname}/shell.sh`;
    exec(`bash ${path}`, (error, stdout, stderr) => {
        console.log(stdout)
    })
}