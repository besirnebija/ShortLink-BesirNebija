// const duration = document.getElementById('duration').value;
document.addEventListener('DOMContentLoaded', loadLinksFromLocalStorage);
document.getElementById('shortenBtn').addEventListener('click', function () {
    const longLink = document.getElementById('longLink').value;
    if (longLink.trim() === '') {
        alert('Please enter a long link');
        return;
    }
    const shortLink = shortenLink(longLink);
    addLinkToList(longLink, shortLink);
    document.getElementById('longLink').value = '';
});

function shortenLink(link) {
    const url = new URL(link);
    const baseUrl = `${url.protocol}//${url.hostname}`;
    const hash = btoa(link).slice(0, 6); // Create a simple hash and taking the first 6 characters
    return `${baseUrl}/${hash}`;
}

function addLinkToList(longLink, shortLink) {
    const ul = document.getElementById('linkList');
    const li = document.createElement('li');
    li.innerHTML = `
        <a href="${longLink}" target="_blank">${shortLink}</a>
        <span class="trash"> <i class="fa-solid fa-trash "></i></span>`;

    li.querySelector('.trash').addEventListener('click', function () {
        ul.removeChild(li);
        removeFromLocalStorage(longLink);
    });
    ul.appendChild(li);
    saveToLocalStorage(longLink, shortLink);
}

function saveToLocalStorage(longLink, shortLink) {
    const links = JSON.parse(localStorage.getItem('links')) || [];
    links.push({ longLink, shortLink });
    localStorage.setItem('links', JSON.stringify(links));
}

function removeFromLocalStorage(longLink) {
    const links = JSON.parse(localStorage.getItem('links')) || [];
    const updatedLinks = links.filter(link => link.longLink !== longLink); // 
    localStorage.setItem('links', JSON.stringify(updatedLinks));
}

function loadLinksFromLocalStorage() {
    const links = JSON.parse(localStorage.getItem('links')) || [];
    links.forEach(element => {
        const ul = document.getElementById('linkList');
        const li = document.createElement('li')
        li.innerHTML = `<a href="${element.longLink}" target="_blank">${element.shortLink}</a>
        <span class="trash"> <i class="fa-solid fa-trash "></i></span>`
        ul.appendChild(li)
        li.querySelector('.trash').addEventListener('click', function () {
            ul.removeChild(li);
            removeFromLocalStorage(element.longLink);
        });
    });
} 
