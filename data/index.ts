import { images } from "../constants";

export const products = [{
    name: "Lepakshi Handicrafts Wooden Etikoppaka Six in One Dolls Female",
    // category: "Dorothy Perkins",
    ratingValue: 3,
    totalRating: 10,
    salePrice: 12,
    price: 15,
    currency: "$",
    image: images.product10
}, {
    name: "Lepakshi Handicrafts Leather Puppetry Lamp Shades Flower Design",
    // category: "Sitily",
    ratingValue: 5,
    totalRating: 2,
    salePrice: 22,
    price: 19,
    currency: "$",
    image: images.product1012,
    discount: '-20%'
}, {
    name: "Lepakshi Handicrafts Leather Puppetry Door & Wall Hangings Gowri Ganesh",
    // category: "Dorothy Perkins",
    price: 14,
    currency: "$",
    image: images.product112
}, {
    name: "Lepakshi Handicrafts Wooden Etikoppaka Natraj Ganapathi",
    // category: "Dorothy Perkins",
    ratingValue: 4,
    totalRating: 50,
    price: 12,
    currency: "$",
    image: images.product13,
    discount: '-20%'
},
{
    name: "Lepakshi Handicrafts Wooden Kondapalli Vegetable cart",
    // category: "Dorothy Perkins",
    ratingValue: 4,
    totalRating: 50,
    price: 12,
    currency: "$",
    image: images.product14,
    discount: '-20%'
},
{
    name: "Lepakshi Handicrafts Wooden Etikoppaka Home Decorative Kissan (Farmer) Family Dolls",
    // category: "Dorothy Perkins",
    ratingValue: 4,
    totalRating: 50,
    price: 12,
    currency: "$",
    image: images.product15,
    discount: '-20%'
},
{
    name: "Lepakshi Handicrafts Clay Home Decorative Full Elephant Hanging Pair (Right Trunk and Left Trunk)",
    // category: "Dorothy Perkins",
    ratingValue: 4,
    totalRating: 50,
    price: 12,
    currency: "$",
    image: images.product16,
    discount: '-20%'
}
]

export const banner = {
    image: images.bigBanner,
    text: "Fashion Sale",
    buttonText: "check"
}

export const visualSearchBanner = {
    image: images.visualBanner,
    text: "Search for an outfit by taking a photo or uploading an image",
}

export const categories = [
    {
        "name": "Women",
        "subcategories": [{
            "name": "Agri Inputs",
            "image": images.product17
        },
        {
            "name": "Electronics",
            "image": images.product18
        },
        {
            "name": "Toys & Games",
            "image": images.product11
        },
        {
            "name": "Home & Kitchen",
            "image": images.product16
        },
        ]
    },
    {
        "name": "Men",
        "subcategories": [
            {
                "name": "New",
                "image": null
            },
            {
                "name": "Clothing",
                "image": null
            },
            {
                "name": "Shoes",
                "image": null
            },
            {
                "name": "Accessories",
                "image": null
            }
        ]
    },
    {
        "name": "Kids",
        "subcategories": [
            {
                "name": "New",
                "image": null
            },
            {
                "name": "Boys",
                "image": null
            },
            {
                "name": "Girls",
                "image": null
            },
            {
                "name": "Baby",
                "image": null
            },
        ]
    }
];

export const categoryBanner = {
    title: "SALES",
    subTitle: "Up to 50% off"
}

export const tags = ["T-shirts", "Crop tops", "Blouses", "sport", "Light dress"]

export const sortItems = [{
    id: "popularity",
    name: "Popular"
}, {
    id: "newest",
    name: "Newest"
}, {
    id: "review",
    name: "Customer review"
}, {
    id: "asc",
    name: "Price: lowest to high"
}, {
    id: "desc",
    name: "Price: highest to low"
}]

export const colors = [{
    color: 'black',
    selected: true
},
{
    color: 'grey',
    selected: false
}, {
    color: 'red',
    selected: false
}, {
    color: 'green',
    selected: false
}, {
    color: 'gold',
    selected: true
},
{
    color: 'blue',
    selected: false
}];

export const sizes = [{
    size: 'XS',
    selected: false
},
{
    size: 'S',
    selected: true
}, {
    size: 'M',
    selected: true
}, {
    size: 'L',
    selected: false
}, {
    size: 'XL',
    selected: false
}];

export const productCategories = ["All", "Women", "Men", "Boys", "Girls"];
