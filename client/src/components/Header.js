import React, { useState } from 'react';
import {
  Row,
  Col,
  Button,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import profilePic from '../images/pr8.jpg';
import { NavLink, Link } from 'react-router-dom';

const Header = () => {
  const [dropDown, setDropDown] = useState(false);
  const toggle = () => setDropDown(!dropDown);
  return (
    <div>
      <Row style={styles.container}>
        <Col lg="4">
          <div>
            <img src={profilePic} alt="Profile" style={styles.image} />
          </div>
        </Col>
        <Col lg="8">
          <div style={styles.text}>
            <p>
              We wake up every day hoping to make this cycle a little better than our past. 
              One step at a time, we walk towards our dreams.
            </p>
            <p>
              My own dreams have always revolved around art, be it martial, performing or the fine
              arts.  That, and an almost embarassingly gratuitous amount of videogames.  Both of these
              molded my imagination.
            </p>
            <p>
              Showing the culmination of 30 years of my personal growth to the unforgiving internet
              is difficult and intimidating.  Even as I write this, I can feel the pressure of 
              insecurity begging me to stop.  That anxiety can be smothering, and make one want to
              give up before they even start.
            </p>
            <p>
              But I'll never stop.
            </p>
            <p>
              My purpose in life is to educate and entertain, and I hope my work exemplifies that 
              perspective.
            </p>
          </div>

          <div style={styles.linkGroup}>
            {/* Use this if Chris wants the ability to add new Projects
            <ButtonDropdown style={styles.dropdown} isOpen={dropDown} toggle={toggle}>
              <DropdownToggle caret color="blue">Create New </DropdownToggle>
              <DropdownMenu>
                <DropdownItem>
                  <Link to="/new-commission">Commission</Link>
                </DropdownItem>
                <DropdownItem>
                  <Link to="/new-project">Project</Link>
                </DropdownItem>
              </DropdownMenu>
            </ButtonDropdown> 
            */}

            <NavLink to="/new-commission" style={styles.link} activeStyle={styles.active}>
              Upload Your Work
            </NavLink>
            <NavLink exact to="/" style={styles.link} activeStyle={styles.active}>
              Art Collection
            </NavLink>
            <NavLink to="/project-list" style={styles.link} activeStyle={styles.active}>
              Passion Projects
            </NavLink>
          </div>
        </Col>
      </Row>
    </div>
  );
};

const styles = {
  container: {
    padding: 10,
    paddingBottom: 60
  },
  image: {
    width: '100%'
  },
  text: {
    paddingTop: 60,
  },
  linkGroup: {
    paddingTop: 60,
    display: 'flex',
    justifyContent: 'center'
  },
  link: {
    padding: 20,
    color: 'white'
  },
  dropdown: {
    paddingRight: 10
  },
  button: {
    paddingRight: 20
  },
  active: {
    backgroundColor: '#3FBADA',
    color: 'black',
    fontWeight: '300'
  }
}

export default Header;