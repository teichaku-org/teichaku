export function calculateTheTimeToVote(endDate: Date) {
    //1日前
    const oneDayBefore = new Date(endDate.getTime() - 24 * 60 * 60 * 1000);
    return oneDayBefore;
}