interface IMarkdowDocument {
    add(...content: string[]) : void;
    get() : string;
}

class MarkdownDocument implements IMarkdowDocument {

    private content: string = "";

    add(...content: string[]): void {
        content.forEach( element => {
            this.content += element;
        });
    }
    get(): string {
        return this.content;
    }
    
}

export {}