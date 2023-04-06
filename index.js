// Открыть модальное окно при клике на кнопку
document.getElementById("myBtn").addEventListener("click", function() {
  document.querySelector(".modal").style.display = "block";
});

// Закрыть модальное окно при клике на крестик или за его пределами
document.querySelectorAll(".close, .modal").forEach(function(elem) {
  elem.addEventListener("click", function() {
    document.querySelector(".modal").style.display = "none";
    nameInput.value = "";
    phoneInput.value = ""; // Очистка поля ввода
  });
});

// Предотвращение закрытия модального окна при клике внутри него
document.querySelector(".modal-content").addEventListener("click", function(event) {
  event.stopPropagation();
});

const phoneInput = document.querySelector("#phone");
const nameInput = document.querySelector("#name");
const submitBtn = document.querySelector("#btn-submit");

let keyCode;
function maskedPhone(e) {
  e.keyCode && (keyCode = e.keyCode);
  let pos = this.selectionStart;
  if (pos < 3) e.preventDefault();
  let matrix = "+7 (___)-___-__-__",
    i = 0,
    def = matrix.replace(/\D/g, ""),
    val = this.value.replace(/\D/g, ""),
    newVal = matrix.replace(/[_\d]/g, (a) => ( i < val.length ? val.charAt(i++) || def.charAt(i) : a))
  i = newVal.indexOf("_");
  if (i != -1) i < 5 && (i = 3);
  let reg = matrix.slice(0, this.value.length).replace(/_+/g, (a) => {
    return `\\d{1,${a.length}}`}).replace(/[+()]/g, "\\$&");
   reg = new RegExp(`^${reg}$`);
  if (!reg.test(this.value) || this.value.length < 5) this.value = newVal;

  if (e.keyCode === 8 || e.keyCode === 46 || e.keyCode === 151 && this.value.length > 0) {
    // удаляем значение
    this.value = this.value.replace(/\d(?=[^\d]*$)/, '_');
  }

  if (newVal.indexOf("_") != -1) {
    this.setSelectionRange(newVal.indexOf("_"), newVal.indexOf("_"));
  } else {
    this.setSelectionRange(this.value.length, this.value.length);
  }
}
// Пол
function maskedPhoneValidation(e) {
  let counter = 0;
  for (let val of this.value) {
    if (!isNaN(parseInt(val))) {
      counter++;
    }
  }
  if (counter != 11) {
    this.value = ""
    addBlockMessage(this, true)
  } else {
    addBlockMessage(this, false)
  }
}

const addBlockMessage = (e, b = true) => {
  if (b) {
    if (e.classList.contains('is-valid')) {
      e.classList.remove('is-valid')
    }
    e.classList.add('is-invalid')
    e.nextElementSibling.innerHTML = "Необходимо заполнить поле"
  } else {
    if (e.classList.contains('is-invalid')) {
      e.classList.remove('is-invalid')
    }
    e.classList.add("is-valid")
    e.nextElementSibling.innerHTML = ""
  }
}

function nameValidation(e) {
  if (this.value.length < 2) {
    this.value = ""
    addBlockMessage(this, true)
  } else {
    addBlockMessage(this, false)
  }
}

function maskedName(e) {
  const pattern = /^[a-zA-Zа-яА-Я]+$/; // регулярное выражение для букв
  if (!pattern.test(this.value)) {
    this.value = this.value.replace(/[^a-zA-Zа-яА-Я]/g, ""); // удаляем все неправильные символы
  }
};



phoneInput.addEventListener("input", maskedPhone)
phoneInput.addEventListener("focus", maskedPhone)
phoneInput.addEventListener("blur", maskedPhoneValidation)
phoneInput.addEventListener("keydown", maskedPhone)

nameInput.addEventListener("input", maskedName)
nameInput.addEventListener("blur", nameValidation)

submitBtn.addEventListener("click", function(e) {
  e.preventDefault();
  for (let el of [nameInput, phoneInput]) {
    if (el.value === '') {
      // Если поля ввода пустые
      addBlockMessage(el)
      console.log(el) 
    } else { }
  }
  // console.log(phoneInput.value)
})