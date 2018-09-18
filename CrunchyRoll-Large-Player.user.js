// ==UserScript==
// @name         CrunchyRoll Large Player
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Enlarges the video player to fill the screen without going full screen
// @author       Alzeric
// @updateURL        https://github.com/alzeric/Crunchyroll-Tampermonkey/raw/master/CrunchyRoll-Large-Player.user.js
// @downloadURL      https://github.com/alzeric/Crunchyroll-Tampermonkey/raw/master/CrunchyRoll-Large-Player.user.js
// @match        http://www.crunchyroll.com/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

(function() {
    'use strict';

    //Edit these values if you want to change how it's display
    var player_width = '92%';
    var player_height = '907px';
    var bgColor = '#212529';
    var plainTxtColor = '#ffffff';
    var linkColor = '#F47521';
    var linkColor2 = '#28A2D8';

    // custom CSS
    var themeEle = {
      player: {ele: '', css: ''},
      bgpt: {ele: '', css: ''},
      ptonly: {ele: '', css: ''},
      bgonly: {ele: '', css: ''},
      lconly: {ele: '', css: ''},
      lc2only: {ele: '', css: ''},
      nobord: {ele: '', css: ''},
      bubimg: {ele: '',css: ''},
    };

    // Player Resize
    var playerid = document.getElementById('showmedia_video_player');
    // So we don't bork the whole site ... let's test to see if player exists
    if (playerid !== null){
        themeEle.player.ele = '#template_container.template-container,.wide-player-container-16-9';
        themeEle.player.css = '{width: ' + player_width + ' !important;height: ' + player_height + ';margin:0 auto;}';
    }

    // BG COLOR + PLAINTXTCOLOR
    themeEle.bgpt.ele = 'body.main-page,.new-template-body,#template_container.template-container.no-adskin,#template_body.old-template-body,#main_content .landscape-element,';
    themeEle.bgpt.ele += '.welcome-countdown-timer,.short-desc,body .landscape-grid .wrapper a:hover .short-desc,.content-menu,.new-template-body .text-link';
    themeEle.bgpt.css = '{background-color: '+ bgColor +' !important;color: '+ plainTxtColor +'}';

    // PLAINTXTCOLOR ONLY
    themeEle.ptonly.ele = '.new-template-body,#footer .footer-column a,.white-wrapper,.welcome-simulcasts .welcome-simulcasts-episode,.welcome-forum-category a,';
    themeEle.ptonly.ele += '.welcome-pulse-date,.welcome-latest-videos li .released,.welcome-latest-videos .ordernum,.welcome-recent-desc,ul.news .news-date-label,';
    themeEle.ptonly.ele += 'ul.news .news-date-label,.news-header-right a,ul.news .news-date-label,ul.news h3 a,ul.news-abbr .byline,ul.newsfeed h3 a,';
    themeEle.ptonly.ele += 'ul.newsfeed .news-date-label,.forum_main-topic-desc-author';
    themeEle.ptonly.css = '{color:'+ plainTxtColor +' !important;}';

    // BG COLOR ONLY
    themeEle.bgonly.ele = '.site-header,#footer_menu,body .small-margin-bottom,#main_content_white, .white-wrapper,.guestbook-sort-bar,.portrait-element,#tabs,';
    themeEle.bgonly.ele += '.forum_main-topic-desc,#footer_menu,.wrapper .portrait-element';
    themeEle.bgonly.css = '{background: none !important; background-color:'+ bgColor +' !important;}';

    // LINKCOLOR ONLY
    themeEle.lconly.ele = '.collection-carousel-overlay-top,.header-menubar li a,#sidebar .landscape-element .series-title,.welcome-latest-videos .name,.welcome-block h1 a,';
    themeEle.lconly.ele += '.welcome-title-list h1 a,a .welcome-countdown-details,.welcome-recent-ep a,.series-data, .small-data,.sub-tabs-menu a:hover .sub-tabs-category,';
    themeEle.lconly.ele += 'ul.news h2 a:hover,ul.newsfeed h2 a:hover,.widget-forumcategory-display-title a:hover,.widget-forumcategory-display-title .widget-forumcategory-display-firstfewpage,';
    themeEle.lconly.ele += '.forum_main-topic-desc-text a:hover,.forum_series-display-title a:hover,.topbar-nav-trail a:hover';
    themeEle.lconly.css = '{color:'+ linkColor +' !important;}';

    // LINKCOLOR2 ONLY
    themeEle.lc2only.ele = '.welcome-crnews-title,.welcome-news-title,.welcome-latest-videos .series,.welcome-countdown-name,.welcome-simulcasts .welcome-simulcasts-collection a,';
    themeEle.lc2only.ele += '.welcome-pulse-title,.welcome-recent-link a,#footer .footer-column h6,.series-title,.sub-tabs-menu a.selected,.new-template-body .text-link.selected,';
    themeEle.lc2only.ele += '.new-template-body .sub-tabs .selectors a.text-link, .new-template-body .text-link,ul.news-top-stories-row li a .top-headline,ul.news h2 a,';
    themeEle.lc2only.ele += 'ul.news .post-ago,ul.news-abbr .post-date,ul.newsfeed h2 a,ul.newsfeed .post-ago,.widget-forumcategory-display-title a,.forum_main-topic-desc-text a,';
    themeEle.lc2only.ele += '.forum_series-display-title a,.topbar-nav-trail a';
    themeEle.lc2only.css = '{color: '+ linkColor2 +' !important;}';

    // Comment bubble image replacement
    themeEle.bubimg.ele = 'a.forum_main-topic-desc-numcomments';
    themeEle.bubimg.css = '{background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAzCAYAAADsBOpPAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjI5QUYxMDlBQkI3ODExRThBMjg0ODBEM0MwMjBDQ0I1IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjI5QUYxMDlCQkI3ODExRThBMjg0ODBEM0MwMjBDQ0I1Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MjlBRjEwOThCQjc4MTFFOEEyODQ4MEQzQzAyMENDQjUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MjlBRjEwOTlCQjc4MTFFOEEyODQ4MEQzQzAyMENDQjUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5CBJX0AAAC6klEQVR42uyaT2gTQRTGv01jFf80ILS1Gj3UVpGIh9YKVhD0UlSqEVpR9GY9KljBtngQBXVr8aDoyXpTK6zW5GYvKkJ7UKtY8FC1RTQaqQjGv21F4nt9G7pZV0hkQ3dhPviSzGQm+5u3s7OTvGjpM3BSMTlqej15sVlXSH0jJ8hPybfJcbSnJ+2NNAfgneSz5CrMrF6R2wi611oZsLwuIneSez0AC5PhFnStk1yUqQxaGpwmH4X3lGFqs0a4yaOw09C61pSZw3wxjZDD8LbekSs5ws0+gGUtIe8KmEuXXxRl4DofAa9l4EU+Aq5g4Nk+Ai4OwGdSwApYAStgBayAFbACVsAKWAErYAWcA3DjHaA9Ld7YXXgSPl4Oxwk61q47B5RVAxdWAgtrgIZTVEkfVr8fmPgODN4AqjdJ25JyKfN7IwP0HXw+kEoCkQbgiQEsrQVKK4Gre4Dt56l9GfC8DwhVSP/wGum3vF7Ky+qkbuAK8KAlxwjPCQEv7wE/XgAJguk7BtTulgEwXPkqAe3ZQu8/o/YlAlRaJbCphJQjW4HYAQFq7hZYFg+G240NT/djQPabR8DHURrU9TymxHhKIjh3BY2WQPf1UOTmZbfhSPOAxr8Cn98CP8ey+3OZ23y6K21YHHFdE7Os/UJh6cdR5WBFL+cxJR4eoShGgEPDUuaRs7jMEEaLnN58xGdmdSNQQ9dEYkgibNXrfmDbSWBza/YxbeKfW7/Q8wKfLBKTPCWSPlrVkgw85CPgxwwc8xFwjIHp0p3Kj3ldnDIwGJiTd60+AD5Md92JzDrMUe7yMGwXwRr2G0cH+aIHYS+ZbH/dOH6TD5Lvk3V4I3XbQZG9ab9xOIlzd5wO47wz7V6mUk6zCgz4y7ywBiHJcSPX5Pj/ibehLF3jbdh7+4IP+UfAv/vN4AZ+g0Ndv1sfHsx3hDloh0Nd3K3juBthXTtOj3tttSfI19yLsHuwPBVoT4oPlmkQN2FdO41/BBgAKoHPjz9JDikAAAAASUVORK5CYII=) no-repeat;}';

    // No Border
    themeEle.nobord.ele = '.content-menu';
    themeEle.nobord.css = '{border:none;}';

     // StringBuilder (creates css string to be injected)
    var injectCss = '';
    for (var key in themeEle){
	     if (themeEle.hasOwnProperty(key)){
  		      injectCss += themeEle[key].ele + themeEle[key].css;
         }
    }
    addGlobalStyle(injectCss);
})();