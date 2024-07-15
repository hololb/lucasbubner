export default function* entryIncrement(increment: number, startAtZero?: boolean) {
    let time = 0;
    if (startAtZero) yield 0;
    while (true) {
        yield (time += increment);
    }
}
