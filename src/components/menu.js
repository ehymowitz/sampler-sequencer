import React, { useState, useEffect } from 'react';
import { FiMic } from 'react-icons/fi';
import { BsFillPlayFill } from 'react-icons/bs';
import { BiGridVertical } from 'react-icons/bi';
import { Route, NavLink, HashRouter } from "react-router-dom";
import Mic from './mic';
import Mpc from './mpc';
import Sequencer from './sequencer'
import HoverTip from './tool-tip'

const Menu = () => {

  useEffect(() => {
    sessionStorage.setItem("page", 2)
  },[])

  const [content, changeContent] = useState(parseInt(sessionStorage.getItem("page")))

  useEffect(() => {
    sessionStorage.setItem("page", content)
  },[content])

  return (
    <React.Fragment>
      <HoverTip />

      <HashRouter>
        <div className = 'container'>
          <Route path ="/sequencer" component={ Sequencer }/>
          <Route exact path ="/" component={ Mic } />
          <Route path ="/mpc" component={ Mpc } />
        </div>

        <div className="menu">
          <ul>
            <li style = {{ fontSize: "30px" }} >
              <NavLink to = "/sequencer" style={ content === 1 ? {color: "white" }: {}} onClick={()=>changeContent(1)}> <BsFillPlayFill/> </NavLink>
            </li>
            <div className="vertical-divider"></div>
            <li style = {{ fontSize: "20px" }}>
              <NavLink to = "/" style={ content === 2 ? {color: "white" }: {}} onClick={()=>changeContent(2)}> <FiMic/> </NavLink>
            </li>
            <div className="vertical-divider"></div>
            <li style = {{ fontSize: "30px" }} >
              <NavLink to = "/mpc" style={ content === 3 ? {color: "white" }: {}} onClick={()=>changeContent(3)}> <BiGridVertical/> </NavLink>
            </li>
          </ul>
        </div>

      </HashRouter>
    </React.Fragment>
  )
}

export default Menu
