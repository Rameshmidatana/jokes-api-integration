import {AppBar, Toolbar, Typography, styled, Button} from '@mui/material'
import { NavLink } from 'react-router-dom'

const Header = styled(AppBar)`
background-color:#045858;
`
const AppLogo = styled(Typography)`
font-weight:bold;
margin-right: 20%;
`
const MenuItem = styled(NavLink)`
font-weight:500;
margin-right: 20px;
color:#ffffff;
text-decoration:none;
`
const MenuText = styled(Button)`
font-weight:500;
color:#ffffff;
text-decoration:none;
`

const NavBar = () =>{
    return(
        <Header position='static'>
            <Toolbar>
                <AppLogo className='logo'>Welcome to Jokes UI Application</AppLogo>
                <MenuItem to='getJokes' className='menu-item'><MenuText>Browse Jokes</MenuText></MenuItem>
                {/* <MenuItem to='apod' className='menu-item'><MenuText>Nasa's Picture of the day</MenuText></MenuItem> */}
            </Toolbar>
        </Header>
    )
}
export default NavBar;