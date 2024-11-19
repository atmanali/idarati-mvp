export const regexArray = [
    /(?=.*\d)/,
    /(?=.*[a-z])/,
    /(?=.*[A-Z])/,
    /(?=.*\W)/,
    /.{12,}/,
];

export const totalRegex = RegExp(
    regexArray
      .map((regex) => regex.toString())
      .join("")
      .replaceAll("/", ""),
    );