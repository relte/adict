class Menu {
    constructor() {
        this.dictionaryList = document.getElementById('dictionaries');
    }

    initClickEventListener() {
        this.dictionaryList.addEventListener('click', event => {
            if (event.target.matches('li')) {
                this.onDictionaryChoice(event);
            }
        });
    }

    initCurrentDictionary() {
        storage.get('dictionaryUrl', data => {
            let dictionary = this.dictionaryList.querySelector('li[data-url="' + data.dictionaryUrl + '"');
            this.setCurrentDictionary(dictionary);
        });
    }

    onDictionaryChoice(event) {
        this.setCurrentDictionary(event.target);
        storage.set({
            dictionaryUrl: event.target.getAttribute('data-url')
        });
    }

    setCurrentDictionary(dictionary) {
        let dictionaries = this.dictionaryList.querySelectorAll('li');
        for (let i = 0; i < dictionaries.length; i++) {
            dictionaries[i].classList.remove('active');
        }

        dictionary.classList.add('active');
    }
}

const menu = new Menu();
menu.initClickEventListener();
menu.initCurrentDictionary();
