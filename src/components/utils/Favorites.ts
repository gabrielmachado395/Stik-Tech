export function addFavorite(product: any) {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    // evite duplicados
    if (!favorites.find((fav: any) => fav.id === product.id)) {
        favorites.push(product);
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }
}

export function removeFavorite(productId: number) {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    const updatedFavorites = favorites.filter((fav: any) => fav.id !== productId);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
}

export function isFavorite(productId: number): boolean {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    return favorites.some((fav: any) => fav.id === productId);
}

export function getFavorites() {
    return JSON.parse(localStorage.getItem("favorites") || "[]");
}