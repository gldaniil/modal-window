// Открыть модальное окно при клике на кнопку
document.getElementById("myBtn").addEventListener("click", function() {
  document.querySelector(".modal").style.display = "block";
});

// Закрыть модальное окно при клике на крестик или за его пределами
document.querySelectorAll(".close, .modal").forEach(function(elem) {
  elem.addEventListener("click", function() {
    document.querySelector(".modal").style.display = "none";
    phoneInput.value = ""; // Очистка поля ввода
  });
});

// Предотвращение закрытия модального окна при клике внутри него
document.querySelector(".modal-content").addEventListener("click", function(event) {
  event.stopPropagation();
});

const phoneInput = document.getElementById("phone");

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
    if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = newVal;
    if (e.type == "blur" && this.value.length < 5)  this.value = ""
}

phoneInput.addEventListener("input", maskedPhone);
phoneInput.addEventListener("focus", maskedPhone);
phoneInput.addEventListener("blur", maskedPhone);
phoneInput.addEventListener("keydown", maskedPhone)