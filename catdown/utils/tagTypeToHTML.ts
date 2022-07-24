import { TagType } from "./tagType";

/*
This class convert markdown type to HTML tag
*/
export class TagTypeToHTML {
  private readonly tagType: Map<TagType, string> = new Map<TagType, string>();

  constructor() {
    this.tagType.set(TagType.Header1, "h1");
    this.tagType.set(TagType.Header2, "h2");
    this.tagType.set(TagType.Header3, "h3");
    this.tagType.set(TagType.Header4, "h4");
    this.tagType.set(TagType.Header5, "h5");
    this.tagType.set(TagType.Header6, "h6");
    this.tagType.set(TagType.List, "li");
    this.tagType.set(TagType.Paragraph, "p");
    this.tagType.set(TagType.HorizontalRule, "hr");
  }

  public openingTag(tagType: TagType): string {
    return this.getTag(tagType, "<");
  }

  public closingTag(tagType: TagType): string {
    return this.getTag(tagType, "</");
  }

  private getTag(tagType: TagType, openingTagPattern: string): string {
    let tag = this.tagType.get(tagType);
    if (tag !== null) {
      return `${openingTagPattern}${tag}>`;
    }
    return `${openingTagPattern}p>`;
  }
}
