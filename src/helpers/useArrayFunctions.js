export default function useArrayFunctions() {
    const arrayLimit = (array, limit) => {
        if (array) {
            return array.filter((value, index) => {
                if (index < limit) {
                    return value;
                }
            });
        }
    };

    return {
        arrayLimit,
    };
}
