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
import { creation } from '../function_folder/allfunction';
import { useForm } from "react-hook-form"; // Import React Hook Form 
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

    // React Hook Form Area
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null); // For Image

    const onSubmit = async (data) => {

        setLoading(true);

        // Handling Form Data 
        const formdata = new FormData();
        formdata.append("name", data.name);
        formdata.append("email", data.email);
        formdata.append("phone", data.phone);
        formdata.append("city", data.city);
        formdata.append("class", data.class);
        formdata.append("image", image);

        try {
            const response = await creation(formdata)
            console.log("C Response...", response);
            if (response && response?.status === 200) {
                reset()
                setImage('')
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
                            Create
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

                                {/*This form section is for the submit image*/}
                                <Grid item xs={12}>
                                    <div style={{ marginBottom: '20px' }}>
                                        <input type="file" onChange={(e) => setImage(e.target.files[0])} name="image" accept="image/*" className="form-control" />

                                        {image !== "" && image !== undefined && image !== null ? (
                                            <img style={{ height: "180px" }} src={URL.createObjectURL(image)} alt="" className="upload-img" />
                                        ) : (
                                            <>{image === "" && <p style={{ color: 'white' }}>Drag or drop content here</p>}</>
                                        )}
                                    </div>
                                </Grid>
                                {/*Image area end*/}

                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                {loading ? <CircularProgress /> : "Create"}
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