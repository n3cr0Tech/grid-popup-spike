export function FormateDateObjToJustDate(date: Date): string{
    let safeGuardDate = new Date(date); //ensure that the incoming param is a Date object
    let formattedDateStr = safeGuardDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });
    return formattedDateStr;
}