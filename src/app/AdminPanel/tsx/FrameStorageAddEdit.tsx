import themeFrame from '@/app/AdminPanel/tsx/ThemeFrame';
import { useCreateAddress } from '@/pages/api/AddressApi';
import { getStorages, useCreateStorage, useUpdateStorage } from '@/pages/api/StorageApi';
import useAdminPanelStore from '@/store/adminPanel';
import {
	Box,
	Button,
	CircularProgress,
	FormControlLabel,
	List,
	ListItem,
	ListItemButton,
	Radio,
	RadioGroup,
	TextField,
	ThemeProvider,
	Typography,
} from '@mui/material';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import { useQueryState } from 'nuqs';
import React, { useEffect, useState } from 'react';
import { MapContainer, Marker, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import { toast } from 'react-toastify';
import { customIcon } from '../../shops/components/Map';
import { useDebounce } from 'use-debounce';

const FrameStorageAddEdit = () => {
	const [address, setAddress] = useState('');
	const [debouncedAddress] = useDebounce(address, 1500);
	const [oldAddress, setOldAddress] = useState('');
	const [AddressStreet, setAddressStreet] = useState('');
	const [AddressHouseNumber, setAddressHouseNumber] = useState('');
	const [AddressCity, setAddressCity] = useState('');
	const [AddressState, setAddressState] = useState('');
	const [AddressPostalCode, setAddressPostalCode] = useState('');
	const [AddressLatitude, setAddressLatitude] = useState<number | null>(null);
	const [AddressLongitude, setAddressLongitude] = useState<number | null>(null);
	const [suggestions, setSuggestions] = useState([]);
	const [loading, setLoading] = useState(false);
	const [selectedPosition, setSelectedPosition] = useState<[number, number] | null>(null);
	const [selectedSuggestion, setSelectedSuggestion] = useState<string | null>(null);
	const [activeTab, setActiveTab] = useQueryState("at", { defaultValue: "products", scroll: false, history: "push", shallow: true });
	const { mutateAsync: createStorage } = useCreateStorage();
	const { mutateAsync: updateStorage } = useUpdateStorage();
	const { mutateAsync: createOrFindAddress } = useCreateAddress();
	const warehouseId = useAdminPanelStore((state) => state.warehouseId);
	useEffect(() => {
		if (warehouseId === null) {
			//setSelectedPosition(null);
			setActiveTab('warehousesList');
		}
	}, []);
	const isSaveDisabled =
		AddressLatitude === null ||
		AddressLongitude === null;

	useEffect(() => {
		const fetchAddress = async (id: number) => {
			try {
				if (id === 0) {
					return;
				}
				const warehouses = await getStorages({ SearchParameter: 'Query', Id: id });
				if (warehouses && warehouses.length > 0) {
					const { street, houseNumber, city, state, postalCode, latitude, longitude } = warehouses[0];
					const formattedAddress = `${street} ${houseNumber}, ${city}, ${state}, ${postalCode}`;
					setAddress(formattedAddress);
					setOldAddress(formattedAddress);
					setAddressStreet(street);
					setAddressHouseNumber(houseNumber);
					setAddressCity(city);
					setAddressState(state);
					setAddressPostalCode(postalCode || '');
					setAddressLatitude(latitude);
					setAddressLongitude(longitude);
					setSelectedPosition([latitude, longitude]);
				} else {
					console.error('Склад не знайдено або відповідь пуста.');
				}
				console.log('Відправлений Id складу:', id);
				console.log('Отриманий склад:', warehouses);
			} catch (error) {
				console.error('Error fetching address data:', error);
			}
		};
		if (warehouseId && warehouseId !== 0) {
			fetchAddress(warehouseId);
		}
	}, [warehouseId]);

	const searchAddress = async (query: string) => {
		setLoading(true);
		try {
			const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
				params: {
					q: query,
					format: 'json',
					addressdetails: 1,
					limit: 10,
					countrycodes: 'UA',
					'accept-language': 'uk',
					dedupe: 1
				}
			});
			setSuggestions(response.data);
		} catch (error) {
			console.error('Error fetching address suggestions:', error);
		} finally {
			setLoading(false);
		}
	};
	useEffect(() => {
		console.log('debouncedAddress:', debouncedAddress);
		if (debouncedAddress.length > 2) {
			searchAddress(debouncedAddress); // Виклик API через дебаунс
		} else {
			setSuggestions([]); // Якщо введення коротке, очищуємо підказки
		}
	}, [debouncedAddress]);

	const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		setAddress(value);
		if (value.length > 2) {
			searchAddress(value);
		} else {
			setSuggestions([]);
		}
	};

	const handleSuggestionSelect = (lat: number, lon: number, displayName: string) => {
		setAddress(displayName);
		setSelectedPosition([lat, lon]);
		setSelectedSuggestion(displayName);

		// Використовуйте geocoding API для отримання детальної інформації
		fetchDetailedAddress(lat, lon);
	};

	const fetchDetailedAddress = async (lat: number, lon: number) => {
		try {
			const response = await axios.get(`https://nominatim.openstreetmap.org/reverse`, {
				params: {
					lat,
					lon,
					format: 'json',
					addressdetails: 1,
				},
			});

			if (response.data && response.data.address) {
				const addressDetails = response.data.address;
				console.log("addressDetails", addressDetails);
				// Визначте частини адреси, використовуючи їх ключі
				setAddressStreet(addressDetails.road || '');
				setAddressHouseNumber(addressDetails.house_number || '');
				setAddressCity(addressDetails.city || addressDetails.town || addressDetails.village || '');
				setAddressState(addressDetails.state || '');
				setAddressPostalCode(addressDetails.postcode || '');
				setAddressLatitude(lat);
				setAddressLongitude(lon);
			}
		} catch (error) {
			console.error('Error fetching detailed address:', error);
		}
	};


	const handleMapClick = async (event: any) => {
		const { lat, lng } = event.latlng;
		setSelectedPosition([lat, lng]);
		try {
			const response = await axios.get(`https://nominatim.openstreetmap.org/reverse`, {
				params: {
					lat,
					lon: lng,
					format: 'json',
					addressdetails: 1,
				},
			});
			if (response.data) {
				const { address } = response.data;
				const formattedAddress = `${address.road || ''} ${address.house_number || ''}, ${address.city || ''}, ${address.state || ''}, ${address.postcode || ''}`;

				setAddress(formattedAddress);
				setAddressStreet(address.road || '');
				setAddressHouseNumber(address.house_number || '');
				setAddressCity(address.city || '');
				setAddressState(address.state || '');
				setAddressPostalCode(address.postcode || '');
				setAddressLatitude(lat);
				setAddressLongitude(lng);

				// // Викликати handleAddressChange з новою адресою
				// handleAddressChange({
				// 	target: { value: formattedAddress },
				// } as React.ChangeEvent<HTMLInputElement>);
			}
		} catch (error) {
			console.error('Error fetching address from coordinates:', error);
		}
	};


	const handleSave = async () => {
		try {
			let newStorageDTOCollection = null;

			// Отримання існуючої адреси
			let newUpdatedAddressDTO = await createOrFindAddress({
				HouseNumber: AddressHouseNumber ?? null,
				City: AddressCity ?? null,
				State: AddressState ?? null,
				Street: AddressStreet ?? null,
				PostalCode: AddressPostalCode ?? null,
				Latitude: AddressLatitude ?? null,
				Longitude: AddressLongitude ?? null,
			});
			// Створення нового складу
			if (warehouseId === 0) {
				newStorageDTOCollection = await handleCreateNewWarehouse(newUpdatedAddressDTO);
			} else {
				newStorageDTOCollection = await handleUpdateExistingWarehouse(newUpdatedAddressDTO);
			}

			// Перевірка, чи склад успішно створений або оновлений
			if (newStorageDTOCollection) {
				toast.success(warehouseId === 0 ? "Склад успішно створено!" : "Склад успішно оновлено!");
				setActiveTab("warehousesList");
			}
		} catch (error) {
			console.error('Error while saving:', error);
			toast.error("Виникла помилка під час збереження даних.");
		}
	};

	const handleCreateNewWarehouse = async (newUpdatedAddressDTO) => {
		return await createStorage({ AddressId: newUpdatedAddressDTO.id });
	};

	const handleUpdateExistingWarehouse = async (newUpdatedAddressDTO) => {
		if (!newUpdatedAddressDTO.storageId || newUpdatedAddressDTO.storageId === warehouseId) {
			return await updateStorage({ Id: warehouseId, AddressId: newUpdatedAddressDTO.id });
		} else {
			toast.error("Склад з такою адресою вже існує!");
			return null; // Виходимо, якщо склад вже існує
		}
	};


	return (
		<ThemeProvider theme={themeFrame}>
			<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
				{warehouseId !== null && warehouseId > 0 ? (
					<Typography variant="h5" color="textPrimary">
						Редагування складу
					</Typography>
				) :
					(<Typography variant="h5" color="textPrimary">
						Cтворення нового складу
					</Typography>
					)}
				{oldAddress && (
					<Typography variant="h6" color="textSecondary">
						Стара адреса: {oldAddress}
					</Typography>
				)}
				<TextField
					placeholder="Введіть адресу складу"
					label="Адреса"
					value={address}
					onChange={(e) => setAddress(e.target.value)}
					fullWidth
					variant="outlined"
					autoComplete="off"
				/>
				{loading && <CircularProgress size={24} />}
				<Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', height: '400px', gap: '10px' }}>
					<Box sx={{ flex: 1, overflow: 'auto' }}>
						<RadioGroup value={selectedSuggestion} onChange={(e) => setSelectedSuggestion(e.target.value)}>
							<List>
								{suggestions.map((suggestion: any) => (
									<ListItem key={suggestion.place_id} component="li">
										<ListItemButton onClick={() =>
											handleSuggestionSelect(
												parseFloat(suggestion.lat),
												parseFloat(suggestion.lon),
												suggestion.display_name
											)
										}>
											<FormControlLabel
												control={<Radio />}
												label={suggestion.display_name}
												value={suggestion.display_name}
											/>
										</ListItemButton>
									</ListItem>
								))}
							</List>
						</RadioGroup>
					</Box>
					<Box sx={{ flex: 1 }}>
						{warehouseId !== null && <MapContainer
							key={selectedPosition ? selectedPosition.toString() : 'default'}
							center={selectedPosition || [50.4501, 30.5234]}
							zoom={selectedPosition ? 18 : 12}
							maxZoom={18}
							style={{ height: '100%', width: '100%' }}
						>
							<TileLayer
								url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
								attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
							/>
							<CustomMapEvents onMapClick={handleMapClick} />
							{selectedPosition && <MapFocus position={selectedPosition} zoom={18} />}
							{selectedPosition && <Marker position={selectedPosition} icon={customIcon} />}
						</MapContainer>}
					</Box>
				</Box>
				<Button sx={{ backgroundColor: "#00AAAD" }} disabled={isSaveDisabled} variant="contained" onClick={handleSave}>
					Зберегти
				</Button>
			</Box>
		</ThemeProvider>
	);
};

// Компонент для фокусування карти на мітці
const MapFocus = ({ position, zoom }: { position: [number, number], zoom: number }) => {
	const map = useMap();
	useEffect(() => {
		map.setView(position, zoom);
	}, [position, zoom, map]);
	return null;
};

// Окремий компонент для обробки подій карти
const CustomMapEvents = ({ onMapClick }: { onMapClick: (event: any) => void }) => {
	useMapEvents({
		click: onMapClick,
	});
	return null;
};

export default FrameStorageAddEdit;
