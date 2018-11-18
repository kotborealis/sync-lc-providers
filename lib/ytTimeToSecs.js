function ytTimeToSecs(duration) {
    const match = duration.match(/P(?<days>\d+D)?T(?<hours>\d+H)?(?<mins>\d+M)?(?<secs>\d+S)?/);

    const days = (parseInt(match.groups.days) || 0);
    const hours = (parseInt(match.groups.hours) || 0);
    const minutes = (parseInt(match.groups.mins) || 0);
    const seconds = (parseInt(match.groups.secs) || 0);

    return days * 86400 + hours * 3600 + minutes * 60 + seconds;
}

module.exports = ytTimeToSecs;