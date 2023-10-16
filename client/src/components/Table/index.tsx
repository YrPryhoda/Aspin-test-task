import React from "react";
import MuiTable from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { formatDate } from "../../helpers/formatDate";
import { IValue } from "../../../types";
import { Button } from "@mui/material";

interface IProps {
  values: IValue[];
  handlerDelete: (coinId: string) => void;
}

const Table = ({ values, handlerDelete }: IProps) => {
  return (
    <TableContainer component={Paper}>
      <MuiTable sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Data</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {values.map((item, index) => (
            <TableRow
              key={item._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell>{item.amount}</TableCell>
              <TableCell>{formatDate(item.date)}</TableCell>
              <TableCell align="right">
                <Button color="error" onClick={() => handlerDelete(item._id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
};

export default Table;
