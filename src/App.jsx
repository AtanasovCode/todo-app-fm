import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import { keyframes, ThemeProvider } from 'styled-components';
import sun from './assets/images/icon-sun.svg';
import moon from './assets/images/icon-moon.svg';
import bg from './assets/images/bg-desktop-dark.jpg';
import check from './assets/images/icon-check.svg';


function App() {

  const [tasks, setTasks] = useState([]);
  const [tasksToShow, setTasksToShow] = useState([]);
  const [taskCount, setTaskCount] = useState(0);
  const [completeTasks, setCompleteTasks] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeTasks, setActiveTasks] = useState([]);
  const [currentFilter, setCurrentFilter] = useState("all");
  const [deleteProcess, setDeleteProcess] = useState(false);
  const [taskName, setTaskName] = useState("");

  const handleAddTask = (key) => {
    if (key === "Enter" && taskName !== "") {
      tasks.push({ name: taskName, complete: false, id: uuidv4() })
      setTaskName("");
      setTaskCount(taskCount + 1);
    }
  }

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  }

  useEffect(() => {
    setCompleteTasks(tasks.filter(item => item.complete !== false));
    setActiveTasks(tasks.filter(item => item.complete !== true));
  }, [taskCount])

  const handleCompleteTask = (task) => {
    const index = tasks.map((e) => e.id).indexOf(task); //Grabs the index of the object

    let temp = tasks;

    temp.map((task, idx) => {
      if (idx === index) {
        if (task.complete === false) {
          setTasks(temp);
          setTaskCount(taskCount - 1);
        }
        task.complete = true;
      }
    })
  }

  const handleRemoveFinished = () => {

    setDeleteProcess(true);

    setTimeout(function () {
      setTasks(tasks.filter(item => item.complete !== true)); //Deletes every complete task
      setTasksToShow(tasks.filter(item => item.complete !== true)); //Deletes every complete task
      setCompleteTasks(tasks.filter(item => item.complete !== true)); //Deletes every complete task
      setDeleteProcess(false);
    }, 1200);
  }

  useEffect(() => {
    if (currentFilter === "all") setTasksToShow(tasks);
    if (currentFilter === "complete") setTasksToShow(completeTasks);
    if (currentFilter === "active") setTasksToShow(activeTasks);
  }, [currentFilter, taskCount])

  return (
    <ThemeProvider theme={isDarkMode ? DarkTheme : LightTheme}>
      <FullBody>
        <StyledImage>
          <img
            src={bg}
            alt="main background image"
          />
        </StyledImage>
        <StyledTodo>
          <StyledHeader>
            <Logo>TODO</Logo>
            <StyledTheme onClick={toggleTheme} src={isDarkMode ? sun : moon}  alt="theme icon" />
          </StyledHeader>
          <StyledTaskInput>
            <StyledRadio />
            <StyledInput
              placeholder="Create a new todo..."
              value={taskName}
              onChange={(e) => setTaskName(e.currentTarget.value)}
              onKeyDown={(e) => handleAddTask(e.key)}
            >
            </StyledInput>
          </StyledTaskInput>
          <StyledTasks>
            <StyledTaskNav>
              <div>{taskCount} items left</div>
              <StyledFilterContainer>
                <StyledFilter state={currentFilter} myState="all" onClick={() => {
                  setCurrentFilter("all");
                }}>All</StyledFilter>
                <StyledFilter state={currentFilter} myState="active" onClick={() => {
                  setCurrentFilter("active");
                }}>Active</StyledFilter>
                <StyledFilter state={currentFilter} myState="complete" onClick={() => {
                  setCurrentFilter("complete");
                }}>Complete</StyledFilter>
              </StyledFilterContainer>
              <StyledFilter myState="only-hover" onClick={handleRemoveFinished}>Remove Finished</StyledFilter>
            </StyledTaskNav>
            {
              tasksToShow.map((task) => {
                return (
                  <StyledTask key={task.id} complete={task.complete} delete={deleteProcess}>
                    <StyledRadio
                      onClick={() => handleCompleteTask(task.id)}
                      complete={task.complete}
                    >
                      <StyledCheck src={check} complete={task.complete} />
                    </StyledRadio>
                    <div>{task.name}</div>
                  </StyledTask>
                );
              })
            }
          </StyledTasks>
        </StyledTodo>
      </FullBody>
    </ThemeProvider>
  )
}

export default App

