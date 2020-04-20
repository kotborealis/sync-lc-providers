const exec_ = require('child_process').exec;
const exec = cmd => new Promise((resolve) => exec_(cmd, (error, stdout, stderr) => resolve({stdout, stderr})));

module.exports = async (args, ffprobe_path = `ffprobe`) => {
    const _ = args._ ? (Array.isArray(args._) ? args._ : [args._]) : [];
    let cli_args = '';

    Object.keys(args).filter(i => i !== '_').forEach(flag => {
        const value = args[flag];
        cli_args += ` -${flag}` + (value === true ? '' : ' ' + value.toString());
    });

    cli_args += ' ' + _.join(' ');

    const {stdout, stderr} = await exec(ffprobe_path + ' ' + cli_args);
    if(stderr.length) throw new Error(stderr);
    return stdout;
};