import React, { useState } from "react";
import {
  Modal,
  Typography,
  Paper,
  TextField,
  MenuItem,
  Button,
} from "@mui/material";
import { supabase } from "../../config/supabase";
const paperStyle = {
  padding: 20,
  height: "70vh",
  width: 510,
  margin: "90px auto",
  borderRadius: "20px",
};
let d, h, m;
//Definición de Dependencias, Componentes y Propiedades.


export default function ReservaSalaCofig({ id, open, handleClose }) {
  //Inicialización de Funciones, Estados...
  const [value, setValue] = useState();
  
//Volvemos a definir esta función, para que trabaje independientemente de otros componentes.
  const getTheTime = () => {
    d = new Date();
    h = d.getHours();
    m = d.getMinutes();
  };
//Esta función reserva la sala que se desee seleccionar, asignando el status como ocupada
  const reservarSala = async () => {
    const { data, error } = await supabase
      .from("salas")
      .update({ status: "Ocupada" })
      .match({ id: id });

      if(data){

      }else if(error){

      }
  };
//Esta función asigna el tiempo actual, que es la hora inicial de reserva
  const asignarTiempo = async () => {
    const { data, error } = await supabase.from("salas")
    .update({startHour: h, startMin: m}).match({id: id});

    if(data){

    }else if(error){

    }
    
  };
  //Esta función calcula el máximo tiempo para reservar que son (2)* horas.
  const calcularTiempo = async () =>{
    const { data, error } = await supabase.from("salas")
    .update({endHour: h+value, endMin: m}).match({id: id});

    if(data){

    }else if(error){

    }
  };
//Esta función manda a llamar a las anteriores para asignar correctamente el estado completo
//de la reservación de una sala de juntas.
  const completarReserva = async () => {
    getTheTime();
    await reservarSala();
    await asignarTiempo();
    await calcularTiempo();
  }

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  //Retornamos un componente Modal con las dichas opciones disponibles para la reserva
  return (
    <Modal
      style={{ zIndex: 11 }}
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Paper style={paperStyle}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
        ></Typography>
        <TextField
          id="outlined-select-currency"
          select
          label="Tiempo"
          //value={value}
          onChange={handleChange}
          helperText="Selecciona el tiempo que quieres reservar"
        >
          <MenuItem key={1} value={1}>
            {"1 hora"}
          </MenuItem>
          <MenuItem key={2} value={2}>
            {"2 horas"}
          </MenuItem>
        </TextField>
        <Button onClick={() => completarReserva()}>Reservar</Button>
      </Paper>
    </Modal>
  );
}
