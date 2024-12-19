export function formData<T=any> (form: HTMLFormElement) {
    const inputs = form.getElementsByTagName('input');
    const output = {};
    Array(inputs.length).fill(0).map((element, index) => output[inputs[index].name] = inputs[index].value);

    return output as T
}

export const getSubmitButton = (form: HTMLFormElement) => {
    const inputs = form.getElementsByTagName('button');
    return Array(inputs.length).fill(0)
        .map((element, index) => inputs[index])
        .filter((button) => button.type==="submit")[0]

}