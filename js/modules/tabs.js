function tabs(tabsSelector, tabsContentSelector, tabParentSelector, activeClass){
    // Tabs
    const tabs = document.querySelectorAll(tabsSelector),
    tabContent = document.querySelectorAll(tabsContentSelector),
    tabParent = document.querySelector(tabParentSelector);

    function hideTabContent(){
        tabContent.forEach(tab => {
            tab.classList.add('hide');
            tab.classList.remove('show', 'fade');
        });

        tabs.forEach(tab => {
            tab.classList.remove(activeClass);
        });
    }

    function showTabContent(i = 0){
        tabContent[i].classList.add('block', 'fade');
        tabContent[i].classList.remove('hide');
        tabs[i].classList.add(activeClass);        
    }

    hideTabContent();
    showTabContent();

    tabParent.addEventListener('click', (event) => {
        const target = event.target;
        if (target && target.classList.contains(tabsSelector.slice(1))){
            tabs.forEach((tab, i) => {
                if (tab == target){
                    hideTabContent();
                    showTabContent(i);                    
                }
            });
        }
    });

}

export default tabs;