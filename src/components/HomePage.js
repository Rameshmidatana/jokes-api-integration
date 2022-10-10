import { Typography, styled, Card, CardContent, CardActions, Button } from "@mui/material"
import { NavLink } from "react-router-dom";

const MenuItem = styled(NavLink)`
font-weight:500;
margin-right: 20px;
color:#000000;
text-decoration:none;
`
const HomePageCard = styled(Card)`
margin:10% auto;
width:50%;
background-color:#045a5a;
color:#ffffff;
font-weight:bold;
`

const HomePage = () =>{
    return(
        <HomePageCard sx={{ minWidth: 275}}>
        <CardContent>
        <Typography><MenuItem to='getJokes' sx={{fontWeight: 900,color:"#ffffff"}}>Browse the Jokes here</MenuItem></Typography>
        </CardContent>
        
      </HomePageCard>





        
    )
}
export default HomePage;