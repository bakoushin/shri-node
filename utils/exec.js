const execChildProcess = require('child_process').exec;
const spawnChildProcess = require('child_process').spawn;
const {createWriteStream} = require('fs');
const {repositoryPath} = require('../config');

function exec(command) {
  return new Promise((resolve, reject) => {
    execChildProcess(command, {cwd: repositoryPath}, (err, stdout, stderr) => {
      if (err) {
        console.error(err);
        reject(err);
        return;
      }
      resolve(stdout);
    });
  });
}

function spawn(command, args) {
  return new Promise((resolve, reject) => {
    const ps = spawnChildProcess(command, args, {cwd: repositoryPath});

    let stdout = '';
    let stderr = '';

    ps.stdout.on('data', data => {
      stdout += data.toString();
    });

    ps.stderr.on('data', data => {
      stderr += data.toString();
    });

    ps.on('close', code => {
      if (code !== 0) {
        console.error(stderr);
        reject(stderr);
        return;
      }
      resolve(stdout);
    });
  });
}

function pipe(command1, args1, command2, args2) {
  return new Promise((resolve, reject) => {
    const ps1 = spawnChildProcess(command1, args1, {cwd: repositoryPath});
    const ps2 = spawnChildProcess(command2, args2, {cwd: repositoryPath});

    let stdout = '';
    let stderr = '';

    // Process #1

    ps1.stdout.pipe(ps2.stdin);

    ps1.stderr.on('data', data => {
      stderr += data.toString();
    });

    ps1.on('close', code => {
      ps2.stdin.end();
      if (code !== 0) {
        console.error(stderr);
        reject(stderr);
        return;
      }
    });

    // Process #2

    ps2.stdout.on('data', data => {
      console.log(data.toString())
      stdout += data.toString();
    });

    ps2.stderr.on('data', data => {
      stderr += data.toString();
    });

    ps2.on('close', code => {
      if (code !== 0) {
        console.error(stderr);
        reject(stderr);
        return;
      }
      resolve(stdout);
    });
    
  });
}

function file(command, args, filePath) {
  return new Promise((resolve, reject) => {
    const outputStream = createWriteStream(filePath, {flags: 'a'})
    const ps = spawnChildProcess(command, args, {cwd: repositoryPath});

    let stdout = '';
    let stderr = '';

    ps.stdout.pipe(outputStream);

    ps.stderr.on('data', data => {
      stderr += data.toString();
    });

    ps.on('close', code => {
      if (code !== 0) {
        console.error(stderr);
        reject(stderr);
        return;
      }
      resolve(filePath);
    });
  });
}

module.exports = {exec, spawn, pipe, file};