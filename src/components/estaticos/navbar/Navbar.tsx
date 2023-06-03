import React from "react";
import {Box, Typography} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import AppBar from "@mui/material/AppBar";
import { TokenState } from "../../store/tokens/TokensReducer";
import { addToken } from "../../store/tokens/Action";

import "./Navbar.css";

function Navbar() {
  
  const history = useNavigate();

  const dispatch = useDispatch();

  const token = useSelector<TokenState, TokenState['token']>(
    (state) => state.token
  )

  function goLogout() {
    dispatch(addToken(''));
    toast.info('Usuário desconectado!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
    history("/login");
  }

  let navbarComponent;

  if(token !== '') {
    navbarComponent = <AppBar position="static">
    <Box
      sx={{ flexGrow: 1 }}
      style={{ backgroundColor: "#272A53" }}
      p={4}
      height={"10vh"}
      width={"100%"}
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Box display={'flex'} textAlign={'center'} >
        <Link to={'/perfil'}><Box textAlign={'center'} className="icon"></Box></Link>
        <Box m={1}>
          <Typography variant="h6" color="white">Blog de Animes</Typography>
        </Box>
      </Box>
      <Box display="flex" gap={10}>
        <Link to={"/home"} className="text-decorator-none">
          <Box mx={1} style={{ cursor: "pointer" }}>
            <Typography variant="h6" color="white">Home</Typography>
          </Box>
        </Link>
        <Link to={"/postagens"} className="text-decorator-none">
          <Box mx={1} style={{ cursor: "pointer" }}>
            <Typography variant="h6" color="white">
              Postagens
            </Typography>
          </Box>
        </Link>
        <Link to={"/temas"} className="text-decorator-none">
          <Box mx={1} style={{ cursor: "pointer" }}>
            <Typography variant="h6" color="white">
              Tema
            </Typography>
          </Box>
        </Link>
        <Link to={"/formularioTema"} className="text-decorator-none">
          <Box mx={1} style={{ cursor: "pointer" }}>
            <Typography variant="h6" color="white">
              Cadastrar tema
            </Typography>
          </Box>
        </Link>
      </Box>
    
      <Box mx={1} className="text-decorator-none" onClick={goLogout} paddingLeft={"5px"}>
        <Typography variant="h6" color="white" className="logout-cursor">
        logout
        </Typography>
      </Box>
    </Box>
  </AppBar>
  }

  return (
    <>
      {navbarComponent}
    </>
  );
}

export default Navbar;
