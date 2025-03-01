import {useEffect, useState, Suspense, lazy} from 'react';
const Application = lazy(()=> import('../applications/application.jsx'));
import Discover from "../applications/discover.jsx";

const WindowManager = () => {
  const displayDriver = {
    position: "fixed",
    inset: 0
  };
  const [layer, setLayer] = useState(1);
  const [focus, setFocus] = useState("Discover");
  const [taskList, setTaskList] = useState([]);
  const addTask = (component) => {
    setTaskList(Task => (!Task.includes(component))?
      [...Task, component]:[...Task])
  }
  useEffect(()=>{
    setTimeout(()=>{
      setTaskList(Temp=> [...Temp,
        {
          "component":<Discover addTask = {addTask}/>,
          "type":"Shell",
          "id":taskList.length,
          "layer":0,
          "name":"Discover"
        }
      ])
    }, 200)
  },[])
  return(
    <Suspense fallback={null}>
      <main className="window-manager" style={displayDriver}>
        {
          taskList.map((task) => {
            return (
              <Application key={task.name}
                           name={task.name}
                           uid={task.id}
                           type={task.type}
                           layer={layer}
                           focus={focus}
                           taskList={taskList}
                           setLayer={setLayer}
                           setTaskList={setTaskList}
                           setFocus={setFocus}
              >{task.component}</Application>
            )
          })
        }
        <footer className="task-bar">
          <ul className="task-list">
            {
              taskList.map((task) => {
                if(task.type==="Shell") {
                  return(
                    <li className="shell-task" key={task.name}>
                      <button onClick={()=>{console.log("Discover")}}></button>
                    </li>
                  )
                } else {
                  if (task.name === focus) {
                    return (
                      <li className="task-select" key={task.name}>
                      <button onClick={() => {
                        }}>{task.name}</button>
                      </li>
                    )
                  } else {
                    return (
                      <li className="task" key={task.name}>
                        <button onClick={() => {
                          setFocus(task.name);
                        }}>{task.name}</button>
                      </li>
                    )
                  }
                }
              })
            }
          </ul>
        </footer>
      </main>
    </Suspense>
  )
}
export default WindowManager;