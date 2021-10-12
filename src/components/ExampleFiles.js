import React from 'react';
import path from 'path';

import ModeModal from './ModeModal';
import ExampleFileLightbox from './ExampleFile_Lightbox';
import ExampleFile from './ExampleFile';
import ExampleAdd from './ExampleAdd';

const fileNameChange = (file, node) => {
  const addOn = node.dynFile.length>0?'-Ex' + +node.dynFile.length:'';
  return node.Name + addOn + '.' + file.name.split('.')[1];
}

class ExampleFiles extends React.Component {
  constructor() {
    super();
    this.state = {
      modalOpen: false,
      modalExOpen: false,
      lightboxOpen: false,
      imgPaths: [],
      dynPaths: [],
      nodeName: '',
      index: 0,
      forceBoth: false,
      modeImg: false,
      modeDyn: false
    }
    this._turnOnModal = this._turnOnModal.bind(this);
    // this._turnOnExModal=this._turnOnExModal.bind(this);
    this._turnOffModal = this._turnOffModal.bind(this);
    this._openLightbox = this._openLightbox.bind(this);
    this._closeLightbox = this._closeLightbox.bind(this);

    this._getExamplePaths = this._getExamplePaths.bind(this);
    this._exAdd = this._exAdd.bind(this);
    this._readImg = this._readImg.bind(this);
    this._readDyn = this._readDyn.bind(this);
  }
  _openLightbox(index) {
    this.setState({ lightboxOpen: true, index })
  }
  _closeLightbox() {
    this.setState({ lightboxOpen: false })
  }

  _turnOnModal(index, forceBoth = false) {
    // console.log(index,forceBoth)
    this.setState({ modalOpen: true, index, forceBoth })
  }
  // _turnOnExModal(index){
  //   this.setState({modalExOpen:true, index})
  // }
  _turnOffModal(index) {
    this.setState({ modalOpen: false, modeImg: false, modeDyn: false, forceBoth: false });
    this._getExamplePaths();
  }

  _readImg(e, r) {

    let reader = new window.FileReader();
    let file = e.target.files[0];

    if (file) {
      reader.readAsDataURL(file); //reads the data as a URL
    }
    reader.onloadend = function () {
      const name = fileNameChange(file, this.props.node);
      let im = this.state.imgPaths[this.state.index];

      let imProp = this.props.node.imageFile[this.state.index];

      im = { name, 'data': reader.result, 'og': im.og || im, 'type': 'image', 'original': imProp.original || imProp };
      const node = this.props.node;
      im.og = `./${path.join('data', 'EXAMPLES', node.Categories.join('/'), node.Group, 'img', `${name}`)}`
      this.props.node.imageFile[this.state.index] = im;
      this.props.node.overrides = true;
      this.setState({ modeImg: true })
      this.props.updateExample(im);
    }.bind(this)

  }

  _readDyn(e, r) {
    let reader = new window.FileReader();
    let file = e.target.files[0];

    if (file) {
      reader.readAsText(file); //reads the data as a URL
    }
    reader.onloadend = function () {
      const name = fileNameChange(file, this.props.node);
      let dyn = this.state.dynPaths[this.state.index];
      let dynProp = this.props.node.dynFile[this.state.index];
      dyn = { name, 'data': reader.result, 'og': dyn.og || dyn, 'type': 'xml', 'original': dynProp.original || dynProp };

      this.props.node.dynFile[this.state.index] = dyn;
      this.props.node.overrides = true;
      this.setState({ dynPaths: this.props.node.dynFile, modeDyn: true })
      this.props.updateExample(dyn);
    }.bind(this)

  }

