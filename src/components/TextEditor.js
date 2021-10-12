import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import RichTextEditor from 'react-rte';
import PropTypes from "prop-types";

export default class TextEditor extends Component {
    static propTypes={
        onChange: PropTypes.func
    };
    componentDidUpdate(e){
      if(e.node.inDepth!==this.props.node.inDepth){
        this.setState({
          value: RichTextEditor.createValueFromString(this.props.node.inDepth,'html')
        })
      }

    }
    componentDidMount() {
        //https://www.dhariri.com/posts/57c724e4d1befa66e5b8e056
        document.addEventListener('mousedown', this.handleClickOutside.bind(this), true);
    }
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside.bind(this), true);
    }

    handleClickOutside(event) {
      if(this.props.editInDepth){
        const domNode=ReactDOM.findDOMNode(this);
        if ((!domNode || !domNode.contains(event.target))) {
            this.props.node.inDepth=this.state.value.toString('html'); //this is a mutation, could be improved
            this.props.editInDepthClick();
        }
      }
    }

    state={
        value: RichTextEditor.createValueFromString(this.props.node.inDepth,'html'),
        readOnly:true
    }

    onChange=(value) => {
        this.setState({
            value
        });

        if (this.props.onChange) {
            // Send the changes up to the parent component as an HTML string.
            // This is here to demonstrate using `.toString()` but in a real app it
            // would be better to avoid generating a string on each change.
            this.props.onChange(
                value.toString('html')
            );
        }
    };

    render() {
        // The toolbarConfig object allows you to specify custom buttons, reorder buttons and to add custom css classes.
        // Supported inline styles: https://github.com/facebook/draft-js/blob/master/docs/Advanced-Topics-Inline-Styles.md
        // Supported block types: https://github.com/facebook/draft-js/blob/master/docs/Advanced-Topics-Custom-Block-Render.md#draft-default-block-render-map
        const toolbarConfig={
            // Optionally specify the groups to display (displayed in the order listed).
            display: ['INLINE_STYLE_BUTTONS', 'BLOCK_TYPE_BUTTONS', 'LINK_BUTTONS', 'BLOCK_TYPE_DROPDOWN', 'HISTORY_BUTTONS'],
            INLINE_STYLE_BUTTONS: [{
                label: 'Bold',
                style: 'BOLD',
                className: 'custom-css-class'
            }, {
                label: 'Italic',
                style: 'ITALIC'
            }, {
                label: 'Underline',
                style: 'UNDERLINE'
            }],
            BLOCK_TYPE_DROPDOWN: [{
                label: 'Normal',
                style: 'unstyled'
            }, {
                label: 'Heading',
                style: 'header-three'
            }],
            BLOCK_TYPE_BUTTONS: [{
                label: 'UL',
                style: 'unordered-list-item'
            }, {
                label: 'OL',
                style: 'ordered-list-item'
            }]
        };

        return (
          <
            RichTextEditor toolbarConfig={
                toolbarConfig
            }
            value={
                this.state.value
            }
            onChange={
                this.onChange
            }
            readOnly={!this.props.editInDepth}
            />


        );
    }
}
