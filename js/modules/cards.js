function cards(){
        // Class MenuCard
    
    class MenuCard{
        constructor(title, description, price, image, altImage, parentSelector, ...classes){
            this.title = title;
            this.description = description;
            this.price = price;
            this.image = image;
            this.altImage = altImage;
            this.dollar = 27;
            this.parentSelector = parentSelector;
            this.classes = classes;
            this.changeToUAH();
        }

        changeToUAH(){
            this.price = this.price * this.dollar;
        }

        render(){
            const newCard = document.createElement('div');

            if (this.classes.length === 0){
                this.classes = 'menu__item';
                newCard.classList.add(this.classes);
            } else {
                this.classes.forEach(className => newCard.classList.add(className));
            }

            newCard.innerHTML = `
                <img src=${this.image} alt=${this.altImage}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.description}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;

            document.querySelector(this.parentSelector).append(newCard);
        }
    }

    const getResource = async (url) => {
        let result = await fetch(url);

        if (!result.ok){
            throw new Error(`Could not fetch ${url}, status: ${result.status}`);
        }

        return await result.json();
    };


    axios.get('http://localhost:3000/menu')
        .then(obj => {
            obj.data.forEach(({title, descr, price, img, altimg}) => {
            new MenuCard(title, descr, price, img, altimg,'.menu .container').render();
            });
        });

}

module.exports = cards;