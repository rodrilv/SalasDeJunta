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
export default function ReservaSalaCofig({ id, open, handleClose }) {
  const [value, setValue] = useState();
  

  const getTheTime = () => {
    d = new Date();
    h = d.getHours();
    m = d.getMinutes();
  };

  const reservarSala = async () => {
    const { data, error } = await supabase
      .from("salas")
      .update({ status: "Ocupada" })
      .match({ id: id });

      if(data){

      }else if(error){

      }
  };

  const asignarTiempo = async () => {
    const { data, error } = await supabase.from("salas")
    .update({startHour: h, startMin: m}).match({id: id});

    if(data){

    }else if(error){

    }
    
  };
  const calcularTiempo = async () =>{
    const { data, error } = await supabase.from("salas")
    .update({endHour: h+value, endMin: m}).match({id: id});

    if(data){

    }else if(error){

    }
  };

  const completarReserva = async () => {
    getTheTime();
    await reservarSala();
    await asignarTiempo();
    await calcularTiempo();
  }

  const handleChange = (event) => {
    setValue(event.target.value);
  };

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
