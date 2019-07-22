import React from 'react';
import TodoItem from './TodoItem'

class TodoList extends React.Component {
    // 构造函数，创建执行
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            inputVal: '',

        }
        this.handleInputChange = this.handleInputChange.bind(this)
    }

    handleBtnClick() {
        this.setState({
            list: [...this.state.list, this.state.inputVal],
            inputVal: ''
        })
    }

    handleInputChange(e) {
        this.setState({
            inputVal: e.target.value
        })
    }

    handleItemClick(index) {
        const list = [...this.state.list];
        list.splice(index, 1)

        //jxs 如果设置的键，值一样则可简写
        // this.setState({list: list})
        this.setState({list})
    }

    handleDelete(index) {
        console.log(index)
        const list = [...this.state.list];
        list.splice(index, 1)
        //jxs 如果设置的键，值一样则可简写
        this.setState({list})
    }

    getTodoItem() {
        return (
            //父组件通过属性向子组件传递参数，子组件通过props接收
            this.state.list.map((item, index) => {
                return (
                    <TodoItem
                        
                        delete={this.handleDelete.bind(this)}
                        key={index}
                        index={index}
                        content={item}
                    />
                )
            })
        );
    }

    render() {
        return (

            <React.Fragment>
                <input value={this.state.inputVal}
                       onChange={this.handleInputChange}/>

                <button onClick={this.handleBtnClick.bind(this)}>add</button>
                <ul>
                    {
                        //this.state.list.map((item, index) => {return <li onClick={this.handleItemClick.bind(this, index)} key={index}>{item}</li>})
                        this.getTodoItem()
                    }
                </ul>

            </React.Fragment>
        );
    }
}

export default TodoList
