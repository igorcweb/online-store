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
    name: 'Vitacost Shirataki Rice',
    brand: 'Vitacost',
    category: 'Groceries',
    description:
      'Non-GMO and Gluten Free, Vegan, plant-based noodles, Serving Size: 3 oz (85 g), Servings per Container: 2.3',
    imgUrl:
      'https://www.vitacost.com/Images/Products/500/Vitacost/Vitacost-Shirataki-Rice-Non-GMO-and-Gluten-Free-844197023622.jpg',
    inStock: 200,
    price: 1.58
  },
  {
    name: 'Brown Rice Pasta',
    brand: 'Jovial',
    category: 'Groceries',
    description:
      'Authentic, artisan crafted, traditional pasta from Tuscany that is worry free in every way. Made in a dedicated facility free of gluten, milk, eggs, tree nuts and peanuts, Jovial pasta is made with only one wholesome ingredient -100% organic whole grain rice grown exclusively in Italy. Serving Size: 2 oz (57 g), Servings per Container: 6',
    imgUrl:
      'https://www.vitacost.com/Images/Products/500/Jovial/Jovial-Brown-Rice-Pasta-Spaghetti-Gluten-Free-815421011203.jpg',
    inStock: 200,
    price: 4.01
  },

  {
    name: 'Stevia Extract',
    brand: 'Vitacost',
    category: 'Groceries',
    description:
      '4 fl oz, Serving Size: 7 Drops, Servings per Container: 590. Stevia is an all-natural sweetener that comes from the sweetest, most wholesome part of the stevia leaf, providing a pure, fresh taste that is twice as sweet as sugar. Add it to your favorite beverage, sprinkle it on your morning cereal or use it as a sugar substitute in your favorite recipes for guilt-free flavor you can enjoy any time.',
    imgUrl:
      'https://www.vitacost.com/Images/Products/500/Vitacost/Vitacost-Stevia-Extract-835003006861.jpg',
    inStock: 200,
    price: 11.99
  },
  {
    name: 'Coconut Sugar Unrefined',
    brand: 'Nutiva Organic',
    category: 'Groceries',
    description:
      "1 lb,Serving Size: 1 Tsp. (5 g), Servings per Container: About 90. Nutiva's Organic Coconut Sugar is made from fresh coconut tree sap, collected from the cut flower buds. Excellent for baking or in beverages like coffee and tea, it has a subtly sweet taste that is similar to brown sugar with a hint of caramel. Even better, it has a lower glycemic index than cane sugar and is organic and non-GMO. Enjoy in all your favorite recipes!",
    imgUrl:
      'https://www.vitacost.com/Images/Products/500/Nutiva/Nutiva-Organic-Coconut-Sugar-Unrefined-692752103018.jpg',
    inStock: 200,
    price: 4.69
  },
  {
    name: 'Organic Coffee',
    brand: 'Mount Hagen',
    category: 'Groceries',
    description:
      "3.53 oz, Freeze Dried, USDA Organic. It might sound simple, but that is precisely our goal: perfect coffee. To us, it's far more than a matter of tasting great. We already take care of that as a matter of principle, since nothing but fresh Arabica beans from the best high-altitude regions, gently roasted, cultivated and refined, make it into our packages. To us, perfection means that we only procure ecologically cultivated coffees in their countries of origin from small-scale farmers at Fairtrade conditions.",
    imgUrl:
      'https://www.vitacost.com/Images/Products/500/Mount-Hagen/Mount-Hagen-Organic-Fair-Trade-Instant-Coffee-819385023319.jpg',
    inStock: 200,
    price: 9.49
  },
  {
    name: 'Italian Extra Virgin Olive Oil',
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
    name: 'Extra Virgin Coconut Oil',
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
    name: '100% Cranberry Juice',
    brand: 'Simple Truth®',
    category: 'Groceries',
    description:
      'From Concentrate Free From 101+ Artificial Preservatives & Ingredients, Kosher, Pasteurized. 32 fl oz, Per 8 oz fl Serving: 70 Calories, 0g Sat Fat, 35mg Sodium, 7g Sugar Refrigerate After Opening',
    imgUrl:
      'https://www.vitacost.com/Images/Products/500/Simple-Truth/Simple-Truth-100-Cranberry-Juice-011110836052.jpg',
    inStock: 200,
    price: 3.99
  },
  {
    name: 'Dark Chocolate 88% Cocoa Bar',
    brand: 'Endangered Species',
    category: 'Groceries',
    description:
      'With 88% Cocoa Rainforest Alliance Certified Cocoa, Non-GMO verified, Certified Gluten Free, Natural, 3 oz, Serving Size: 1/2 Bar (43 g), Servings per Container: About 2',
    imgUrl:
      'https://www.vitacost.com/Images/Products/200/Endangered-Species/Endangered-Species-Dark-Chocolate-88-Cocoa-Bar-Vegan-Gluten-Free-037014242478.jpg',
    inStock: 200,
    price: 2.84
  },
  {
    name: 'Organic Raw Almonds',
    brand: 'Vitacost',
    category: 'Groceries',
    description:
      'Organic, Unsalted, Certified kosher, 8 oz (227 g), Serving Size: 1/4 Cup (30 g), Servings per Container: 8',
    imgUrl:
      'https://www.vitacost.com/Images/Products/500/Vitacost/Vitacost-Organic-Raw-Almonds-844197012107.jpg',
    inStock: 200,
    price: 7.91
  },
  {
    name: 'Green Tea Strawberry Rose',
    brand: 'St. Dalfour',
    category: 'Groceries',
    description:
      'Premium Certified Organic Green Tea, Selected And Blended Under The Direction Of The Tea Experts Of St. Dalford France,Enhanced By The Natural Flavour Of Strawberry & Rose,Individually Sealed In Envelopes, 25 Tea Bags, Serving Size: 1 Tea Bag Servings per Container: 25',
    imgUrl:
      'https://www.vitacost.com/Images/Products/500/St-Dalfour/St-Dalfour-Organic-Green-Tea-Strawberry-Rose-084380969744.jpg',
    inStock: 200,
    price: 2.96
  },
  {
    name: 'Himalayan Pink Salt',
    brand: 'Vitacost',
    category: 'Groceries',
    description:
      'Gluten Free, Vegan, BPA Free, 32 oz (907 g), Serving Size: 1/4 tsp (Approx 1.5 g),  Servings per Container: 605',
    imgUrl:
      'https://www.vitacost.com/Images/Products/500/Vitacost/Vitacost-Himalayan-Pink-Salt-Fine-844197025374.jpg',
    inStock: 200,
    price: 4.37
  },
  {
    name: 'Walnuts Halves & Pieces',
    brand: 'Woodstock',
    category: 'Groceries',
    description:
      'Walnuts Halves & Pieces, 5g of Protein Per Serving, Kosher • Vegan • USDA, Organic. Non-GMO, Project Verified. BPA-NI, Bag Product of USA, Resealable Package, 5.5 oz, Serving Size: 1/4 Cup (30 g), Servings per Container: About 5',
    imgUrl:
      'https://www.vitacost.com/Images/Products/500/Woodstock/Woodstock-Organic-Walnuts-Halves-And-Pieces-042563008376.jpg',
    inStock: 200,
    price: 6.79
  },
  {
    name: 'Dried Cranberries',
    brand: 'Patience Fruit & Co',
    category: 'Groceries',
    description:
      'Slowly, Grown, Classic • Gently Sweetened,USDA Organic, Non GMO, Project Verified, 10 oz, Serving Size: 1/4 Cup (40 g), Servings per Container: About 7',
    imgUrl:
      'https://www.vitacost.com/Images/Products/500/Patience-Fruit-And-Co/Patience-Fruit-And-Co-Organic-Dried-Cranberries-662166664115.jpg',
    inStock: 200,
    price: 6.48
  },
  {
    name: '100% Pomegranate Juice',
    brand: 'Simple Truth®',
    category: 'Groceries',
    description:
      'From Concentrate With Other Added Ingredients, 32 fl oz, Serving Size: 8 fl oz (240 mL), Servings per Container: 4, Free From 101+ Artificial Preservatives and Ingredients: Pasteurized,Per 8 fl oz Serving: 160 Calories, 0g Sat Fat, 35 mg Sodium, 40g Sugars,Kosher,Refrigerate After Opening',
    imgUrl:
      'https://www.vitacost.com/Images/Products/500/Simple-Truth/Simple-Truth-100-Pomegranate-Juice-011110836106.jpg',
    inStock: 200,
    price: 3.99
  },
  {
    name: 'Whole Leaf Black Tea Sachets Assam',
    brand: 'Two Leaves and a Bud',
    category: 'Groceries',
    description:
      '15 Tea Bags, Whole Leaf Organic Tea Sachets, Non-GMO, Kosher, Gluten Free, Some Caffeine',
    imgUrl:
      'https://www.vitacost.com/Images/Products/500/Two-Leaves-and-a-Bud/Two-Leaves-and-a-Bud-Organic-Whole-Leaf-Black-Tea-Sachets-Assam-894058000996.jpg',
    inStock: 200,
    price: 6.45
  },
  {
    name: 'Real Yogurt Starter Culture Greek',
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
    name: 'French Agen Mini Plums',
    brand: 'Fruit Bliss',
    category: 'Groceries',
    description:
      'Dried Fruit Reinvented!, 1.76 oz, Serving Size: 1 Pouch (50 g), Servings per Container: 1, No Added Sugar, • Unsulfured, Deliciously Juicy - Whole Fruit, Sun Sweetened and Infused with Water, USDA Organic • Non-GMO Verified, Gluten Free • Vegan • Kosher',
    imgUrl:
      'https://www.vitacost.com/Images/Products/500/Fruit-Bliss/Fruit-Bliss-Organic-French-Agen-Mini-Plums-811406020031.jpg',
    inStock: 200,
    price: 2.09
  },
  {
    name: 'Certified Organic Quinoa',
    brand: 'Vitacost',
    category: 'Groceries',
    description:
      'Whole food, non-GMO quinoa, No additives or preservatives, Certified organic, Naturally, gluten free, 6 grams of protein + 3 grams fiber per quarter-cup serving, 12 oz (340 g), Serving Size: 1/4 Cup (Approx 45 g)Servings per Container: 8',
    imgUrl:
      'https://www.vitacost.com/Images/Products/500/Fruit-Bliss/Fruit-Bliss-Organic-French-Agen-Mini-Plums-811406020031.jpg',
    inStock: 200,
    price: 3.99
  },
  {
    name: 'Silken Tofu Firm',
    brand: 'Mori-Nu',
    category: 'Groceries',
    description:
      'For Entrees, Salads and Desserts,Certified Gluten Free, Kosher, Non-GMO Project Verified, No Perservatives, 12.3 oz, Serving Size: 3 oz, Servings per Container: About 4',
    imgUrl:
      'https://www.vitacost.com/Images/Products/500/Mori-Nu/Mori-Nu-Organic-Silken-Tofu-Firm-085696609201.jpg',
    inStock: 200,
    price: 1.93
  },
  {
    name: 'Acai Berry Juice Blend',
    brand: 'Dynamic Health',
    category: 'Groceries',
    description:
      'Certified Organic Acai Blend, Euterpe Oleracea, Dynamic Health Organic, Certified Acai (Euterpe oleracea). Blend is a delicious proprietary Acai juice supplement that is formulated with Goji, Pomegranate, Blueberry and Mangosteen. Serving Size: 2 Tbsp. (30 Tbsp. mL), 33.8 fl oz, Servings per Container: 34',
    imgUrl:
      'https://www.vitacost.com/Images/Products/500/Dynamic-Health/Dynamic-Health-Organic-Certified-Acai-Berry-Juice-Blend-790223101119.jpg',
    inStock: 200,
    price: 16.74
  },
  {
    name: 'Coconut Water Original',
    brand: 'Simple Truth®',
    category: 'Groceries',
    description:
      'Not From Concentrate, 16.9 fl oz, Serving Size: 1 Container (500 mL), Organically Grown, No Preservatives,Original, USDA, Organic, Non-GMO, Fair Trade, Certified, Kosher',
    imgUrl:
      'https://www.vitacost.com/Images/Products/500/Simple-Truth-Organic/Simple-Truth-Organic-Coconut-Water-Original-011110854865.jpg',
    inStock: 200,
    price: 1.99
  },
  {
    name: 'Sunflower Seed Bread',
    brand: 'Mestemacher',
    category: 'Groceries',
    description:
      "With Whole Rye Kernels, Also Delicious Toasted, Ideal for cholesterol conscious diet. Freshly ground in their own Mestemacher's own mill from whole grains. Kosher, No Preservatives. High Fiber, Cholesterol Free. Natural Ingredients. Long Shelf Life. Wheat Free, 17.6 oz, Serving Size: 1 Piece (72 g),Servings per Container: 7",
    imgUrl:
      'https://www.vitacost.com/Images/Products/500/Mestemacher/Mestemacher-Sunflower-Seed-Bread-084213000743.jpg',
    inStock: 200,
    price: 2.81
  },
  {
    name: 'Long Grain Brown Rice',
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
    name: 'Organic Vitamin C',
    brand: 'Healthy Origins ',
    category: 'Supplements',
    description:
      'Non-GMO, Natural • Whole Food, Soy-Free, USDA, Organic, With Natural Bioflavonoids, Easy on the Stomach, Suitable for Vegetarians & Vegans, 250 mg - 60 Tablets, Serving Size: 1 Tablet Servings per Container: 60',
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
      'Multi Vita•Min offers a complete and balanced blend of essential nutrients made with organic ingredients — 200% of your RDA for vitamins and 100% for minerals. What’s more, each tablet not only contains vitamins and minerals, but also an assortment of natural enzymes, flavonoids, proteins, and other co-factors that coexist in living whole food. 60 Tablets',
    imgUrl:
      'https://magento-sxob1kexeiozpac.netdna-ssl.com/media/catalog/product/cache/1/thumbnail/645x425/9df78eab33525d08d6e5fb8d27136e95/m/u/multi_topcarousel_bottle_022118.jpg',
    inStock: 200,
    price: 24.95
  },
  {
    name: 'Protein Powder, Chocolate',
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
    name: 'Protein Powder, Vanilla',
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
    name: 'Pre-Workout Powder',
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
    name: 'Probiotics with Prebiotics Powder',
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
    name: 'Probiotics with Prebiotics Capsules',
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
      'https://cdn.shopify.com/s/files/1/0767/1029/products/solfood_front.png?v=1541113166',
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
    name: 'Vitamin C Powder for Immunity',
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
    name: 'Acetyl-L-Carnitine',
    brand: 'Natural Factors',
    category: 'Supplements',
    description:
      'Acetyl-L-Carnitine is a highly bioavailable form of L-Carnitine and is able to effectively cross the blood-brain barrier. Acetyl-L-Carnitine assists the critical conversion of choline into acetylcholine. Acetylcholine is a key chemical messenger in the brain and promotes normal and healthy brain function including memory and concentration. It also helps transform fats into energy and supports normal muscle movement. Natural Factors amino acids are the highest quality pharmaceutical grade products available. 500 mg - 60 Vegetarian Capsules, Serving Size: 2 Vegetarian Capsules. Servings per Container: 30',
    imgUrl:
      'https://www.vitacost.com/Images/Products/500/Natural-Factors/Natural-Factors-Acetyl-L-Carnitine-068958028002.jpg',
    inStock: 200,
    price: 13.97
  },
  {
    name: 'Vegan Multivitamin',
    brand: 'Deva',
    category: 'Supplements',
    description:
      '90 Coated Tablets, Serving Size: 1 Tablet, Servings per Container: 90. Free Of Yeast, wheat, gluten, milk, sugar, salt, starch, preservatives; animal products, byproducts or derivatives.',
    imgUrl:
      'https://www.vitacost.com/Images/Products/500/Deva/Deva-Vegan-Multivitamin-And-Mineral-Supplement-895634000027.jpg',
    inStock: 200,
    price: 10.69
  },
  {
    name: 'Taurine',
    brand: 'NOW',
    category: 'Supplements',
    description:
      '500 mg - 100 Capsules, Serving Size: 1 Capsule, Servings per Container: 100.Taurine is a conditionally essential amino acid which is not utilized in protein synthesis, but is mainly found free in most tissues, especially throughout the nervous system. It functions in tissues by stabilizing cell membranes, aiding the transport of potassium, sodium, calcium, and magnesium in and out of cells.',
    imgUrl:
      'https://www.vitacost.com/Images/Products/500/NOW-Foods/NOW-Foods-Taurine-733739001405.jpg',
    inStock: 200,
    price: 10.69
  },

  {
    name: 'One Daily Multi',
    brand: 'New Chapter',
    category: 'Supplements',
    description:
      '72 Tablets, Serving Size: 1 Tablet, Servings per Container: 72, Multiple benefits for women 40+ include Stress Support; Vitamin D3 for Bone Support; Vitamin C, Vitamin A & Zinc for Immune Support; B Vitamins for Energy Support',
    imgUrl:
      'https://www.vitacost.com/Images/Products/500/New-Chapter/New-Chapter-Every-Womans-One-Daily-40-Plus-Multivitamin-727783003676.jpg',
    inStock: 200,
    price: 41.97
  },
  {
    name: 'Prostate 5LX',
    brand: 'New Chapter',
    category: 'Supplements',
    description:
      '180 Vegetarian Capsules, Serving Size: 2 Capsules, Servings per Container: 90. Non-GMO Verified Formula, Holistic Prostate Support, 100% Vegetarian, Gluten Free, Helps Support Normal Urine Flow and Prostate Health, Made in the USA.',
    imgUrl:
      'https://www.vitacost.com/Images/Products/500/New-Chapter/New-Chapter-Supercritical-Prostate-5LX-727783900692.jpg',
    inStock: 200,
    price: 50.37
  },
  {
    name: 'GOLD Liquid Multi-Vitamin',
    brand: "Nature's Plus",
    category: 'Supplements',
    description:
      '30 fl oz, Serving Size: 2 Tablespoons 1 Capful (1 fl oz) (29.57 mL), Servings per Container: 30, Gluten Free, Vegetarian, Hypo-Allergenic',
    imgUrl:
      'https://www.vitacost.com/Images/Products/500/Natures-Plus/Natures-Plus-Source-of-Life-GOLD-Liquid-Multi-Vitamin-Supplement-Tropical-Fruit-097467307018.jpg',
    inStock: 200,
    price: 47.35
  },
  {
    name: 'Cap Sleeve Eco-Jersey Crew T-Shirt for Women',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'Elegant in its simplicity, this versatile top features a femine cap sleeve in our soft Eco Jersey™ for a tee with ultimate comfort & effortless style. Eco-Jersey ™, 50% Polyester, 38% Cotton, 12% Rayon, Slight shirttail hemlin,e Cap sleeve detail, Scoop neckline, Imported',
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/0/4/04013E10_3.jpg',
    inStock: 200,
    price: 38.0
  },
  {
    name: 'Cap Sleeve Printed Eco-Jersey Crew T-Shirt for Women',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'Elegant in its simplicity, this versatile top features a femine cap sleeve in our soft Eco Jersey™ for a tee with ultimate comfort & effortless style. Eco-Jersey ™, 50% Polyester, 38% Cotton, 12% Rayon, Slight shirttail hemlin,e Cap sleeve detail, Scoop neckline, Imported',
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/0/4/04013EA0_1.jpg',
    inStock: 200,
    price: 42.0
  },
  {
    name: 'Baseball Printed Eco-Jersey T-Shirt for Women',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      "A men's inspired baseball tee crafted in our soft Eco Jersey™ for ultimate comfort & a casual look. Eco-Jersey ™, 50% Polyester, 38% Cotton, 12% Rayon, Slight shirttail hemlin,e Cap sleeve detail, Scoop neckline, Imported",
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/6/1/61352ea_slcmo_w_1.jpg',
    inStock: 200,
    price: 42.0
  },
  {
    name: 'Slinky Jersey V-Neck T-Shirt for Women',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'This alluring deep-V top goes beyond the typical tee, with its smooth, silky drape and irresistible worn-softness. Slinky Jersey, 50% Cotton, 50% Rayon ,Slightly high-low hem, Fitted silhouette, V-Neck, Imported',
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/0/2/02894B20_4.jpg',
    inStock: 200,
    price: 34.0
  },
  {
    name: 'Vintage Garment Dyed Distressed T-Shirt for Women',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      "Here's our Vintage tee with subtle distressing along the neckline and sleeve hem for a truly vintage look. Cotton, 100% Cotton, Distressed detailing, Blind hem stitching detail, Slightly open neckline Imported",
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/0/4/04860CV0_1.jpg',
    inStock: 200,
    price: 38.0
  },
  {
    name: 'Ideal Printed Eco-Jersey T-Shirt for Women',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'Made in soft Eco-Jersey ™ in our best prints, this lightweight crew neck tee is a simple, everyday basic with a flattering, feminine fit. Eco-Jersey ™ 50% Polyester, 38% Cotton, 12% Rayon, Contains organic & recycled materials, Blind hem stitching detail, Bound neckband Garment imported, made with U.S.A. fabric',
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/0/1/01940ea_egpd_w_1.jpg',
    inStock: 200,
    price: 36.0
  },
  {
    name: 'Headliner Vintage Jersey Cropped T-Shirt for Women',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      "This softer-than-ever Vintage Jersey tee comes in a cropped silhouette. Pair with high-waisted pants, and you're good to go. Vintage Jersey, 50% Cotton, 50% Polyester, Set-in ribbed neckband, Double needle stitching at sleeve & bottom hem, Imported",
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/0/5/05114BP0.jpg',
    inStock: 200,
    price: 34.0
  },
  {
    name: 'Cropped Eco-Jersey Stars T-Shirt for Women',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'Stand out with this irresistably soft tri-blend that encourages you to express yourself. Cropped and ready to pair with those high-waisted pants. Eco-Jersey ™ 50% Polyester, 38% Cotton, 12% Rayon, Contains organic & recycled materials, Cuffed sleeves, Cropped, Imported',
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/C/6/C66282EA1.jpg',
    inStock: 200,
    price: 34.0
  },
  {
    name: 'Everyday Printed Cotton Modal V-Neck T-Shirt for Women',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'Made with our Cotton Modal Jersey for extra softness, the Everyday V-Neck is perfect for just thatyour everyday. A fuss-free go-to shirt that lives up to its namesake. Crafted with Lenzing™, a sustainable cellulose fiber derived from beechwood pulp thats twice as soft as conventional cotton. Cotton Modal 60% Cotton, 40% Modal, Crafted sustainably from beechwood pulp, Deeper V neckline Set-in self neckband, Double needle stitching detail, Imported',
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/0/2/02840MQ0.jpg',
    inStock: 200,
    price: 42.0
  },
  {
    name: 'Cap Sleeve Organic Crew T-Shirt for Women',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'This wear-with-anything tee gets instant approval. Featuring a scoop neckline with a soft-curve hem & cap sleeve for a simple & effortless look. 100% Organic Cotton, Scoop neckline, Thin binding at neck, Soft-curve hem, Cap sleeve, Imported',
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/C/1/C12382C20_1.jpg',
    inStock: 200,
    price: 38.0
  },
  {
    name: 'Rayon Challis Boxy T-Shirt for Women',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'Our skim version of a classic tee. Crafted from our soft and lightweight Rayon Challis in a relaxed silhouette. 100% Rayon, Imported',
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/C/6/C66199TH0.jpg',
    inStock: 200,
    price: 48.0
  },
  {
    name: 'Inside Out Garment Dyed Slub Sleeveless T-Shirt for Women',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      "This muscle tee has the broken-in charm of that mens tee you DIY'ed back in the day, but with a loose and flowy fit perfected for your shape. Garment Dyed Slub, 100% Cotton, Slight raw edge, Inside-out detailing, Bra-friendly, Imported",
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/0/2/02898j1_vwre_w_1.jpg',
    inStock: 200,
    price: 38.0
  },
  {
    name: 'Slow Vintage Heavy Knit Jogger Pants for Women',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'Somewhere between a jogger and a yoga pant, our Slow Jogger features a fold-over waistband for extra comfort. 50% Cotton, 50% Polyester, Self drawstring, Ribbed cuff, Rib cuff, Imported',
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/0/7/07600bq_smk_w_1.jpg',
    inStock: 200,
    price: 48.0
  },
  {
    name: 'Printed Eco-Fleece Jogger Pants for Women',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'Our Jogger Pant in super soft Eco-Fleece is a sustainable staple for a casual-comfy look and feel. Eco-Fleece, 50% Polyester, 46% Cotton, 4% Rayon, Contains organic & recycled materials, Elastic waistband with drawstrings, Top applied back patch pocket, Ribbed cuffs & waistband, Front pockets, Imported',
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/3/1/31082fb_egpd_w_1.jpg',
    inStock: 200,
    price: 58.0
  },
  {
    name: 'Eco-Fleece Jogger Pants for Women',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'The ultimate sweat pant for ultimate comfort. Made from our signature Eco-Fleece, this pant features tailored pockets and a tapered leg opening. Eco-Fleece, 50% Polyester, 46% Cotton, 4% Rayon, Contains organic & recycled materials, Drawstring Waistband, Tapered Ankle, Ribbed Cuffs at Leg Opening Garment imported, made with U.S.A. fabric',
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/3/1/31082f2_tdpi_w_1.jpg',
    inStock: 200,
    price: 54.0
  },
  {
    name: 'Cozy Eco-Fleece Shorts for Women',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'These are called the Cozy Shorts for a reason - designed for a relaxed, longer fit, to keep you cozy and comfortable. Eco-Fleece, 50% Polyester, 46% Cotton, 4% Rayon, Contains organic & recycled materials, Garment imported, made with U.S.A. fabric',
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/C/6/C62752F20_1.jpg',
    inStock: 200,
    price: 25.0
  },
  {
    name: 'Lounge Burnout French Terry Shorts for Women',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'Finally, a pair of shorts that are both cute and comfortable. With an authentically worn-in look, relaxed fit and a rolled hem that stays put, lounging has never been more enjoyable. 65% Cotton, 35% Polyester, Rolled hem, Single-needle stitching along pockets, Elastic waistband with drawstrings, Imported',
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/0/8/08630fh_dn_w_1_1.jpg',
    inStock: 200,
    price: 48.0
  },
  {
    name: 'Track Vintage French Terry Shorts for Women',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      "We’ve replicated the look of 70s track shorts in our soft, sporty French Terry for a grown-up comfort and fit. For the days you feel like working out...and the days you don't. Vintage French Terry, 50% Cotton, 50% Polyester, Piece Dyed, Fabric Washed, Side pockets, Back pocket, Banded waist with drawstring, Ribbing at pockets, Pilling resistant, Imported",
    imgUrl:
      'https://media.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/0/5/05078bt_vnn_w_1.jpg',
    inStock: 200,
    price: 42.0
  },
  {
    name: 'Home Team Garment Dyed Slub Henley Shirt for Men',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'This classic Henley tee takes softness and style to the next level with inside-out raw edges and a de-saturated hue produced through our garment-dye process for a versatile, vintage look. As unique as you, this garment has been hand-treated with intentional imperfections for authentically worn-in softness and style no other item is exactly like it. Washed Slub, 100% Cotton, Shirttail hem, Raw edging, Garment-dyed, 2-button placket, Imported',
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/0/6/06897j1_mdpi_m_1_9.jpg',
    inStock: 200,
    price: 44.0
  },
  {
    name: 'Printed Eco-Jersey Crew T-Shirt for Men',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'Crafted from our signature Eco-Jersey triblend, the Eco Crew T-Shirt is a perfect go-to tee comfortable enough for the everyday. Eco-Jersey ™ 50% Polyester, 38% Cotton, 12% Rayon, Contains organic & recycled materials, Bound self neckband, Blind hem stitching detail, Imported',
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/0/1/01973ea_slcmo_m_1.jpg',
    inStock: 200,
    price: 38.0
  },
  {
    name: 'The Outsider Heavy Wash Jersey T-Shirt for Men',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'Made for the ones who follow their own path & march to the beat of their own drum, our 100% cotton Outsider T-Shirt is crafted with heavier yarns, making it the perfect transitional piece. As unique as you, this garment has been hand-treated with intentional imperfections for authentically worn-in softness and style. Heavy Wash Jersey, 100% Cotton, Rib collar, The rich pigments may rub off and should be washed separately, 5.01 oz, Blind stitching on sleeves & hem, Garment-washed for softness, Imported',
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/0/1/01010cg_rd_m_1.jpg',
    inStock: 200,
    price: 28.0
  },
  {
    name: 'Keeper Garment Dyed Slub Long Sleeve T-Shirt for Men',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      "It's called the Keeper for a reason - this time, crafted from our 100% Washed Slub for textural variations and color highs & lows. Our unique garment-dye process creates subtle variations, so no garment is exactly alike. Note that the rich pigments may rub off and should be washed separately. Garment Dyed Slub, 100% Cotton, Set-in sleeves, Bound collar, Imported",
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/0/5/05100J10_1.jpg',
    inStock: 200,
    price: 48.0
  },
  {
    name: 'Kickback Vintage Heavy Knit Pullover Sweatshirt for Men',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'We took our 50/50 yarn and doubled it for a sweater-knit feel. This relaxed pullover is double-dyed and features raglan sleeves, a rib cuff & a turned-back hem with a carefree vibe. 50% Cotton, 50% Polyester, Double-dyed, Raglan sleeves, Turned-back hem, Wide, cover-stitch collar, Imported',
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/0/7/07597bq_sprgn_m_1.jpg',
    inStock: 200,
    price: 31.0
  },
  {
    name: 'Rocky Eco-Fleece Zip Hoodie for Men',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'Our signature zip hoodie in our super soft Eco-Fleece, the Rocky is sure to become your favorite hoodie. Eco-Fleece, 50% Polyester, 46% Cotton, 4% Rayon, Contains organic & recycled materials, Split kangaroo pocket, Ribbed hemband and sleeve cuffs, Set-in sleeves,Hoodie with drawstrings, YKK zipper, Garment imported, made with U.S.A. fabric',
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/0/9/09590f2_etmch_m_1.jpg',
    inStock: 200,
    price: 58.0
  },
  {
    name: 'Campus Burnout French Terry Jogger Pants for Men',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'Looking cool has never been easier (or more comfortable). Made with our super-soft Burnout French Terry, this contemporary jogger features a rib ankle, natural drawstrings & a back yoke pocket. Burnout French Terry, 65% Cotton, 35% Polyester, Ribbed ankles, waistband, Natural drawstrings, Back pocket along yoke seam, Side seams with cover-stitching, Imported',
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/0/8/08625fh_sprgn_m_1.jpg',
    inStock: 200,
    price: 58.0
  },
  {
    name: 'Victory Printed Burnout French Terry Shorts for Men',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'Made from our super-soft Burnout French Terry, these casual shorts are a perfect warm-weather alternative to your favorite sweatpants. Burnout French Terry, 65% Cotton, 35% Polyester, Elastic waist with drawstrings, Contrast stitching at hem, Imported',
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/0/5/05284fj_slcmo_m_1.jpg',
    inStock: 200,
    price: 52.0
  },
  {
    name: 'Hustle Eco-Fleece Open Bottom Sweatpants for Men',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      "These no-frills, easygoing sweatpants are a closet staple. The open bottom creates a straight-leg look that's fitted but roomy, so you can be casual but never sloppy. Eco-Fleece, 50% Polyester, 46% Cotton, 4% Rayon, Contains organic & recycled materials, Open bottom at ankles, Natural drawstring, Side pockets, Banded waist, Garment imported, made with U.S.A. fabric",
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/0/3/03500f2_tdpi_m_1.jpg',
    inStock: 200,
    price: 40.0
  },
  {
    name: 'Side Panel Vintage French Terry Track Pant for Men',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'Vintage athletic-inspired, these track pants feature a contrasting white side stripes, a drawstring closure & unbeatable comfort. Vintage French Terry, 50% Cotton, 50% Polyester, Elastic waistband with drawstrings, Set-in side stripe, Double Needle stitching at bottom hem, Front pockets, Imported',
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/4/3/43123bt_bkwh_m_2.jpg',
    inStock: 200,
    price: 58.0
  },
  {
    name: 'Standard Issue Sweatpants for Men',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'Cozy up in these retro French Terry sweatpants with an Alternative jock tag sewn into one of the back pockets. Or, pair with a muscle tee and head to the gym. These versatile pants are both breathable and comfy. Lightweight French Terry, 100% Cotton, Cuff ankle, Drawstring waist, Thick, banded waist and side pockets, Back right pocket with woven jock tag, Alternative, Exclusive, Heather Grey is 67% Polyester, 33% Cotton, Imported',
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/0/9/09507f2_ny_m_1_1.jpg',
    inStock: 200,
    price: 58.0
  },
  {
    name: 'Dodgeball Eco-Fleece Pants for Men',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'The ultimate sweat pant for ultimate comfort. Made from our signature Eco Fleece, this pant features side pockets and ribbed cuffs. co-Fleece, 50% Polyester, 46% Cotton, 4% Rayon, Contains organic & recycled materials, Ribbed waistband with drawstring, Ribbed cuff at leg opening, Garment imported, made with U.S.A. fabric',
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/C/6/C66164F20.jpg',
    inStock: 200,
    price: 54.0
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
