var items = ['Home', 'About', 'Best Deals', 'Coupons', 'Discounts', 'Contact'];
var itemWidth = 110;
var totalItemWidth = 110 * items.length;
var isShow = false;

createNavbarElemets();
setEvents();

function createNavbarElemets() {
    document.getElementById('navbar').style.maxWidth = `${totalItemWidth}px`
    document.getElementsByClassName('wrapper')[0].style.maxWidth = `${totalItemWidth}px`
    items.forEach(elem => {
        let e = document.createElement('li');
        e.style.minWidth = `${itemWidth}px`
        e.innerHTML = `<a href="#">${elem}</a>`;
        document.getElementById('navbar').appendChild(e);
    })
}

function setEvents() {
    window.addEventListener('resize', (event) => {
        checkItemViewport();
    }, false);
    
    window.addEventListener('load', function(event) {
        checkItemViewport();
    }, false);
}


function checkItemViewport() {
    const wrapper = document.getElementsByClassName('wrapper')[0];
    const wrapperItems = wrapper.getElementsByClassName('show-more');
    const list = document.getElementsByClassName('list')[0];
    const listItems = list.getElementsByClassName('list-item');

    let elem = document.getElementsByClassName('wrapper')[0];
    let skipedElems = Math.ceil((totalItemWidth - elem.clientWidth) / itemWidth);
    let nodesForSkip;
    let allNodes = document.getElementById('navbar').childNodes;

    if (skipedElems) {
        const showMoreElem = document.createElement('span');

        if(listItems.length) {
            [...listItems].forEach(item => {
                list.removeChild(item);
            })
        }

        showMoreElem.innerHTML = 'Show more';
        showMoreElem.className = 'show-more';
        showMoreElem.onclick = () => {
            const list = document.getElementsByClassName('list')[0];

            if(!isShow) {
                list.style.display = 'flex';
            } else {
                list.style.display = 'none';
            }

            isShow = !isShow
        }

        [...allNodes].forEach(node => {
            node.style.display = 'inline';
            node.style.minWidth = `${itemWidth}px`
        })

        nodesForSkip = [...allNodes].slice(-skipedElems);
        
        if(!wrapperItems.length) {
            wrapper.appendChild(showMoreElem);
        }

        nodesForSkip.forEach(node => {
            node.style.display = 'none';

            let e = document.createElement('li');
            e.className = 'list-item'
            e.style.minWidth = '50px'
            e.innerHTML = node.textContent;
            list.appendChild(e);
        })
    } else {
        document.getElementsByClassName('list')[0].style.display = 'none';
        [...allNodes].forEach(node => {
            node.style.display = 'inline';
            node.style.minWidth = `${itemWidth}px`
        })

        if(wrapperItems.length) {
            wrapper.removeChild(wrapperItems[0]);
        }
    }
}

module.exports = {
    createNavbarElemets,
    setEvents,
    checkItemViewport
};
