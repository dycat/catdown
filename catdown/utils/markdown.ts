import { ChainOfResponsibilityFactory, Header1ChainHandler } from "./handler";
import { IMarkdownDocument, MarkdownDocument } from "./makdownDocument";
import { ParseElement } from "./parseElement";

export class Markdown {
    public toHTML(text: string) : string {
        let document: IMarkdownDocument = new MarkdownDocument();
        let header1: Header1ChainHandler = new ChainOfResponsibilityFactory().Build(document);
        let lines: string[] = text.split('\n');
        for (let index = 0; index < lines.length; index++) {
            let parseElement: ParseElement = new ParseElement();
            parseElement.Currentline = lines[index];
            header1.handleRequest(parseElement);
        }
        return document.get()
    }
}