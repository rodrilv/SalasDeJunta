import React from "react";
import { Grid } from "@mui/material";
import AddSala from "../AddSala/Sala";
/*Este componente es el componente funcional que será renderizado por la
función principal App. Se añade un grid para que los muestre de manera organizada.
*/
export default function Main() {
  return (
    <Grid item container>
      <AddSala />
    </Grid>
  );
}
