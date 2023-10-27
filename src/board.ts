import Card from "./card";
import _ from "lodash";

export default class Board extends HTMLElement {
  revealedCounter: number;
  pairsLeft: number;
  clicksAllowed: boolean;
  firstCard: Card | undefined;

  container: HTMLElement;

  constructor(fronts: string[], back: string) {
    super();
    this.attachShadow({ mode: "open" });
    const root: ShadowRoot = this.shadowRoot!;
    root.appendChild(this.template());

    this.revealedCounter = 0;
    this.pairsLeft = fronts.length
    this.clicksAllowed = true;

    this.container = root.querySelector("#board-container")!;

    const unshuffledCards = fronts.flatMap((front) => {
      const id = window.crypto.randomUUID();

      return [new Card(front, back, id), new Card(front, back, id)];
    });

    const shuffledCards = _.shuffle(unshuffledCards);

    shuffledCards.forEach((card) => {
      this.container.appendChild(card);
    });
  }

  connectedCallback() {
    this.container.addEventListener("cardClickedEvent", (e) => {
      e.stopPropagation();
      const clickedCard = e.target as Card;
      if (this.clicksAllowed) {
        if (clickedCard.getAttribute("facing") === "down") {
          switch (this.revealedCounter) {
            case 0:
              clickedCard.setAttribute("facing", "up");
              this.revealedCounter += 1;
              this.firstCard = clickedCard;
              break;
            case 1:
              clickedCard.setAttribute("facing", "up");
              this.revealedCounter += 1;
              this.clicksAllowed = false;
              if (
                this.firstCard!.id === clickedCard.id &&
                this.firstCard != clickedCard
              ) {
                setTimeout(() => {
                  this.firstCard!.container.style.display = "none";
                  this.firstCard!.removeEventListener(
                    "cardClickedEvent",
                    () => {}
                  );
                  clickedCard.container.style.display = "none";
                  clickedCard.removeEventListener("cardClickedEvent", () => {});
                  this.pairsLeft -= 1
                  this.revealedCounter = 0;
                  this.clicksAllowed = true;
                    if (this.pairsLeft === 0) {
                      alert("you win")
                    }
                }, 1000);
              } else {
                setTimeout(() => {
                  this.firstCard!.setAttribute("facing", "down");

                  clickedCard.setAttribute("facing", "down");

                  this.revealedCounter = 0;
                  this.clicksAllowed = true;
                }, 1000);
              }
              break;
            default:
              break;
          }
        }
      }
    });
  }

  private template(): Node {
    const template: HTMLTemplateElement = document.createElement("template");
    template.innerHTML = `
      <style>
        #board-container{
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(165px, 1fr));
          grid-auto-rows: 150px;
          gap: 40px;
          place-items: center;
        }
      </style>
      <div id="board-container">

      </div>
      `;
    return template.content.cloneNode(true);
  }
}
window.customElements.define("memory-board", Board);
