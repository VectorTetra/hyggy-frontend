"use client";
import { useState } from 'react';
import { Box, Collapse, CssBaseline, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography, Button } from '@mui/material';
import Image from 'next/image';
import CategoryIcon from '@mui/icons-material/Category';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import StoreIcon from '@mui/icons-material/Store';
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import hyggyIcon from '/public/images/AdminPanel/hyggyIcon.png';
import useAdminPanelStore from '@/store/adminPanel'; // Імпортуємо Zustand
import { actionAsyncStorage } from 'next/dist/client/components/action-async-storage-instance';

const drawerWidth = 240;

interface Props {
	window?: () => Window;
}

const MenuItem = ({
	icon,
	text,
	value, // Додаємо значення вкладки
	open = false,
	onClick,
	children,
}: {
	icon: React.ReactNode;
	text: string;
	value: string; // Значення вкладки
	open?: boolean;
	onClick?: () => void;
	children?: React.ReactNode;
}) => {
	// Використовуємо Zustand для отримання активної вкладки
	const { activeTab, setActiveTab } = useAdminPanelStore();
	// Перевірка, чи ця вкладка є активною
	const isActive = activeTab === value;

	// Логіка для відкриття/закриття підменю
	const handleClick = () => {
		// Якщо є дочірні елементи, потрібно змінити їх стан
		if (onClick) onClick();
		else setActiveTab(value); // Зберігаємо вибрану вкладку
	};

	// Перевірка, чи є дочірні елементи
	const hasChildren = !!children;

	// Логіка для визначення кольору тексту та іконки
	const iconColor = hasChildren || !isActive ? '#ffffff' : '#ffd700';
	const textColor = hasChildren || !isActive ? '#ffffff' : '#ffd700';

	return (
		<>
			<ListItem disablePadding>
				<ListItemButton
					onClick={handleClick} // Викликаємо функцію для зміни стану
					sx={{
						backgroundColor: isActive ? '#008b8d' : 'inherit', // Темніший фон, якщо активна
						'&:hover': { backgroundColor: '#007a7d' }, // Темніший фон при наведенні
					}}
				>
					<ListItemIcon sx={{ color: iconColor }}> {/* Білий або контрастний текст */}
						{icon}
					</ListItemIcon>
					<ListItemText
						primary={text}
						primaryTypographyProps={{ fontWeight: 'bold' }}
						sx={{ color: textColor }} // Білий або контрастний текст
					/>
					{/* Якщо є дочірні елементи, показуємо стрілки */}
					{children && (open ? <ExpandLessIcon sx={{ color: 'white' }} /> : <ExpandMoreIcon sx={{ color: 'white' }} />)}
				</ListItemButton>
			</ListItem>

			{/* Якщо є дочірні елементи, розкриваємо їх */}
			{children && (
				<Collapse in={open} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>{children}</List>
				</Collapse>
			)}
		</>
	);
};

// Компонент для вторинного пункту меню
const SubMenuItem = ({ text, value }: { text: string, value: string }) => {
	const { activeTab, setActiveTab } = useAdminPanelStore();
	const isActive = activeTab === value;

	return (
		<ListItemButton
			sx={{
				pl: 9,
				backgroundColor: isActive ? '#008b8d' : 'inherit', // Темніший фон, якщо активна
				'&:hover': { backgroundColor: '#007a7d' }, // Темніший фон при наведенні
			}}
			onClick={() => setActiveTab(value)} // Зберігаємо вибрану вкладку
		>
			<ListItemText
				primary={text}
				sx={{ color: isActive ? '#ffd700' : '#ffffff', fontWeight: 400 }} // Контрастний текст для підпунктів
			/>
		</ListItemButton>
	);
};

export default function Sidebar(props: Props) {
	const { window } = props;
	const [openWarehouses, setOpenWarehouses] = useState(false);
	const { activeTab, setActiveTab } = useAdminPanelStore();
	// Функція для відкриття/закриття підпунктів
	const toggleWarehouses = () => {
		setOpenWarehouses(!openWarehouses);
	};

	// Вміст сайдбару
	const drawer = (
		<div>
			<Toolbar sx={{ padding: '8px 0' }}>
				<Button
					variant="contained"
					color="primary"
					sx={{
						backgroundColor: 'white',
						color: '#00AAAD',
						fontWeight: 'bold',
						textTransform: 'none',
						display: 'flex',
						alignItems: 'center',
						'&:hover': {
							backgroundColor: '#e0f7f8',
						},
					}}
				>
					<Image
						src={hyggyIcon}
						alt="<"
						width={72}
						height={36}
					/>
					<span style={{ marginLeft: '8px' }}>Перейти на сайт</span>
				</Button>
			</Toolbar>
			<Divider />
			<List>
				<MenuItem icon={<CategoryIcon />} text="Товари" value="products" />

				{/* Склади (зі стрілкою для відкриття/закриття підпунктів) */}
				<MenuItem icon={<WarehouseIcon />} text="Склади" value="warehouses" open={openWarehouses} onClick={toggleWarehouses}>
					<SubMenuItem text="Склади" value="warehousesList" />
					<SubMenuItem text="Залишки" value="remains" />
					<SubMenuItem text="Поставки" value="supplies" />
					<SubMenuItem text="Переміщення" value="transfers" />
					<SubMenuItem text="Списання" value="writeOffs" />
				</MenuItem>

				<MenuItem icon={<StoreIcon />} text="Магазини" value="stores" />
				<MenuItem icon={<PeopleIcon />} text="Співробітники" value="employees" />
				<MenuItem icon={<PersonIcon />} text="Клієнти" value="clients" />
				<MenuItem icon={<ShoppingCartIcon />} text="Замовлення" value="orders" />
			</List>
			<Divider />
		</div>
	);

	const container = window !== undefined ? () => window().document.body : undefined;

	return (
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />
			<Box
				component="nav"
				sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
				aria-label="mailbox folders"
			>
				<Drawer
					container={container}
					variant="permanent"
					open
					sx={{
						'& .MuiDrawer-paper': {
							width: drawerWidth,
							backgroundColor: '#00AAAD',
							color: 'white',
						},
					}}
				>
					{drawer}
				</Drawer>
			</Box>
			<Box
				component="main"
				sx={{
					flexGrow: 1,
					p: 3,
					width: { sm: `calc(100% - ${drawerWidth}px)` },
				}}
			>
				{activeTab === 'products' && <div>Товари</div>}
				{activeTab === 'warehousesList' && <div>Склади</div>}
				{activeTab === 'remains' && <div>Залишки</div>}
				{activeTab === 'supplies' && <div>Поставки</div>}
				{activeTab === 'transfers' && <div>Переміщення</div>}
				{activeTab === 'writeOffs' && <div>Списання</div>}
				{activeTab === 'stores' && <div>Магазини</div>}
				{activeTab === 'employees' && <div>Співробітники</div>}
				{activeTab === 'clients' && <div>Клієнти</div>}
				{activeTab === 'orders' && <div>Замовлення</div>}
			</Box>
		</Box>
	);
}
