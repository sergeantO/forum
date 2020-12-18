import { OutputData, OutputBlockData } from '@editorjs/editorjs'

type transforms = {
  [key: string]: any;
  delimiter(): string;
  header(block: OutputBlockData): string;
  paragraph(block: OutputBlockData): string;
  list(block: OutputBlockData): string;
  image(block: OutputBlockData): string;
  quote(block: OutputBlockData): string;
};


class Render {
  public parser ({ blocks }: OutputData) {
    return blocks.map((block) => {
      return this.transforms[block.type] ? 
        this.transforms[block.type](block)
        :  new Error(`The Parser function of type "${block.type}" is not defined.`)
    });
  }

  private transforms: transforms = {
    delimiter: () => {
      return `<br/>`;
    },
  
    header: ({ data }) => {
      return `<h${data.level}> ${data.text} </h${data.level}>`;
    },
  
    paragraph: ({ data }) => {
      return `<p> ${data.text} </p>`;
    },
  
    list: ({ data }) => {
      let style = data.style === "unordered" ? "ul" : "ol";
      let list = "";
      if (data.items) {
        list = (data.items as string[])
          .map((i) => `<li> ${i} </li>`)
          .reduce((a, c) => a + c, "");
      }
      return `<${style}> ${list} </${style}>`;
    },
  
    image: ({ data }) => {
      let caption = data.caption ? data.caption : "Image";
      return `<img src="${data.file ? data.file.url : ""}" alt="${caption}" />`;
    },
  
    quote: ({ data }) => {
      return `<blockquote> ${data.text} </blockquote> - ${data.caption}`;
    },
  }
}

const render = new Render()

export default render