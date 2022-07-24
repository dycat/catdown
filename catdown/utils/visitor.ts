import { IMarkdownDocument } from "./makdownDocument";
import { ParseElement } from "./parseElement";
import { TagType } from "./tagType";
import { TagTypeToHTML } from "./tagTypeToHTML";

export interface IVisitor {
  visit(token: ParseElement, markdownDocument: IMarkdownDocument): void;
}

export interface IVisitable {
  Accept(
    visitor: IVisitor,
    token: ParseElement,
    markdownDocument: IMarkdownDocument
  ): void;
}

abstract class VisitorBase implements IVisitor {
  constructor(
    private readonly tagType: TagType,
    private readonly TagTypeHTML: TagTypeToHTML
  ) {}

  visit(token: ParseElement, markdownDocument: IMarkdownDocument): void {
    markdownDocument.add(
      this.TagTypeHTML.openingTag(this.tagType),
      token.Currentline,
      this.TagTypeHTML.closingTag(this.tagType)
    );
  }
}

export class Header1Visitor extends VisitorBase {
  constructor() {
    super(TagType.Header1, new TagTypeToHTML());
  }
}

export class Header2Visitor extends VisitorBase {
  constructor() {
    super(TagType.Header2, new TagTypeToHTML());
  }
}

export class Header3Visitor extends VisitorBase {
  constructor() {
    super(TagType.Header3, new TagTypeToHTML());
  }
}

export class Header4Visitor extends VisitorBase {
  constructor() {
    super(TagType.Header4, new TagTypeToHTML());
  }
}

export class Header5Visitor extends VisitorBase {
  constructor() {
    super(TagType.Header5, new TagTypeToHTML());
  }
}

export class Header6Visitor extends VisitorBase {
  constructor() {
    super(TagType.Header6, new TagTypeToHTML());
  }
}

export class ListVisitor extends VisitorBase {
    constructor() {
      super(TagType.List, new TagTypeToHTML());
    }
  }

export class ParagraphVisitor extends VisitorBase {
  constructor() {
    super(TagType.Paragraph, new TagTypeToHTML());
  }
}

export class HorizontalRuleVisitor extends VisitorBase {
  constructor() {
    super(TagType.HorizontalRule, new TagTypeToHTML());
  }
}

export class Visitable implements IVisitable {
  Accept(
    visitor: IVisitor,
    token: ParseElement,
    markdownDocument: IMarkdownDocument
  ): void {
    visitor.visit(token, markdownDocument);
  }
}
