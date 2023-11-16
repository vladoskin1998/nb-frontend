export const steperBoleanNormalize = (inputArray: boolean[]) => {
    const trueValues = inputArray.filter((value) => value === true);
    const falseValues = inputArray.filter((value) => value === false);

    return trueValues.concat(falseValues);
}