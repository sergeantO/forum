import { OutputBlockData } from '@editorjs/editorjs'

interface Itransforms {
  [key: string]: any;
  delimiter(): string;
  header(block: OutputBlockData): string;
  paragraph(block: OutputBlockData): string;
  list(block: OutputBlockData): string;
  image(block: OutputBlockData): string;
  quote(block: OutputBlockData): string;
};

interface IData extends OutputBlockData {
  id: string
}

interface OutputData {
  version?: string;
  time?: number;
  blocks: IData[];
}


class Render {
  private transforms: Itransforms = {
    delimiter: () => {
      return `<br/>`
    },

    header: ({ data, id = '' }: IData) => {
      return `<h${data.level} id=${id}> ${data.text} </h${data.level}>`
    },

    paragraph: ({ data, id = '' }: IData) => {
      return `<p id=${id}> ${data.text} </p>`
    },

    list: ({ data, id = '' }: IData) => {
      const style = data.style === 'unordered' ? 'ul' : 'ol'
      let list = '';

      if (data.items) {
        list = (data.items as string[])
          .map((i) => `<li> ${i} </li>`)
          .reduce((a, c) => a + c, '');
      }

      return `<${style} id=${id}> ${list} </${style}>`
    },

    table: ({ data, id = '' }: IData) => {
      let table = '';

      if (data.content) {
        table = (data.content as string[][])
          .map((tr) => {
            const html = tr
              .map((td) => `<td>${td}</td>`)
              .reduce((a, c) => a + c, '');

            return `<tr>${html}</tr>`
          })
          .reduce((a, c) => a + c, '');
      }

      return `<table border="1" id=${id}>${table}</table>`
    },

    image: ({ data, id = '' }: IData) => {
      const caption = data.caption ? data.caption : 'Image'
      return `<img id=${id} src='${data.file ? data.file.url : ''}' alt='${caption}' />`
    },

    quote: ({ data, id = '' }: IData) => {
      return `<blockquote id=${id}> ${data.text} </blockquote> - ${data.caption}`
    },
  }

  public parser({ blocks }: OutputData) {
    return blocks.map((block) => {
      return this.transforms[block.type] ?
        this.transforms[block.type](block)
        :  new Error(`The Parser function of type "${block.type}" is not defined.`)
    });
  }
}

const render = new Render()

export default render
