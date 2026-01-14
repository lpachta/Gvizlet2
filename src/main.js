import Card from "./Card/card.js";
import { CardEnums } from "./Card/card_enums.js";
import { setLocale } from "./Defaults/localeStore.js";

setLocale("en");

const container = document.getElementById("cards");


const card1 = new Card({
  imageSrcFront: "https://placehold.net/600x600.png",
  textFront: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
  mode: CardEnums.modes.view,
});

const card2 = new Card({
  mode: CardEnums.modes.view,
});

const card3 = new Card(
  {
    imageSrcFront: "https://placehold.net/600x600.png",
    imageSrcBack: "https://placehold.net/600x600.png",
    mode: CardEnums.modes.view,
  }
);

const card4 = new Card({
  textFront: "Slon",
  textBack: "Elephant",
  mode: CardEnums.modes.view,
});

container.append(card1.element, card2.element, card3.element, card4.element);

