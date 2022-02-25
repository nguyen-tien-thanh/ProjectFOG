// Đối tượng `Validator`
function Validator(options) {

    // Hàm thực hiện validate
    function validate(inputElement, rule) {
      
      var errorElement = inputElement.parentElement.querySelector(options.errorSelector);
      var  errorMessage = rule.test(inputElement.value);
            
      if(errorMessage) {
        errorElement.innerText = errorMessage;
        inputElement.parentElement.classList.add('invalid');
      } else {
        errorElement.innerText = '';
        inputElement.parentElement.classList.remove('invalid');
  
      }
    }
     
    // lấy element của form cần validate
    var formElement = document.querySelector(options.form);
  
    
  
    
    if(formElement) {
      options.rules.forEach(function (rule){
        var inputElement = formElement.querySelector(rule.selector);
       
        if(inputElement) {
          // xử lý trường hợp blur khỏi input
          inputElement.onblur = function () {
            validate(inputElement, rule);
          }
  
          // xử lý mỗi khi người dùng nhập vào input 
          inputElement.oninput = function () {
            var errorElement = inputElement.parentElement.querySelector('.form-message');
            errorElement.innerText = '';
            inputElement.parentElement.classList.remove('invalid');
          }
        }
  
      });
    }
  }
  
  // định nghĩa các rules 
  // Nguyên tắc của các rules 
  

  
  Validator.isEmail = function(selector) {
    return{
      selector: selector,
      test: function(value) {
        var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return regex.test(value) ? undefined : "This field must be email"
        
      }
    };
  
  }
  
  Validator.minLength = function (selector, min) {
    return {
      selector: selector,
      test: function (value) {
        return value.length >= min ? undefined : `Please enter at least ${min} characters`;
        
      }
    };
  
  }
  
  
  
  