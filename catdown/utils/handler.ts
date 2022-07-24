import { IMarkdownDocument } from "./makdownDocument";
import { ParseElement } from "./parseElement";
import {
  Header1Visitor,
  Header2Visitor,
  Header3Visitor,
  Header4Visitor,
  Header5Visitor,
  Header6Visitor,
  HorizontalRuleVisitor,
  IVisitable,
  IVisitor,
  ListVisitor,
  ParagraphVisitor,
  Visitable,
} from "./visitor";

abstract class Handler<T> {
  protected next: Handler<T> | null = null;
  public setNext(next: Handler<T>): void {
    this.next = next;
  }
  public handleRequest(request: T): void {
    if (!this.canHandle(request)) {
      if (this.next !== null) {
        this.next.handleRequest(request);
      }
      return;
    }
  }

  protected abstract canHandle(request: T): boolean;
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

  constructor(
    private readonly document: IMarkdownDocument,
    private readonly tagType: string,
    private readonly visitor: IVisitor
  ) {
    super();
  }
}

class LineParser {
  public parse(value: string, tag: string): [boolean, string] {
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
  private readonly visitor: IVisitor = new ParagraphVisitor();

  protected canHandle(request: ParseElement): boolean {
    this.visitable.Accept(this.visitor, request, this.document);
    return true;
  }

  constructor(private readonly document: IMarkdownDocument) {
    super();
  }
}

/**
 * Header chain handler for h1, h2, h3, h4, h5, h6
 */
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

class Header3ChainHandler extends ParseChainHandler {
  constructor(document: IMarkdownDocument) {
    super(document, "### ", new Header3Visitor());
  }
}

class Header4ChainHandler extends ParseChainHandler {
  constructor(document: IMarkdownDocument) {
    super(document, "#### ", new Header4Visitor());
  }
}

class Header5ChainHandler extends ParseChainHandler {
  constructor(document: IMarkdownDocument) {
    super(document, "##### ", new Header5Visitor());
  }
}

class Header6ChainHandler extends ParseChainHandler {
  constructor(document: IMarkdownDocument) {
    super(document, "###### ", new Header6Visitor());
  }
}

class ListChainHandler extends ParseChainHandler {
  constructor(document: IMarkdownDocument) {
    super(document, "- ", new ListVisitor());
  }
}

class HorizontalRuleHandler extends ParseChainHandler {
  constructor(document: IMarkdownDocument) {
    super(document, "---", new HorizontalRuleVisitor());
  }
}

export class ChainOfResponsibilityFactory {
  Build(document: IMarkdownDocument): ParseChainHandler {
    let header1: Header1ChainHandler = new Header1ChainHandler(document);
    let header2: Header2ChainHandler = new Header2ChainHandler(document);
    let header3: Header3ChainHandler = new Header3ChainHandler(document);
    let header4: Header4ChainHandler = new Header4ChainHandler(document);
    let header5: Header5ChainHandler = new Header5ChainHandler(document);
    let header6: Header6ChainHandler = new Header6ChainHandler(document);
    let list: ListChainHandler = new ListChainHandler(document);
    let horizontalRule: HorizontalRuleHandler = new HorizontalRuleHandler(
      document
    );
    let paragraph: ParagraphHandler = new ParagraphHandler(document);

    header1.setNext(header2);
    header2.setNext(header3);
    header3.setNext(header4);
    header4.setNext(header5);
    header5.setNext(header6);
    header6.setNext(list);
    list.setNext(horizontalRule);
    horizontalRule.setNext(paragraph);

    return header1;
  }
}
