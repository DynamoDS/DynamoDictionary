import React, {Component} from 'react';
import NodeIcon from './NodeIcon';
import ImageLoader from './ImageLoader';
import DynLoader from './DynLoader';


import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalBody,
  ModalFooter
} from 'react-modal-bootstrap16';


class ModeModal extends Component {
    constructor() {
        super();
        this.state={
            isOpen: true,
            imageLoaded:false,
            dynLoaded:true
        }
        this._hideModal=this._hideModal.bind(this);
        this._submitModal=this._submitModal.bind(this);
    }


    _hideModal=() => {
      if((!this.props.modeDyn || !this.props.modeImg) && this.props.forceBoth){
        this.props.node.dynFile.pop();
        this.props.node.imageFile.pop();
      }
      else{
        if(this.props.modeImg){
          let im=this.props.node.imageFile[this.props.index];
          im.data=(im.data && im.og) ? im.og : im.data;
        }
        if(this.props.modeDyn){
          let dyn=this.props.node.dynFile[this.props.index];
          dyn.data=(dyn.data && dyn.og) ? dyn.og : dyn.data;
        }
      }

      this.setState({
        isOpen: false
      });
      this.props.turnOffModal();
    };

    _submitModal=(e) => {
      if((!this.props.modeDyn || !this.props.modeImg) && this.props.forceBoth){
        alert('Error: Please submit image file and dynamo file to create a new example file!')
      }
      else{
        // let isImage=(ims[ims.length-1].data && ims[ims.length-1].data.indexOf('data:image')===-1);

        this.setState({
          isOpen: false
        });
        this.props.turnOffModal();
      }
    }



    render() {
        return (
          <div style={{'textAlign':'center'}}>
            <Modal isOpen={this.state.isOpen} onRequestHide={this._hideModal}>
              <ModalHeader>
                <ModalTitle><NodeIcon node={this.props.node} width={"40px"}/>{this.props.node.TempName||this.props.node.Name}</ModalTitle>
              </ModalHeader>
              <ModalBody>
                <br/>
                <br/>
                <ImageLoader readFile={this.props.readImg} force={this.props.forceBoth} loaded={this.props.modeImg}/>
                <br/>
                <br/>
                <br/>
                <DynLoader readFile={this.props.readDyn} force={this.props.forceBoth} loaded={this.props.modeDyn}/>
                <br/>
                <br/>
                <br/>
              </ModalBody>
              <ModalFooter>
                <button className='btn btn-default' onClick={this._hideModal}>
                  Cancel
                </button>
                <button className='btn btn-primary' onClick={this._submitModal}>
                  Save changes
                </button>
              </ModalFooter>
            </Modal>
          </div>
        )
    }
}

export default ModeModal;
