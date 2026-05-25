declare module "latex.js" {
  export interface HtmlGeneratorOptions {
    hyphenate?: boolean;
    CustomMacros?: unknown;
  }

  export class HtmlGenerator {
    constructor(options?: HtmlGeneratorOptions);
    reset(): void;
  }

  export interface ParsedDocument {
    htmlDocument: Document;
    domFragment(): DocumentFragment;
    stylesAndScripts(baseURL: string): DocumentFragment;
  }

  export function parse(
    src: string,
    options: { generator: HtmlGenerator }
  ): ParsedDocument;

  const latexjs: { parse: typeof parse };
  export default latexjs;
}
