import React, { useState, useEffect, useCallback } from "react";
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

export default function Cards({
  id,
  nombre,
  status,
  startHour,
  startMin,
  endHour,
  endMin,
}) {
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

  const getTheTime = useCallback(() => {
    d = new Date();
    h = d.getHours();
    m = d.getMinutes();
  }, []);

  useEffect(() => {
    getTheTime();
    if (m >= endMin && h >= endHour) {
      liberarSala();
    } else {
    }
  }, []);
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
