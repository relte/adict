class Menu {
    constructor() {
        this.dictionaryList = document.getElementById('dictionaries');
        this.babLaLanguageChoice = document.getElementById('bab_la_language');
        this.setCurrentBabLaLanguage = this.setCurrentBabLaLanguage.bind(this);
    }

    initClickEventListeners() {
        this.dictionaryList.addEventListener('click', event => {
            let dictionary = event.target.closest('li');
            if (dictionary) {
                this.onDictionaryChoice(dictionary);
            }
        });
        this.babLaLanguageChoice.addEventListener('change', this.setCurrentBabLaLanguage);
    }

    onDictionaryChoice(dictionary) {
        this.setCurrentDictionary(dictionary);
        storage.set({
            dictionaryName: dictionary.dataset['name'],
            dictionaryUrl: dictionary.dataset['url']
        });
    }

    initCurrentDictionary() {
        storage.get('dictionaryName', data => {
            let dictionary = this.dictionaryList.querySelector('li[data-name="' + data.dictionaryName + '"');
            this.setCurrentDictionary(dictionary);
        });
    }

    setCurrentDictionary(dictionary) {
        let dictionaries = this.dictionaryList.querySelectorAll('li');
        for (let i = 0; i < dictionaries.length; i++) {
            dictionaries[i].classList.remove('active');
        }

        dictionary.classList.add('active');
    }

    initCurrentBabLaLanguage() {
        storage.get('babLaLanguage', data => {
            if (data.babLaLanguage) {
                this.babLaLanguageChoice.value = data.babLaLanguage;
            }
            this.setCurrentBabLaLanguage();
        });
    }

    setCurrentBabLaLanguage() {
        let language = this.babLaLanguageChoice.value;
        let dictionary = this.babLaLanguageChoice.parentElement;
        let urlTemplate = dictionary.dataset['urlTemplate'];
        dictionary.dataset['url'] = urlTemplate.replace('%language%', language);
        storage.set({
            babLaLanguage: this.babLaLanguageChoice.value
        });
        if (dictionary.classList.contains('active')) {
            storage.set({
                dictionaryUrl: dictionary.dataset['url']
            });
        }
    }
}

const menu = new Menu();
menu.initClickEventListeners();
menu.initCurrentBabLaLanguage();
menu.initCurrentDictionary();
