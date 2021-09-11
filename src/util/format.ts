export const formatTimeLine = (time: number, showHour: boolean = false) => {
    if (time < 0 || !time) time = 0
    let hour: string | number = Math.floor(time / 60 / 60)
    let minute: string | number = Math.floor(time / 60 % 60)
    let second: string | number = Math.floor(time % 60 % 60)

    hour = hour < 10 ? `0${hour}` : hour
    minute = minute < 10 ? `0${minute}` : minute
    second = second < 10 ? `0${second}` : second

    if (showHour) {
        return `${hour}:${minute}:${second}`
    }

    return `${minute}:${second}`
}