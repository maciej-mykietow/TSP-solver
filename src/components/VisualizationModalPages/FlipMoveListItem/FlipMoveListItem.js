import { Component } from 'react';
import './FlipMoveListItem.scss';

//FlipMove lib apparently doesn't work well with functional components
export default class FlipMoveListItem extends Component {
    render() {
        const listClass = `list-item card list  ${this.props.listItemClass ? this.props.listItemClass : 'defaultItem'}`;

        return (
            <span id={this.props.index} className={listClass} style={this.props.style}>
                <h5>{this.props.value ? this.props.value : this.props.index+1}</h5>
            </span>
        );
    }
};