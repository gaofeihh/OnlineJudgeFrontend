import {pad} from "./stringFormat";

export function formatDate(date, rule = 1) {
        if(rule === 1) {
                let d = new Date(date)
                return pad(d.getFullYear(), 4) + "-" + pad((d.getMonth() + 1), 2) + "-" + pad(d.getDate(), 2) + " " +
                    pad(d.getHours(), 2) + ":" + pad(d.getMinutes(), 2) + ":" + pad(d.getSeconds(), 2)
        } else if(rule === 2) {
                let d = new Date(date)
                return pad(d.getFullYear(), 2) + "-" + pad((d.getMonth() + 1), 2) + "-" + pad(d.getDate(), 2)
        }
}
export function MilltoHMS(mss) {
        var hours = parseInt(mss / (1000 * 60 * 60));
        var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = (mss % (1000 * 60)) / 1000;
        return pad(hours, 2) + "时 " + pad(minutes, 2) + "分 " + pad(seconds, 2) + "秒";
}
