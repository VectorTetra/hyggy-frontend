// services/searchPageLogic.ts
import { Ware, Article } from "@/types/searchTypes";
import { translateText, spellCheck } from "@/services/searchPageApi"; // Імпортуємо API функції
import jsonWares from "../app/search/wares.json"; // Імпортуємо дані товарів
import jsonArticles from "../app/search/articles.json"; // Імпортуємо дані статей

// Функція пошуку товарів та статей за ключовим запитом
export function searchWaresAndArticles(query: string) {
	const foundWares: Ware[] = jsonWares.filter((ware) =>
		ware.longName.toLowerCase().includes(query.toLowerCase())
	);
	const foundArticles: Article[] = jsonArticles.filter((article) =>
		article.title.toLowerCase().includes(query.toLowerCase()) || article.keywords.includes(query.toLowerCase())
	);
	return { foundWares, foundArticles };
}

// Основна логіка пошуку
export async function handleSearch(query: string): Promise<{
	foundWares: Ware[];
	foundArticles: Article[];
}> {
	let foundWares: Ware[] = [];
	let foundArticles: Article[] = [];

	if (query === "") {
		foundWares = jsonWares as Ware[];
		foundArticles = jsonArticles;
	} else {
		const initialResults = searchWaresAndArticles(query);
		foundWares = [...initialResults.foundWares];
		foundArticles = [...initialResults.foundArticles];

		if (foundWares.length === 0 && foundArticles.length === 0) {
			const translatedText = await translateText(query, "uk");
			const translatedResults = searchWaresAndArticles(translatedText);
			foundWares = translatedResults.foundWares;
			foundArticles = translatedResults.foundArticles;
		}

		if (foundWares.length === 0 && foundArticles.length === 0) {
			const correctedResults = await spellCheck(query);
			let additionalWares: Ware[] = [];
			let additionalArticles: Article[] = [];

			for (const item of correctedResults) {
				const iteratedResults = searchWaresAndArticles(item);
				additionalWares = [...additionalWares, ...iteratedResults.foundWares];
				additionalArticles = [
					...additionalArticles,
					...iteratedResults.foundArticles,
				];
			}

			foundWares = [...foundWares, ...additionalWares];
			foundArticles = [...foundArticles, ...additionalArticles];
		}

		foundWares = Array.from(new Set(foundWares.map((item) => item.id))).map(
			(id) => foundWares.find((item) => item.id === id)!
		);

		foundArticles = Array.from(new Set(foundArticles.map((item) => item.title)))
			.map((title) => foundArticles.find((item) => item.title === title)!);
	}

	return { foundWares, foundArticles };
}

// Функція для сортування масиву перед порівнянням
export function sortWares(wares: Ware[], sorting: string = "default"): Ware[] {
	return wares.slice().sort((a, b) => {
		switch (sorting) {
			case "rating_desc":
				return b.rating - a.rating; // Highest rating first
			case "price_asc":
				return a.price - b.price; // Lowest price first
			case "price_desc":
				return b.price - a.price; // Highest price first
			case "alphabet_asc":
				return a.shortName.localeCompare(b.shortName); // Alphabetical A-Z
			case "alphabet_desc":
				return b.shortName.localeCompare(a.shortName); // Alphabetical Z-A
			default:
				return a.id - b.id; // Default sorting by ID
		}
	});
}
