import React, { useState } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { singlestudent, updatestudent } from '../function_folder/allfunction';
import { useForm } from "react-hook-form"; // Import React Hook Form 
import { useQuery } from '@tanstack/react-query'; // Import useQuery
import { useRouter } from 'next/router';
import { CircularProgress } from "@mui/material"; // Circle Loader 



function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const defaultTheme = createTheme();

const index = () => {

    const router = useRouter();
    const { id } = router.query;

    // React Hook Form Area
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState('');

    // Single data fetch for image handling 
    const getAmi = async () => {
        const response = await singlestudent(id)
        console.log("AMIIIIII", response);
        return response?.data
    }
    const { data: amardata } = useQuery({
        queryKey: ["amardata", id],
        queryFn: getAmi
    })


    // Get product For Single Value (Start)
    const getStudent = async () => {
        try {
            const response = await singlestudent(id);
            console.log("kakaka", response);

            const reg = {
                name: response?.data?.name,
                email: response?.data?.email,
                phone: response?.data?.phone,
                city: response?.data?.city,
                class: response?.data?.class,
                image: response?.data?.image
            };
            reset(reg)

        } catch (error) {
            console.log(error);
        }
    };

    useQuery({ queryFn: getStudent, queryKey: ['singlestudent', id] }) // This line of code work as same as useEffect()
    // Get product For Single Value (End)

    const onSubmit = async (data) => {

        setLoading(true);

        // Handling Form Data 
        const formdata = new FormData();
        formdata.append("name", data.name);
        formdata.append("email", data.email);
        formdata.append("phone", data.phone);
        formdata.append("city", data.city);
        formdata.append("class", data.class);
        formdata.append("image", image || amardata.image);

        try {
            const response = await updatestudent({ formdata, id })
            console.log("U Response...", response);
            if (response && response?.status === 200) {
                router.push('/read')
                setLoading(false)
            } else {
                setLoading(false)
            }
        } catch (error) {
            console.error("Error submitting data:", error);
            setLoading(false)
        }
    }

    return (
        <>


            <ThemeProvider theme={defaultTheme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 15,
                            marginBottom: 8,
                            padding: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.12)'
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <EditIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Update
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 3 }}>
                            <Grid container spacing={2}>

                                <Grid item xs={12} sm={12}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="name"
                                        required
                                        fullWidth
                                        id="name"
                                        label="Name"
                                        autoFocus
                                        InputLabelProps={{
                                            shrink: true,
                                            style: { fontSize: '1rem' } // Adjust the font size as needed
                                        }}
                                        {...register("name", {
                                            required: "This field is Required",
                                            minLength: {
                                                value: 3,
                                                message: "Name must be atleast 3 characters"
                                            }
                                        })}
                                    />
                                    {errors?.name && (
                                        <p style={{ color: 'red' }}>{errors.name.message}</p>
                                    )}
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email"
                                        InputLabelProps={{
                                            shrink: true,
                                            style: { fontSize: '1rem' } // Adjust the font size as needed
                                        }}
                                        {...register("email", {
                                            required: "This field is required",
                                            pattern: {
                                                value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                                message: "Email Pattern should be xyz@gmail.com",
                                            },
                                        })}
                                    />
                                    {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
                                </Grid>

                                <Grid item xs={12} sm={12}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="phone"
                                        required
                                        fullWidth
                                        id="phone"
                                        label="Phone"
                                        type='number'
                                        autoFocus
                                        InputLabelProps={{
                                            shrink: true,
                                            style: { fontSize: '1rem' } // Adjust the font size as needed
                                        }}
                                        {...register("phone", {
                                            required: "This field is Required",
                                            minLength: {
                                                value: 10,
                                                message: "Phone must be atleast 10 characters"
                                            },
                                            maxLength: {
                                                value: 10,
                                                message: "Phone must be atleast 10 characters"
                                            }
                                        })}
                                    />
                                    {errors?.phone && (
                                        <p style={{ color: 'red' }}>{errors.phone.message}</p>
                                    )}
                                </Grid>

                                <Grid item xs={12} sm={12}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="city"
                                        required
                                        fullWidth
                                        id="city"
                                        label="City"
                                        autoFocus
                                        InputLabelProps={{
                                            shrink: true,
                                            style: { fontSize: '1rem' } // Adjust the font size as needed
                                        }}
                                        {...register("city", {
                                            required: "This field is Required",
                                            minLength: {
                                                value: 3,
                                                message: "City must be atleast 3 characters"
                                            }
                                        })}
                                    />
                                    {errors?.city && (
                                        <p style={{ color: 'red' }}>{errors.city.message}</p>
                                    )}
                                </Grid>

                                <Grid item xs={12} sm={12}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="class"
                                        required
                                        fullWidth
                                        id="class"
                                        label="Class"
                                        autoFocus
                                        InputLabelProps={{
                                            shrink: true,
                                            style: { fontSize: '1rem' } // Adjust the font size as needed
                                        }}
                                        {...register("class", {
                                            required: "This field is Required",
                                            minLength: {
                                                value: 3,
                                                message: "Class must be atleast 3 characters"
                                            }
                                        })}
                                    />
                                    {errors?.class && (
                                        <p style={{ color: 'red' }}>{errors.class.message}</p>
                                    )}
                                </Grid>

                                {/*Handle Image Area Start*/}
                                <Grid item xs={12}>
                                    <div style={{ marginBottom: '20px' }}>
                                        <input
                                            type="file"
                                            onChange={(e) => setImage(e.target.files[0])}
                                            name="image"
                                            accept="image/*"
                                            className="form-control"
                                        />

                                        {image ? (
                                            <img
                                                height="180px"
                                                src={URL.createObjectURL(image)}
                                                alt="Uploaded"
                                                className="upload-img"
                                            />
                                        ) : (
                                            <img
                                                height="180px"
                                                src={`http://localhost:3004/${amardata?.image}`}
                                                alt="Existing Employee"
                                                className="upload-img"
                                            />
                                        )}
                                    </div>
                                </Grid>
                                {/*Handle Image area end*/}

                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                {loading ? <CircularProgress /> : "Update"}
                            </Button>

                        </Box>
                    </Box>
                    <Copyright sx={{ mt: 5 }} />
                </Container>
            </ThemeProvider>


        </>
    )
}

export default index