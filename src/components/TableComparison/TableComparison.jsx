import * as React from 'react';
import { useEffect } from 'react';

// MUI components
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState } from 'react';

// API
import { fetchCryptoComparison } from '../../api';

export default function TableComparison() {
    const [cryptos, setCryptos] = useState([]);

    const handleCryptos = async () => {
        try {
            const data = await fetchCryptoComparison();
            setCryptos(data);
            // name
            // current_price
            // total_volume
            // price_change_24h
            // last_updated
        } catch(e) {
            console.log(e);
        }
    };

    useEffect(() => {
        handleCryptos();
    }, [])

    return (
        <div style={{ margin: "2rem" }}>
            <TableContainer component={Paper} sx={{ backgroundColor: '#121212' }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#1e1e1e' }}>
                            <TableCell sx={{ color: 'white' }}>Crypto</TableCell>
                            <TableCell align="right" sx={{ color: 'white' }}>Price</TableCell>
                            <TableCell align="right" sx={{ color: 'white' }}>Total Volume</TableCell>
                            <TableCell align="right" sx={{ color: 'white' }}>Price Changes &nbsp;(24h)</TableCell>
                            <TableCell align="right" sx={{ color: 'white' }}>Last Updated</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow sx={{ backgroundColor: '#2c2c2c' }}>
                            <TableCell component="th" scope="row" sx={{ color: 'white' }}>
                                Pedro
                            </TableCell>
                            <TableCell align="right" sx={{ color: 'white' }}>Teste 1</TableCell>
                            <TableCell align="right" sx={{ color: 'white' }}>Teste 2</TableCell>
                            <TableCell align="right" sx={{ color: 'white' }}>Teste 3</TableCell>
                            <TableCell align="right" sx={{ color: 'white' }}>Teste 4</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
