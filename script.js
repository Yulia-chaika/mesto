let popup = document.getElementById("popupForm");
let popupContainer = document.querySelector(".popup__container")
let popupEditbtn = document.querySelector(".profile__edit-button");
let popupClosebtn = document.querySelector(".popup__close-button");
let userName = document.querySelector(".profile__name");
let userWhois = document.querySelector(".profile__whois");
let popupUserName = document.getElementById("popup-name");
let popupUserWhois = document.getElementById("popup-whois");



function openPopup() {
 popup.classList.add("popup_opened");
popupUserName.value = userName.textContent;
}

function closePopup() {
  popup.classList.remove("popup_opened");
 
 }

function formSubmitHandler (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  userName.textContent = popupUserName.value;                                  // Так мы можем определить свою логику отправки.
  userWhois.textContent = popupUserWhois.value;                                     // О том, как это делать, расскажем позже.

  // Получите значение полей jobInput и nameInput из свойства value

  // Выберите элементы, куда должны быть вставлены значения полей

  // Вставьте новые значения с помощью textContent
}


 popupUserName.value = userName.textContent;
 popupUserWhois.value = userWhois.textContent;


popupEditbtn.addEventListener("click", openPopup);
popupClosebtn.addEventListener("click", closePopup);
popupContainer.addEventListener('submit', formSubmitHandler); 




