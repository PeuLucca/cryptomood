import * as React from 'react';

// MUI components
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

// Components
import Loading from "../Loading";

export default function TableComparison() {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                <TableCell>Dessert (100g serving)</TableCell>
                <TableCell align="right">Calories</TableCell>
                <TableCell align="right">Fat&nbsp;(g)</TableCell>
                <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                <TableCell align="right">Protein&nbsp;(g)</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow
                        key="teste"
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row">
                        Pedro
                        </TableCell>
                        <TableCell align="right">Teste 1</TableCell>
                        <TableCell align="right">Teste 2</TableCell>
                        <TableCell align="right">Teste 3</TableCell>
                        <TableCell align="right">Teste 4</TableCell>
                    </TableRow>
            </TableBody>
            </Table>
        </TableContainer>
    );
}