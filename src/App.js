import "./App.css";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import plus from "./image/plus.png";
import vector from "./image/vector.png"

// button-group
const buttons = [
  {
    type: "todo",
    label: "To Do",
  },
  {
    type: "done",
    label: "Done",
  },
  {
    type: "trash",
    label: "Trash",
  },
];

const itemsData = [
  {
    key: uuid(),
    label: "Have fun",
    status: "todo"
    
  },
  {
    key: uuid(),
    label: "Spread Empathy",
    status: "todo"
  },
  {
    key: uuid(),
    label: "Generate Value",
    status: "todo"
  },
];

function App() {
  const [value, setValue] = useState("");
  const [items, setItems] = useState(itemsData);
  const [type, setType] = useState("todo");


  const handleChangeValue = (event) => {
    setValue(event.target.value);
  };

  const handleAddItem = () => {
    // no methods => push, pop, splice, shift, unshift, concat, etc.
    // yes methods => spread operator, filter, find, map, forEach, slice, etc.
    const newItem = {
      key: uuid(),
      label: value,
      status: "todo"
    };
    const newItems = [newItem, ...items];

    setItems(newItems);
 
  };

  const changeStatus = (key, status) => {
    setItems(prev => prev.map(item => {
      if (item.key === key) {
        return {...item, status: status}
      }
      return item
    }))

  }

  const handleItemDone = (keyFromLabel) => {
    const index = items.findIndex((item) => item.key === keyFromLabel); //3
    const oldObj = items[index]; // => {key:key,label:label,isDone:true}

    //isMyObject Done?true or false

    const newObj = { ...oldObj, status: 'done' }; //=>{key:key,label:label,isDone:true}

    const leftPart = items.slice(0, index);
    const rightPart = items.slice(index + 1, items.length);
    const newItems = [...leftPart, newObj, ...rightPart];
    // items=>[1,2,3,{key:key,label:label,isDone:true},6]

    setItems(newItems);
  };

  const deleteForever = key => {
    setItems(prev => prev.filter(item => item.key !== key))
  }

  const handleChangeStatus = (typeFromButton) => {
    setType(typeFromButton);
  };

  const filteredItems =
    type === "todo"
      ? items.filter((item) => item.status === 'todo')
      : type === "done"
      ? items.filter((item) => item.status === 'done')
      : items.filter((item) => item.status === 'trash');

  return (
    <div className="todo-app">
      {/* App-header */}
      <div className="app-header d-flex">
        <h1>Simple To Do List</h1>
        <h2>
          Today is awesome day. The weather is awesome, you are awesome too!
        </h2>
      </div>
      <div></div>

      {/* Item-status-filter */}
      <div className="navButtons">
        <div className="btn-group">
          {buttons.map((itemB) => (
            <button
              key={itemB.type}
              type="button"
              className={`navButton  btn${
                itemB.type === type ? "" : "-outline"
              }-info`}
              onClick={() => handleChangeStatus(itemB.type)}
            >
              {itemB.label}
            </button>
          ))}
        </div>
        <div>
          <img src={plus} onClick />
        </div>
      </div>

      {/* List-group */}
      <ul className="todoList list-group todo-list">
        {filteredItems.map((item) => (
          <li key={item.key} className="listItem list-group-item">
            <span className={`todo-list-item ${item.status === 'done' ? "done" : ""}`}>
              <input type="checkbox" 
              ></input>
              <span
                className="todo-list-item-label"
                onClick={() => changeStatus(item.key, 'done')}
              >
                {item.label}
              </span>
              <button
                type="button"
                className="btn btn-outline-danger btn-sm float-right"
                onClick={() => changeStatus(item.key, 'trash')}
              >
                <i className="fa fa-trash-o" />
              </button>
              {item.status === 'trash' && (
                <button className="btn btn-outline-danger btn-sm float-right"
                onClick={() => changeStatus(item.key, 'todo')}
                > <i class="fa fa-check-square" aria-hidden="true"></i>
                
                </button>
              )}
            </span>
          </li>
        ))}
      </ul>

      <div className="item-add-form d-flex">
        <input
          value={value}
          onChange={handleChangeValue}
          type="text"
          className="form-control"
          placeholder="What needs to be done"
        />
        <button className="btn btn-outline-secondary" onClick={handleAddItem}>
          Add item
        </button>
      
      </div>
    </div>
  );
}

export default App;
