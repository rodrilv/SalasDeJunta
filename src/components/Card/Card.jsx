import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
} from "@mui/material";
import ReservaSalaCofig from "../../components/ReservaSalaConfigModal";
import { supabase } from "../../config/supabase";
import Swal from "sweetalert2";
let d, h, m;
//Definición de Dependencias, Componentes y Propiedades.

//exportación del componente Cards con sus respectivas props.
export default function Cards({
  id,
  nombre,
  status,
  startHour,
  startMin,
  endHour,
  endMin,
}) {
  //Inicialización de Funciones, Estados, Objetos...
  const [openModal2, setOpenModal2] = useState(false);
  const handleOpenModal2 = () => {
    if (status === "Disponible") {
      setOpenModal2(true);
    } else if (status === "Ocupada") {
      Swal.fire({ icon: "warning", title: "La sala está ocupada!" });
    }
  };
  const handleCloseModal2 = () => {
    setOpenModal2(false);
  };

  //Función que libera una sala que esté siendo ocupada, asignandola como
  //disponible y limpiando sus horarios establecidos.
  const liberarSala = async () => {
    const { data, error } = await supabase
      .from("salas")
      .update({
        status: "Disponible",
        startHour: 0,
        startMin: 0,
        endHour: 0,
        endMin: 0,
      })
      .match({ id: id });
    if (data) {
    } else if (error) {
    }
  };

  const eliminarSala = async () =>{
    const {data, error } = await supabase
    .from("salas")
    .delete()
    .match({id: id});

    if(data){
      Swal.fire({icon: "success", text:"Eliminada Exitosamente"})
    }else if(error){
      Swal.fire({icon: "error", text:"Hubo un error al eliminar..."})
    }
  }
  
  //Esta función nos da como resultado el tiempo actual.
  //
  const getTheTime = () =>{
    d = new Date();
    h = d.getHours();
    m = d.getMinutes();
  }
  /*eslint-disable*/
  useEffect(()=>{
    getTheTime();
  },[])

  useEffect(()=>{
    if(h >= endHour && m >= endMin) {
      liberarSala()
    }else{
      console.log("")
    }
  },[])
  /*eslint-enable*/

  //Retornamos la vista, el componente que muestra la información de las salas de juntas
  return (
    <>
      <Card sx={{ marginTop: 10, marginLeft: 10, maxWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {nombre}
          </Typography>
          <Typography variant="h5" component="div">
            {status}
          </Typography>
          {!endHour ? (
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {"Reserva Disponible"}
            </Typography>
          ) : (
            <>
              <Typography sx={{}} color="text.secondary">
                {"Se reservó a las: " + startHour + ":" + startMin}
              </Typography>

              <Typography sx={{}} color="text.secondary">
                {"Disponible a las: " + endHour + ":" + endMin}
              </Typography>
            </>
          )}
          <Typography variant="body2"></Typography>
        </CardContent>
        <CardActions>
          <Button onClick={() => handleOpenModal2()} size="small">
            Reservar
          </Button>
          <Button onClick={() => liberarSala()}>Liberar</Button>
          <Button onClick={() => eliminarSala()}>Eliminar</Button>
        </CardActions>
      </Card>
      <ReservaSalaCofig
        id={id}
        open={openModal2}
        handleClose={handleCloseModal2}
      />
    </>
  );
}
