"use client";
import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import data from '../PageProfileUser.json';
import { Customer, useUpdateCustomer, CustomerPutDTO } from "@/pages/api/CustomerApi";
import { toast } from "react-toastify";
import { getDecodedToken, validateToken } from "@/pages/api/TokenApi";


export default function EditProfileUser({ onSave, user }: { onSave: any, user: Customer }) {

    const [name, setName] = useState(user.name);
    const [surname, setSurname] = useState(user.surname);
    const [phone, setPhone] = useState(user.phone ? user.phone : "");
    const router = useRouter();

    const handleSaveChanges = async () => {
        let updatedUser = await useUpdateCustomer({
            Name: name,
            Surname: surname,
            Email: user.email,
            Id: getDecodedToken()?.nameid,
            Phone: phone,
            AvatarPath: user.avatarPath,
            FavoriteWareIds: user.favoriteWareIds,
            OrderIds: user.orderIds
        });
        toast.success("Дані успішно оновлено!");
        onSave();
    };

    const handleCancel = () => {
        onSave();
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box sx={{ backgroundColor: '#fff', padding: 4, borderRadius: 2, margin: 4, width: '80%' }}>
                <Container maxWidth="sm" style={{ marginTop: '20px' }}>
                    <Typography variant="h5" align="center" gutterBottom>
                        Редагування акаунту
                    </Typography>
                    <Box display="flex" flexDirection="column" gap={2} mt={3}>
                        <TextField
                            label="Ім'я"
                            variant="outlined"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            fullWidth
                            sx={{
                                backgroundColor: '#f0f0f0',
                                borderRadius: 2,
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: '#00AAAD',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#008080',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#008080',
                                    },
                                },
                            }}
                        />
                        <TextField
                            label="Прізвище"
                            variant="outlined"
                            value={surname}
                            onChange={(e) => setSurname(e.target.value)}
                            fullWidth
                            sx={{
                                backgroundColor: '#f0f0f0',
                                borderRadius: 2,
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: '#00AAAD',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#008080',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#008080',
                                    },
                                },
                            }}
                        />
                        <TextField
                            label="Електронна пошта"
                            variant="outlined"
                            value={data.profile.email}
                            disabled
                            fullWidth
                            sx={{
                                backgroundColor: '#f0f0f0',
                                borderRadius: 2,
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: '#00AAAD',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#008080',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#008080',
                                    },
                                },
                            }}
                        />
                        <TextField
                            label="Номер телефону"
                            variant="outlined"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            fullWidth
                            sx={{
                                backgroundColor: '#f0f0f0',
                                borderRadius: 2,
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: '#00AAAD',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#008080',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#008080',
                                    },
                                },
                            }}
                        />
                        <Box display="flex" justifyContent="space-between" mt={2}>
                            <Button variant="contained" color="primary" onClick={handleSaveChanges}
                                sx={{
                                    backgroundColor: '#00AAAD',
                                    color: 'white',
                                    '&:hover': {
                                        color: 'red',
                                        backgroundColor: '#00AAAD',
                                    },
                                }}>
                                Зберегти
                            </Button>
                            <Button variant="outlined" color="secondary" onClick={handleCancel}
                                sx={{
                                    backgroundColor: '#00AAAD',
                                    color: 'white',
                                    '&:hover': {
                                        color: 'red',
                                        backgroundColor: '#00AAAD',
                                    },
                                }}>
                                Скасувати
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </Box>
        </Box>
    );
}