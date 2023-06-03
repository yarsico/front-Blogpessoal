import React, {useEffect, useState} from 'react'
import {Box, Card, CardActions, CardContent, Button, Typography} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {Tema} from '../../../models/Tema'
import { getAll } from '../../../service/Service';
import { TokenState } from '../../../store/tokens/TokensReducer';
import './ListaTema.css';


function ListaTema() {

  const [temas, setTemas] = useState<Tema[]>([])

  const token = useSelector<TokenState, TokenState['token']>(
    (state) => state.token
  )

  const history = useNavigate();

  async function getAllTemas() {
      await getAll('/temas', setTemas, {
        headers: {
          Authorization: token
        }
      })
  }

  useEffect(() => {
    getAllTemas()
  }, [])

  useEffect(() => {
    if(token === '') {
      toast.error('Você precisa estar logado!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
      history('/login')
    }
  }, [])

  return (
    <>
      {temas.map((tema) => (
            <Box m={2}>
            <Card variant="outlined">
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Tema
                </Typography>
                <Typography variant="h5" component="h2">
                  {tema.descricao}
                </Typography>
              </CardContent>
              <CardActions>
                <Box display="flex" justifyContent="center" mb={1.5} >
    
                  <Link to= {`/formularioTema/${tema.id}`} className="text-decorator-none">
                    <Box mx={1}>
                      <Button variant="contained" className="marginLeft" size='small' color="primary" >
                        atualizar
                      </Button>
                    </Box>
                  </Link>
                  <Link to={`/deletarTema/${tema.id}`} className="text-decorator-none">
                    <Box mx={1}>
                      <Button variant="contained" size='small' color="secondary">
                        deletar
                      </Button>
                    </Box>
                  </Link>
                </Box>
              </CardActions>
            </Card>
          </Box>
      ))}
    </>
  );
}


export default ListaTema;
