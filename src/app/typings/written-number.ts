declare module 'written-number' {
  interface Options {
    lang?: string;
    noAnd?: boolean;      // omit “and” (in English) if you want e.g. “one hundred one” instead of “one hundred and one”
    // ...there are other options, but these two cover most common use-cases
  }
  function writtenNumber(
    n: number | string,
    opts?: Options
  ): string;
  export = writtenNumber;
}
