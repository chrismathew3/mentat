import React, {Component} from 'react';
import {Dropdown, Modal, Header, Button, Icon} from 'semantic-ui-react'
import { Link } from 'react-router-dom';

export default class MainMenuDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    }
  }

  render() {
    if (this.state.showModal) {
      return (
        <Modal basic open >
          <Header icon='archive' content='Delete local storage' />
          <Modal.Content>
            <p>
              Are you sure? This will permanently delete your keys and messages, revoking access to the room.
            </p>
          </Modal.Content>
          <Modal.Actions>
            <Button basic color='red' inverted onClick={() => this.setState({...this.state, showModal: false})}>
              <Icon name='remove' /> No
            </Button>
            <Button color='green' inverted onClick={this.props.burnBrowser} as={Link} to="/">
              <Icon name='checkmark' /> Yes
            </Button>
          </Modal.Actions>
        </Modal>
      )
    }
    return (
      <Dropdown icon='options' size='large' style={{flex: 0}} direction='left'>
        <Dropdown.Menu>
          <Dropdown.Item text='Change appearance' onClick={this.props.changeName}/>
          <Dropdown.Divider />
          <Dropdown.Item text='Delete local storage' onClick={() => this.setState({...this.state, showModal: true})} />
          <Dropdown.Item text='Exit to main menu' as={Link} to='/' />
        </Dropdown.Menu>
      </Dropdown>
    )
  }
}