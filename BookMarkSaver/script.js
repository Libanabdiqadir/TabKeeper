const urlInput = document.querySelector('#url');
const saveBtn = document.querySelector('.saveBtn');
const bookMarkList = document.querySelector('.bookmark-list');


let savedLinks = JSON.parse(localStorage.getItem('myBookmarks')) || [];
renderBookmarks();

saveBtn.addEventListener('click', () => {
    const urlValue = urlInput.value.trim();

    if (urlValue) {
        savedLinks.push(urlValue);
        updateLocalStorage();
        renderBookmarks();
        
        urlInput.value = '';
    }
});

function renderBookmarks() {
    bookMarkList.innerHTML = '';
    
    savedLinks.forEach((url, index) => {
        const li = document.createElement('li');
        li.classList.add('bookmark-item');
        
        const formattedUrl = url.startsWith('http') ? url : `https://${url}`;
        
        li.innerHTML = `
            <a href="${formattedUrl}" target="_blank">${url}</a>
            <button class="delete-btn" onclick="deleteBookmark(${index})">&times;</button>
        `;
        bookMarkList.appendChild(li);
    });
}

window.deleteBookmark = (index) => {
    savedLinks.splice(index, 1);
    updateLocalStorage();
    renderBookmarks();
};

function updateLocalStorage() {
    localStorage.setItem('myBookmarks', JSON.stringify(savedLinks));
}