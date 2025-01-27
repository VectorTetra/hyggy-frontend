import themeFrame from '@/app/AdminPanel/tsx/ThemeFrame';
import useAdminPanelStore from '@/store/adminPanel';
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, ThemeProvider, Typography } from '@mui/material';
import { formatCurrency } from "@/app/sharedComponents/methods/formatCurrency";

function FrameExpandableBlock() {
    const { frameRemainsSelectedWare, frameRemainsSidebarVisibility, setFrameRemainsSidebarVisibility } = useAdminPanelStore();

    return (
        <ThemeProvider theme={themeFrame}>
            <Box sx={{ zIndex: 1000, display: "flex", flexDirection: "column" }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography sx={{ textWrap: "wrap" }} variant="h6" gutterBottom>
                        Залишки на складах : {frameRemainsSelectedWare?.description}
                    </Typography>
                    <Button sx={{
                        fontWeight: 'bold', fontSize: '22px',
                        '&:hover': {
                            color: '#005F60',
                        },
                    }} onClick={() => setFrameRemainsSidebarVisibility(false)}> X </Button>
                </Box>
                <TableContainer component={Paper} sx={{ width: '100%' }} onBlur={() => setFrameRemainsSidebarVisibility(false)}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ fontWeight: 1000 }}>
                                <TableCell><Typography variant="h5" component="div" sx={{ fontWeight: 700 }}>Склад</Typography></TableCell>
                                <TableCell align="right"><Typography variant="h6" component="div" sx={{ fontWeight: 700 }}>Залишки</Typography></TableCell>
                                <TableCell align="right"><Typography variant="h6" component="div" sx={{ fontWeight: 700 }}>Загальна сума</Typography></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {frameRemainsSelectedWare?.wareItems
                                ?.filter(wareItem => wareItem.quantity > 0)
                                .map((wareItem) => (
                                    <TableRow key={wareItem.id}>
                                        <TableCell>{wareItem.storage?.shopName || "Загальний склад"}</TableCell>
                                        <TableCell align="right">{wareItem.quantity}</TableCell>
                                        <TableCell align="right">{formatCurrency(wareItem.totalSum, "₴")}</TableCell>
                                    </TableRow>
                                ))}
                            <TableRow key={frameRemainsSelectedWare?.id} sx={{ fontWeight: 700 }}>
                                <TableCell><Typography variant="h6" component="div" sx={{ fontWeight: 700 }}>Всього : </Typography></TableCell>
                                <TableCell align="right"><Typography variant="h6" component="div" sx={{ fontWeight: 700 }}>{frameRemainsSelectedWare?.totalWareItemsQuantity}</Typography></TableCell>
                                <TableCell align="right">
                                    <Typography variant="h6" component="div" sx={{ fontWeight: 700 }}>{formatCurrency(frameRemainsSelectedWare?.totalWareItemsSum ?? 0, "₴")}</Typography>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </ThemeProvider>
    );
}
export default FrameExpandableBlock;

