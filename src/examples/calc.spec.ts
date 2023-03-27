export function calcNumbers(x: number, y: number) {
    return x + y
}

describe('Examples Tests', () => {
    test('calcNumbers', () => {
        expect(calcNumbers(1, 2)).toEqual(3)
    })
})
