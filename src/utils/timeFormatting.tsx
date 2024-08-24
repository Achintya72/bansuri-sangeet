const hoursToString = (hours: number) => {
    let minutes = hours * 60;
    return `${Math.floor(hours)}h  ${Math.round(minutes % 60)}m`;
}


export {
    hoursToString
};