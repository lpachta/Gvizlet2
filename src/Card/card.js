import { getDefaultStrings } from "../Defaults/defaultsProvider.js";
import { onLocaleChange } from "../Defaults/localeStore.js";
import { CardEnums } from "./card_enums.js";

export default class Card {
  constructor({ imageSrcFront, textFront, imageSrcBack, textBack, mode, frontTextEdit, backTextEdit } = {}) {
    // load default strings based on locale
    const defaultStrings = getDefaultStrings();

    // determine placeholder text when no text is provided
    var placeholderString;
    if ((mode ?? CardEnums.modes.view) === CardEnums.modes.view) {  // view mode - invalid card
      placeholderString = defaultStrings.cardInvalidCard;
    } else if ((mode ?? CardEnums.modes.view) === CardEnums.modes.add) {   // add mode - click to edit
      placeholderString = defaultStrings.clickToEdit;
    } else {  // error
      throw `no placeholderString string is provided for mode ${mode}`;
    }

    // save state with default values
    this.state = {
      mode: mode ?? CardEnums.modes.view,
      front: {
        img: imageSrcFront ?? CardEnums.defaultImgSrc,
        usesDefaultImg: imageSrcFront === undefined,
        usesDefaultText: textFront === undefined,
        text: textFront ?? placeholderString,
        textEdit: frontTextEdit ?? false,
      },
      back: {
        img: imageSrcBack ?? CardEnums.defaultImgSrc,
        usesDefaultImg: imageSrcBack === undefined,
        usesDefaultText: textBack === undefined,
        text: textBack ?? placeholderString,
        textEdit: backTextEdit ?? false,
      }
    };

    console.log(this.state.mode);


    // callback when locale changes
    onLocaleChange(() => {
      const newDefaults = getDefaultStrings();
      if (this.state.front.usesDefaultText) this.state.front.text = newDefaults.clickToEdit;
      if (this.state.back.usesDefaultText) this.state.back.text = newDefaults.clickToEdit;
      this.updateRender();
    });
    this.updateRender();
  }

  render() {
    // load locale strings and state
    const defaultStrings = getDefaultStrings();
    const { mode, front, back } = this.state;

    // veiw - hide image or text
    const hideFrontImage = mode === CardEnums.modes.view && front.usesDefaultImg;
    const hideBackImage = mode === CardEnums.modes.view && back.usesDefaultImg;
    const hideFrontText = mode === CardEnums.modes.view && front.usesDefaultText;
    const hideBackText = mode === CardEnums.modes.view && back.usesDefaultText;

    // create card 
    const card = document.createElement("div");

    // add classes
    card.className = `card m-2 ${mode} ${front.textEdit ? CardEnums.modes.frontTextEdit : ""} ${back.textEdit ? CardEnums.modes.backTextEdit : ""}`;

    // create body - text or textfield
    var frontBody = "";
    if (front.textEdit) {
      frontBody = this.renderTextField({});
    } else if (!hideFrontText) {
      frontBody = this.renderText(front.text);
    } else if (hideFrontImage && hideFrontText) {
      frontBody = this.renderText(defaultStrings.cardInvalidCard);
    }
    var backBody = "";
    if (back.textEdit) {
      backBody = this.renderTextField({});
    } else if (!hideBackText) {
      backBody = this.renderText(back.text);
    } else if (hideBackImage && hideBackText) {
      backBody = this.renderText(defaultStrings.cardInvalidCard);
    }

    // create inner HTML
    card.innerHTML = `
    <div class="card-inner">
      <div class="card-front ${this.getContentsState(!front.usesDefaultText, !front.usesDefaultImg)}">
        ${this.renderImage(front.img, hideFrontImage)}
        <div class="card-body">
          ${frontBody}
        </div>
      </div>

      <div class="card-back ${this.getContentsState(!back.usesDefaultText, !back.usesDefaultImg)}">
        ${this.renderImage(back.img, hideBackImage)}
        <div class="card-body">
          ${backBody}
        </div>
      </div>
    </div>
  `;

    // add click events
    if (mode === CardEnums.modes.view) {
      card.addEventListener("click", () => {
        card.classList.toggle(CardEnums.flipped);
      });
    } else if (mode === CardEnums.modes.add) {
      if (front.textEdit === false) {
        const frontText = card.querySelector(".card-front .card-text");
        frontText.addEventListener("click", () => {
          this.setFrontTextEdit(true);
          this.updateRender();
        });
      }
      if (back.textEdit === false) {
        const backText = card.querySelector(".card-back .card-text");
        backText.addEventListener("click", () => {
          this.setBackTextEdit(true);
          this.updateRender();
        });
      }
    }
    return card;
  }

  updateRender() {
    const next = this.render();
    if (this.element) {
      this.element.replaceWith(next);
    }
    this.element = next;
  }

  setMode(mode) {
    if (this.state.mode === mode) return;
    this.state.mode = mode;
    this.updateRender();
  }

  setFrontTextEdit(value) {
    if (this.state.front.textEdit === value) return;
    this.state.front.textEdit = value;
    if (this.state.front.textEdit && this.state.back.textEdit) {
      this.state.back.textEdit = false;
    }
    this.updateRender();
  }
  setBackTextEdit(value) {
    if (this.state.back.textEdit === value) return;
    this.state.back.textEdit = value;
    if (this.state.front.textEdit && this.state.back.textEdit) {
      this.state.front.textEdit = false;
    }
    this.updateRender();
  }

  renderImage(src, hidden) {
    if (hidden) return "";
    return `
    <img src="${src}"
         class="card-img-top"
         alt=""
         draggable="false"
         unselectable>
  `;
  }

  renderText(text, hidden) {
    if (hidden) return "";
    return `
    <p class="card-text" unselectable>${text}</p>
  `;
  }

  renderTextField({ text }) {
    return `
    <p class="card-text" unselectable>TEXT FIELD PLACEHOLDER ${text ?? ""}</p>
    `;

  }

  getContentsState(isText, isImg) {
    if (isText && isImg) return CardEnums.contents.textAndImg;
    if (isText && !isImg) return CardEnums.contents.textOnly;
    if (!isText && isImg) return CardEnums.contents.imgOnly;
    return CardEnums.contents.empty;
  }

}