const DarkTheme = {
  background: "hsl(235, 21%, 11%)",
  app: "hsl(235, 24%, 19%)",
  font: "hsl(234, 39%, 85%)",
  textHover: "hsl(236, 33%, 92%)",
  selected: "hsl(234, 11%, 52%)",
  complete: "hsl(233, 14%, 35%)",
  faded: "hsl(237, 14%, 26%)",
  check: "linear-gradient(hsl(192, 100%, 67%), hsl(280, 87%, 65%))"
}

const LightTheme = {
  background: "hsl(0, 0%, 98%)",
  app: "hsl(236, 33%, 92%)",
  font: "hsl(236, 9%, 61%)",
  textHover: "hsl(235, 19%, 35%)",
  selected: "hsl(236, 9%, 61%)",
  complete: "hsl(236, 9%, 61%)",
  faded: "hsl(236, 9%, 61%)",
  check: "linear-gradient(hsl(192, 100%, 67%), hsl(280, 87%, 65%))"
}


const FullBody = styled.div`
  max-width: 100vw;
  min-height: min-content;
  height: 100vh;
  overflow-x: hidden;
  font-family: 'Josefin Sans', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: black;
  background-color: ${props => props.theme.background};
`

const StyledImage = styled.div`
    width: 100vw;
    height: 220px;
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
`

const StyledTodo = styled.div`
  width: 400px;
  z-index: 3;
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media only screen and (max-width: 550px) {
    width: 90%;
  }
`;

const StyledHeader = styled.div`
  width: 100%;
  display: flex;
  padding: 20px 0;
  align-items: center;
  justify-content: space-between;
`

const Logo = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #fff;
  letter-spacing: 12px;
`;

const StyledTheme = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
`

const StyledTaskInput = styled.div`
  width: 100%;
  height: 50px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background-color: ${props => props.theme.app};
`

const StyledInput = styled.input`
    width: 90%;
    height: 70%;
    font-size: 15px;
    color: ${props => props.theme.font};
    border: none;
    background-color: transparent;
    &::placeholder {
      opacity: .4;
      font-size: 14px;
    }
    &:focus {
      border: none;
      outline: none;
    }
`


const StyledTasks = styled.div`
  width: 100%;
  height: min-content;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  justify-content: center;
  margin-top: 25px;
  position: relative;
  padding-bottom: 35px;
  margin-bottom: 30px;
`;


const StyledTaskNav = styled.div`
  width: 100%;
  height: 35px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${props => props.theme.complete};
  font-size: 11px;
  background-color: ${props => props.theme.app};
`;

const StyledFilterContainer = styled.div`
  display: flex;
  width: 30%;
  align-items: center;
  justify-content: space-between;
  @media only screen and (max-width: 550px) {
    width: 100%;
    padding: 10px;
    position: absolute;
    top: 80%;
    left: 0;
    background-color: ${props => props.theme.app};
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

const StyledFilter = styled.div`
  font-size: 11px;
  color: ${props => props.state === props.myState ? props.theme.font : props.theme.selected};
  &:hover {
    color: ${props => props.theme.textHover};
    cursor: pointer;
  }
  @media only screen and (max-width: 600px) {
    padding-right: 15px;
  }
`;

const shrink = keyframes`
  100% {
    width: 0%;
    opacity: .2;
  }
`;

const grow = keyframes`
  0% {
    opacity: .3;
  }
  50% {
    opacity: 1;
  }
  100% {
    width: 100%;
  }
`

const StyledTask = styled.div`
  width: 100%;
  color: ${props => props.complete ? props.theme.complete : props.theme.font};
  padding: 10px;
  font-size: 13px;
  display: flex;
  align-items: center;
  background-color: ${props => props.theme.app};
  justify-content: flex-start;
  border-top: 1px solid ${props => props.theme.faded};
  border-bottom: 1px solid ${props => props.theme.faded};
  animation: ${props => props.complete && props.delete ? shrink : grow} .5s linear forwards;
  text-decoration: ${props => props.complete === true ? "line-through" : "none"};
`;

const StyledCheck = styled.img`
  width: 8px;
  height: 8px;
  opacity: ${props => props.complete ? "1" : "0"}
`

const StyledRadio = styled.div`
  width: 17px;
  height: 17px;
  background: ${props => props.complete === true ? props => props.theme.check : "transparent"};
  color: transparent;
  border: 1px solid ${props => props.theme.faded};
  border-radius: 50%;
  cursor: pointer;
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border .4s ease;
  transition: background-color .5s ease;
  opacity: 1;
  &:hover {
    border-color: ${props => props.theme.selected};
    transition: border .4s ease;
  }
`

