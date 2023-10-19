import React from 'react'
import { AppBar , Toolbar , IconButton,Badge,MenuItem,Menu,Typography } from '@material-ui/core'
import { ShoppingCart } from '@material-ui/icons'
import logo from '../../assets/logo.jpg'
import './styleNav.css'
import { Link, useLocation} from 'react-router-dom'

const Navbar = ({ totalitems }) => {

    const location = useLocation();

    
  return (
    <div>
        <AppBar position='fixed' color='inherit' className="AppBar" style={{height:'50px'}}>
            <Toolbar>
                <Typography variant='h6' className="title" color='inherit' component={Link} to='/'>
                    <img src={logo} alt="Logo" height="30px" className="image" />
                    TK's Market
                </Typography>
                <div className="grow"></div>
                {
                    location.pathname === '/' &&
                    <div className="button">
                        <IconButton aria-label='Show cart items' color='inherit' component={Link} to='/cart' >
                            <Badge badgeContent={totalitems} color='secondary' overlap="rectangular">
                                <ShoppingCart className='cart'/>
                            </Badge>
                        </IconButton>
                    </div>
                }
            </Toolbar>
        </AppBar>
    </div>
  )
}

export default Navbar
