export default class Card extends HTMLElement {


  static observedAttributes = ["facing"];

  frontImage: string;
  backImage: string;
  id: string;

  container: HTMLDivElement;
  front: HTMLImageElement;
  back: HTMLImageElement;

  constructor(frontImage: string, backImage: string, id: string) {
    super();
    this.attachShadow({ mode: "open" });
    const root: ShadowRoot = this.shadowRoot!;


    this.frontImage = frontImage
    this.backImage = backImage
    root.appendChild(this.template());

    this.id = id

    this.container = root.querySelector("#card-container")!;
    this.front = root.querySelector("#front")!
    this.back = root.querySelector("#back")!

    this.setAttribute('facing', 'down')
  }
  
  
//     faceCardPairs() {
      
//     }
  

  attributeChangedCallback(attribute: string, oldValue: string, newValue: string): void {
    if (attribute === 'facing') {
        if (oldValue === 'down' && newValue === 'up') {
            this.back.setAttribute("Hidden", "true") 
            this.front.removeAttribute("Hidden") 
        } else if (oldValue === 'up' && newValue == 'down') {
            this.front.setAttribute("Hidden", "true") 
            this.back.removeAttribute("Hidden") 
        }
    }
  }

  connectedCallback() {
    this.container.addEventListener("click", (e) => {
      e.stopPropagation();
        
      this.dispatchEvent(new CustomEvent('cardClickedEvent',
      {
        bubbles: true,
        cancelable: true,
        composed: true,
        detail: this
    }))
    });
  }

  private template(): Node {
    const template: HTMLTemplateElement = document.createElement("template");
    template.innerHTML = `
    <style>
        #card-container {
            display: grid;
            place-items: center;
            border: 1px solid black;
        }
    </style>
      <div id="card-container">
        <img id="back" src="${this.backImage}">
        <img id="front" src="${this.frontImage}" hidden>
      </div>
      `;
    return template.content.cloneNode(true);
  }
}
window.customElements.define("memory-card", Card);
