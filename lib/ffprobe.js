const util = require('util');
const exec = util.promisify(require('child_process').exec);

const ffprobe_path = require('ffmpeg-binaries').ffprobePath();

module.exports = async (args) => {
    let cli_args = '';

    Object.keys(args).filter(i => i !== '_').forEach(flag => {
        const value = args[flag];
        cli_args += `-${flag}` + (value === true ? '' : value.toString());
    });

    cli_args += ' ' + args._.join(' ');

    const {stdout, stderr} = await exec(ffprobe_path + ' ' + cli_args);

    if(stderr) throw new Error(stderr);
    return stdout;
};