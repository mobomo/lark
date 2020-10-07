(function ($) {

  'use strict';

  Drupal.behaviors.sidebarMenuActive = {
    attach: function (context, settings) {
      const path = window.location.pathname;
      const sidebarLinks = document.getElementsByClassName('sidebar-menu__item-link');

      for (let i=0; i < sidebarLinks.length; i++) {
        const href = sidebarLinks[i].getAttribute('href');
        if (href === path) {
          sidebarLinks[i].classList.add('sidebar-menu__item-link--active');
        }
        else {
          sidebarLinks[i].classList.remove('sidebar-menu__item-link--active');
        }
      }

    }
  }

  Drupal.behaviors.sidebarMenuExpand = {
    attach: function (context, settings) {
      const moreLess = document.getElementsByClassName('sidebar-menu__moreless')[0];
      const subList = document.getElementsByClassName('sidebar-menu__sub-list')[0];

      if (moreLess && subList) {
        moreLess.onclick = function () {
          subList.classList.contains('sidebar-menu__sub-list--open') ? subList.classList.remove('sidebar-menu__sub-list--open') : subList.classList.add('sidebar-menu__sub-list--open');
          moreLess.classList.contains('sidebar-menu__moreless--active') ? moreLess.classList.remove('sidebar-menu__moreless--active') : moreLess.classList.add('sidebar-menu__moreless--active');
          // subList.classList.add('sidebar-menu__sub-list--open');
        }
      }
    }
  }

})(jQuery);
