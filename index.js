document.addEventListener("DOMContentLoaded", function () {
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
        el.value = "", 
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
    if (this.value[1] != "7") this.value = `+7${this.value.slice(2)}`
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

  let getInputNumbersValue = function (input) {
      // Return stripped input value — just numbers
      return input.value.replace(/\D/g, '');
  }

  let onPhonePaste = function (e) {
      let input = e.target,
          inputNumbersValue = getInputNumbersValue(input);
      let pasted = e.clipboardData || window.clipboardData;
      if (pasted) {
          let pastedText = pasted.getData('Text');
          if (/\D/g.test(pastedText)) {
              // Attempt to paste non-numeric symbol — remove all non-numeric symbols,
              // formatting will be in onPhoneInput handler
              input.value = inputNumbersValue;
              return;
          }
      }
  }

  let onPhoneInput = function (e) {
      let input = e.target,
          inputNumbersValue = getInputNumbersValue(input),
          selectionStart = input.selectionStart,
          formattedInputValue = "";

      if (!inputNumbersValue) {
          return input.value = "";
      }

      if (input.value.length != selectionStart) {
          // Editing in the middle of input, not last symbol
          if (e.data && /\D/g.test(e.data)) {
              // Attempt to input non-numeric symbol
              input.value = inputNumbersValue;
          }
          return;
      }

      if (["0", "1", "2", "3", "4", "5", "6" ,"7", "8", "9"].indexOf(inputNumbersValue[0]) > -1) {
          if (inputNumbersValue[0] != "7") inputNumbersValue = "7" + inputNumbersValue;
          let firstSymbols = "+7"
          formattedInputValue = input.value = firstSymbols + " ";
          if (inputNumbersValue.length > 0) {
              formattedInputValue += '(' + inputNumbersValue.substring(1, 4);
          }
          if (inputNumbersValue.length >= 5) {
              formattedInputValue += ') ' + inputNumbersValue.substring(4, 7);
          }
          if (inputNumbersValue.length >= 8) {
              formattedInputValue += '-' + inputNumbersValue.substring(7, 9);
          }
          if (inputNumbersValue.length >= 10) {
              formattedInputValue += '-' + inputNumbersValue.substring(9, 11);
          }
      } else {
          formattedInputValue = '+' + inputNumbersValue.substring(0, 16);
      }
      console.log(formattedInputValue)
      input.value = formattedInputValue;
  }
  let onPhoneKeyDown = function (e) {
      // Clear input after remove last symbol
      let inputValue = e.target.value.replace(/\D/g, '');
      if (e.keyCode == 8 && inputValue.length == 1) {
          e.target.value = "";
      }
  }
  for (let phoneInput of phoneInputs) {
      phoneInput.addEventListener('keydown', onPhoneKeyDown);
      phoneInput.addEventListener('input', onPhoneInput);
      phoneInput.addEventListener('paste', onPhonePaste);
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