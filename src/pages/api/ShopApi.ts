// import axios from 'axios';
// import type { NextApiRequest, NextApiResponse } from 'next';

// export async function getShops(pageNumber: number = 1, pageSize: number = 1000, searchParameter: string = 'Query') {
//   try {
//     const response = await axios.get('http://localhost:5263/api/Shop', {
//       params: {
//         SearchParameter: searchParameter,
//         PageNumber: pageNumber,
//         PageSize: pageSize,
//       },
//     });

//     return response.data;
//   } catch (error) {
//     console.error('Error fetching shops:', error);
//     throw new Error('Failed to fetch shops');
//   }
// }

// export async function CreateShop(name: string, photoUrl: string, workHours: string, addressId: number, storageId: number ) {
//   try {
//     const response = await axios.post('http://localhost:5263/api/Shop', {
//         Name: name,
//         PhotoUrl: photoUrl,
//         WorkHours: workHours,
//         AddressId: addressId,
//         StorageId: storageId
//     });

//     return response.data;
//   } catch (error) {
//     console.error('Error fetching shops:', error);
//     throw new Error('Failed to fetch shops');
//   }
// }

import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { useMutation, useQuery, useQueryClient } from 'react-query';

export interface ShopQueryParams {
	SearchParameter?: "Query";
	Id?: number;
	AddressId?: number;
	Street?: string;
	HouseNumber?: string;
	City?: string;
	Name?: string;
	State?: string;
	PostalCode?: string;
	Latitude?: number;
	Longitude?: number;
	StorageId?: number;
	OrderId?: number;
	PageNumber?: number;
	PageSize?: number;
	NearestCount?: number;
	StringIds?: string;
	Sorting?: string;
	QueryAny?: string | null;
}
export interface ShopDTO {
	AddressId?: number;
	Id?: number;
	StorageId?: number;
	Name?: string;
	WorkHours?: string;
	PhotoUrl?: string;
	OrderIds?: number[] | null;
	ShopEmployeeIds?: string[] | null;
}
export interface ShopGetDTO {
	id?: number;
	photoUrl?: string;
	workHours?: string;
	name?: string;
	street?: string;
	houseNumber?: string;
	city?: string;
	state?: string;
	postalCode?: string;
	latitude?: number;
	longitude?: number;
	addressId?: number;
	storageId?: number;
	executedOrdersSum?: number;
	orderIds?: number[] | null;
}


// GET запит (вже реалізований)
export async function getShops(params: ShopQueryParams = {}) {
	try {
		const response = await axios.get('http://www.hyggy.somee.com/api/Shop', {
			params,
		});

		return response.data;
	} catch (error) {
		console.error('Error fetching Shops:', error);
		throw new Error('Failed to fetch Shops');
	}
}

// POST запит для створення нового складу
export async function postShop(Shop: ShopDTO) {
	try {
		const response = await axios.post('http://www.hyggy.somee.com/api/Shop', Shop);
		return response.data;
	} catch (error) {
		console.error('Error creating Shop:', error);
		throw new Error('Failed to create Shop');
	}
}

// PUT запит для оновлення існуючого складу
export async function putShop(Shop: ShopDTO) {
	try {
		if (!Shop.Id) {
			throw new Error('Id is required for updating a Shop');
		}

		const response = await axios.put(`http://www.hyggy.somee.com/api/Shop`, Shop);
		return response.data;
	} catch (error) {
		console.error('Error updating Shop:', error);
		throw new Error('Failed to update Shop');
	}
}

// DELETE запит для видалення складу за Id
export async function deleteShop(id: number) {
	try {
		const response = await axios.delete(`http://www.hyggy.somee.com/api/Shop/${id}`);
		return response.data;
	} catch (error) {
		console.error('Error deleting Shop:', error);
		throw new Error('Failed to delete Shop');
	}
}

// Використання useQuery для отримання списку складів (Shops)
export function useShops(params: ShopQueryParams = { SearchParameter: "Query" }) {
	return useQuery(['Shops', params], () => getShops(params), {
		staleTime: Infinity, // Дані залишаються актуальними завжди
		cacheTime: Infinity, // Дані залишаються в кеші без очищення
		refetchOnWindowFocus: false, // Не рефетчити при фокусуванні вікна
	});
}

// Використання useMutation для створення нового складу (Shop)
export function useCreateShop() {
	const queryClient = useQueryClient();
	return useMutation((newShop: ShopDTO) => postShop(newShop), {
		onSuccess: () => {
			queryClient.invalidateQueries('Shops'); // Оновлює кеш даних після створення нового складу
		},
	});
}

// Використання useMutation для оновлення існуючого складу (Shop)
export function useUpdateShop() {
	const queryClient = useQueryClient();
	return useMutation((updatedShop: ShopDTO) => putShop(updatedShop), {
		onSuccess: () => {
			queryClient.invalidateQueries('Shops'); // Оновлює кеш даних після оновлення складу
		},
	});
}

// Використання useMutation для видалення складу (Shop)
export function useDeleteShop() {
	const queryClient = useQueryClient();
	return useMutation((id: number) => deleteShop(id), {
		onSuccess: () => {
			queryClient.invalidateQueries('Shops'); // Оновлює кеш даних після видалення складу
		},
	});
}