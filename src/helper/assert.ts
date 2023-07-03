export function assertNotNull<T>(value: T): asserts value is (T extends null ? never : T) {
    if (value === null) {
        throw new TypeError('Value should be not null');
    }
}
