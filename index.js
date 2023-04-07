document.addEventListener("DOMContentLoaded", function () {
  let element = document.getElementById('phone');
  let maskOptions = new IMask (element, {
      mask: '+{7} (000) 000-00-00',
      startsWith: '+7',
      country: 'Russia',
      placeholderChar: '_',
      lazy: false
    });

  const phoneInputs = document.querySelectorAll("#phone");
  const nameInputs = document.querySelectorAll("#name");
  const submitBtns = document.querySelectorAll("#btn-submit");

    // Открыть модальное окно при клике на кнопку
  document.getElementById("myBtn").addEventListener("click", function() {
    document.querySelector(".modal").style.display = "block";
  });

  // Закрыть модальное окно при клике на крестик или за его пределами
  document.querySelectorAll(".close, .modal").forEach(function(elem) {
    elem.addEventListener("click", function() {
      document.querySelector(".modal").style.display = "none";
      [...nameInputs].forEach((el) => { 
        el.value = "", 
        el.className = "",
        el.nextElementSibling.innerHTML = ""
      });
      [...phoneInputs].forEach((el) => { 
        maskOptions.unmaskedValue = "",
        el.className = "",
        el.nextElementSibling.innerHTML = ""
      }); // Очистка поля ввода
    });
  });

  // Предотвращение закрытия модального окна при клике внутри него
  document.querySelector(".modal-content").addEventListener("click", function(event) {
    event.stopPropagation();
  });

  // Пол
  function maskedPhoneValidation(e) {
    let counter = 0;
    for (let val of this.value) {
      if (!isNaN(parseInt(val))) {
        counter++;
      }
    }
    if (counter != 11) {
      maskOptions.unmaskedValue = ''
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

  for (let phoneInput of phoneInputs) {
    phoneInput.addEventListener('blur', maskedPhoneValidation)
  }

  for (let nameInput of nameInputs) {
    nameInput.addEventListener("input", maskedName)
    nameInput.addEventListener("blur", nameValidation)
  }

  for (let submitBtn of submitBtns) {
    submitBtn.addEventListener("click", function(e) {
      e.preventDefault();
      for (let el of [...nameInputs, ...phoneInputs]) {
        if (el.value === '') {
          // Если поля ввода пустые
          addBlockMessage(el)
          console.log(el) 
        } else { }
      }
      // console.log(phoneInput.value)
    })
  }
})