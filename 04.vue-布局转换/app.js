Vue.filter('searchFor', function (value, searchStr) {
  var result = [];
  if (!searchStr) {
    return value;
  }
  searchStr = searchStr.trim().toLowerCase();
  result = value.filter(function (item) {
    if (item.title.toLowerCase().indexOf(searchStr) !== -1) {
      return item;
    }
  });
  return result;
});

var demo = new Vue({
  el: '#main',
  data: {
    searchStr: "",
    articles: [
      {
        "title": "What You Need To Know About CSS Variables",
        "url": "http://tutorialzine.com/2016/03/what-you-need-to-know-about-css-variables/",
        "image": "http://cdn.tutorialzine.com/wp-content/uploads/2016/03/css-variables-100x100.jpg"
      },
      {
        "title": "Freebie: 4 Great Looking Pricing Tables",
        "url": "http://tutorialzine.com/2016/02/freebie-4-great-looking-pricing-tables/",
        "image": "http://cdn.tutorialzine.com/wp-content/uploads/2016/02/great-looking-pricing-tables-100x100.jpg"
      },
      {
        "title": "20 Interesting JavaScript and CSS Libraries for February 2016",
        "url": "http://tutorialzine.com/2016/02/20-interesting-javascript-and-css-libraries-for-february-2016/",
        "image": "http://cdn.tutorialzine.com/wp-content/uploads/2016/02/interesting-resources-february-100x100.jpg"
      },
      {
        "title": "Quick Tip: The Easiest Way To Make Responsive Headers",
        "url": "http://tutorialzine.com/2016/02/quick-tip-easiest-way-to-make-responsive-headers/",
        "image": "http://cdn.tutorialzine.com/wp-content/uploads/2016/02/quick-tip-responsive-headers-100x100.png"
      },
      {
        "title": "Learn SQL In 20 Minutes",
        "url": "http://tutorialzine.com/2016/01/learn-sql-in-20-minutes/",
        "image": "http://cdn.tutorialzine.com/wp-content/uploads/2016/01/learn-sql-20-minutes-100x100.png"
      },
      {
        "title": "Creating Your First Desktop App With HTML, JS and Electron",
        "url": "http://tutorialzine.com/2015/12/creating-your-first-desktop-app-with-html-js-and-electron/",
        "image": "http://cdn.tutorialzine.com/wp-content/uploads/2015/12/creating-your-first-desktop-app-with-electron-100x100.png"
      }
    ]
  }
});


