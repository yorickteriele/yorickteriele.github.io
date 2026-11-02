export const GOODREADS_USER_ID = "192543272";
export const GOODREADS_PROFILE_URL = `https://www.goodreads.com/user/show/${GOODREADS_USER_ID}-yorick-te-riele`;

export type Shelf = "read" | "to-read" | "currently-reading";

export function goodreadsShelfUrl(shelf: Shelf) {
  return `https://www.goodreads.com/review/list/${GOODREADS_USER_ID}-yorick-te-riele?shelf=${shelf}`;
}
