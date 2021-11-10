import {
    argv,
    platform,
    version,
    execPath,
    memoryUsage,
    cwd,
    pid
} from 'process';

const memoriaUtilizada = JSON.stringify(memoryUsage().rss)

export const processData = {
    commandLineArgs: argv.slice(2), // Saltearse los primeros 2 args de argv
    sistemaOperativo: platform,
    nodeVersion: version,
    memoriaRSS: memoriaUtilizada,
    nodePath: execPath,
    projectPath: cwd(),
    processId: pid
}