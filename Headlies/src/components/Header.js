import React from 'react';

const Header = (props) => (
  <div id='header' >
    <div id='headerWelcome'>
      <div id='headerGreeting'>
        Welcome to <span style={{ textDecoration: 'underline' }}>Headlies</span>!
      </div>
      <div id='headerIntro'>
        Try to find the fake headlines from today's news
      </div>
    </div>
    <div id='headerPoweredBy'>
      Powered By <a href='NewsAPI.org'>NewsAPI.org</a>
    </div>
  </div>
);

export default Header;