//verificam daca documentul s-a incarcat total
if (document.readyState == 'loading') {
    //apare cand pag se incarca
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    var removeCartElemButon = document.getElementsByClassName('btn-danger')
    //event listener pt a elimina elemente din cart
    for (var i = 0; i < removeCartElemButon.length; i++) {
        //cand apas pe butonul de click, se apeleaza functia care sterge un elem 
        var button = removeCartElemButon[i]
        button.addEventListener('click', removeCartItem)
    }
    //gasim cantitatea
    var cantitate = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < cantitate.length; i++) {
        var input = cantitate[i]
        //inputul se schimba->apelam functia
        input.addEventListener('change', schimbaCantitatea)
    }

    var addToCartButon = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCartButon.length; i++) {
        var button = addToCartButon[i]
        //la click apelam functia care adauga elem in cart
        button.addEventListener('click', addToCart)
    }

    //pt butonul purchase->golim cartul
    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchase)
}

function purchase() {
    alert('Thank you for your purchase')
    //luam toate elem din cart
    var elemCart = document.getElementsByClassName('cart-items')[0]
    //eliminam toti mostenitorii pana cartul se goleste
    while (elemCart.hasChildNodes()) {
        elemCart.removeChild(elemCart.firstChild)
    }
    updateTotalCart()
}
//daca remove a fost apasat, se apeleaza functia mai sus si se updateaza cart ul
function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateTotalCart()
}

function schimbaCantitatea(event) {
    //inputul actual
    var input = event.target
    //verificam daca inputul este un numar(cu functia is not a number) si ca este pozitiv
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1  //setam inputul initial la 1
    }
    updateTotalCart()
}

//adaugam in cart
function addToCart(event) {
    var button = event.target
    //adaugam numele unui elem, imaginea, pretul si cantiatea, precum si butoanele de remove si cele pt cantitate
    var shopItem = button.parentElement.parentElement //butonul are ca stramos shop-item, care ne ajuta sa gasim titlul, imaginea etc
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    //adaugam sursa imaginii
    var imageSrc = shopItem.
    getElementsByClassName('shop-item-image')[0].src
    addItemToCart(title, price, imageSrc)
    updateTotalCart()
}

//adaugam in cart randul care contine noul elem introdus, cu numele, imaginea, pretul etc
function addItemToCart(title, price, imageSrc) {
    var randCart = document.createElement('div')
    randCart.classList.add('cart-row')
    //gasim elem din cart
    var cartItems = document.getElementsByClassName('cart-items')[0]
    //luam toate elem din cart pt a verifica ca nu se repeta
    var cartItemNume = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNume.length; i++) {
        //verificam daca numele unui elem din cart e egal cu unul pe care vrem sa il adaugam
        if (cartItemNume[i].innerText == title) {
            //atentionam userul ca elem e deja in cart
            alert('This item is already added to the cart')
            return
        }
    }
    //cream continutul noului elem din cart
    //folosim codul din html pt a adauga imaginea, titlul, butoanele
    //${--->pune sursa imaginii,titlului,...
    var continutCartRow = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`
        //deoarece avem taguri de html, folosim innerhtml
    randCart.innerHTML = continutCartRow
    //adaugam un nou rand la elem din cart
    cartItems.append(randCart)
    
    //butonul remove a fost adaugat dupa ce a fost incarcat documentul
    randCart.getElementsByClassName
    ('btn-danger')[0].addEventListener('click', removeCartItem)
    //la fel pt butonul de cantitate
    randCart.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', schimbaCantitatea)
}

//gasim pretul, inmultim cu cantitatea si afisam in total
function updateTotalCart() {
    
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var randuriCart = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    //pentru randul din cart la care suntem, cautam
    //pretul si cantitatea
    for (var i = 0; i < randuriCart.length; i++) {
        var cartRow = randuriCart[i]
        var pretElem = cartRow.getElementsByClassName('cart-price')[0]
        var cantitateElem = cartRow.getElementsByClassName('cart-quantity-input')[0]
        //gasim pretul si indepartam semnul $
        //transformam in float
        var pret = parseFloat(pretElem.innerText.replace('$', ''))
        var cantitate = cantitateElem.value
        //aflam totalul
        total = total + (pret * cantitate)
    }
    //inlocuim vechiul total cu noul total
    total = Math.round(total * 100) / 100 //2 zecimale
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}