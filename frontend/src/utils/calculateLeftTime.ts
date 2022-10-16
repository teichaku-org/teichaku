export const calculateLeftTime = (endTime: Date) => {
    const now = Math.floor(Date.now() / 1000);
    const end = Math.floor(endTime.getTime() / 1000);
    const left = end - now;
    const days = Math.floor(left / (24 * 60 * 60));
    const hours = Math.floor((left % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((left % (60 * 60)) / 60);
    const seconds = Math.floor(left % 60);
    return {
        days,
        hours,
        minutes,
        seconds,
    };
}

// set intervalで1秒ごとに更新する
export const getLeftTime = (endTime: Date) => {
    const { days, hours, minutes, seconds } = calculateLeftTime(endTime);
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}