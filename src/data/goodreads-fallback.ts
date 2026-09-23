import type { Book } from "@/lib/goodreads";

// Snapshot of the Goodreads shelves, shown until the live widget data loads
// (or if Goodreads is unreachable). Newest additions first.

const COVERS = "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/";
const REVIEWS = "https://www.goodreads.com/review/show/";

export const fallbackRead: Book[] = [
  { title: "Wreed", author: "Mel Wallis de Vries", cover: `${COVERS}1548443204l/43704831.jpg`, url: `${REVIEWS}8827310485`, rating: 3 },
  { title: "De koninklijke leerling", author: "John Flanagan", cover: `${COVERS}1572292938l/25910723.jpg`, url: `${REVIEWS}8827311993`, rating: 4 },
  { title: "Eus", author: "Özcan Akyol", cover: `${COVERS}1589830961l/53440188.jpg`, url: `${REVIEWS}8827310150`, rating: 4 },
  { title: "Klem", author: "Mel Wallis de Vries", cover: `${COVERS}1548443082l/43704817.jpg`, url: `${REVIEWS}8827310402`, rating: 3 },
  { title: "De Verloren Verhalen", author: "John Flanagan", cover: `${COVERS}1572292874l/16021734.jpg`, url: `${REVIEWS}8827311916`, rating: 4 },
  { title: "Vals", author: "Mel Wallis de Vries", cover: `${COVERS}1677805923l/16011723.jpg`, url: `${REVIEWS}8827310321`, rating: 4 },
  { title: "De keizer van Nihon-Ja", author: "John Flanagan", cover: `${COVERS}1436123658l/25854997.jpg`, url: `${REVIEWS}8827311840`, rating: 5 },
  { title: "De koning van Clonmel", author: "John Flanagan", cover: `${COVERS}1474835810l/32200780.jpg`, url: `${REVIEWS}8827311668`, rating: 4 },
  { title: "Het beleg van Macindaw", author: "John Flanagan", cover: `${COVERS}1572292516l/16017397.jpg`, url: `${REVIEWS}8827311520`, rating: 4 },
  { title: "De magiër van Macindaw", author: "John Flanagan", cover: `${COVERS}1572292432l/16012201.jpg`, url: `${REVIEWS}8827311441`, rating: 4 },
  { title: "De dragers van het Eikenblad", author: "John Flanagan", cover: `${COVERS}1572292355l/16020158.jpg`, url: `${REVIEWS}8827311347`, rating: 5 },
  { title: "Het IJzige Land", author: "John Flanagan", cover: `${COVERS}1572292282l/16010748.jpg`, url: `${REVIEWS}8827311262`, rating: 5 },
  { title: "De Brandende Brug", author: "John Flanagan", cover: `${COVERS}1572292208l/29996073.jpg`, url: `${REVIEWS}8827311173`, rating: 5 },
  { title: "Halt in gevaar", author: "John Flanagan", cover: `${COVERS}1461597890l/29996075.jpg`, url: `${REVIEWS}8827311754`, rating: 5 },
  { title: "God als misvatting", author: "Richard Dawkins", cover: `${COVERS}1428653178l/25332779.jpg`, url: `${REVIEWS}8827308917`, rating: 4 },
  { title: "Angela's Ashes", author: "Frank McCourt", cover: `${COVERS}1429154145l/77344.jpg`, url: `${REVIEWS}8827308600`, rating: 5 },
  { title: "Losgeld voor Erak", author: "John Flanagan", cover: `${COVERS}1572292591l/16014825.jpg`, url: `${REVIEWS}8827311589`, rating: 5 },
  { title: "De angst van de wijze", author: "Patrick Rothfuss", cover: `${COVERS}1430331561l/25451473.jpg`, url: `${REVIEWS}8827309072`, rating: 5 },
  { title: "De naam van de wind", author: "Patrick Rothfuss", cover: `${COVERS}1430331562l/25451474.jpg`, url: `${REVIEWS}8827308992`, rating: 5 },
  { title: "The Metamorphosis", author: "Franz Kafka", cover: `${COVERS}1394230540l/20048667.jpg`, url: `${REVIEWS}8827308439`, rating: 5 },
  { title: "As A Man Thinketh", author: "James Allen", cover: `${COVERS}1347329191l/1519906.jpg`, url: `${REVIEWS}8827309254`, rating: 3 },
  { title: "The Myth of Sisyphus and Other Essays", author: "Albert Camus", cover: `${COVERS}1385607101l/19012451.jpg`, url: `${REVIEWS}8827308522`, rating: 4 },
  { title: "De Ruïnes van Gorlan", author: "John Flanagan", cover: `${COVERS}1572292120l/16010575.jpg`, url: `${REVIEWS}8827311076`, rating: 5 },
  { title: "The Final Empire", author: "Brandon Sanderson", cover: `${COVERS}1317790315l/6425811.jpg`, url: `${REVIEWS}8827309322`, rating: 4 },
  { title: "Het recht van de macht", author: "David Baldacci", cover: `${COVERS}1343173297l/15768678.jpg`, url: `${REVIEWS}8827308815`, rating: 3 },
];

export const fallbackToRead: Book[] = [
  { title: "De helaasheid der dingen", author: "Dimitri Verhulst", cover: `${COVERS}1202326734l/1078784.jpg`, url: `${REVIEWS}8958033839`, rating: 0 },
  { title: "Assassin's Apprentice", author: "Robin Hobb", cover: `${COVERS}1673728072l/77197.jpg`, url: `${REVIEWS}8928886190`, rating: 0 },
  { title: "The Pearl", author: "John Steinbeck", cover: `${COVERS}1437234939l/5308.jpg`, url: `${REVIEWS}8876449454`, rating: 0 },
  { title: "Ulysses", author: "James Joyce", cover: `${COVERS}1756682514l/338798.jpg`, url: `${REVIEWS}8876447209`, rating: 0 },
];
