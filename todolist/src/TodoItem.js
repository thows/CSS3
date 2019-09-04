import React, {Component} from 'react';

//子组件如果想要通信，子组件要调用父组件传递过来的方法
class TodoItem extends Component {

    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this)
    }


    handleDelete() {
        this.props.delete(this.props.index)
    }

    render() {
        const {content} = this.props;
        return (
            <div onClick={this.handleDelete}> {content}</div>
        );
    }
}

export default TodoItem;
