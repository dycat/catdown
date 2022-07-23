import { IMarkdownDocument } from "./makdownDocument";
import { ParseElement } from "./parseElement";
import { Header1Visitor, Header2Visitor, Header3Visitor, HorizontalRuleVisitor, IVisitable, IVisitor, ParagraphVisitor, Visitable } from "./visitor";

abstract class Handler<T> {
    protected next: Handler<T> | null = null;
    public setNext(next: Handler<T>) : void {
        this.next = next;
    } 
    public handleRequest(request: T) : void {
        if (!this.canHandle(request)) {
            if (this.next !== null) {
                this.next.handleRequest(request);
            }
            return;
        }
    }

    protected abstract canHandle(request: T) : boolean;
}

export class ParseChainHandler extends Handler<ParseElement> {
    private readonly visitable: IVisitable = new Visitable();

    protected canHandle(request: ParseElement): boolean {
        let split = new LineParser().parse(request.Currentline, this.tagType);

        if (split[0]) {
            request.Currentline = split[1];
            this.visitable.Accept(this.visitor, request, this.document);
        }
        return split[0];
    }

    constructor (private readonly document: IMarkdownDocument,
                 private readonly tagType: string,
                 private readonly visitor: IVisitor) {
                    super();
    }
}

class LineParser {
    public parse(value: string, tag: string) : [boolean, string] {
        let output: [boolean, string] = [false, ""];
        output[1] = value;
        if (value === "") {
            return output;
        }
        let split = value.startsWith(`${tag}`);
        if (split) {
            output[0] = true;
            output[1] = value.substring(tag.length);
        }
        return output;
    }

}

class ParagraphHandler extends Handler<ParseElement> {
    private readonly visitable: IVisitable = new Visitable();
    private readonly visitor: IVisitor = new ParagraphVisitor()

    protected canHandle(request: ParseElement): boolean {
        this.visitable.Accept(this.visitor, request, this.document);
        return true
    }

    constructor(private readonly document: IMarkdownDocument){
        super();
    }
}

export class Header1ChainHandler extends ParseChainHandler {
    constructor(document: IMarkdownDocument) {
        super(document, "# ", new Header1Visitor());
    }
}

class Header2ChainHandler extends ParseChainHandler {
    constructor(document: IMarkdownDocument) {
        super(document, "## ", new Header2Visitor());
    }
}

class Haeader3ChainHandler extends ParseChainHandler {
    constructor(document: IMarkdownDocument) {
        super(document, "### ", new Header3Visitor());
    }
}

class HorizontalRuleHandler extends ParseChainHandler {
    constructor(document: IMarkdownDocument) {
        super(document, "---", new HorizontalRuleVisitor());
    }
}

export class ChainOfResponsibilityFactory {
    Build(document: IMarkdownDocument) : ParseChainHandler {
        let header1: Header1ChainHandler = new Header1ChainHandler(document);
        let header2: Header2ChainHandler = new Header2ChainHandler(document);
        let header3: Haeader3ChainHandler = new Haeader3ChainHandler(document);
        let horizontalRule: HorizontalRuleHandler = new HorizontalRuleHandler(document);
        let paragraph: ParagraphHandler = new ParagraphHandler(document);

        header1.setNext(header2);
        header2.setNext(header3);
        header3.setNext(horizontalRule);
        horizontalRule.setNext(paragraph);

        return header1
    }
}