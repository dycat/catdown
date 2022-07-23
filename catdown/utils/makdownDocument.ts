export interface IMarkdownDocument {
  add(...content: string[]): void;
  get(): string;
}

export class MarkdownDocument implements IMarkdownDocument {
  private content: string = "";

  add(...content: string[]): void {
    content.forEach((element) => {
      this.content += element;
    });
  }
  get(): string {
    return this.content;
  }
}
