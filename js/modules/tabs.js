function tabs(){
    // Tabs
    const tabs = document.querySelectorAll('.tabheader__item'),
    tabContent = document.querySelectorAll('.tabcontent'),
    tabParent = document.querySelector('.tabheader__items');

    function hideTabContent(){
        tabContent.forEach(tab => {
            tab.classList.add('hide');
            tab.classList.remove('show', 'fade');
        });

        tabs.forEach(tab => {
            tab.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0){
        tabContent[i].classList.add('block', 'fade');
        tabContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');        
    }

    hideTabContent();
    showTabContent();

    tabParent.addEventListener('click', (event) => {
        const target = event.target;
        if (target && target.classList.contains('tabheader__item')){
            tabs.forEach((tab, i) => {
                if (tab == target){
                    hideTabContent();
                    showTabContent(i);                    
                }
            });
        }
    });

}

module.exports = tabs;