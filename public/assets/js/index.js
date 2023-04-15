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
  const submitModalForm = document.querySelector("form.modal__form-group");

    // Открыть модальное окно при клике на кнопку
  document.getElementById("myBtn").addEventListener("click", function() {
    document.querySelector(".modal").classList.add('open');
  });

  const closeModalWindow = () => {
    document.querySelector(".modal").classList.remove('open');
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

      let modalFoot = document.querySelectorAll('.modal-foot');
      if (modalFoot) modalFoot.forEach((val) => val.remove())
  }

  // Закрыть модальное окно при клике на крестик или за его пределами
  document.querySelectorAll(".close, .modal").forEach(function(elem) {
    elem.addEventListener("click", function() {
      closeModalWindow()
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

  const resultOperation = (data, statusCode = 400) => {
    let color, title, icon, text, end;
    if (statusCode === 200) {
      // Получили ответ от сервера
      color = 'modal__success';
      icon = 'fa-check';
      title = 'Спасибо за обращение!';
      text = 'Наш юрист свяжется с Вами в течение 15 минут.';
      end = `<div class="modal__result-bottom">
        <span class="modal__result-link">
        Вернуться к странице</span>
      </div>`
      console.log(statusCode)
    } else {
      // Возникла ошибка
      color = 'modal__fail';
      icon = 'fa-xmark';
      title = 'Возникла ошибка при отправке!';
      text = 'Ваше обращение очень важно для нас.<br>Пожалуйста, свяжитесь с нами другим способом.';
      end = `<div class="modal__result-call">
        <div class="modal__result-phone">
          <a href="tel:+79221749653" class="modal__result-link">+7 (922) 174-96-53</a>
        </div>
        <div class="modal__result-whatsapp">
          <a href="https://wa.me/+79221749653" target="_blank" class="modal__result-link">
            <i class="fab fa-whatsapp"></i>
          </a>
        </div>
        <div class="modal__result-telegram">
          <a href="https://t.me/+79221749653" target="_blank" class="modal__result-link">
            <i class="fab fa-telegram"></i>
          </a>
        </div>
      </div>`
      // console.log(data)
    }

    let el = document.querySelector('.modal-content')
    el.insertAdjacentHTML('beforeend', `
    <div class="modal__result-block modal-foot">
        <div class="modal__result-body">
          <div class="modal__result-icon">
            <i class="fa-solid ${icon} ${color}"></i>
          </div>
          <div class="modal__result-title">
            <p class=${color}>${title}</p>
            <p>${text}</p>
          </div>
        </div>
        ${end}
    </div>`)

    let links = el.lastElementChild.querySelectorAll('.modal__result-link')
    for (let link of links) {
      console.log(link.tagName)
      if (link.tagName === 'SPAN') {
        link.addEventListener("click", () => {
          closeModalWindow()
        })
      }
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

  function nameValidationLength(e) {
    if (this.value.length > 2) {
      addBlockMessage(this, false)
    }
  }

  const dataRequest = async (clientName, clientPhone) => {
    console.log(clientName, clientPhone)
    await fetch("/api/form", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Allow": "POST",
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ clientName, clientPhone })
    })
    .then(response => resultOperation(response.text(), response.status))
    .then()
    .catch(error => resultOperation(error));
  }

  let formSubmission = function(e) {
    e.preventDefault()
    let counter = 0
    const clientName = e.target[0]
    const clientPhone = e.target[1]
    for (let el of [clientName, clientPhone]) {
      if (el.value === '' || el.value === '+7 (___) ___-__-__') {
        addBlockMessage(el)
      } else counter++
    }
    if (counter == 2) {
      dataRequest(clientName.value, clientPhone.value)
    }
  }

  function maskedName(e) {
    const pattern = /^[a-zA-Zа-яА-Я]+$/; // регулярное выражение для букв
    if (!pattern.test(this.value)) {
      this.value = this.value.replace(/[^a-zA-Zа-яА-Я]/g, ""); // удаляем все неправильные символы
    }
  };

  function maskedPhoneValidationLength(e) {
    let counter = 0;
    for (let val of this.value) {
      if (!isNaN(parseInt(val))) {
        counter++;
      }
    }
    if (counter === 11) {
      addBlockMessage(this, false)
    } 
  }

  for (let phoneInput of phoneInputs) {
    phoneInput.addEventListener('input', maskedPhoneValidationLength)
    phoneInput.addEventListener('blur', maskedPhoneValidation)
  }

  for (let nameInput of nameInputs) {
    nameInput.addEventListener("input", maskedName)
    nameInput.addEventListener("input", nameValidationLength)
    nameInput.addEventListener("blur", nameValidation)
  }

  // for (let submitBtn of submitBtns) {
  //   submitBtn.addEventListener("click", function(e) {
  //     e.preventDefault();
  //     for (let el of [...nameInputs, ...phoneInputs]) {
  //       if (el.value === '') {
  //         // Если поля ввода пустые
  //         addBlockMessage(el)
  //         console.log(el) 
  //       } else { }
  //     }
  //     // console.log(phoneInput.value)
  //   })
  // }

  submitModalForm.addEventListener("submit", formSubmission)
})