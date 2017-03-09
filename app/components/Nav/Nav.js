import React, { Component } from 'react';
import { Link } from 'react-router';
import './nav.scss';
/*
$(window).resize(function() {
  var more = document.getElementById("js-navigation-more");
  if ($(more).length > 0) {
    var windowWidth = $(window).width();
    var moreLeftSideToPageLeftSide = $(more).offset().left;
    var moreLeftSideToPageRightSide = windowWidth - moreLeftSideToPageLeftSide;

    if (moreLeftSideToPageRightSide < 330) {
      $("#js-navigation-more .submenu .submenu").removeClass("fly-out-right");
      $("#js-navigation-more .submenu .submenu").addClass("fly-out-left");
    }

    if (moreLeftSideToPageRightSide > 330) {
      $("#js-navigation-more .submenu .submenu").removeClass("fly-out-left");
      $("#js-navigation-more .submenu .submenu").addClass("fly-out-right");
    }
  }
});

$(document).ready(function() {
  var menuToggle = $("#js-mobile-menu").unbind();
  $("#js-navigation-menu").removeClass("show");

  menuToggle.on("click", function(e) {
    e.preventDefault();
    $("#js-navigation-menu").slideToggle(function(){
      if($("#js-navigation-menu").is(":hidden")) {
        $("#js-navigation-menu").removeAttr("style");
      }
    });
  });
});
*/
class Nav extends Component {
  render() {
    return (
      <header className="navigation" role="banner">
        <div className="navigation-wrapper">
          <a className="logo">
            <img src="https://raw.githubusercontent.com/thoughtbot/refills/master/source/images/placeholder_square.png" alt="Logo" />
          </a>
          <a className="navigation-menu-button" id="js-mobile-menu">MENU</a>
          <nav role="navigation">
            <ul id="js-navigation-menu" className="navigation-menu show">
              <li className="nav-link"><Link to="/community">Community</Link></li>
              <li className="nav-link"><Link to="/database">Database</Link></li>
              <li id="js-navigation-more" className="nav-link more"><Link to="/tools">Tools</Link>
                <ul className="submenu">
                  <li><Link to="/tools/conversions">Conversions</Link></li>
                  <li><Link to="/tools/brew-day">Brew Day</Link></li>
                  <li className="more"><Link to="/tools/packaging">Packaging</Link>
                    <ul className="submenu">
                      <li><Link to="/tools/carbonation">Carbonation</Link></li>
                      <li><Link to="/tools/priming">Priming</Link></li>
                    </ul>
                  </li>
                  <li className="more"><Link to="/tools/fermentation">Fermentation</Link>
                    <ul className="submenu">
                      <li><Link to="/tools/attenuation">Attenuation</Link></li>
                      <li><Link to="/tools/pitch-rate">Pitch Rate</Link></li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li className="nav-link"><Link to="/signup">Signup</Link></li>
              <li className="nav-link"><Link to="/login">Login</Link></li>
            </ul>
          </nav>
          <div className="navigation-tools">
            <div className="search-bar">
              <form role="search">
                <input type="search" placeholder="Enter Search" />
                <button type="submit">
                  <img src="https://raw.githubusercontent.com/thoughtbot/refills/master/source/images/search-icon.png" alt="Search Icon" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default Nav;
