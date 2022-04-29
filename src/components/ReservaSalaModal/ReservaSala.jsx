import React, { useState } from "react";
import { supabase } from "../../config/supabase";
import Swal from "sweetalert2";
import {
  Modal,
  Typography,
  TextField,
  Paper,
  Button,
} from "@mui/material";
const paperStyle = {
  padding: 20,
  height: "70vh",
  width: 510,
  margin: "90px auto",
  borderRadius: "20px",
};

export default function ReservaSala({ open, handleClose }) {
  const [sala, setSala] = useState("");

  const addSala = async () => {
    let { data, error } = await supabase.from("salas").insert([
      {
        id: Math.floor(Math.random() * 1000),
        nombre: sala,
      },
    ]);

    if (data) {
      Swal.fire({ title: "Sala Registrada", icon: "success" });
    } else if (error) {
      Swal.fire({ title: "Un error ocurrió", icon: "error" });
    }
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
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Crear Nueva Sala
        </Typography>
        <TextField
          fullWidth
          id="filled-basic"
          label="Nombre de la Sala"
          variant="filled"
          onChange={(e) => setSala(e.target.value)}
        />
        <Button onClick={() => addSala()}>Guardar</Button>
      </Paper>
    </Modal>
  );
}
