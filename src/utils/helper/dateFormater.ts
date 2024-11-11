function formatTime(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    };
    return date.toLocaleString('en-US', options).replace(',', '');
}

function getCurrentWeekday(): string {
    const currentDate = new Date();
    const options: Intl.DateTimeFormatOptions = { weekday: 'long' };
    return currentDate.toLocaleDateString('en-US', options);
}
export  {formatTime,getCurrentWeekday};