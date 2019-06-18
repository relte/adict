class Spinner {
    constructor() {
        this.element = document.createElement('div');
        this.element.classList.add('adict-spinner');
    }
}

class Anchor {
    constructor(url) {
        this.element = document.createElement('a');

        let href = new URL(url);
        let parameters = new URLSearchParams(href.search);
        parameters.delete('addon');
        href.search = parameters.toString();
        this.element.href = href.toString();
        this.element.text = href.toString();
        this.element.target = '_blank';
        this.element.style.display = 'none';
    }
}

class Iframe {
    constructor(url, spinner, anchor) {
        this.spinner = spinner;
        this.anchor = anchor;

        this.element = document.createElement('iframe');
        this.element.name = 'adict_iframe';
        this.element.setAttribute('src', url);
        this.element.style.display = 'none';

        this.onMessage = this.onMessage.bind(this);
        this.onLoad = this.onLoad.bind(this);
        this.onUnload = this.onUnload.bind(this);
        window.addEventListener('message', this.onMessage);
    }

    onMessage(message) {
        if (message.data.popup_styling === true) {
            setTimeout(this.onLoad, 50);
        } else if (message.data.unload === true) {
            this.onUnload();
        }
    }

    onLoad() {
        this.spinner.style.display = 'none';
        this.element.style.display = 'block';
        this.anchor.style.display = 'inline-block';
    }

    onUnload() {
        this.spinner.style.display = 'block';
        this.element.style.display = 'none';
        this.anchor.style.display = 'none';
    }
}

class TriggerButton {
    constructor(clickEvent) {
        this.element = document.createElement('button');
        this.element.setAttribute('id', 'adict-trigger-button');
        this.element.classList.add('adict-trigger');
        this.element.style.top = this.intToPx(clickEvent.pageY + 10);
        this.element.style.left = this.intToPx(clickEvent.pageX);
    }

    intToPx(number) {
        return number + 'px';
    }
}

class Popup {
    constructor() {
        this.element = document.createElement('div');
        this.element.setAttribute('id', 'adict-popup');
    }

    initClickEventListener() {
        storage.get('enableButtonTrigger', data => {
            let enableButtonTrigger = data.enableButtonTrigger;
            document.addEventListener('click', event => {
                let triggerButton = document.getElementById('adict-trigger-button');
                if (this.isTriggerButtonToBeShown(event, enableButtonTrigger)) {
                    document.body.appendChild((new TriggerButton(event)).element);
                } else if (triggerButton) {
                    triggerButton.remove();
                }
                if (this.isTriggered(event)) {
                    this.onPhraseChoice(window.getSelection().toString(), event);
                } else if (!event.target.closest('#adict-popup')) {
                    this.onClickAway();
                }
            });
        });
    }

    isTextSelected() {
        return !!window.getSelection().toString();
    }

    isTriggerButtonToBeShown(event, enableButtonTrigger) {
        return enableButtonTrigger &&
                this.isTextSelected() &&
                !event.altKey &&
                !document.getElementById('adict-trigger-button');
    }

    isTriggered(event) {
        return this.isTextSelected() && (event.altKey || event.target.id === 'adict-trigger-button');
    }

    onPhraseChoice(phrase, clickEvent) {
        storage.get('dictionaryUrl', data => {
            let url = data.dictionaryUrl.replace('%phrase%', phrase).toLowerCase();
            if (url.indexOf('bab.la') !== -1) {
                url = url.replace(/ /g, '-');
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
