import React, {Component} from 'react';
import NodeIcon from './nodeicon';
import ImageLoader from './ImageLoader';
import DynLoader from './DynLoader';


import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalBody,
  ModalFooter
} from 'react-modal-bootstrap16';


class ModalExample extends Component {
    constructor() {
        super();
        this.state={
            isOpen: true
        }
        this._hideModal=this._hideModal.bind(this);
    }

    _hideModal=() => {
      this.setState({
        isOpen: false
      });
      this.props.turnOffModal();
    };

    render() {
        return (
          <Modal isOpen={this.state.isOpen} onRequestHide={this._hideModal}>
            <ModalHeader>

              <ModalTitle><NodeIcon node={this.props.node} width={"40px"}/>{this.props.node.Name}</ModalTitle>
            </ModalHeader>
            <ModalBody>
              <ImageLoader readFile={this.props.readImg}/>
              <br/>
              <br/>
              <br/>
              <DynLoader readFile={this.props.readDyn}/>
              <br/>
              <br/>
              <br/>
            </ModalBody>
            <ModalFooter>
              <button className='btn btn-default' onClick={this._hideModal}>
                Cancel
              </button>
              <button className='btn btn-primary'>
                Save changes
              </button>
            </ModalFooter>
          </Modal>
        )
    }
}

export default ModalExample;
