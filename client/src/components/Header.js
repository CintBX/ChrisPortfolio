import React from 'react';
import img from '../images/chrispic.jpg'

const Header = () => {
  return (
    <div style={styles.container}>
      <h1>Header component</h1>
      {/* <img src={img} alt="for now" />
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
        ex ea commodo consequat. 
        
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
        nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
        officia deserunt mollit anim id est laborum.
      </p> */}
    </div>
  );
};

let styles = {
  container: {
    backgroundColor: 'lightgrey'
  }
}

export default Header;