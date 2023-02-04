import { Types } from "mongoose";
import { QuantityType } from "./Data";
import { ICategory, IProduct } from "./Models";

export const categoriesData: ICategory[] = [
  {
    name: "Mutton",
    type: "Meat",
    imageUrl:
      "https://t4.ftcdn.net/jpg/02/66/03/21/360_F_266032107_lre5ZWBTTVJmMvYWyf3zYdb40QhBYDGA.jpg",
  },
  {
    name: "Fish",
    type: "Meat",
    imageUrl: "https://i.pinimg.com/originals/ee/40/04/ee40047dfe3c4ddad9efa5a38951bfdc.jpg",
  },
  {
    name: "Duck",
    type: "Meat",
    imageUrl:
      "https://www.bigbasket.com/media/uploads/p/xxl/40236783_1-fresho-raw-duck-whole-with-skin-tender-juicy.jpg",
  },
  {
    name: "Beef",
    type: "Meat",
    imageUrl:
      "https://thumbs.dreamstime.com/b/fresh-raw-beef-meat-steak-isolated-white-background-134908384.jpg",
  },
  {
    name: "Chicken",
    type: "Meat",
    imageUrl: "https://www.vickysmeatfairy.com/wp-content/uploads/2020/06/chicken-wings-1.jpg",
  },
  {
    name: "Chicken",
    type: "Meat",
    imageUrl: "https://www.vickysmeatfairy.com/wp-content/uploads/2020/06/chicken-wings-1.jpg",
  },
];

export const productsdata = [
  {
    name: "Mutton Lamb - Ribs Chop, Fresh & Tender, 500 g",
    imageUrl:
      "https://www.bigbasket.com/media/uploads/p/xxl/40227619_2-fresho-mutton-lamb-ribs-chop-fresh-tender.jpg",
    description:
      "Fresho Mutton Lamb Ribs Chop is perfect for mutton starters or curries, these cubes should be cooked over high heat to seal juices initially and then cooked till tender on low heat. Get soft and tender ready to cook mutton pieces for that perfect mutton-chop when you decide to get your meat pieces more. It is tender, lean, cut, so it is good when cooked rare to medium-rare. Supreme cuts of Mutton make it convenient to cook with just one wash. These meat pieces that are delivered are hygienically processed & packed with the required temperature control conditions. It passes several quality checks to make the meat safe to consume. Cut from the best end of the lamb, tender, moist and full of delightful flavours",
    discount: 30,
    price: 888,
    unitsSold: 10,
    quantity: { type: "wgt", value: 500, totalQuantity: 10000 },
    categories: "638441894048e8d864c64cd6",
  },
  {
    name: "Beef tenderloin frozen center piece strick Boneless Without Fat",
    imageUrl: "https://www.alfmmeat.com/wp-content/uploads/2020/09/beef-steak-cut.jpg",
    description:
      "Mutton is popular in most households. It is treated as a delicacy and is prepared on different joyous occasions. The juicy taste and the chewy texture make it a favourite among many. Moreover, they come with a lot of health benefits. It is packed with protein, saturated fat, iron, zinc, and vitamin B. Mutton helps in building a strong immune system. It also helps to build bones and muscles.",
    discount: 5,
    price: 580,
    unitsSold: 15,
    quantity: { type: "wgt", value: 500, totalQuantity: 10000 },
    categories: "638441894048e8d864c64cd9",
  },
  {
    name: "Chicken Curry Cut Without Skin, Antibiotic Residue Free, 12-16 Pcs, 500 g ",
    imageUrl:
      "https://www.bigbasket.com/media/uploads/p/l/10000908_15-fresho-chicken-curry-cut-without-skin-antibiotic-residue-free-13-15-pcs.jpg",
    description:
      "Chicken Curry Cut is a mix of bone-in, small pieces of breast, wing (without the tip), leg and thigh meat, enough to feed a small to medium-sized family. This Small pack consists of 13-16 pieces of smaller cuts of chicken",
    dicount: 15,
    unitsSold: 30,
    price: 204,
    quantity: { type: "wgt", value: 500, totalQuantity: 10000 },
    categories: "638441894048e8d864c64cda",
  },
  {
    name: "White Prawns - Medium, Unpeeled, 250 g",
    imageUrl:
      "https://freezfree.in/wp-content/uploads/2020/10/medium-white-prawns-shrimp-scaled.jpg",
    description:
      "Peeled and cleaned with head and tail removed, our medium-sized Freshwater Prawns are deveined and ready for your pan. These prawns are juicy and flavourful while being rich in proteins, omega-3 fatty acids, and antioxidants. They have a moist texture and a mild sweet taste as compared to other seafood.",
    price: 211,
    unitsSold: 0,
    quantity: { type: "wgt", value: 250, totalQuantity: 10000 },
    categories: "638441894048e8d864c64cd7",
  },
  {
    name: "King Fish (Kadal/Anjal) Medium - Fillet",
    imageUrl:
      "https://d2407na1z3fc0t.cloudfront.net/prodDev/pr_gi9kauyla8l/1/prod_image/1623211761.2915--2021-06-0909:39:21--738?format=webp",
    description:
      "Peeled and cleaned with head and tail removed, our medium-sized Freshwater Prawns are deveined and ready for your pan. These prawns are juicy and flavourful while being rich in proteins, omega-3 fatty acids, and antioxidants. They have a moist texture and a mild sweet taste as compared to other seafood.",
    discount: 10,
    unitsSold: 25,
    price: 899,
    quantity: { type: "wgt", value: 500, totalQuantity: 10000 },
    categories: "638441894048e8d864c64cd7",
  },
];
