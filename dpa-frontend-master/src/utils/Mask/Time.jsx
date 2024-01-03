export const createTime = (dateStr) => {
    if (!dateStr) {
        return '--:--';
    }
    const date = new Date(dateStr);
    const hr = date.getHours();
    const min = date.getMinutes();
    let time = '';
    if (hr < 10) {
        time = '0' + hr;
    } else {
        time = '' + hr;
    }
    if (min < 10) {
        time += ':0' + min;
    } else {
        time += ':' + min;
    }
    return time;
};