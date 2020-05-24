export function formatDate(date, rule = 1) {
        date = parseInt(date)
        if(rule === 1) {
                let d = new Date(date)
                return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " +
                    d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds()
        } else if(rule === 2) {
                let d = new Date(date)
                return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate()
        } else if(rule === 3) {
                let diff = date;
                // let day = diff / (24 * 60 *60 *1000)
                let hour = diff / (60 * 60 * 1000)
                let min = diff  / (60 *1000)
                return `${hour}h${min}min`
        }
}
