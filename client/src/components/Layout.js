import React from 'react'
import '../styles/LayoutStyles.css'
import { Sidebarmenu } from '../Data/data'
import { Link } from 'react-router-dom'
const Layout = ({children}) => {
  return (
    <>
    <div className='main'>
        <div className='layout'>
            <div className='sidebar'>
                <div className='logo'>
                    <h6>
                        DOC APP
                    </h6>
                    <hr/>
                </div>
                <div className='menu'>
                    {Sidebarmenu.map(menu=>{
                        return (
                            <>
                                <div className = 'menu-item'>
                                    <i class = {menu.icon}></i>
                                    <Link to={menu.path}>{menu.name}</Link>
                                </div>
                            </>
                        )
                    })}
                </div>
            </div>
            <div className='content'>
                <div className='header'>Header</div>
                <div className='body'>{children}</div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Layout