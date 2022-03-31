'use strict';
(function () {

  var arrSign = ['-', '+', '/', '*', 'x'],
      arr = [],
      result = 0,
      printCalcul = '',
      arrSort = void 0,
      strSign = void 0,
      error = void 0,
      screen = document.querySelector('.screen span'),
      ele = document.querySelectorAll('.button-item > span'),
      equal = document.querySelector('.sign-equal'),
      clear = document.querySelector('.clear-item  span');

  //operation
  for (var i = 0; i < ele.length; i++) {
    ele[i].addEventListener('click', function (e) {
      var cible = e.target.innerHTML === '_' ? cible = '-' : e.target.innerHTML;
      arr.push(cible);
      printCalcul += cible;
      screen.innerHTML = printCalcul;
      e.preventDefault();
    });
  }
  clear.addEventListener('click', function (e) {
    screen.innerHTML = '   ';
    arr.splice(0, arr.length);
    printCalcul = '';
    screen.classList.remove('error');
    e.preventDefault();
  });

  error = function error(strSignMessage) {
    screen.innerHTML = 'err with sign ' + strSignMessage;
    screen.classList.add('error');
  };

  equal.addEventListener('click', function (e) {
    result = 0;
    strSign = arr.join('');
    arrSort = strSign.match(/(\d+)|\D/g);
    for (var _i = 0, l = arrSort.length; _i < l; _i++) {
      var current = arrSort[_i],
          prev = arrSort[_i - 1],
          next = arrSort[_i + 1];
      prev = prev !== undefined && arrSign.indexOf(prev) === -1 ? parseInt(prev, 10) : '';
      next = next !== undefined && arrSign.indexOf(next) === -1 ? parseInt(next, 10) : '';
      if (arrSign.indexOf(current) >= 0) {
        if (current === '+') {
          if (_i === 1) {
            result = prev + next;
          } else if (_i > 1) {
            result += next;
          } else if (_i === 0) {
            error('+');
            break;
          }
        }
        if (current === '-') {
          if (_i === 1) {
            result = prev - next;
          } else if (_i > 1) {
            result -= next;
          } else if (_i === 0) {
            error('-');
            break;
          }
        }
        if (current === 'x') {
          if (_i === 1) {
            result += prev * next;
          } else if (_i > 1) {
            result *= next;
          } else if (_i === 0) {
            error('*');
            break;
          }
        }
        if (current === '/') {
          if (_i === 1) {
            result += prev / next;
          } else if (_i > 1) {
            result /= next;
          } else if (_i === 0) {
            error('/');
            break;
          }
        }
      }
    }
    if (!screen.classList.contains('error')) {
      screen.innerHTML = result;
    }
    e.preventDefault();
  });
})();
