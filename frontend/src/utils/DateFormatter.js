import moment from "moment";

export const DateFormatter = (commitTimestamp) => {
    const getDate = moment(commitTimestamp).format("MMM Do YYYY, h:mm:ss A");
    return getDate
}

