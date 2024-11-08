import React, { useState } from 'react';
import { read, deletestudent } from '../function_folder/allfunction';
import { useQuery } from '@tanstack/react-query';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Swal from 'sweetalert2';
import Link from 'next/link';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

// Styled TableRow
const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // Hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const index = () => {

    const [searchQuery, setSearchQuery] = useState(''); // For Search Customer

    // Get Answer For Use Query 
    const getRead = async () => {
        const response = await read() // Call Read function
        return response
    }

    // Use Query Area
    const { isLoading, isError, data: readdata, error, refetch } = useQuery({
        queryKey: ['read'],
        queryFn: getRead // This line of code work as same as useEffect()
    })

    // Make Handle For Delete (Start)
    const handleDelete = async (id) => {
        // For Sweet Alert
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this Student Data!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        });
        if (result.isConfirmed) {
            await deletestudent(id);
            refetch()
            // After Deletation Message
            Swal.fire(
                'Deleted!',
                'Student has been deleted',
                'success'
            );
        }
    }
    // Make Handle For Delete (End)

    // Handle For Search
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    // Filter name based on search query
    const filteredStudent = Array.isArray(readdata) && readdata?.filter((readdata) =>
        readdata.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // For Loading 
    if (isLoading) {
        return (
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>
                <h1>Loading...</h1>
            </div>
        )

    }

    // For Error
    if (isError) {
        return <h1>{error.message}</h1>
    }

    return (
        <>
            <input
                type="text"
                placeholder="Search student..."
                value={searchQuery}
                onChange={handleSearchChange}
                style={{
                    marginTop: '80px',
                    width: '100%',
                    padding: '15px',
                    borderRadius: '25px',
                    border: '1px solid #ccc',
                    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                    fontSize: '16px',
                    boxSizing: 'border-box',
                    backgroundImage: 'linear-gradient(to right, #ffffff, #f2f2f2)',
                    backgroundSize: '200% auto',
                    transition: 'background-position 0.5s ease',
                }}
            />

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>SLNO</StyledTableCell>
                            <StyledTableCell>ID</StyledTableCell>
                            <StyledTableCell>Image</StyledTableCell>
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell align="center">Email</StyledTableCell>
                            <StyledTableCell align="center">Phone</StyledTableCell>
                            <StyledTableCell align="center">Edit</StyledTableCell>
                            <StyledTableCell align="center">Delete</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredStudent?.slice(0, readdata.length).reverse()?.map((row, index) => (
                            <StyledTableRow key={row?.name}>
                                <StyledTableCell component="th" scope="row">
                                    {index + 1}
                                </StyledTableCell>
                                <StyledTableCell>
                                    {row?._id.toString().slice(-4)}
                                </StyledTableCell>
                                <StyledTableCell component="th" scope="row">
                                    <img
                                        src={`http://localhost:3004/${row?.image}`}
                                        alt=""
                                        style={{
                                            width: '80px',
                                            height: '80px',
                                            borderRadius: '50%',
                                            objectFit: 'cover',
                                            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                                        }}
                                    />
                                </StyledTableCell>
                                <StyledTableCell component="th" scope="row">
                                    {row?.name}
                                </StyledTableCell>
                                <StyledTableCell align="center">{row?.email}</StyledTableCell>
                                <StyledTableCell align="center">{row?.phone}</StyledTableCell>
                                <StyledTableCell align="center"><Link href={`/edit/${row._id}`}><button className='btn-success'><EditIcon /></button></Link></StyledTableCell>
                                <StyledTableCell align="center"><button onClick={() => handleDelete(row._id)} className='btn-danger'><DeleteIcon /></button></StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default index