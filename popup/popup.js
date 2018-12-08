class Spinner {
    constructor() {
        this.element = document.createElement('div');
        this.element.classList.add('adict-spinner');
    }
}

class Anchor {
    constructor(url) {
        this.element = document.createElement('a');

        let href = url.replace('addon=true', 'addon=false');
        this.element.href = href;
        this.element.text = href;
        this.element.target = '_blank';
        this.element.style.display = 'none';
    }
}

class Iframe {
    constructor(url, spinner, anchor) {
        this.spinner = spinner;
        this.anchor = anchor;

        this.element = document.createElement('iframe');
        this.element.setAttribute('src', url);
        this.element.style.display = 'none';

        this.onLoad = this.onLoad.bind(this);
        this.element.addEventListener('load', this.onLoad);
    }

    onLoad() {
        this.spinner.remove();
        this.element.style.display = 'block';
        this.anchor.style.display = 'inline-block';
    }
}

class Popup {
    constructor() {
        this.element = document.createElement('div');
        this.element.setAttribute('id', 'adict-popup');
    }

    initClickEventListener() {
        document.addEventListener('click', event => {
            let selectedText = window.getSelection().toString();
            if (selectedText && event.altKey) {
                this.onPhraseChoice(selectedText, event);
            } else if (!event.target.closest('#adict-popup')) {
                this.onClickAway();
            }
        });
    }

    onPhraseChoice(phrase, clickEvent) {
        storage.get('dictionaryUrl', data => {
            let url = data.dictionaryUrl.replace('%phrase%', phrase).toLowerCase();
            if (url.indexOf('bab.la') !== -1) {
                url = url.replace('/ /g', '-');
            }
            this.showOnPage(url, clickEvent);
        });
    }

    onClickAway() {
        while (this.element.firstChild) {
            this.element.removeChild(this.element.firstChild);
        }

        this.element.remove();
    }

    showOnPage(url, clickEvent) {
        this.element.style.top = this.intToPx(clickEvent.pageY + 15);
        this.element.style.left = this.intToPx(clickEvent.pageX);
        this.preventOverflow(clickEvent.pageX);

        let spinner = (new Spinner()).element;
        this.element.appendChild(spinner);

        let anchor = (new Anchor(url)).element;
        this.element.appendChild((new Iframe(url, spinner, anchor)).element);
        this.element.appendChild(anchor);

        document.body.appendChild(this.element);
    }

    preventOverflow(pageX) {
        let rightOverflow = 520 - (window.innerWidth - pageX);
        if (rightOverflow > 0) {
            this.element.style.left = this.intToPx(pageX - rightOverflow);
        }
    }

    intToPx(number) {
        return number + 'px';
    }
}

const popup = new Popup();
popup.initClickEventListener();
