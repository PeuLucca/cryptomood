// Core
import * as React from 'react';
import { useEffect, useState } from 'react';

// MUI
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

// API
import { fetchCryptoComparison } from '../../api';

export default function TableComparison() {
    const [cryptos, setCryptos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        const handleCryptos = async () => {
            try {
                const data = await fetchCryptoComparison();
                setCryptos(data);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        handleCryptos();
    }, []);

    const handleChangePage = (_, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 5));
        setPage(0);
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
    };

    const formatDate = (dateString) => {
        return dateString.split('T')[0];
    };

    return (
        <div id='coins' style={{ margin: '2rem' }}>
            <TableContainer component={Paper} sx={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
                {loading ? (
                    <Box display="flex" justifyContent="center" alignItems="center" height={200}>
                        <CircularProgress color="primary" />
                    </Box>
                ) : (
                    <>
                        <Table sx={{ minWidth: 650 }} aria-label="crypto comparison table">
                            <TableHead>
                                <TableRow sx={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}>
                                    <TableCell sx={{ color: 'white' }}>Crypto</TableCell>
                                    <TableCell align="right" sx={{ color: 'white' }}>Price</TableCell>
                                    <TableCell align="right" sx={{ color: 'white' }}>Total Volume</TableCell>
                                    <TableCell align="right" sx={{ color: 'white' }}>Price Change (24h)</TableCell>
                                    <TableCell align="right" sx={{ color: 'white' }}>Last Updated</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {cryptos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => (
                                    <TableRow key={index} sx={{ backgroundColor: '#1e1e1e' }}>
                                        <TableCell sx={{ color: 'rgba(255, 255, 255, 0.87)' }}>{item.name}</TableCell>
                                        <TableCell align="right" sx={{ color: 'rgba(255, 255, 255, 0.87)' }}>{formatPrice(item.current_price)}</TableCell>
                                        <TableCell align="right" sx={{ color: 'rgba(255, 255, 255, 0.87)' }}>{item.total_volume}</TableCell>
                                        <TableCell align="right" sx={{ color: 'rgba(255, 255, 255, 0.87)' }}>{formatPrice(item.price_change_24h)}</TableCell>
                                        <TableCell align="right" sx={{ color: 'rgba(255, 255, 255, 0.87)' }}>{formatDate(item.last_updated)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={cryptos.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            sx={{ color: 'white', backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
                        />
                    </>
                )}
            </TableContainer>
        </div>
    );
}
