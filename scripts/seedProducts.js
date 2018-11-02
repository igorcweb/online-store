const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const Product = require('../models/Product');
mongoose.Promise = global.Promise;

// This file empties the products collection and inserts the products below
const db = process.env.MONGODB_URI || 'mongodb://localhost/online-store';
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const products = [
  {
    name: 'Organic Italian Extra Virgin Olive Oil',
    brand: 'Simple Truth®',
    category: 'Groceries',
    description:
      'Organically Grown. No Preservatives., Kosher, USDA Organic, Non-GMO, Serving Size: 1 Tablespoon (15 mL)Servings per Container: About 34',
    imgUrl:
      'https://www.vitacost.com/Images/Products/500/Simple-Truth-Organic/Simple-Truth-Organic-Italian-Extra-Virgin-Olive-Oil-011110841155.jpg',
    inStock: 200,
    price: 5.99
  },
  {
    name: 'Extra Virgin Certified Organic Coconut Oil',
    brand: 'Vitacost',
    category: 'Groceries',
    description:
      'Certified organic, unrefined, non-GMO coconut oil. Cold pressed without the use of heat or chemicals and packaged in BPA-free jars., Nutrition Facts Serving Size: 1 Tablespoon (15 mL), Servings per Container: 108',
    imgUrl:
      'https://www.vitacost.com/Images/Products/500/Vitacost/Vitacost-Extra-Virgin-Certified-Organic-Coconut-Oil-Non-GMO-844197011568.jpg',
    inStock: 200,
    price: 19.99
  },
  {
    name: '100% Cranberry Juice -- 32 fl oz',
    brand: 'Simple Truth®',
    category: 'Groceries',
    description:
      'From Concentrate Free From 101+ Artificial Preservatives & Ingredients, Kosher, Pasteurized. Per 8 oz fl Serving: 70 Calories, 0g Sat Fat, 35mg Sodium, 7g Sugar Refrigerate After Opening',
    imgUrl:
      'https://www.vitacost.com/Images/Products/500/Simple-Truth/Simple-Truth-100-Cranberry-Juice-011110836052.jpg',
    inStock: 200,
    price: 3.99
  },
  {
    name: 'Dark Chocolate 88% Cocoa Bar Vegan Gluten Free -- 3 oz',
    brand: 'Endangered Species',
    category: 'Groceries',
    description:
      'With 88% Cocoa Rainforest Alliance Certified Cocoa, Non-GMO verified, Certified Gluten Free, Natural, Serving Size: 1/2 Bar (43 g), Servings per Container: About 2',
    imgUrl:
      'https://www.vitacost.com/Images/Products/200/Endangered-Species/Endangered-Species-Dark-Chocolate-88-Cocoa-Bar-Vegan-Gluten-Free-037014242478.jpg',
    inStock: 200,
    price: 2.84
  },
  {
    name: 'Organic Raw Almonds -- 8 oz (227 g)',
    brand: 'Vitacost',
    category: 'Groceries',
    description:
      'Organic, Unsalted, Certified kosher, Serving Size: 1/4 Cup (30 g),Servings per Container: 8',
    imgUrl:
      'https://www.vitacost.com/Images/Products/500/Vitacost/Vitacost-Organic-Raw-Almonds-844197012107.jpg',
    inStock: 200,
    price: 7.91
  },
  {
    name: 'Organic Green Tea Strawberry Rose -- 25 Tea Bags',
    brand: 'St. Dalfour',
    category: 'Groceries',
    description:
      'Premium Certified Organic Green Tea, Selected And Blended Under The Direction Of The Tea Experts Of St. Dalford France,Enhanced By The Natural Flavour Of Strawberry & Rose,Individually Sealed In Envelopes, Serving Size: 1 Tea Bag Servings per Container: 25',
    imgUrl:
      'https://www.vitacost.com/Images/Products/500/St-Dalfour/St-Dalfour-Organic-Green-Tea-Strawberry-Rose-084380969744.jpg',
    inStock: 200,
    price: 2.96
  },
  {
    name: 'Himalayan Pink Salt - Fine -- 32 oz (907 g)',
    brand: 'Vitacost',
    category: 'Groceries',
    description:
      'Gluten Free, Vegan, BPA Free, Serving Size: 1/4 tsp (Approx 1.5 g), Servings per Container: 605',
    imgUrl:
      'https://www.vitacost.com/Images/Products/500/Vitacost/Vitacost-Himalayan-Pink-Salt-Fine-844197025374.jpg',
    inStock: 200,
    price: 4.37
  },
  {
    name: 'Organic Walnuts Halves & Pieces -- 5.5 oz',
    brand: 'Woodstock',
    category: 'Groceries',
    description:
      'Walnuts Halves & Pieces, 5g of Protein Per Serving, Kosher • Vegan • USDA, Organic. Non-GMO, Project Verified. BPA-NI, Bag Product of USA, Resealable Package, Serving Size: 1/4 Cup (30 g), Servings per Container: About 5',
    imgUrl:
      'https://www.vitacost.com/Images/Products/500/Woodstock/Woodstock-Organic-Walnuts-Halves-And-Pieces-042563008376.jpg',
    inStock: 200,
    price: 6.79
  },
  {
    name: 'Organic Dried Cranberries -- 10 oz',
    brand: 'Patience Fruit & Co',
    category: 'Groceries',
    description:
      'Slowly, Grown, Classic • Gently Sweetened,USDA Organic, Non GMO, Project Verified, Serving Size: 1/4 Cup (40 g), Servings per Container: About 7',
    imgUrl:
      'https://www.vitacost.com/Images/Products/500/Patience-Fruit-And-Co/Patience-Fruit-And-Co-Organic-Dried-Cranberries-662166664115.jpg',
    inStock: 200,
    price: 6.48
  },
  {
    name: '100% Pomegranate Juice -- 32 fl oz',
    brand: 'Simple Truth®',
    category: 'Groceries',
    description:
      'From Concentrate With Other Added Ingredients, Serving Size: 8 fl oz (240 mL), Servings per Container: 4, Free From 101+ Artificial Preservatives and Ingredients: Pasteurized,Per 8 fl oz Serving: 160 Calories, 0g Sat Fat, 35 mg Sodium, 40g Sugars,Kosher,Refrigerate After Opening',
    imgUrl:
      'https://www.vitacost.com/Images/Products/500/Simple-Truth/Simple-Truth-100-Pomegranate-Juice-011110836106.jpg',
    inStock: 200,
    price: 3.99
  },
  {
    name: 'Organic Whole Leaf Black Tea Sachets Assam -- 15 Tea Bags',
    brand: 'Two Leaves and a Bud',
    category: 'Groceries',
    description:
      'Whole Leaf Organic Tea Sachets, Non-GMO, Kosher, Gluten Free, Some Caffeine',
    imgUrl:
      'https://www.vitacost.com/Images/Products/500/Two-Leaves-and-a-Bud/Two-Leaves-and-a-Bud-Organic-Whole-Leaf-Black-Tea-Sachets-Assam-894058000996.jpg',
    inStock: 200,
    price: 6.45
  },
  {
    name: 'Real Yogurt Starter Culture Greek -- 2 Packets',
    brand: 'Cultures For Health',
    category: 'Groceries',
    description:
      '2 Packets of Starter Culture, Non-GMO,Gluten-Free, Serving Size: 0.6 g, Servings per Container: 2',
    imgUrl:
      'https://www.vitacost.com/Images/Products/500/Cultures-For-Health/Cultures-For-Health-Real-Yogurt-Starter-Culture-Greek-814598020285.jpg',
    inStock: 200,
    price: 12.99
  },
  {
    name: 'Organic French Agen Mini Plums -- 1.76 oz',
    brand: 'Fruit Bliss',
    category: 'Groceries',
    description:
      'Dried Fruit Reinvented!, Serving Size: 1 Pouch (50 g), Servings per Container: 1, No Added Sugar, • Unsulfured, Deliciously Juicy - Whole Fruit, Sun Sweetened and Infused with Water, USDA Organic • Non-GMO Verified, Gluten Free • Vegan • Kosher',
    imgUrl:
      'https://www.vitacost.com/Images/Products/500/Fruit-Bliss/Fruit-Bliss-Organic-French-Agen-Mini-Plums-811406020031.jpg',
    inStock: 200,
    price: 2.09
  },
  {
    name: 'Certified Organic Quinoa - Non-GMO -- 12 oz (340 g)',
    brand: 'Vitacost',
    category: 'Groceries',
    description:
      'Whole food, non-GMO quinoa, No additives or preservatives, Certified organic, Naturally, gluten free, 6 grams of protein + 3 grams fiber per quarter-cup serving, Serving Size: 1/4 Cup (Approx 45 g)Servings per Container: 8',
    imgUrl:
      'https://www.vitacost.com/Images/Products/500/Fruit-Bliss/Fruit-Bliss-Organic-French-Agen-Mini-Plums-811406020031.jpg',
    inStock: 200,
    price: 3.99
  },
  {
    name: 'Organic Silken Tofu Firm -- 12.3 oz',
    brand: 'Mori-Nu',
    category: 'Groceries',
    description:
      'For Entrees, Salads and Desserts,Certified Gluten Free, Kosher, Non-GMO Project Verified,No Perservatives, Serving Size: 3 oz, Servings per Container: About 4',
    imgUrl:
      'https://www.vitacost.com/Images/Products/500/Mori-Nu/Mori-Nu-Organic-Silken-Tofu-Firm-085696609201.jpg',
    inStock: 200,
    price: 1.93
  },
  {
    name: 'Organic Certified Acai Berry Juice Blend -- 33.8 fl oz',
    brand: 'Dynamic Health',
    category: 'Groceries',
    description:
      'Certified Organic Acai Blend, Euterpe Oleracea, Dynamic Health Organic, Certified Acai (Euterpe oleracea). Blend is a delicious proprietary Acai juice supplement that is formulated with Goji, Pomegranate, Blueberry and Mangosteen. Serving Size: 2 Tbsp. (30 Tbsp. mL),Servings per Container: 34',
    imgUrl:
      'https://www.vitacost.com/Images/Products/500/Dynamic-Health/Dynamic-Health-Organic-Certified-Acai-Berry-Juice-Blend-790223101119.jpg',
    inStock: 200,
    price: 16.74
  },
  {
    name: 'Organic Coconut Water Original -- 16.9 fl oz',
    brand: 'Simple Truth®',
    category: 'Groceries',
    description:
      'Not From Concentrate, Serving Size: 1 Container (500 mL), Organically Grown, No Preservatives,Original, USDA, Organic, Non-GMO, Fair Trade, Certified, Kosher',
    imgUrl:
      'https://www.vitacost.com/Images/Products/500/Simple-Truth-Organic/Simple-Truth-Organic-Coconut-Water-Original-011110854865.jpg',
    inStock: 200,
    price: 1.99
  },
  {
    name: ' Sunflower Seed Bread -- 17.6 oz',
    brand: 'Mestemacher',
    category: 'Groceries',
    description:
      "With Whole Rye Kernels, Also Delicious Toasted, Ideal for cholesterol conscious diet. Freshly ground in their own Mestemacher's own mill from whole grains. Kosher, No Preservatives. High Fiber, Cholesterol Free. Natural Ingredients. Long Shelf Life. Wheat Free,  Serving Size: 1 Piece (72 g),Servings per Container: 7",
    imgUrl:
      'https://www.vitacost.com/Images/Products/500/Mestemacher/Mestemacher-Sunflower-Seed-Bread-084213000743.jpg',
    inStock: 200,
    price: 2.81
  },
  {
    name: ' Organic Long Grain Brown Rice -- 32 oz',
    brand: 'Simple Truth®',
    category: 'Groceries',
    description:
      '100% Whole Grain, Organically Grown, No Preservatives, USDA, Organic, Non-GMO, Kosher, 2 lb, Serving Size: 1/4 Cup Dry (45 g), Servings per Container: About 20',
    imgUrl:
      'https://www.vitacost.com/Images/Products/500/Simple-Truth-Organic/Simple-Truth-Organic-Long-Grain-Brown-Rice-011110863348.jpg',
    inStock: 200,
    price: 3.19
  },
  {
    name: 'Organic Vitamin C -- 250 mg - 60 Tablets',
    brand: 'Healthy Origins ',
    category: 'Supplements',
    description:
      'Non-GMO, Natural • Whole Food, Soy-Free, USDA, Organic, With Natural Bioflavonoids, Easy on the Stomach, Suitable for Vegetarians & Vegans, Serving Size: 1 Tablet Servings per Container: 60',
    imgUrl:
      'https://www.vitacost.com/Images/Products/500/Healthy-Origins/Healthy-Origins-Organic-Vitamin-C-603573683740.jpg',
    inStock: 200,
    price: 13.5
  },
  {
    name: 'MULTI VITA•MIN™',
    brand: 'THE SYNERGY COMPANY™',
    category: 'Supplements',
    description:
      'Multi Vita•Min offers a complete and balanced blend of essential nutrients made with organic ingredients — 200% of your RDA for vitamins and 100% for minerals. What’s more, each tablet not only contains vitamins and minerals, but also an assortment of natural enzymes, flavonoids, proteins, and other co-factors that coexist in living whole food. 60 Tablets',
    imgUrl:
      'https://magento-sxob1kexeiozpac.netdna-ssl.com/media/catalog/product/cache/1/thumbnail/645x425/9df78eab33525d08d6e5fb8d27136e95/m/u/multi_topcarousel_bottle_022118.jpg',
    inStock: 200,
    price: 24.95
  },
  {
    name: 'Organic Vegan Protein Powder, Chocolate',
    brand: 'Ora Organic',
    category: 'Supplements',
    description:
      'A USDA Organic plant-based protein powder made from over 20 organic superfoods and deliver a complete amino acid profile. 20 servings | 22.9oz | 650g, 22g of protein with just 1g of sugar per serving. It comes packed with two servings of organic greens in every shake, adding crucial macro & micronutrients for proper cognitive and muscle function',
    imgUrl:
      'https://cdn.shopify.com/s/files/1/0767/1029/products/prtn-pwd-ch-front_512x512.png?v=1540581808',
    inStock: 200,
    price: 49.99
  },
  {
    name: 'Organic Vegan Protein Powder, Vanilla',
    brand: 'Ora Organic',
    category: 'Supplements',
    description:
      'A USDA Organic plant-based protein powder made from over 20 organic superfoods and deliver a complete amino acid profile. 20 servings | 22.9oz | 650g, 22g of protein with just 1g of sugar per serving. It comes packed with two servings of organic greens in every shake, adding crucial macro & micronutrients for proper cognitive and muscle function',
    imgUrl:
      'https://cdn.shopify.com/s/files/1/0767/1029/products/prtn-pwd-ch-front_512x512.png?v=1540581808',
    inStock: 200,
    price: 49.99
  },
  {
    name: 'Organic Pre-Workout Powder',
    brand: 'Ora Organic',
    category: 'Supplements',
    description:
      'Renewable Energy is a vegan and USDA certified organic clean source of energy (and a good pun), that doesn’t leave you strung out and comes in a delicious organic pomegranate and berry flavor. Start your workout (or work-day!) with 90mg of caffeine and a jitter-free energy boost* thanks to a balanced blend of organic green coffee bean, yerba mate, matcha tea, eleuthero root, and ginseng.* Sometimes raw energy isn’t enough though, and that’s why we’ve included nitric oxide boosting fruits and vegetables as well as an organic adaptogen blend. 20 servings, 200g.',
    imgUrl:
      'https://cdn.shopify.com/s/files/1/0767/1029/products/pre-pwd-pom-front.png?v=1540579492',
    inStock: 200,
    price: 39.99
  },
  {
    name: 'Organic Probiotics with Prebiotics Powder',
    brand: 'Ora Organic',
    category: 'Supplements',
    description:
      'A USDA Organic probiotic and prebiotic powder with 20 billion probiotics per serving and 6 strains that support optimal digestive health* and peak immune function*. It contains some of the most clinically documented and acid resistant probiotic strains in the world so you can get back to trusting your gut. One scoop is 20% of your daily fiber needs and I come packed with organic prebiotics. Prebiotics serve as fuel for probiotics - they help the good bacteria thrive in your gut so your probiotics can get to work! 30 servings | 7.9 oz (225g)',
    imgUrl:
      'https://cdn.shopify.com/s/files/1/0767/1029/products/pbtc-pwd-ars-front.png?v=1540580304',
    inStock: 200,
    price: 39.99
  },
  {
    name: 'Vegan Probiotics with Prebiotics Capsules',
    brand: 'Ora Organic',
    category: 'Supplements',
    description:
      'A USDA Made with Organic Probiotic and Prebiotic with 16 billion probiotics per serving and 6 strains support optimal digestive health* and peak immune function*. (30 servings | 60 Capsules)',
    imgUrl:
      'https://cdn.shopify.com/s/files/1/0767/1029/products/pbtc-cap-unf-front.png?v=1540584734',
    inStock: 200,
    price: 34.99
  },
  {
    name: 'Vegan Vitamin D Supplement',
    brand: 'Ora Organic',
    category: 'Supplements',
    description:
      'A USDA Organic and Vegan Vitamin D Tablets made from lichen! Each serving contains 2,000 IU of vegan vitamin D3 and includes organic sunflower lecithin to enhance absorption. 30 tablets, 30 servings (1 month supply).',
    imgUrl:
      'https://cdn.shopify.com/s/files/1/0767/1029/products/VITD-SF-TAB-UNF_1500x1500_172a7dd2-28cb-4a14-9a98-2a4cb60f7a85.png?v=1522077375',
    inStock: 200,
    price: 29.99
  },
  {
    name: 'Organic Apple Cider Vinegar Pills',
    brand: 'Ora Organic',
    category: 'Supplements',
    description:
      "Made from the fermented juice of crushed organic apples, these Organic Apple Cider Vinegar Pills contain 500mg of organic apple cider vinegar extract. To help support your body's natural detox reaction to unwanted toxins, we've also included organic milk thistle and organic lemon - both found to be high in antioxidants.",
    imgUrl:
      'https://cdn.shopify.com/s/files/1/0767/1029/products/ACV-AEA-TAB-UNF_1500x1500_20c0f139-e7a2-46b5-971d-50a0fcf7c3bd.png?v=1539125108',
    inStock: 200,
    price: 18.99
  },
  {
    name: 'Organic Vitamin C Powder for Immunity',
    brand: 'Ora Organic',
    category: 'Supplements',
    description:
      'Organic vitamin C powder is made from organic acerola berry extract and includes 5 billion CFUs of 3 probiotic strains: lactobacillus rhamnosus GG, lactobacillus acidophilus and lactobacillus paracasei. These probiotic strains have been clinically studied for their ability to boost the immune system* and have even been known to help fight respiratory infections and illnesses.* No artificial ingredients or fillers. 1 box = 10 servings.',
    imgUrl:
      'https://cdn.shopify.com/s/files/1/0767/1029/products/VITC-PWD-PIN_1500x1500_a7ee7db3-4237-4a31-9e85-23f6610e7583.png?v=1528073237',
    inStock: 200,
    price: 18.99
  },
  {
    name: 'Organic Greens Powder',
    brand: 'Ora Organic',
    category: 'Supplements',
    description:
      'Certified USDA Organic delicious greens powder made from over 20 veggies, grasses, herbs, algae and superfoods. 30 servings, 8.5oz (240g)',
    imgUrl:
      'https://cdn.shopify.com/s/files/1/0767/1029/products/grn-pwd-cit-front.png?v=1540579300',
    inStock: 200,
    price: 49.99
  },
  {
    name: '100% Pure Micronized L-Glutamine Powder',
    brand: 'Ora Organic',
    category: 'Supplements',
    description:
      'L-Glutamine – the most abundant amino acid in the human body – is involved in many metabolic processes, including the synthesis and protection of muscle tissue, the production of glycogen, as well as immune support during periods of immune and muscular stress.* L-Glutamine is also a major source of fuel for enterocytes (intestinal cells) and hence supports the integrity of the intestinal lining.* Size:	250G (8.8OZ 50 SERVINGS)500G (1.1LB 100 SERVINGS)1000G (2.2 LB 200 SERVINGS)',
    imgUrl:
      'https://organic-supply.com/wp-content/uploads/2017/12/l-glutamine.jpg',
    inStock: 200,
    price: 39.95
  },
  {
    name: 'Acetyl-L-Carnitine -- 500 mg - 60 Vegetarian Capsules',
    brand: 'Natural Factors',
    category: 'Supplements',
    description:
      'Acetyl-L-Carnitine is a highly bioavailable form of L-Carnitine and is able to effectively cross the blood-brain barrier. Acetyl-L-Carnitine assists the critical conversion of choline into acetylcholine. Acetylcholine is a key chemical messenger in the brain and promotes normal and healthy brain function including memory and concentration. It also helps transform fats into energy and supports normal muscle movement. Natural Factors amino acids are the highest quality pharmaceutical grade products available. Serving Size: 2 Vegetarian Capsules. Servings per Container: 30',
    imgUrl:
      'https://www.vitacost.com/Images/Products/500/Natural-Factors/Natural-Factors-Acetyl-L-Carnitine-068958028002.jpg',
    inStock: 200,
    price: 13.97
  },
  {
    name: 'Vegan Omega-3 Spray',
    brand: 'Natural Factors',
    category: 'Holistic Health',
    description:
      'The first ever omega-3 spray, delivering 600mg of vegan omega-3 per serving. One bottle of Nothing Fishy Here has the equivalent omega-3 as 6 pounds of high quality salmon.',
    imgUrl:
      'https://cdn.shopify.com/s/files/1/0767/1029/products/omeg-spy-org-front.png?v=1540584278',
    inStock: 200,
    price: 44.99
  }
];

Product.remove({})
  .then(() => Product.collection.insertMany(products))
  .then(data => {
    console.log(data.insertedCount + ' records inserted!');
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
