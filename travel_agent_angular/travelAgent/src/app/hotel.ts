
export interface Hotel {
    header: string;
    searchResults: SearchResults;
}
export interface SearchResults {
    results: Result[];
}
export interface Result {
    name: string;
    deals: Deals;
    address: Address;
    guestReviews: GuestReviews;
    optimizedThumbUrls: OptimizedThumbUrls;
    ratePlan: RatePlan;
    starRating: number;
}
export interface RatePlan {
    price: Price;

}
export interface Price {
    current: string;
    info:string;
}
export interface OptimizedThumbUrls {
    srpDesktop: string;
}
export interface Deals {
    specialDeal: SpecialDeal;
}
export interface SpecialDeal {
    dealText: string;
}
export interface Address {
    streetAddress: string;
    locality: string;
    countryName: string;
}
export interface GuestReviews {
    rating: Float32Array;
    badgeText:string;
}
export interface urls{
    vrBadge:string;
}