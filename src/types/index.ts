export type SortType = 'relevance' | 'newest';

export interface ItemType {
	volumeInfo: {
		authors: string[];
		title: string;
		subtitle: string;
		publishedDate: string;
		image: string | undefined;
		imageLinks: {
			smallThumbnail: string;
			thumbnail: string;
			small: string;
			medium: string;
			large: string;
			extraLarge: string;
		};
	};
	saleInfo: {
		listPrice: {
			amount: number;
			currencyCode: string;
		};
	};
}
export interface BooksType {
	items: ItemType[];
	totalItems: number;
}
