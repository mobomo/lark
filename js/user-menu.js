(function ($) {

  'use strict';

  Drupal.behaviors.userMenuExpand = {
    attach: function (context, settings) {
      const toggle = document.getElementsByClassName('user-menu__toggle')[0];
      const subList = document.getElementsByClassName('user-menu__links')[0];

      if (toggle && subList) {
        toggle.onclick = function () {
          subList.classList.contains('js-user-menu__visible') ? subList.classList.remove('js-user-menu__visible') : subList.classList.add('js-user-menu__visible');
          toggle.classList.contains('user-menu__toggle--active') ? toggle.classList.remove('user-menu__toggle--active') : toggle.classList.add('user-menu__toggle--active');
          toggle.blur();
        }
      }
    }
  }

})(jQuery);
