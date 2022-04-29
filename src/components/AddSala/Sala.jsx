import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
} from "@mui/material";
import ReservaSala from "../../components/ReservaSalaModal";
import { supabase } from "../../config/supabase";
import Cards from "../Card/Card";

export default function AddSala() {
  //const [idSala, setIdSala] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [salas, setSalas] = useState([]);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  //const [openModal2, setOpenModal2] = useState(false);
  //const handleOpenModal2 = () => setOpenModal2(true);
  //const handleCloseModal2 = () => setOpenModal2(false);

  const GetSalas = async () => {
    const { data, error } = await supabase
      .from("salas")
      .select("id, nombre, status, startHour, startMin, endHour, endMin");

    if (data) {
      setSalas(data);
    } else if (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetSalas();
  });
  return (
    <>
      {salas &&
        salas.map((sl, index) => (
          <Cards
            key={index}
            id={sl.id}
            nombre={sl.nombre}
            status={sl.status}
            startHour={sl.startHour}
            startMin={sl.startMin}
            endHour={sl.endHour}
            endMin={sl.endMin}
            //handleOpen={handleOpenModal2}
          />
        ))}
      <Card sx={{ marginTop: 10, marginLeft: 10, maxWidth: 275 }}>
        <CardContent>
          <img
            onClick={() => handleOpenModal()}
            style={{ height: 80, alignSelf: "center" }}
            src="https://cdn3.iconfinder.com/data/icons/google-material-design-icons/48/ic_add_48px-512.png"
            alt="..."
          ></img>
        </CardContent>
        <CardActions style={{ padding: 20 }}>
          <Typography>Añadir Sala</Typography>
        </CardActions>
      </Card>

      <ReservaSala open={openModal} handleClose={handleCloseModal} />
    </>
  );
}
