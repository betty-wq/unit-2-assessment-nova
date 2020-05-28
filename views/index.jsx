const React = require('react');

class Index extends React.Component{
    render(){
        const {todos} = this.props;
        return(
            <div>
                <h1>To Do List</h1>
                <ul>
                    {
                        this.props.todos.map((todo, i) =>{
                            return(
                                <li>
                                    <p>{todo.name} - {todo.done ? `done`: `not done`}</p>
                                    
                                    <form action={`/${todo._id}?_method=DELETE`} method="post">
                                <input type="submit" value="delete"/>
                            </form>
                                </li>
                                
                            )
                        })
                        
                    }
                </ul>
                    <form action="/" method="POST">
                    <input type="text" name="name"></input>
                    <input type="checkbox" name="done"/>
                    <input type="submit" value="Add To Do"/>
                    </form>
            </div>
        )
    }
}

module.exports = Index