  _exAdd(node) {
    if (!node.dynFile) {
      node.dynFile = [];
    }
    if (!node.imageFile) {
      node.imageFile = [];
    }

    const first_file_dyn = typeof (node.dynFile[0]) === 'object' ? node.dynFile[0].original : node.dynFile[0] || node.Name;

    node.dynFile.push({ original: first_file_dyn + '-Ex' + (node.dynFile.length + 1) });


    const first_file_im = typeof (node.imageFile[0]) === 'object' ? node.imageFile[0].original : node.imageFile[0] || node.Name;

    node.imageFile.push({ data: './images/examples/example.jpg', original: (first_file_im + '-Ex' + (node.imageFile.length + 1)) });
    // node.dynFile.push('');
    // node.imageFile.push({data:'./images/examples/example.jpg'});
    node.overrides = true;
    this.forceUpdate();
    this._turnOnModal(node.dynFile.length - 1, true);

  }

  _getExamplePaths() {
    let node = this.props.node;
    let images = [];
    let dyns = [];
    node.dynFile && node.dynFile.forEach((f, i) => {
      images.push(_img(node, i));
      dyns.push(_dyn(node, i));
    })
    this.setState({ imgPaths: images, dynPaths: dyns, nodeName: node.Name })

    function _img(subnode, i) {
      const file_name = typeof (subnode.imageFile[i]) === 'object' ? subnode.imageFile[i].original : subnode.imageFile[i];

      const file_name_path = file_name.split(".").length === 1 ? file_name.split('.')[0] + ".jpg" : file_name; //if extension keep extension, else add jpeg

      let imagePath = subnode.imageFile[i].data || `./${path.join('data', 'EXAMPLES', subnode.Categories.join('/'), subnode.Group, 'img', `${file_name_path}`)}`
      return imagePath;
    }

    function _dyn(subnode, i) {
      const file_name = typeof (subnode.dynFile[i]) === 'object' ? subnode.dynFile[i].original : subnode.dynFile[i];
      const file_name_path = file_name.split(".").length === 1 ? file_name.split('.')[0] + ".dyn" : file_name; //if extension keep extension, else add jpeg
      let dynPath = subnode.dynFile[i].og || `./${path.join('data', 'EXAMPLES', subnode.Categories.join('/'), subnode.Group, 'dyn', `${file_name_path}`)}`
      return dynPath.toString();
    }
  }

  componentDidMount() {
    this._getExamplePaths();
  }
  componentDidUpdate() {
    let node = this.props.node;
    if (node.Name !== this.state.nodeName || node.overrides) {
      node.overrides = null;
      this._getExamplePaths();
    }
  }


  render() {
    let node = this.props.node;
    return (
      (node.dynFile && node.dynFile.length > 0)
        ? (
          <div >
            Example File{node.dynFile.length > 1
              ? 's'
              : null}:
                          <br />
            <br />

            {

              node.dynFile.map((f, i) =>
                <ExampleFile node={node} key={i} index={i} turnOnModal={this._turnOnModal} turnOffModal={this._turnOffModal} openLightbox={() => this._openLightbox(i)} dynPaths={this.state.dynPaths} imgPaths={this.state.imgPaths} />
              )
            }

            {//this.state.modalExOpen ? <ModalExample readImg={this._readImg} readDyn={this._readDyn} turnOffModal={this._turnOffModal} node={node} index={this.state.index}/> : null
            }

            {this.state.lightboxOpen ? <ExampleFileLightbox imgPaths={this.state.imgPaths} isOpen={true} closeHandle={this._closeLightbox} index={this.state.index} /> : null}
            <br />
            <ExampleAdd node={node} exAdd={this._exAdd} />

            {this.state.modalOpen ? <ModeModal readImg={this._readImg} modeImg={this.state.modeImg} modeDyn={this.state.modeDyn} forceBoth={this.state.forceBoth} readDyn={this._readDyn} turnOffModal={this._turnOffModal} node={node} index={this.state.index} /> : null}
          </div>
        )
        :
        (
          <div>
            <ExampleAdd node={node} exAdd={this._exAdd} />
          </div>
        )
    )
  }
}

export default ExampleFiles;
