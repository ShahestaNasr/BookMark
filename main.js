var siteName = document.getElementById('siteName'); 
var siteUrl = document.getElementById('siteUrl'); 
var lightContainer = document.querySelector('.lightContainer')
var close = document.querySelector('.close')
var bookmarksContainer = [];

if (localStorage.getItem('allBookmarks') == null) {
    bookmarksContainer = [];
} else {
    bookmarksContainer = JSON.parse(localStorage.getItem('allBookmarks'));
    displayProducts();
}

siteName.addEventListener('input', function() {
    validateForm(siteName);
});
siteUrl.addEventListener('input', function() {
    validateForm(siteUrl);
});

function addProduct() {
    if (validateForm(siteName) && validateForm(siteUrl)) {
        var bookmark = {
            bookmarkName: siteName.value,
            bookmarkUrl: siteUrl.value
        };
        bookmarksContainer.push(bookmark);
        localStorage.setItem('allBookmarks', JSON.stringify(bookmarksContainer));
        console.log(bookmarksContainer);
        displayProducts();
        removeValues();
    } else {
        lightContainer.classList.remove('d-none')
    }
}

function displayProducts() {
    var cartona = '';
    for (var i = 0; i < bookmarksContainer.length; i++) { // Start from 0
        cartona += `<tr>
                        <td>${i + 1}</td>
                        <td>${bookmarksContainer[i].bookmarkName}</td>
                        <td><a class="btn visit fw-medium text-white" href="${bookmarksContainer[i].bookmarkUrl}" target="_blank"><i class="fa-solid fa-eye pe-2"></i>Visit</a></td>
                        <td><button onclick="deleteBookmarks(${i})" class="btn delete bg-danger text-white"><i class="fa-solid fa-trash-can me-2"></i>Delete</button></td>
                    </tr>`;
    }
    document.getElementById('tbody').innerHTML = cartona;
}

function removeValues() {
    siteName.value = '';
    siteUrl.value = '';
}

function deleteBookmarks(deletedIndex) {
    bookmarksContainer.splice(deletedIndex, 1);
    displayProducts();
    localStorage.setItem('allBookmarks', JSON.stringify(bookmarksContainer));
}

function validateForm(element) {
    var regex = {
        siteName: /^[A-Z][a-z]{3,8}$/,
        siteUrl: /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i
    };

    var myStr = regex[element.id]; 
    if (myStr.test(element.value)) {
        element.classList.add('is-valid');
        element.classList.remove('is-invalid');
        return true;
    } else {
        element.classList.remove('is-valid');
        element.classList.add('is-invalid');
        return false; 
    }
}

close.addEventListener('click',function(){
    lightContainer.classList.add('d-none')
})

