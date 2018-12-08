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
    name: 'Organic Gluten Free Quinoa Flour',
    brand: 'Vitacost',
    category: 'Groceries',
    description:
      'Non-GMO and Gluten Free, Vegan. Serving Size: 1/4 cup (Approx 28g), Servings per Container: 16',
    imgUrl:
      'https://www.vitacost.com/Images/Products/500/Vitacost/Vitacost-Certified-Organic-Gluten-Free-Quinoa-Flour-844197026364.jpg',
    inStock: 20,
    price: 1.58
  },

  {
    name: 'Coconut Sugar Unrefined',
    brand: 'Nutiva Organic',
    category: 'Groceries',
    description:
      "1 lb,Serving Size: 1 Tsp. (5 g), Servings per Container: About 90. Nutiva's Organic Coconut Sugar is made from fresh coconut tree sap, collected from the cut flower buds. Excellent for baking or in beverages like coffee and tea, it has a subtly sweet taste that is similar to brown sugar with a hint of caramel. Even better, it has a lower glycemic index than cane sugar and is organic and non-GMO. Enjoy in all your favorite recipes!",
    imgUrl:
      'https://www.vitacost.com/Images/Products/500/Nutiva/Nutiva-Organic-Coconut-Sugar-Unrefined-692752103018.jpg',
    inStock: 20,
    price: 4.69
  },
  {
    name: 'Italian Extra Virgin Olive Oil',
    brand: 'Simple Truth®',
    category: 'Groceries',
    description:
      'Organically Grown. No Preservatives., Kosher, USDA Organic, Non-GMO, Serving Size: 1 Tablespoon (15 mL), Servings per Container: About 34',
    imgUrl:
      'https://www.vitacost.com/Images/Products/500/Simple-Truth-Organic/Simple-Truth-Organic-Italian-Extra-Virgin-Olive-Oil-011110841155.jpg',
    inStock: 20,
    price: 5.99
  },
  {
    name: '100% Cranberry Juice',
    brand: 'Simple Truth®',
    category: 'Groceries',
    description:
      'From Concentrate Free From 101+ Artificial Preservatives & Ingredients, Kosher, Pasteurized. 32 fl oz, Per 8 oz fl Serving: 70 Calories, 0g Sat Fat, 35mg Sodium, 7g Sugar Refrigerate After Opening',
    imgUrl:
      'https://www.vitacost.com/Images/Products/500/Simple-Truth/Simple-Truth-100-Cranberry-Juice-011110836052.jpg',
    inStock: 20,
    price: 3.99
  },
  {
    name: 'Organic Raw Almonds',
    brand: 'Vitacost',
    category: 'Groceries',
    description:
      'Organic, Unsalted, Certified kosher, 8 oz (227 g), Serving Size: 1/4 Cup (30 g), Servings per Container: 8',
    imgUrl:
      'https://www.vitacost.com/Images/Products/500/Vitacost/Vitacost-Organic-Raw-Almonds-844197012107.jpg',
    inStock: 20,
    price: 7.91
  },
  {
    name: 'Organic Sprouted Green Lentils -- 10oz',
    brand: 'TruRoots',
    category: 'Groceries',
    description:
      'Lentils are an important protein source for vegetarian diet.  Rehydrate truRoots Sprouted Lentils to use as a fresh salad topping or cook them into a soup or main dish.  They can be a great addition to rice and pasta. Serving Size: 0.25 Cup. Servings per Container: Approx 7.',
    imgUrl:
      'https://www.vitacost.com/Images/Products/500/TruRoots/TruRoots-Organic-Sprouted-Green-Lentils-185814000252.jpg',
    inStock: 20,
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
    inStock: 20,
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
    inStock: 20,
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
    inStock: 20,
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
    inStock: 20,
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
    inStock: 20,
    price: 6.45
  },
  {
    name: 'Vitacost Quick Oats Gluten Free - Non-GMO -- 32 oz (907 g)',
    brand: 'Vitacost',
    category: 'Groceries',
    description:
      'Quick-cooking oats – ready to eat in just 5 minutes. Also great in no-bake cookies & goodies. Wholesome, nutty flavor + chewy texture. Non-GMO Project Verified. Certified gluten-free by the Gluten Intolerance Group (GIG). No artificial flavors, colors or preservatives. High in fiber + 5 grams of protein per serving. Vegan',
    imgUrl:
      'https://www.vitacost.com/Images/Products/500/Vitacost/Vitacost-Quick-Oats-Gluten-Free-Non-GMO-844197026289.jpg',
    inStock: 20,
    price: 5.22
  },
  {
    name: 'French Agen Mini Plums',
    brand: 'Fruit Bliss',
    category: 'Groceries',
    description:
      'Dried Fruit Reinvented!, 1.76 oz, Serving Size: 1 Pouch (50 g), Servings per Container: 1, No Added Sugar, • Unsulfured, Deliciously Juicy - Whole Fruit, Sun Sweetened and Infused with Water, USDA Organic • Non-GMO Verified, Gluten Free • Vegan • Kosher',
    imgUrl:
      'https://www.vitacost.com/Images/Products/500/Fruit-Bliss/Fruit-Bliss-Organic-French-Agen-Mini-Plums-811406020031.jpg',
    inStock: 20,
    price: 2.09
  },
  {
    name: 'Certified Organic Quinoa',
    brand: 'TruRoots',
    category: 'Groceries',
    description:
      'Whole food, non-GMO quinoa, No additives or preservatives, Certified organic, Naturally, gluten free, 6 grams of protein + 3 grams fiber per quarter-cup serving, 12 oz (340 g), Serving Size: 1/4 Cup (Approx 45 g). Servings per Container: 8',
    imgUrl:
      'https://www.vitacost.com/Images/Products/500/TruRoots/TruRoots-Organic-Quinoa-185814000184.jpg',
    inStock: 20,
    price: 3.99
  },
  {
    name: 'Vitacost Organic Dark Chocolate Covered Almonds -- 7 oz (199 g)',
    brand: 'Vitacost',
    category: 'Groceries',
    description:
      'Organic almonds covered in rich, decadent dark chocolate are the perfect healthy indulgence! Vitacost Dark Chocolate Almonds are a great-tasting, all-natural snack you can enjoy anytime, anywhere! Snack healthy with Vitacost – bringing nature’s best to you.  Serving Size: 13 Pieces (40g). Servings per Container: About 5',
    imgUrl:
      'https://www.vitacost.com/Images/Products/500/Vitacost/Vitacost-Organic-Dark-Chocolate-Covered-Almonds-844197012169.jpg',
    inStock: 20,
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
    inStock: 20,
    price: 16.74
  },
  {
    name: 'Vitacost Garbanzo Beans',
    brand: 'Vitacost',
    category: 'Groceries',
    description:
      'Hailed for their starring role in hummus, garbanzo beans—also called chickpeas—add a creamy texture and mild, nutty flavor to your favorite salads, soups and spreads. Non-GMO project Verified. No additives or preservatives. Gluten free & vegan. 8 grams of protein + 14 grams of dietary fiber per ¼ cup. No cholesterol.',
    imgUrl:
      'https://www.vitacost.com/Images/Products/500/Vitacost/Vitacost-Garbanzo-Beans-Non-GMO-and-Gluten-Free-844197024865.jpg',
    inStock: 20,
    price: 5.81
  },
  {
    name: 'Long Grain Brown Rice',
    brand: 'Simple Truth®',
    category: 'Groceries',
    description:
      '100% Whole Grain, Organically Grown, No Preservatives, USDA, Organic, Non-GMO, Kosher, 2 lb, Serving Size: 1/4 Cup Dry (45 g), Servings per Container: About 20',
    imgUrl:
      'https://www.vitacost.com/Images/Products/500/Simple-Truth-Organic/Simple-Truth-Organic-Long-Grain-Brown-Rice-011110863348.jpg',
    inStock: 20,
    price: 3.19
  },
  {
    name: 'Protein Powder, Chocolate',
    brand: 'Ora Organic',
    category: 'Supplements',
    description:
      'A USDA Organic plant-based protein powder made from over 20 organic superfoods and deliver a complete amino acid profile. 20 servings | 22.9oz | 650g, 22g of protein with just 1g of sugar per serving. It comes packed with two servings of organic greens in every shake, adding crucial macro & micronutrients for proper cognitive and muscle function',
    imgUrl:
      'https://cdn.shopify.com/s/files/1/0767/1029/products/prtn-pwd-ch-front_512x512.png?v=1540581808',
    inStock: 20,
    price: 49.99
  },
  {
    name: 'SPORT Organic Plant-Based Recovery',
    brand: 'Garden of Life',
    category: 'Supplements',
    description:
      'Muscle repair is critical after your workout and Organic Plant-Based Recovery provides the clean nutrients necessary to recover after exertion.† Being Certified USDA Organic and Non-GMO Project Verified, as well as NSF Certified for Sport and Informed-Choice for Sport Certified, Organic Plant-Based Recovery is the cleanest post-workout formula available ensuring the product is free of any banned athletic substances.',
    imgUrl:
      'https://www.gardenoflife.com/product-data/files/images/products/full/658010119474-.png',
    inStock: 20,
    price: 31.96
  },
  {
    name: 'Pre-Workout Powder',
    brand: 'Ora Organic',
    category: 'Supplements',
    description:
      'Renewable Energy is a vegan and USDA certified organic clean source of energy (and a good pun), that doesn’t leave you strung out and comes in a delicious organic pomegranate and berry flavor. Start your workout (or work-day!) with 90mg of caffeine and a jitter-free energy boost* thanks to a balanced blend of organic green coffee bean, yerba mate, matcha tea, eleuthero root, and ginseng.* Sometimes raw energy isn’t enough though, and that’s why we’ve included nitric oxide boosting fruits and vegetables as well as an organic adaptogen blend. 20 servings, 200g.',
    imgUrl:
      'https://cdn.shopify.com/s/files/1/0767/1029/products/pre-pwd-pom-front.png?v=1540579492',
    inStock: 20,
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
    inStock: 20,
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
    inStock: 20,
    price: 34.99
  },
  {
    name: 'RAW Protein & greens',
    brand: 'Garden of Life',
    category: 'Supplements',
    description:
      'RAW Protein & greens are CLEAN—Certified USDA Organic and Non-GMO Project Verified—and we think that CLEAN tastes better! Now you have even more choices with your protein: RAW Protein & greens—in a variety of available flavors, including Real RAW Vanilla, Chocolate Cacao, and Lightly Sweet. Offering 20 grams of smooth, raw organic plant protein per serving from organic sprouted brown rice, organic peas, organic chia, organic navy beans, organic lentil beans and organic garbanzo beans and 6 organic greens and veggies—organic alfalfa grass juice, organic spinach, organic kale, and organic broccoli, carrots and beets—1.5 billion CFU probiotics, 13 non-GMO enzymes, 3 grams of organic fiber and less than 1 gram of naturally occurring sugar, RAW Protein & greens is a delish way to get your protein and greens in one serving.',
    imgUrl:
      'https://www.gardenoflife.com/product-data/files/images/products/full/658010118729-.png',
    inStock: 20,
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
    inStock: 20,
    price: 18.99
  },
  {
    name: 'Organic Plant Protein',
    brand: 'Garden of Life',
    category: 'Supplements',
    description:
      'Organic Plant Protein is made with a unique blend of seven nutritious plant proteins from five organic American seed proteins—organic pea seed, organic flaxseed, organic cranberry seed, organic chia seed, and organic pumpkin seed. It also contains the organic African superfood baobab (which we purchase through the African Hub to guarantee Fair Trade), plus 13 enzymes and 1 Billion CFU of probiotics.',
    imgUrl:
      'https://www.gardenoflife.com/product-data/files/images/products/full/658010118026-.png',
    inStock: 20,
    price: 18.99
  },
  {
    name: 'Raw Organic Fit Protein Powder Chocolate Cacao',
    brand: 'Garden of Life',
    category: 'Supplements',
    description:
      'Raw Organic Fit is a Certified USDA Organic, Raw, plant-based, vegan, high-protein powder specifically designed for weight loss† and is made with 13 raw sprouted organic ingredients. It differs from our other proteins because it has several additional clinically studied ingredients, including Svetol® Green Coffee Bean Extract, Raw Food Created Chromium and Organic Cinnamon to help you burn fat, maintain healthy blood sugar, boost your energy, lose weight and look great! 35oz (922g)',
    imgUrl:
      'https://www.gardenoflife.com/media/catalog/product/cache/1/small_image/230x/9df78eab33525d08d6e5fb8d27136e95/6/5/658010119849-.png',
    inStock: 20,
    price: 47.96
  },
  {
    name: 'Micronized L-Glutamine Powder',
    brand: 'Ora Organic',
    category: 'Supplements',
    description:
      'L-Glutamine – the most abundant amino acid in the human body – is involved in many metabolic processes, including the synthesis and protection of muscle tissue, the production of glycogen, as well as immune support during periods of immune and muscular stress.* L-Glutamine is also a major source of fuel for enterocytes (intestinal cells) and hence supports the integrity of the intestinal lining.* Size:	250G (8.8OZ 50 SERVINGS)500G (1.1LB 100 SERVINGS)1000G (2.2 LB 200 SERVINGS)',
    imgUrl:
      'https://organic-supply.com/wp-content/uploads/2017/12/l-glutamine.jpg',
    inStock: 20,
    price: 39.95
  },
  {
    name: 'One Daily Multi',
    brand: 'New Chapter',
    category: 'Supplements',
    description:
      '72 Tablets, Serving Size: 1 Tablet, Servings per Container: 72, Multiple benefits for women 40+ include Stress Support; Vitamin D3 for Bone Support; Vitamin C, Vitamin A & Zinc for Immune Support; B Vitamins for Energy Support',
    imgUrl:
      'https://www.vitacost.com/Images/Products/500/New-Chapter/New-Chapter-Every-Womans-One-Daily-40-Plus-Multivitamin-727783003676.jpg',
    inStock: 20,
    price: 41.97
  },
  {
    name: 'Zyflamend™ Nighttime',
    brand: 'New Chapter',
    category: 'Supplements',
    description:
      'Zyflamend Nighttime is designed to help you enjoy a deep and restful sleep through a combination of multiple time-tested herbs such as Lemon Balm, Hops, Chamomile, and Valerian. The whole-food antioxidants in Zyflamend Nighttime can also quench free radicals and support healthy aging',
    imgUrl:
      'https://cdn8.bigcommerce.com/s-zsd73psd0i/images/stencil/1280x1280/products/595/823/ZYPM-F01-BotBox-FR-644x616px__77186.1538592266.png?c=2&imbypass=on&imbypass=on',
    inStock: 20,
    price: 50.37
  },
  {
    name: 'Cap Sleeve Eco-Jersey Crew T-Shirt for Women',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'Elegant in its simplicity, this versatile top features a femine cap sleeve in our soft Eco Jersey™ for a tee with ultimate comfort & effortless style. Eco-Jersey ™, 50% Polyester, 38% Cotton, 12% Rayon, Slight shirttail hemlin,e Cap sleeve detail, Scoop neckline, Imported',
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/0/4/04013E10_3.jpg',
    inStock: 20,
    price: 38.0,
    size: 'XS'
  },
  {
    name: 'Cap Sleeve Eco-Jersey Crew T-Shirt for Women',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'Elegant in its simplicity, this versatile top features a femine cap sleeve in our soft Eco Jersey™ for a tee with ultimate comfort & effortless style. Eco-Jersey ™, 50% Polyester, 38% Cotton, 12% Rayon, Slight shirttail hemlin,e Cap sleeve detail, Scoop neckline, Imported',
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/0/4/04013E10_3.jpg',
    inStock: 20,
    price: 38.0,
    size: 'S'
  },
  {
    name: 'Cap Sleeve Eco-Jersey Crew T-Shirt for Women',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'Elegant in its simplicity, this versatile top features a femine cap sleeve in our soft Eco Jersey™ for a tee with ultimate comfort & effortless style. Eco-Jersey ™, 50% Polyester, 38% Cotton, 12% Rayon, Slight shirttail hemlin,e Cap sleeve detail, Scoop neckline, Imported',
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/0/4/04013E10_3.jpg',
    inStock: 20,
    price: 38.0,
    size: 'M'
  },
  {
    name: 'Cap Sleeve Eco-Jersey Crew T-Shirt for Women',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'Elegant in its simplicity, this versatile top features a femine cap sleeve in our soft Eco Jersey™ for a tee with ultimate comfort & effortless style. Eco-Jersey ™, 50% Polyester, 38% Cotton, 12% Rayon, Slight shirttail hemlin,e Cap sleeve detail, Scoop neckline, Imported',
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/0/4/04013E10_3.jpg',
    inStock: 20,
    price: 38.0,
    size: 'L'
  },
  {
    name: 'Cap Sleeve Eco-Jersey Crew T-Shirt for Women',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'Elegant in its simplicity, this versatile top features a femine cap sleeve in our soft Eco Jersey™ for a tee with ultimate comfort & effortless style. Eco-Jersey ™, 50% Polyester, 38% Cotton, 12% Rayon, Slight shirttail hemlin,e Cap sleeve detail, Scoop neckline, Imported',
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/0/4/04013E10_3.jpg',
    inStock: 20,
    price: 38.0,
    size: 'XL'
  },
  {
    name: 'Cap Sleeve Printed Eco-Jersey Crew T-Shirt for Women',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'Elegant in its simplicity, this versatile top features a femine cap sleeve in our soft Eco Jersey™ for a tee with ultimate comfort & effortless style. Eco-Jersey ™, 50% Polyester, 38% Cotton, 12% Rayon, Slight shirttail hemlin,e Cap sleeve detail, Scoop neckline, Imported',
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/0/4/04013EA0_1.jpg',
    inStock: 20,
    price: 42.0,
    size: 'XS'
  },
  {
    name: 'Cap Sleeve Printed Eco-Jersey Crew T-Shirt for Women',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'Elegant in its simplicity, this versatile top features a femine cap sleeve in our soft Eco Jersey™ for a tee with ultimate comfort & effortless style. Eco-Jersey ™, 50% Polyester, 38% Cotton, 12% Rayon, Slight shirttail hemlin,e Cap sleeve detail, Scoop neckline, Imported',
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/0/4/04013EA0_1.jpg',
    inStock: 20,
    price: 42.0,
    size: 'S'
  },
  {
    name: 'Cap Sleeve Printed Eco-Jersey Crew T-Shirt for Women',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'Elegant in its simplicity, this versatile top features a femine cap sleeve in our soft Eco Jersey™ for a tee with ultimate comfort & effortless style. Eco-Jersey ™, 50% Polyester, 38% Cotton, 12% Rayon, Slight shirttail hemlin,e Cap sleeve detail, Scoop neckline, Imported',
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/0/4/04013EA0_1.jpg',
    inStock: 20,
    price: 42.0,
    size: 'M'
  },
  {
    name: 'Cap Sleeve Printed Eco-Jersey Crew T-Shirt for Women',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'Elegant in its simplicity, this versatile top features a femine cap sleeve in our soft Eco Jersey™ for a tee with ultimate comfort & effortless style. Eco-Jersey ™, 50% Polyester, 38% Cotton, 12% Rayon, Slight shirttail hemlin,e Cap sleeve detail, Scoop neckline, Imported',
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/0/4/04013EA0_1.jpg',
    inStock: 20,
    price: 42.0,
    size: 'L'
  },
  {
    name: 'Cap Sleeve Printed Eco-Jersey Crew T-Shirt for Women',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'Elegant in its simplicity, this versatile top features a femine cap sleeve in our soft Eco Jersey™ for a tee with ultimate comfort & effortless style. Eco-Jersey ™, 50% Polyester, 38% Cotton, 12% Rayon, Slight shirttail hemlin,e Cap sleeve detail, Scoop neckline, Imported',
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/0/4/04013EA0_1.jpg',
    inStock: 20,
    price: 42.0,
    size: 'XL'
  },
  {
    name: 'Baseball Printed Eco-Jersey T-Shirt for Women',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      "A men's inspired baseball tee crafted in our soft Eco Jersey™ for ultimate comfort & a casual look. Eco-Jersey ™, 50% Polyester, 38% Cotton, 12% Rayon, Slight shirttail hemlin,e Cap sleeve detail, Scoop neckline, Imported",
    imgUrl:
      'https://media.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/6/1/61352ea_eitrs_w_1_1.jpg',
    inStock: 20,
    price: 42.0,
    size: 'XS'
  },
  {
    name: 'Baseball Printed Eco-Jersey T-Shirt for Women',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      "A men's inspired baseball tee crafted in our soft Eco Jersey™ for ultimate comfort & a casual look. Eco-Jersey ™, 50% Polyester, 38% Cotton, 12% Rayon, Slight shirttail hemlin,e Cap sleeve detail, Scoop neckline, Imported",
    imgUrl:
      'https://media.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/6/1/61352ea_eitrs_w_1_1.jpg',
    inStock: 20,
    price: 42.0,
    size: 'S'
  },
  {
    name: 'Baseball Printed Eco-Jersey T-Shirt for Women',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      "A men's inspired baseball tee crafted in our soft Eco Jersey™ for ultimate comfort & a casual look. Eco-Jersey ™, 50% Polyester, 38% Cotton, 12% Rayon, Slight shirttail hemlin,e Cap sleeve detail, Scoop neckline, Imported",
    imgUrl:
      'https://media.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/6/1/61352ea_eitrs_w_1_1.jpg',
    inStock: 20,
    price: 42.0,
    size: 'M'
  },
  {
    name: 'Baseball Printed Eco-Jersey T-Shirt for Women',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      "A men's inspired baseball tee crafted in our soft Eco Jersey™ for ultimate comfort & a casual look. Eco-Jersey ™, 50% Polyester, 38% Cotton, 12% Rayon, Slight shirttail hemlin,e Cap sleeve detail, Scoop neckline, Imported",
    imgUrl:
      'https://media.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/6/1/61352ea_eitrs_w_1_1.jpg',
    inStock: 20,
    price: 42.0,
    size: 'L'
  },
  {
    name: 'Baseball Printed Eco-Jersey T-Shirt for Women',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      "A men's inspired baseball tee crafted in our soft Eco Jersey™ for ultimate comfort & a casual look. Eco-Jersey ™, 50% Polyester, 38% Cotton, 12% Rayon, Slight shirttail hemlin,e Cap sleeve detail, Scoop neckline, Imported",
    imgUrl:
      'https://media.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/6/1/61352ea_eitrs_w_1_1.jpg',
    inStock: 20,
    price: 42.0,
    size: 'XL'
  },
  {
    name: 'Slinky Jersey V-Neck T-Shirt for Women',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'This alluring deep-V top goes beyond the typical tee, with its smooth, silky drape and irresistible worn-softness. Slinky Jersey, 50% Cotton, 50% Rayon ,Slightly high-low hem, Fitted silhouette, V-Neck, Imported',
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/0/2/02894B20_4.jpg',
    inStock: 20,
    price: 34.0,
    size: 'XS'
  },
  {
    name: 'Slinky Jersey V-Neck T-Shirt for Women',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'This alluring deep-V top goes beyond the typical tee, with its smooth, silky drape and irresistible worn-softness. Slinky Jersey, 50% Cotton, 50% Rayon ,Slightly high-low hem, Fitted silhouette, V-Neck, Imported',
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/0/2/02894B20_4.jpg',
    inStock: 20,
    price: 34.0,
    size: 'S'
  },
  {
    name: 'Slinky Jersey V-Neck T-Shirt for Women',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'This alluring deep-V top goes beyond the typical tee, with its smooth, silky drape and irresistible worn-softness. Slinky Jersey, 50% Cotton, 50% Rayon ,Slightly high-low hem, Fitted silhouette, V-Neck, Imported',
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/0/2/02894B20_4.jpg',
    inStock: 20,
    price: 34.0,
    size: 'M'
  },
  {
    name: 'Slinky Jersey V-Neck T-Shirt for Women',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'This alluring deep-V top goes beyond the typical tee, with its smooth, silky drape and irresistible worn-softness. Slinky Jersey, 50% Cotton, 50% Rayon ,Slightly high-low hem, Fitted silhouette, V-Neck, Imported',
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/0/2/02894B20_4.jpg',
    inStock: 20,
    price: 34.0,
    size: 'L'
  },
  {
    name: 'Slinky Jersey V-Neck T-Shirt for Women',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'This alluring deep-V top goes beyond the typical tee, with its smooth, silky drape and irresistible worn-softness. Slinky Jersey, 50% Cotton, 50% Rayon ,Slightly high-low hem, Fitted silhouette, V-Neck, Imported',
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/0/2/02894B20_4.jpg',
    inStock: 20,
    price: 34.0,
    size: 'XL'
  },
  {
    name: 'Vintage Garment Dyed Distressed T-Shirt for Women',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      "Here's our Vintage tee with subtle distressing along the neckline and sleeve hem for a truly vintage look. Cotton, 100% Cotton, Distressed detailing, Blind hem stitching detail, Slightly open neckline Imported",
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/0/4/04860CV0_1.jpg',
    inStock: 20,
    price: 38.0,
    size: 'XS'
  },
  {
    name: 'Vintage Garment Dyed Distressed T-Shirt for Women',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      "Here's our Vintage tee with subtle distressing along the neckline and sleeve hem for a truly vintage look. Cotton, 100% Cotton, Distressed detailing, Blind hem stitching detail, Slightly open neckline Imported",
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/0/4/04860CV0_1.jpg',
    inStock: 20,
    price: 38.0,
    size: 'S'
  },
  {
    name: 'Vintage Garment Dyed Distressed T-Shirt for Women',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      "Here's our Vintage tee with subtle distressing along the neckline and sleeve hem for a truly vintage look. Cotton, 100% Cotton, Distressed detailing, Blind hem stitching detail, Slightly open neckline Imported",
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/0/4/04860CV0_1.jpg',
    inStock: 20,
    price: 38.0,
    size: 'M'
  },
  {
    name: 'Vintage Garment Dyed Distressed T-Shirt for Women',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      "Here's our Vintage tee with subtle distressing along the neckline and sleeve hem for a truly vintage look. Cotton, 100% Cotton, Distressed detailing, Blind hem stitching detail, Slightly open neckline Imported",
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/0/4/04860CV0_1.jpg',
    inStock: 20,
    price: 38.0,
    size: 'L'
  },
  {
    name: 'Vintage Garment Dyed Distressed T-Shirt for Women',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      "Here's our Vintage tee with subtle distressing along the neckline and sleeve hem for a truly vintage look. Cotton, 100% Cotton, Distressed detailing, Blind hem stitching detail, Slightly open neckline Imported",
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/0/4/04860CV0_1.jpg',
    inStock: 20,
    price: 38.0,
    size: 'XL'
  },
  {
    name: 'Ideal Printed Eco-Jersey T-Shirt for Women',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'Made in soft Eco-Jersey ™ in our best prints, this lightweight crew neck tee is a simple, everyday basic with a flattering, feminine fit. Eco-Jersey ™ 50% Polyester, 38% Cotton, 12% Rayon, Contains organic & recycled materials, Blind hem stitching detail, Bound neckband Garment imported, made with U.S.A. fabric',
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/0/1/01940ea_egpd_w_1.jpg',
    inStock: 20,
    price: 36.0,
    size: 'XS'
  },
  {
    name: 'Ideal Printed Eco-Jersey T-Shirt for Women',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'Made in soft Eco-Jersey ™ in our best prints, this lightweight crew neck tee is a simple, everyday basic with a flattering, feminine fit. Eco-Jersey ™ 50% Polyester, 38% Cotton, 12% Rayon, Contains organic & recycled materials, Blind hem stitching detail, Bound neckband Garment imported, made with U.S.A. fabric',
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/0/1/01940ea_egpd_w_1.jpg',
    inStock: 20,
    price: 36.0,
    size: 'S'
  },
  {
    name: 'Ideal Printed Eco-Jersey T-Shirt for Women',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'Made in soft Eco-Jersey ™ in our best prints, this lightweight crew neck tee is a simple, everyday basic with a flattering, feminine fit. Eco-Jersey ™ 50% Polyester, 38% Cotton, 12% Rayon, Contains organic & recycled materials, Blind hem stitching detail, Bound neckband Garment imported, made with U.S.A. fabric',
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/0/1/01940ea_egpd_w_1.jpg',
    inStock: 20,
    price: 36.0,
    size: 'M'
  },
  {
    name: 'Ideal Printed Eco-Jersey T-Shirt for Women',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'Made in soft Eco-Jersey ™ in our best prints, this lightweight crew neck tee is a simple, everyday basic with a flattering, feminine fit. Eco-Jersey ™ 50% Polyester, 38% Cotton, 12% Rayon, Contains organic & recycled materials, Blind hem stitching detail, Bound neckband Garment imported, made with U.S.A. fabric',
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/0/1/01940ea_egpd_w_1.jpg',
    inStock: 20,
    price: 36.0,
    size: 'LG'
  },
  {
    name: 'Ideal Printed Eco-Jersey T-Shirt for Women',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'Made in soft Eco-Jersey ™ in our best prints, this lightweight crew neck tee is a simple, everyday basic with a flattering, feminine fit. Eco-Jersey ™ 50% Polyester, 38% Cotton, 12% Rayon, Contains organic & recycled materials, Blind hem stitching detail, Bound neckband Garment imported, made with U.S.A. fabric',
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/0/1/01940ea_egpd_w_1.jpg',
    inStock: 20,
    price: 36.0,
    size: 'XL'
  },
  {
    name: 'Headliner Vintage Jersey Cropped T-Shirt for Women',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      "This softer-than-ever Vintage Jersey tee comes in a cropped silhouette. Pair with high-waisted pants, and you're good to go. Vintage Jersey, 50% Cotton, 50% Polyester, Set-in ribbed neckband, Double needle stitching at sleeve & bottom hem, Imported",
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/0/5/05114BP0.jpg',
    inStock: 20,
    price: 34.0,
    size: 'XS'
  },
  {
    name: 'Headliner Vintage Jersey Cropped T-Shirt for Women',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      "This softer-than-ever Vintage Jersey tee comes in a cropped silhouette. Pair with high-waisted pants, and you're good to go. Vintage Jersey, 50% Cotton, 50% Polyester, Set-in ribbed neckband, Double needle stitching at sleeve & bottom hem, Imported",
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/0/5/05114BP0.jpg',
    inStock: 20,
    price: 34.0,
    size: 'S'
  },
  {
    name: 'Headliner Vintage Jersey Cropped T-Shirt for Women',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      "This softer-than-ever Vintage Jersey tee comes in a cropped silhouette. Pair with high-waisted pants, and you're good to go. Vintage Jersey, 50% Cotton, 50% Polyester, Set-in ribbed neckband, Double needle stitching at sleeve & bottom hem, Imported",
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/0/5/05114BP0.jpg',
    inStock: 20,
    price: 34.0,
    size: 'M'
  },
  {
    name: 'Headliner Vintage Jersey Cropped T-Shirt for Women',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      "This softer-than-ever Vintage Jersey tee comes in a cropped silhouette. Pair with high-waisted pants, and you're good to go. Vintage Jersey, 50% Cotton, 50% Polyester, Set-in ribbed neckband, Double needle stitching at sleeve & bottom hem, Imported",
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/0/5/05114BP0.jpg',
    inStock: 20,
    price: 34.0,
    size: 'L'
  },
  {
    name: 'Headliner Vintage Jersey Cropped T-Shirt for Women',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      "This softer-than-ever Vintage Jersey tee comes in a cropped silhouette. Pair with high-waisted pants, and you're good to go. Vintage Jersey, 50% Cotton, 50% Polyester, Set-in ribbed neckband, Double needle stitching at sleeve & bottom hem, Imported",
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/0/5/05114BP0.jpg',
    inStock: 20,
    price: 34.0,
    size: 'XL'
  },
  {
    name: 'Ramble Vintage Thermal Tunic',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'Crafted for all-day comfort during cooler months, this thermal tunic features a dropped shoulder, raglan sleeves & a high-low shirttail curved hem.',
    imgUrl:
      'https://media.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/4/3/43129BZ0.jpg',
    inStock: 20,
    price: 58.0,
    size: 'XS'
  },
  {
    name: 'Ramble Vintage Thermal Tunic',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'Crafted for all-day comfort during cooler months, this thermal tunic features a dropped shoulder, raglan sleeves & a high-low shirttail curved hem.',
    imgUrl:
      'https://media.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/4/3/43129BZ0.jpg',
    inStock: 20,
    price: 58.0,
    size: 'S'
  },
  {
    name: 'Ramble Vintage Thermal Tunic',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'Crafted for all-day comfort during cooler months, this thermal tunic features a dropped shoulder, raglan sleeves & a high-low shirttail curved hem.',
    imgUrl:
      'https://media.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/4/3/43129BZ0.jpg',
    inStock: 20,
    price: 58.0,
    size: 'M'
  },
  {
    name: 'Ramble Vintage Thermal Tunic',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'Crafted for all-day comfort during cooler months, this thermal tunic features a dropped shoulder, raglan sleeves & a high-low shirttail curved hem.',
    imgUrl:
      'https://media.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/4/3/43129BZ0.jpg',
    inStock: 20,
    price: 58.0,
    size: 'LG'
  },
  {
    name: 'Ramble Vintage Thermal Tunic',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'Crafted for all-day comfort during cooler months, this thermal tunic features a dropped shoulder, raglan sleeves & a high-low shirttail curved hem.',
    imgUrl:
      'https://media.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/4/3/43129BZ0.jpg',
    inStock: 20,
    price: 58.0,
    size: 'XL'
  },
  {
    name: 'Everyday Printed Cotton Modal V-Neck T-Shirt for Women',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'Made with our Cotton Modal Jersey for extra softness, the Everyday V-Neck is perfect for just thatyour everyday. A fuss-free go-to shirt that lives up to its namesake. Crafted with Lenzing™, a sustainable cellulose fiber derived from beechwood pulp thats twice as soft as conventional cotton. Cotton Modal 60% Cotton, 40% Modal, Crafted sustainably from beechwood pulp, Deeper V neckline Set-in self neckband, Double needle stitching detail, Imported',
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/0/2/02840MQ0.jpg',
    inStock: 20,
    price: 42.0,
    size: 'XS'
  },
  {
    name: 'Everyday Printed Cotton Modal V-Neck T-Shirt for Women',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'Made with our Cotton Modal Jersey for extra softness, the Everyday V-Neck is perfect for just thatyour everyday. A fuss-free go-to shirt that lives up to its namesake. Crafted with Lenzing™, a sustainable cellulose fiber derived from beechwood pulp thats twice as soft as conventional cotton. Cotton Modal 60% Cotton, 40% Modal, Crafted sustainably from beechwood pulp, Deeper V neckline Set-in self neckband, Double needle stitching detail, Imported',
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/0/2/02840MQ0.jpg',
    inStock: 20,
    price: 42.0,
    size: 'S'
  },
  {
    name: 'Everyday Printed Cotton Modal V-Neck T-Shirt for Women',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'Made with our Cotton Modal Jersey for extra softness, the Everyday V-Neck is perfect for just thatyour everyday. A fuss-free go-to shirt that lives up to its namesake. Crafted with Lenzing™, a sustainable cellulose fiber derived from beechwood pulp thats twice as soft as conventional cotton. Cotton Modal 60% Cotton, 40% Modal, Crafted sustainably from beechwood pulp, Deeper V neckline Set-in self neckband, Double needle stitching detail, Imported',
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/0/2/02840MQ0.jpg',
    inStock: 20,
    price: 42.0,
    size: 'M'
  },
  {
    name: 'Everyday Printed Cotton Modal V-Neck T-Shirt for Women',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'Made with our Cotton Modal Jersey for extra softness, the Everyday V-Neck is perfect for just thatyour everyday. A fuss-free go-to shirt that lives up to its namesake. Crafted with Lenzing™, a sustainable cellulose fiber derived from beechwood pulp thats twice as soft as conventional cotton. Cotton Modal 60% Cotton, 40% Modal, Crafted sustainably from beechwood pulp, Deeper V neckline Set-in self neckband, Double needle stitching detail, Imported',
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/0/2/02840MQ0.jpg',
    inStock: 20,
    price: 42.0,
    size: 'L'
  },
  {
    name: 'Everyday Printed Cotton Modal V-Neck T-Shirt for Women',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'Made with our Cotton Modal Jersey for extra softness, the Everyday V-Neck is perfect for just thatyour everyday. A fuss-free go-to shirt that lives up to its namesake. Crafted with Lenzing™, a sustainable cellulose fiber derived from beechwood pulp thats twice as soft as conventional cotton. Cotton Modal 60% Cotton, 40% Modal, Crafted sustainably from beechwood pulp, Deeper V neckline Set-in self neckband, Double needle stitching detail, Imported',
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/0/2/02840MQ0.jpg',
    inStock: 20,
    price: 42.0,
    size: 'XL'
  },
  {
    name: 'Cap Sleeve Organic Crew T-Shirt for Women',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'This wear-with-anything tee gets instant approval. Featuring a scoop neckline with a soft-curve hem & cap sleeve for a simple & effortless look. 100% Organic Cotton, Scoop neckline, Thin binding at neck, Soft-curve hem, Cap sleeve, Imported',
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/C/1/C12382C20_1.jpg',
    inStock: 20,
    price: 38.0,
    size: 'XS'
  },
  {
    name: 'Cap Sleeve Organic Crew T-Shirt for Women',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'This wear-with-anything tee gets instant approval. Featuring a scoop neckline with a soft-curve hem & cap sleeve for a simple & effortless look. 100% Organic Cotton, Scoop neckline, Thin binding at neck, Soft-curve hem, Cap sleeve, Imported',
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/C/1/C12382C20_1.jpg',
    inStock: 20,
    price: 38.0,
    size: 'S'
  },
  {
    name: 'Cap Sleeve Organic Crew T-Shirt for Women',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'This wear-with-anything tee gets instant approval. Featuring a scoop neckline with a soft-curve hem & cap sleeve for a simple & effortless look. 100% Organic Cotton, Scoop neckline, Thin binding at neck, Soft-curve hem, Cap sleeve, Imported',
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/C/1/C12382C20_1.jpg',
    inStock: 20,
    price: 38.0,
    size: 'M'
  },
  {
    name: 'Cap Sleeve Organic Crew T-Shirt for Women',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'This wear-with-anything tee gets instant approval. Featuring a scoop neckline with a soft-curve hem & cap sleeve for a simple & effortless look. 100% Organic Cotton, Scoop neckline, Thin binding at neck, Soft-curve hem, Cap sleeve, Imported',
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/C/1/C12382C20_1.jpg',
    inStock: 20,
    price: 38.0,
    size: 'L'
  },
  {
    name: 'Cap Sleeve Organic Crew T-Shirt for Women',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'This wear-with-anything tee gets instant approval. Featuring a scoop neckline with a soft-curve hem & cap sleeve for a simple & effortless look. 100% Organic Cotton, Scoop neckline, Thin binding at neck, Soft-curve hem, Cap sleeve, Imported',
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/C/1/C12382C20_1.jpg',
    inStock: 20,
    price: 38.0,
    size: 'XL'
  },
  {
    name: 'Rayon Challis Boxy T-Shirt for Women',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'Our skim version of a classic tee. Crafted from our soft and lightweight Rayon Challis in a relaxed silhouette. 100% Rayon, Imported',
    imgUrl:
      'https://media.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/c/6/c66199th_gy_w_1.jpg',
    inStock: 20,
    price: 48.0,
    size: 'XS'
  },
  {
    name: 'Rayon Challis Boxy T-Shirt for Women',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'Our skim version of a classic tee. Crafted from our soft and lightweight Rayon Challis in a relaxed silhouette. 100% Rayon, Imported',
    imgUrl:
      'https://media.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/c/6/c66199th_gy_w_1.jpg',
    inStock: 20,
    price: 48.0,
    size: 'S'
  },
  {
    name: 'Rayon Challis Boxy T-Shirt for Women',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'Our skim version of a classic tee. Crafted from our soft and lightweight Rayon Challis in a relaxed silhouette. 100% Rayon, Imported',
    imgUrl:
      'https://media.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/c/6/c66199th_gy_w_1.jpg',
    inStock: 20,
    price: 48.0,
    size: 'M'
  },
  {
    name: 'Rayon Challis Boxy T-Shirt for Women',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'Our skim version of a classic tee. Crafted from our soft and lightweight Rayon Challis in a relaxed silhouette. 100% Rayon, Imported',
    imgUrl:
      'https://media.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/c/6/c66199th_gy_w_1.jpg',
    inStock: 20,
    price: 48.0,
    size: 'L'
  },
  {
    name: 'Rayon Challis Boxy T-Shirt for Women',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'Our skim version of a classic tee. Crafted from our soft and lightweight Rayon Challis in a relaxed silhouette. 100% Rayon, Imported',
    imgUrl:
      'https://media.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/c/6/c66199th_gy_w_1.jpg',
    inStock: 20,
    price: 48.0,
    size: 'XL'
  },
  {
    name: 'Inside Out Garment Dyed Slub Sleeveless T-Shirt for Women',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      "This muscle tee has the broken-in charm of that mens tee you DIY'ed back in the day, but with a loose and flowy fit perfected for your shape. Garment Dyed Slub, 100% Cotton, Slight raw edge, Inside-out detailing, Bra-friendly, Imported",
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/0/2/02898j1_vwre_w_1.jpg',
    inStock: 20,
    price: 38.0,
    size: 'XS'
  },
  {
    name: 'Inside Out Garment Dyed Slub Sleeveless T-Shirt for Women',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      "This muscle tee has the broken-in charm of that mens tee you DIY'ed back in the day, but with a loose and flowy fit perfected for your shape. Garment Dyed Slub, 100% Cotton, Slight raw edge, Inside-out detailing, Bra-friendly, Imported",
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/0/2/02898j1_vwre_w_1.jpg',
    inStock: 20,
    price: 38.0,
    size: 'S'
  },
  {
    name: 'Inside Out Garment Dyed Slub Sleeveless T-Shirt for Women',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      "This muscle tee has the broken-in charm of that mens tee you DIY'ed back in the day, but with a loose and flowy fit perfected for your shape. Garment Dyed Slub, 100% Cotton, Slight raw edge, Inside-out detailing, Bra-friendly, Imported",
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/0/2/02898j1_vwre_w_1.jpg',
    inStock: 20,
    price: 38.0,
    size: 'M'
  },
  {
    name: 'Inside Out Garment Dyed Slub Sleeveless T-Shirt for Women',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      "This muscle tee has the broken-in charm of that mens tee you DIY'ed back in the day, but with a loose and flowy fit perfected for your shape. Garment Dyed Slub, 100% Cotton, Slight raw edge, Inside-out detailing, Bra-friendly, Imported",
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/0/2/02898j1_vwre_w_1.jpg',
    inStock: 20,
    price: 38.0,
    size: 'L'
  },
  {
    name: 'Inside Out Garment Dyed Slub Sleeveless T-Shirt for Women',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      "This muscle tee has the broken-in charm of that mens tee you DIY'ed back in the day, but with a loose and flowy fit perfected for your shape. Garment Dyed Slub, 100% Cotton, Slight raw edge, Inside-out detailing, Bra-friendly, Imported",
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/0/2/02898j1_vwre_w_1.jpg',
    inStock: 20,
    price: 38.0,
    size: 'XL'
  },
  {
    name: 'Slow Vintage Heavy Knit Jogger Pants for Women',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'Somewhere between a jogger and a yoga pant, our Slow Jogger features a fold-over waistband for extra comfort. 50% Cotton, 50% Polyester, Self drawstring, Ribbed cuff, Rib cuff, Imported',
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/0/7/07600bq_smk_w_1.jpg',
    inStock: 20,
    price: 48.0,
    size: 'XS'
  },
  {
    name: 'Slow Vintage Heavy Knit Jogger Pants for Women',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'Somewhere between a jogger and a yoga pant, our Slow Jogger features a fold-over waistband for extra comfort. 50% Cotton, 50% Polyester, Self drawstring, Ribbed cuff, Rib cuff, Imported',
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/0/7/07600bq_smk_w_1.jpg',
    inStock: 20,
    price: 48.0,
    size: 'S'
  },
  {
    name: 'Slow Vintage Heavy Knit Jogger Pants for Women',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'Somewhere between a jogger and a yoga pant, our Slow Jogger features a fold-over waistband for extra comfort. 50% Cotton, 50% Polyester, Self drawstring, Ribbed cuff, Rib cuff, Imported',
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/0/7/07600bq_smk_w_1.jpg',
    inStock: 20,
    price: 48.0,
    size: 'M'
  },
  {
    name: 'Slow Vintage Heavy Knit Jogger Pants for Women',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'Somewhere between a jogger and a yoga pant, our Slow Jogger features a fold-over waistband for extra comfort. 50% Cotton, 50% Polyester, Self drawstring, Ribbed cuff, Rib cuff, Imported',
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/0/7/07600bq_smk_w_1.jpg',
    inStock: 20,
    price: 48.0,
    size: 'L'
  },
  {
    name: 'Slow Vintage Heavy Knit Jogger Pants for Women',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'Somewhere between a jogger and a yoga pant, our Slow Jogger features a fold-over waistband for extra comfort. 50% Cotton, 50% Polyester, Self drawstring, Ribbed cuff, Rib cuff, Imported',
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/0/7/07600bq_smk_w_1.jpg',
    inStock: 20,
    price: 48.0,
    size: 'XL'
  },
  {
    name: 'Printed Eco-Fleece Jogger Pants for Women',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'Our Jogger Pant in super soft Eco-Fleece is a sustainable staple for a casual-comfy look and feel. Eco-Fleece, 50% Polyester, 46% Cotton, 4% Rayon, Contains organic & recycled materials, Elastic waistband with drawstrings, Top applied back patch pocket, Ribbed cuffs & waistband, Front pockets, Imported',
    imgUrl:
      'https://media.alternativeapparel.com/media/catalog/product/3/1/31082FBSTRM0.jpg',
    inStock: 20,
    price: 58.0,
    size: 'XS'
  },
  {
    name: 'Printed Eco-Fleece Jogger Pants for Women',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'Our Jogger Pant in super soft Eco-Fleece is a sustainable staple for a casual-comfy look and feel. Eco-Fleece, 50% Polyester, 46% Cotton, 4% Rayon, Contains organic & recycled materials, Elastic waistband with drawstrings, Top applied back patch pocket, Ribbed cuffs & waistband, Front pockets, Imported',
    imgUrl:
      'https://media.alternativeapparel.com/media/catalog/product/3/1/31082FBSTRM0.jpg',
    inStock: 20,
    price: 58.0,
    size: 'S'
  },
  {
    name: 'Printed Eco-Fleece Jogger Pants for Women',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'Our Jogger Pant in super soft Eco-Fleece is a sustainable staple for a casual-comfy look and feel. Eco-Fleece, 50% Polyester, 46% Cotton, 4% Rayon, Contains organic & recycled materials, Elastic waistband with drawstrings, Top applied back patch pocket, Ribbed cuffs & waistband, Front pockets, Imported',
    imgUrl:
      'https://media.alternativeapparel.com/media/catalog/product/3/1/31082FBSTRM0.jpg',
    inStock: 20,
    price: 58.0,
    size: 'M'
  },
  {
    name: 'Printed Eco-Fleece Jogger Pants for Women',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'Our Jogger Pant in super soft Eco-Fleece is a sustainable staple for a casual-comfy look and feel. Eco-Fleece, 50% Polyester, 46% Cotton, 4% Rayon, Contains organic & recycled materials, Elastic waistband with drawstrings, Top applied back patch pocket, Ribbed cuffs & waistband, Front pockets, Imported',
    imgUrl:
      'https://media.alternativeapparel.com/media/catalog/product/3/1/31082FBSTRM0.jpg',
    inStock: 20,
    price: 58.0,
    size: 'L'
  },
  {
    name: 'Printed Eco-Fleece Jogger Pants for Women',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'Our Jogger Pant in super soft Eco-Fleece is a sustainable staple for a casual-comfy look and feel. Eco-Fleece, 50% Polyester, 46% Cotton, 4% Rayon, Contains organic & recycled materials, Elastic waistband with drawstrings, Top applied back patch pocket, Ribbed cuffs & waistband, Front pockets, Imported',
    imgUrl:
      'https://media.alternativeapparel.com/media/catalog/product/3/1/31082FBSTRM0.jpg',
    inStock: 20,
    price: 58.0,
    size: 'XL'
  },
  {
    name: 'Eco-Fleece Jogger Pants for Women',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'The ultimate sweat pant for ultimate comfort. Made from our signature Eco-Fleece, this pant features tailored pockets and a tapered leg opening. Eco-Fleece, 50% Polyester, 46% Cotton, 4% Rayon, Contains organic & recycled materials, Drawstring Waistband, Tapered Ankle, Ribbed Cuffs at Leg Opening Garment imported, made with U.S.A. fabric',
    imgUrl:
      'https://lh3.googleusercontent.com/proxy/bS9gr90jYwzEyqFM1QOpXFokHiwH_0ASSOLAsRW2x1LyM6qbF8Wqg1owfpgtDMTisUSpL2Vh-siG_S-c5veuLy6PV83J-3xqm6Hs7_XXcEyictHXzJ31WupriBi_7TzVzvhJS8oYtJgVLc-L8MeLcB4-Gbg6ee29Zw2WNb5WeLsK1rkQF5jJOwogYGZ9ZZOfyu3apq7iot7l2YIqCNiD=s1000-pd-e365-rw-pc0xffffff',
    inStock: 20,
    price: 54.0,
    size: 'XS'
  },
  {
    name: 'Eco-Fleece Jogger Pants for Women',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'The ultimate sweat pant for ultimate comfort. Made from our signature Eco-Fleece, this pant features tailored pockets and a tapered leg opening. Eco-Fleece, 50% Polyester, 46% Cotton, 4% Rayon, Contains organic & recycled materials, Drawstring Waistband, Tapered Ankle, Ribbed Cuffs at Leg Opening Garment imported, made with U.S.A. fabric',
    imgUrl:
      'https://lh3.googleusercontent.com/proxy/bS9gr90jYwzEyqFM1QOpXFokHiwH_0ASSOLAsRW2x1LyM6qbF8Wqg1owfpgtDMTisUSpL2Vh-siG_S-c5veuLy6PV83J-3xqm6Hs7_XXcEyictHXzJ31WupriBi_7TzVzvhJS8oYtJgVLc-L8MeLcB4-Gbg6ee29Zw2WNb5WeLsK1rkQF5jJOwogYGZ9ZZOfyu3apq7iot7l2YIqCNiD=s1000-pd-e365-rw-pc0xffffff',
    inStock: 20,
    price: 54.0,
    size: 'S'
  },
  {
    name: 'Eco-Fleece Jogger Pants for Women',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'The ultimate sweat pant for ultimate comfort. Made from our signature Eco-Fleece, this pant features tailored pockets and a tapered leg opening. Eco-Fleece, 50% Polyester, 46% Cotton, 4% Rayon, Contains organic & recycled materials, Drawstring Waistband, Tapered Ankle, Ribbed Cuffs at Leg Opening Garment imported, made with U.S.A. fabric',
    imgUrl:
      'https://lh3.googleusercontent.com/proxy/bS9gr90jYwzEyqFM1QOpXFokHiwH_0ASSOLAsRW2x1LyM6qbF8Wqg1owfpgtDMTisUSpL2Vh-siG_S-c5veuLy6PV83J-3xqm6Hs7_XXcEyictHXzJ31WupriBi_7TzVzvhJS8oYtJgVLc-L8MeLcB4-Gbg6ee29Zw2WNb5WeLsK1rkQF5jJOwogYGZ9ZZOfyu3apq7iot7l2YIqCNiD=s1000-pd-e365-rw-pc0xffffff',
    inStock: 20,
    price: 54.0,
    size: 'M'
  },
  {
    name: 'Eco-Fleece Jogger Pants for Women',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'The ultimate sweat pant for ultimate comfort. Made from our signature Eco-Fleece, this pant features tailored pockets and a tapered leg opening. Eco-Fleece, 50% Polyester, 46% Cotton, 4% Rayon, Contains organic & recycled materials, Drawstring Waistband, Tapered Ankle, Ribbed Cuffs at Leg Opening Garment imported, made with U.S.A. fabric',
    imgUrl:
      'https://lh3.googleusercontent.com/proxy/bS9gr90jYwzEyqFM1QOpXFokHiwH_0ASSOLAsRW2x1LyM6qbF8Wqg1owfpgtDMTisUSpL2Vh-siG_S-c5veuLy6PV83J-3xqm6Hs7_XXcEyictHXzJ31WupriBi_7TzVzvhJS8oYtJgVLc-L8MeLcB4-Gbg6ee29Zw2WNb5WeLsK1rkQF5jJOwogYGZ9ZZOfyu3apq7iot7l2YIqCNiD=s1000-pd-e365-rw-pc0xffffff',
    inStock: 20,
    price: 54.0,
    size: 'L'
  },
  {
    name: 'Eco-Fleece Jogger Pants for Women',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'The ultimate sweat pant for ultimate comfort. Made from our signature Eco-Fleece, this pant features tailored pockets and a tapered leg opening. Eco-Fleece, 50% Polyester, 46% Cotton, 4% Rayon, Contains organic & recycled materials, Drawstring Waistband, Tapered Ankle, Ribbed Cuffs at Leg Opening Garment imported, made with U.S.A. fabric',
    imgUrl:
      'https://lh3.googleusercontent.com/proxy/bS9gr90jYwzEyqFM1QOpXFokHiwH_0ASSOLAsRW2x1LyM6qbF8Wqg1owfpgtDMTisUSpL2Vh-siG_S-c5veuLy6PV83J-3xqm6Hs7_XXcEyictHXzJ31WupriBi_7TzVzvhJS8oYtJgVLc-L8MeLcB4-Gbg6ee29Zw2WNb5WeLsK1rkQF5jJOwogYGZ9ZZOfyu3apq7iot7l2YIqCNiD=s1000-pd-e365-rw-pc0xffffff',
    inStock: 20,
    price: 54.0,
    size: 'XL'
  },
  {
    name: 'Cozy Eco-Fleece Shorts for Women',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'These are called the Cozy Shorts for a reason - designed for a relaxed, longer fit, to keep you cozy and comfortable. Eco-Fleece, 50% Polyester, 46% Cotton, 4% Rayon, Contains organic & recycled materials, Garment imported, made with U.S.A. fabric',
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/C/6/C62752F20_1.jpg',
    inStock: 20,
    price: 25.0,
    size: 'XS'
  },
  {
    name: 'Cozy Eco-Fleece Shorts for Women',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'These are called the Cozy Shorts for a reason - designed for a relaxed, longer fit, to keep you cozy and comfortable. Eco-Fleece, 50% Polyester, 46% Cotton, 4% Rayon, Contains organic & recycled materials, Garment imported, made with U.S.A. fabric',
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/C/6/C62752F20_1.jpg',
    inStock: 20,
    price: 25.0,
    size: 'S'
  },
  {
    name: 'Cozy Eco-Fleece Shorts for Women',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'These are called the Cozy Shorts for a reason - designed for a relaxed, longer fit, to keep you cozy and comfortable. Eco-Fleece, 50% Polyester, 46% Cotton, 4% Rayon, Contains organic & recycled materials, Garment imported, made with U.S.A. fabric',
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/C/6/C62752F20_1.jpg',
    inStock: 20,
    price: 25.0,
    size: 'M'
  },
  {
    name: 'Cozy Eco-Fleece Shorts for Women',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'These are called the Cozy Shorts for a reason - designed for a relaxed, longer fit, to keep you cozy and comfortable. Eco-Fleece, 50% Polyester, 46% Cotton, 4% Rayon, Contains organic & recycled materials, Garment imported, made with U.S.A. fabric',
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/C/6/C62752F20_1.jpg',
    inStock: 20,
    price: 25.0,
    size: 'L'
  },
  {
    name: 'Cozy Eco-Fleece Shorts for Women',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'These are called the Cozy Shorts for a reason - designed for a relaxed, longer fit, to keep you cozy and comfortable. Eco-Fleece, 50% Polyester, 46% Cotton, 4% Rayon, Contains organic & recycled materials, Garment imported, made with U.S.A. fabric',
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/C/6/C62752F20_1.jpg',
    inStock: 20,
    price: 25.0,
    size: 'XL'
  },
  {
    name: 'Lounge Burnout French Terry Shorts for Women',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'Finally, a pair of shorts that are both cute and comfortable. With an authentically worn-in look, relaxed fit and a rolled hem that stays put, lounging has never been more enjoyable. 65% Cotton, 35% Polyester, Rolled hem, Single-needle stitching along pockets, Elastic waistband with drawstrings, Imported',
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/0/8/08630fh_dn_w_1_1.jpg',
    inStock: 20,
    price: 48.0,
    size: 'XS'
  },
  {
    name: 'Lounge Burnout French Terry Shorts for Women',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'Finally, a pair of shorts that are both cute and comfortable. With an authentically worn-in look, relaxed fit and a rolled hem that stays put, lounging has never been more enjoyable. 65% Cotton, 35% Polyester, Rolled hem, Single-needle stitching along pockets, Elastic waistband with drawstrings, Imported',
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/0/8/08630fh_dn_w_1_1.jpg',
    inStock: 20,
    price: 48.0,
    size: 'S'
  },
  {
    name: 'Lounge Burnout French Terry Shorts for Women',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'Finally, a pair of shorts that are both cute and comfortable. With an authentically worn-in look, relaxed fit and a rolled hem that stays put, lounging has never been more enjoyable. 65% Cotton, 35% Polyester, Rolled hem, Single-needle stitching along pockets, Elastic waistband with drawstrings, Imported',
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/0/8/08630fh_dn_w_1_1.jpg',
    inStock: 20,
    price: 48.0,
    size: 'M'
  },
  {
    name: 'Lounge Burnout French Terry Shorts for Women',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'Finally, a pair of shorts that are both cute and comfortable. With an authentically worn-in look, relaxed fit and a rolled hem that stays put, lounging has never been more enjoyable. 65% Cotton, 35% Polyester, Rolled hem, Single-needle stitching along pockets, Elastic waistband with drawstrings, Imported',
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/0/8/08630fh_dn_w_1_1.jpg',
    inStock: 20,
    price: 48.0,
    size: 'L'
  },
  {
    name: 'Lounge Burnout French Terry Shorts for Women',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'Finally, a pair of shorts that are both cute and comfortable. With an authentically worn-in look, relaxed fit and a rolled hem that stays put, lounging has never been more enjoyable. 65% Cotton, 35% Polyester, Rolled hem, Single-needle stitching along pockets, Elastic waistband with drawstrings, Imported',
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/0/8/08630fh_dn_w_1_1.jpg',
    inStock: 20,
    price: 48.0,
    size: 'XL'
  },
  {
    name: 'Track Vintage French Terry Shorts for Women',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      "We’ve replicated the look of 70s track shorts in our soft, sporty French Terry for a grown-up comfort and fit. For the days you feel like working out...and the days you don't. Vintage French Terry, 50% Cotton, 50% Polyester, Piece Dyed, Fabric Washed, Side pockets, Back pocket, Banded waist with drawstring, Ribbing at pockets, Pilling resistant, Imported",
    imgUrl:
      'https://media.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/0/5/05078bt_vnn_w_1.jpg',
    inStock: 20,
    price: 42.0,
    size: 'XS'
  },
  {
    name: 'Track Vintage French Terry Shorts for Women',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      "We’ve replicated the look of 70s track shorts in our soft, sporty French Terry for a grown-up comfort and fit. For the days you feel like working out...and the days you don't. Vintage French Terry, 50% Cotton, 50% Polyester, Piece Dyed, Fabric Washed, Side pockets, Back pocket, Banded waist with drawstring, Ribbing at pockets, Pilling resistant, Imported",
    imgUrl:
      'https://media.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/0/5/05078bt_vnn_w_1.jpg',
    inStock: 20,
    price: 42.0,
    size: 'S'
  },
  {
    name: 'Track Vintage French Terry Shorts for Women',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      "We’ve replicated the look of 70s track shorts in our soft, sporty French Terry for a grown-up comfort and fit. For the days you feel like working out...and the days you don't. Vintage French Terry, 50% Cotton, 50% Polyester, Piece Dyed, Fabric Washed, Side pockets, Back pocket, Banded waist with drawstring, Ribbing at pockets, Pilling resistant, Imported",
    imgUrl:
      'https://media.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/0/5/05078bt_vnn_w_1.jpg',
    inStock: 20,
    price: 42.0,
    size: 'M'
  },
  {
    name: 'Track Vintage French Terry Shorts for Women',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      "We’ve replicated the look of 70s track shorts in our soft, sporty French Terry for a grown-up comfort and fit. For the days you feel like working out...and the days you don't. Vintage French Terry, 50% Cotton, 50% Polyester, Piece Dyed, Fabric Washed, Side pockets, Back pocket, Banded waist with drawstring, Ribbing at pockets, Pilling resistant, Imported",
    imgUrl:
      'https://media.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/0/5/05078bt_vnn_w_1.jpg',
    inStock: 20,
    price: 42.0,
    size: 'L'
  },
  {
    name: 'Track Vintage French Terry Shorts for Women',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      "We’ve replicated the look of 70s track shorts in our soft, sporty French Terry for a grown-up comfort and fit. For the days you feel like working out...and the days you don't. Vintage French Terry, 50% Cotton, 50% Polyester, Piece Dyed, Fabric Washed, Side pockets, Back pocket, Banded waist with drawstring, Ribbing at pockets, Pilling resistant, Imported",
    imgUrl:
      'https://media.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/0/5/05078bt_vnn_w_1.jpg',
    inStock: 20,
    price: 42.0,
    size: 'XL'
  },
  {
    name: 'Home Team Garment Dyed Slub Henley Shirt for Men',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'This classic Henley tee takes softness and style to the next level with inside-out raw edges and a de-saturated hue produced through our garment-dye process for a versatile, vintage look. As unique as you, this garment has been hand-treated with intentional imperfections for authentically worn-in softness and style no other item is exactly like it. Washed Slub, 100% Cotton, Shirttail hem, Raw edging, Garment-dyed, 2-button placket, Imported',
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/0/6/06897j1_mdpi_m_1_9.jpg',
    inStock: 20,
    price: 44.0,
    size: 'XS'
  },
  {
    name: 'Home Team Garment Dyed Slub Henley Shirt for Men',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'This classic Henley tee takes softness and style to the next level with inside-out raw edges and a de-saturated hue produced through our garment-dye process for a versatile, vintage look. As unique as you, this garment has been hand-treated with intentional imperfections for authentically worn-in softness and style no other item is exactly like it. Washed Slub, 100% Cotton, Shirttail hem, Raw edging, Garment-dyed, 2-button placket, Imported',
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/0/6/06897j1_mdpi_m_1_9.jpg',
    inStock: 20,
    price: 44.0,
    size: 'S'
  },
  {
    name: 'Home Team Garment Dyed Slub Henley Shirt for Men',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'This classic Henley tee takes softness and style to the next level with inside-out raw edges and a de-saturated hue produced through our garment-dye process for a versatile, vintage look. As unique as you, this garment has been hand-treated with intentional imperfections for authentically worn-in softness and style no other item is exactly like it. Washed Slub, 100% Cotton, Shirttail hem, Raw edging, Garment-dyed, 2-button placket, Imported',
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/0/6/06897j1_mdpi_m_1_9.jpg',
    inStock: 20,
    price: 44.0,
    size: 'M'
  },
  {
    name: 'Home Team Garment Dyed Slub Henley Shirt for Men',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'This classic Henley tee takes softness and style to the next level with inside-out raw edges and a de-saturated hue produced through our garment-dye process for a versatile, vintage look. As unique as you, this garment has been hand-treated with intentional imperfections for authentically worn-in softness and style no other item is exactly like it. Washed Slub, 100% Cotton, Shirttail hem, Raw edging, Garment-dyed, 2-button placket, Imported',
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/0/6/06897j1_mdpi_m_1_9.jpg',
    inStock: 20,
    price: 44.0,
    size: 'L'
  },
  {
    name: 'Home Team Garment Dyed Slub Henley Shirt for Men',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'This classic Henley tee takes softness and style to the next level with inside-out raw edges and a de-saturated hue produced through our garment-dye process for a versatile, vintage look. As unique as you, this garment has been hand-treated with intentional imperfections for authentically worn-in softness and style no other item is exactly like it. Washed Slub, 100% Cotton, Shirttail hem, Raw edging, Garment-dyed, 2-button placket, Imported',
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/0/6/06897j1_mdpi_m_1_9.jpg',
    inStock: 20,
    price: 44.0,
    size: 'XL'
  },
  {
    name: 'Printed Eco-Jersey Crew T-Shirt for Men',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'Crafted from our signature Eco-Jersey triblend, the Eco Crew T-Shirt is a perfect go-to tee comfortable enough for the everyday. Eco-Jersey ™ 50% Polyester, 38% Cotton, 12% Rayon, Contains organic & recycled materials, Bound self neckband, Blind hem stitching detail, Imported',
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/0/1/01973ea_slcmo_m_1.jpg',
    inStock: 20,
    price: 38.0,
    size: 'XS'
  },
  {
    name: 'Printed Eco-Jersey Crew T-Shirt for Men',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'Crafted from our signature Eco-Jersey triblend, the Eco Crew T-Shirt is a perfect go-to tee comfortable enough for the everyday. Eco-Jersey ™ 50% Polyester, 38% Cotton, 12% Rayon, Contains organic & recycled materials, Bound self neckband, Blind hem stitching detail, Imported',
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/0/1/01973ea_slcmo_m_1.jpg',
    inStock: 20,
    price: 38.0,
    size: 'S'
  },
  {
    name: 'Printed Eco-Jersey Crew T-Shirt for Men',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'Crafted from our signature Eco-Jersey triblend, the Eco Crew T-Shirt is a perfect go-to tee comfortable enough for the everyday. Eco-Jersey ™ 50% Polyester, 38% Cotton, 12% Rayon, Contains organic & recycled materials, Bound self neckband, Blind hem stitching detail, Imported',
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/0/1/01973ea_slcmo_m_1.jpg',
    inStock: 20,
    price: 38.0,
    size: 'M'
  },
  {
    name: 'Printed Eco-Jersey Crew T-Shirt for Men',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'Crafted from our signature Eco-Jersey triblend, the Eco Crew T-Shirt is a perfect go-to tee comfortable enough for the everyday. Eco-Jersey ™ 50% Polyester, 38% Cotton, 12% Rayon, Contains organic & recycled materials, Bound self neckband, Blind hem stitching detail, Imported',
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/0/1/01973ea_slcmo_m_1.jpg',
    inStock: 20,
    price: 38.0,
    size: 'L'
  },
  {
    name: 'Printed Eco-Jersey Crew T-Shirt for Men',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'Crafted from our signature Eco-Jersey triblend, the Eco Crew T-Shirt is a perfect go-to tee comfortable enough for the everyday. Eco-Jersey ™ 50% Polyester, 38% Cotton, 12% Rayon, Contains organic & recycled materials, Bound self neckband, Blind hem stitching detail, Imported',
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/0/1/01973ea_slcmo_m_1.jpg',
    inStock: 20,
    price: 38.0,
    size: 'XL'
  },
  {
    name: 'The Outsider Heavy Wash Jersey T-Shirt for Men',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'Made for the ones who follow their own path & march to the beat of their own drum, our 100% cotton Outsider T-Shirt is crafted with heavier yarns, making it the perfect transitional piece. As unique as you, this garment has been hand-treated with intentional imperfections for authentically worn-in softness and style. Heavy Wash Jersey, 100% Cotton, Rib collar, The rich pigments may rub off and should be washed separately, 5.01 oz, Blind stitching on sleeves & hem, Garment-washed for softness, Imported',
    imgUrl:
      'https://media.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/0/1/01010cg_sprgn_m_1.jpg',
    inStock: 20,
    price: 28.0,
    size: 'XS'
  },
  {
    name: 'The Outsider Heavy Wash Jersey T-Shirt for Men',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'Made for the ones who follow their own path & march to the beat of their own drum, our 100% cotton Outsider T-Shirt is crafted with heavier yarns, making it the perfect transitional piece. As unique as you, this garment has been hand-treated with intentional imperfections for authentically worn-in softness and style. Heavy Wash Jersey, 100% Cotton, Rib collar, The rich pigments may rub off and should be washed separately, 5.01 oz, Blind stitching on sleeves & hem, Garment-washed for softness, Imported',
    imgUrl:
      'https://media.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/0/1/01010cg_sprgn_m_1.jpg',
    inStock: 20,
    price: 28.0,
    size: 'S'
  },
  {
    name: 'The Outsider Heavy Wash Jersey T-Shirt for Men',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'Made for the ones who follow their own path & march to the beat of their own drum, our 100% cotton Outsider T-Shirt is crafted with heavier yarns, making it the perfect transitional piece. As unique as you, this garment has been hand-treated with intentional imperfections for authentically worn-in softness and style. Heavy Wash Jersey, 100% Cotton, Rib collar, The rich pigments may rub off and should be washed separately, 5.01 oz, Blind stitching on sleeves & hem, Garment-washed for softness, Imported',
    imgUrl:
      'https://media.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/0/1/01010cg_sprgn_m_1.jpg',
    inStock: 20,
    price: 28.0,
    size: 'M'
  },
  {
    name: 'The Outsider Heavy Wash Jersey T-Shirt for Men',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'Made for the ones who follow their own path & march to the beat of their own drum, our 100% cotton Outsider T-Shirt is crafted with heavier yarns, making it the perfect transitional piece. As unique as you, this garment has been hand-treated with intentional imperfections for authentically worn-in softness and style. Heavy Wash Jersey, 100% Cotton, Rib collar, The rich pigments may rub off and should be washed separately, 5.01 oz, Blind stitching on sleeves & hem, Garment-washed for softness, Imported',
    imgUrl:
      'https://media.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/0/1/01010cg_sprgn_m_1.jpg',
    inStock: 20,
    price: 28.0,
    size: 'L'
  },
  {
    name: 'The Outsider Heavy Wash Jersey T-Shirt for Men',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'Made for the ones who follow their own path & march to the beat of their own drum, our 100% cotton Outsider T-Shirt is crafted with heavier yarns, making it the perfect transitional piece. As unique as you, this garment has been hand-treated with intentional imperfections for authentically worn-in softness and style. Heavy Wash Jersey, 100% Cotton, Rib collar, The rich pigments may rub off and should be washed separately, 5.01 oz, Blind stitching on sleeves & hem, Garment-washed for softness, Imported',
    imgUrl:
      'https://media.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/0/1/01010cg_sprgn_m_1.jpg',
    inStock: 20,
    price: 28.0,
    size: 'XL'
  },
  {
    name: 'Keeper Vintage Jersey Graphic T-Shirt for Men',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      "We took our 50/50 Keeper tee, known for softness & comfort, and made it a little more festive for the holiday season. Go ahead, pick your favorite - you can't go wrong.",
    imgUrl:
      'https://media.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/0/5/05050sp_vphap_m_1.jpg',
    inStock: 20,
    price: 7.0,
    size: 'XS'
  },
  {
    name: 'Keeper Vintage Jersey Graphic T-Shirt for Men',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      "We took our 50/50 Keeper tee, known for softness & comfort, and made it a little more festive for the holiday season. Go ahead, pick your favorite - you can't go wrong.",
    imgUrl:
      'https://media.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/0/5/05050sp_vphap_m_1.jpg',
    inStock: 20,
    price: 7.0,
    size: 'S'
  },
  {
    name: 'Keeper Vintage Jersey Graphic T-Shirt for Men',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      "We took our 50/50 Keeper tee, known for softness & comfort, and made it a little more festive for the holiday season. Go ahead, pick your favorite - you can't go wrong.",
    imgUrl:
      'https://media.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/0/5/05050sp_vphap_m_1.jpg',
    inStock: 20,
    price: 7.0,
    size: 'M'
  },
  {
    name: 'Keeper Vintage Jersey Graphic T-Shirt for Men',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      "We took our 50/50 Keeper tee, known for softness & comfort, and made it a little more festive for the holiday season. Go ahead, pick your favorite - you can't go wrong.",
    imgUrl:
      'https://media.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/0/5/05050sp_vphap_m_1.jpg',
    inStock: 20,
    price: 7.0,
    size: 'L'
  },
  {
    name: 'Keeper Vintage Jersey Graphic T-Shirt for Men',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      "We took our 50/50 Keeper tee, known for softness & comfort, and made it a little more festive for the holiday season. Go ahead, pick your favorite - you can't go wrong.",
    imgUrl:
      'https://media.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/0/5/05050sp_vphap_m_1.jpg',
    inStock: 20,
    price: 7.0,
    size: 'XL'
  },
  {
    name: 'DugOut Vintage Jersey T-Shirt for Men',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'Our classic baseball tee gets a make under. Three-quarter length sleeves add a relaxed, modern touch, while our 50/50 fabric gives the Dugout Tee the softness of one youve worn a thousand times (which you very well might).',
    imgUrl:
      'https://media.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/0/5/05057bp_svn_m_1.jpg',
    inStock: 20,
    price: 31.0,
    size: 'XS'
  },
  {
    name: 'DugOut Vintage Jersey T-Shirt for Men',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'Our classic baseball tee gets a make under. Three-quarter length sleeves add a relaxed, modern touch, while our 50/50 fabric gives the Dugout Tee the softness of one youve worn a thousand times (which you very well might).',
    imgUrl:
      'https://media.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/0/5/05057bp_svn_m_1.jpg',
    inStock: 20,
    price: 31.0,
    size: 'S'
  },
  {
    name: 'DugOut Vintage Jersey T-Shirt for Men',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'Our classic baseball tee gets a make under. Three-quarter length sleeves add a relaxed, modern touch, while our 50/50 fabric gives the Dugout Tee the softness of one youve worn a thousand times (which you very well might).',
    imgUrl:
      'https://media.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/0/5/05057bp_svn_m_1.jpg',
    inStock: 20,
    price: 31.0,
    size: 'M'
  },
  {
    name: 'DugOut Vintage Jersey T-Shirt for Men',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'Our classic baseball tee gets a make under. Three-quarter length sleeves add a relaxed, modern touch, while our 50/50 fabric gives the Dugout Tee the softness of one youve worn a thousand times (which you very well might).',
    imgUrl:
      'https://media.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/0/5/05057bp_svn_m_1.jpg',
    inStock: 20,
    price: 31.0,
    size: 'L'
  },
  {
    name: 'DugOut Vintage Jersey T-Shirt for Men',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'Our classic baseball tee gets a make under. Three-quarter length sleeves add a relaxed, modern touch, while our 50/50 fabric gives the Dugout Tee the softness of one youve worn a thousand times (which you very well might).',
    imgUrl:
      'https://media.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/0/5/05057bp_svn_m_1.jpg',
    inStock: 20,
    price: 31.0,
    size: 'XL'
  },
  {
    name: 'Rocky Eco-Fleece Zip Hoodie for Men',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'Our signature zip hoodie in our super soft Eco-Fleece, the Rocky is sure to become your favorite hoodie. Eco-Fleece, 50% Polyester, 46% Cotton, 4% Rayon, Contains organic & recycled materials, Split kangaroo pocket, Ribbed hemband and sleeve cuffs, Set-in sleeves,Hoodie with drawstrings, YKK zipper, Garment imported, made with U.S.A. fabric',
    imgUrl:
      'https://media.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/C/6/C66162F20_2.jpg',
    inStock: 20,
    price: 58.0,
    size: 'XS'
  },
  {
    name: 'Rocky Eco-Fleece Zip Hoodie for Men',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'Our signature zip hoodie in our super soft Eco-Fleece, the Rocky is sure to become your favorite hoodie. Eco-Fleece, 50% Polyester, 46% Cotton, 4% Rayon, Contains organic & recycled materials, Split kangaroo pocket, Ribbed hemband and sleeve cuffs, Set-in sleeves,Hoodie with drawstrings, YKK zipper, Garment imported, made with U.S.A. fabric',
    imgUrl:
      'https://media.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/C/6/C66162F20_2.jpg',
    inStock: 20,
    price: 58.0,
    size: 'S'
  },
  {
    name: 'Rocky Eco-Fleece Zip Hoodie for Men',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'Our signature zip hoodie in our super soft Eco-Fleece, the Rocky is sure to become your favorite hoodie. Eco-Fleece, 50% Polyester, 46% Cotton, 4% Rayon, Contains organic & recycled materials, Split kangaroo pocket, Ribbed hemband and sleeve cuffs, Set-in sleeves,Hoodie with drawstrings, YKK zipper, Garment imported, made with U.S.A. fabric',
    imgUrl:
      'https://media.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/C/6/C66162F20_2.jpg',
    inStock: 20,
    price: 58.0,
    size: 'M'
  },
  {
    name: 'Rocky Eco-Fleece Zip Hoodie for Men',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'Our signature zip hoodie in our super soft Eco-Fleece, the Rocky is sure to become your favorite hoodie. Eco-Fleece, 50% Polyester, 46% Cotton, 4% Rayon, Contains organic & recycled materials, Split kangaroo pocket, Ribbed hemband and sleeve cuffs, Set-in sleeves,Hoodie with drawstrings, YKK zipper, Garment imported, made with U.S.A. fabric',
    imgUrl:
      'https://media.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/C/6/C66162F20_2.jpg',
    inStock: 20,
    price: 58.0,
    size: 'L'
  },
  {
    name: 'Rocky Eco-Fleece Zip Hoodie for Men',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'Our signature zip hoodie in our super soft Eco-Fleece, the Rocky is sure to become your favorite hoodie. Eco-Fleece, 50% Polyester, 46% Cotton, 4% Rayon, Contains organic & recycled materials, Split kangaroo pocket, Ribbed hemband and sleeve cuffs, Set-in sleeves,Hoodie with drawstrings, YKK zipper, Garment imported, made with U.S.A. fabric',
    imgUrl:
      'https://media.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/C/6/C66162F20_2.jpg',
    inStock: 20,
    price: 58.0,
    size: 'XL'
  },
  {
    name: 'Victory Printed Burnout French Terry Shorts for Men',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'Made from our super-soft Burnout French Terry, these casual shorts are a perfect warm-weather alternative to your favorite sweatpants. Burnout French Terry, 65% Cotton, 35% Polyester, Elastic waist with drawstrings, Contrast stitching at hem, Imported',
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/0/5/05284fj_slcmo_m_1.jpg',
    inStock: 20,
    price: 52.0,
    size: 'XS'
  },
  {
    name: 'Victory Printed Burnout French Terry Shorts for Men',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'Made from our super-soft Burnout French Terry, these casual shorts are a perfect warm-weather alternative to your favorite sweatpants. Burnout French Terry, 65% Cotton, 35% Polyester, Elastic waist with drawstrings, Contrast stitching at hem, Imported',
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/0/5/05284fj_slcmo_m_1.jpg',
    inStock: 20,
    price: 52.0,
    size: 'S'
  },
  {
    name: 'Victory Printed Burnout French Terry Shorts for Men',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'Made from our super-soft Burnout French Terry, these casual shorts are a perfect warm-weather alternative to your favorite sweatpants. Burnout French Terry, 65% Cotton, 35% Polyester, Elastic waist with drawstrings, Contrast stitching at hem, Imported',
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/0/5/05284fj_slcmo_m_1.jpg',
    inStock: 20,
    price: 52.0,
    size: 'M'
  },
  {
    name: 'Victory Printed Burnout French Terry Shorts for Men',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'Made from our super-soft Burnout French Terry, these casual shorts are a perfect warm-weather alternative to your favorite sweatpants. Burnout French Terry, 65% Cotton, 35% Polyester, Elastic waist with drawstrings, Contrast stitching at hem, Imported',
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/0/5/05284fj_slcmo_m_1.jpg',
    inStock: 20,
    price: 52.0,
    size: 'L'
  },
  {
    name: 'Victory Printed Burnout French Terry Shorts for Men',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'Made from our super-soft Burnout French Terry, these casual shorts are a perfect warm-weather alternative to your favorite sweatpants. Burnout French Terry, 65% Cotton, 35% Polyester, Elastic waist with drawstrings, Contrast stitching at hem, Imported',
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/0/5/05284fj_slcmo_m_1.jpg',
    inStock: 20,
    price: 52.0,
    size: 'XL'
  },
  {
    name: 'Hustle Eco-Fleece Open Bottom Sweatpants for Men',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      "These no-frills, easygoing sweatpants are a closet staple. The open bottom creates a straight-leg look that's fitted but roomy, so you can be casual but never sloppy. Eco-Fleece, 50% Polyester, 46% Cotton, 4% Rayon, Contains organic & recycled materials, Open bottom at ankles, Natural drawstring, Side pockets, Banded waist, Garment imported, made with U.S.A. fabric",
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/0/3/03500f2_tdpi_m_1.jpg',
    inStock: 20,
    price: 40.0,
    size: 'XS'
  },
  {
    name: 'Hustle Eco-Fleece Open Bottom Sweatpants for Men',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      "These no-frills, easygoing sweatpants are a closet staple. The open bottom creates a straight-leg look that's fitted but roomy, so you can be casual but never sloppy. Eco-Fleece, 50% Polyester, 46% Cotton, 4% Rayon, Contains organic & recycled materials, Open bottom at ankles, Natural drawstring, Side pockets, Banded waist, Garment imported, made with U.S.A. fabric",
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/0/3/03500f2_tdpi_m_1.jpg',
    inStock: 20,
    price: 40.0,
    size: 'S'
  },
  {
    name: 'Hustle Eco-Fleece Open Bottom Sweatpants for Men',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      "These no-frills, easygoing sweatpants are a closet staple. The open bottom creates a straight-leg look that's fitted but roomy, so you can be casual but never sloppy. Eco-Fleece, 50% Polyester, 46% Cotton, 4% Rayon, Contains organic & recycled materials, Open bottom at ankles, Natural drawstring, Side pockets, Banded waist, Garment imported, made with U.S.A. fabric",
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/0/3/03500f2_tdpi_m_1.jpg',
    inStock: 20,
    price: 40.0,
    size: 'M'
  },
  {
    name: 'Hustle Eco-Fleece Open Bottom Sweatpants for Men',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      "These no-frills, easygoing sweatpants are a closet staple. The open bottom creates a straight-leg look that's fitted but roomy, so you can be casual but never sloppy. Eco-Fleece, 50% Polyester, 46% Cotton, 4% Rayon, Contains organic & recycled materials, Open bottom at ankles, Natural drawstring, Side pockets, Banded waist, Garment imported, made with U.S.A. fabric",
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/0/3/03500f2_tdpi_m_1.jpg',
    inStock: 20,
    price: 40.0,
    size: 'LG'
  },
  {
    name: 'Hustle Eco-Fleece Open Bottom Sweatpants for Men',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      "These no-frills, easygoing sweatpants are a closet staple. The open bottom creates a straight-leg look that's fitted but roomy, so you can be casual but never sloppy. Eco-Fleece, 50% Polyester, 46% Cotton, 4% Rayon, Contains organic & recycled materials, Open bottom at ankles, Natural drawstring, Side pockets, Banded waist, Garment imported, made with U.S.A. fabric",
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/0/3/03500f2_tdpi_m_1.jpg',
    inStock: 20,
    price: 40.0,
    size: 'XL'
  },
  {
    name: 'Side Panel Vintage French Terry Track Pant for Men',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'Vintage athletic-inspired, these track pants feature a contrasting white side stripes, a drawstring closure & unbeatable comfort. Vintage French Terry, 50% Cotton, 50% Polyester, Elastic waistband with drawstrings, Set-in side stripe, Double Needle stitching at bottom hem, Front pockets, Imported',
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/4/3/43123bt_bkwh_m_2.jpg',
    inStock: 20,
    price: 58.0,
    size: 'XS'
  },
  {
    name: 'Side Panel Vintage French Terry Track Pant for Men',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'Vintage athletic-inspired, these track pants feature a contrasting white side stripes, a drawstring closure & unbeatable comfort. Vintage French Terry, 50% Cotton, 50% Polyester, Elastic waistband with drawstrings, Set-in side stripe, Double Needle stitching at bottom hem, Front pockets, Imported',
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/4/3/43123bt_bkwh_m_2.jpg',
    inStock: 20,
    price: 58.0,
    size: 'S'
  },
  {
    name: 'Side Panel Vintage French Terry Track Pant for Men',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'Vintage athletic-inspired, these track pants feature a contrasting white side stripes, a drawstring closure & unbeatable comfort. Vintage French Terry, 50% Cotton, 50% Polyester, Elastic waistband with drawstrings, Set-in side stripe, Double Needle stitching at bottom hem, Front pockets, Imported',
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/4/3/43123bt_bkwh_m_2.jpg',
    inStock: 20,
    price: 58.0,
    size: 'M'
  },
  {
    name: 'Side Panel Vintage French Terry Track Pant for Men',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'Vintage athletic-inspired, these track pants feature a contrasting white side stripes, a drawstring closure & unbeatable comfort. Vintage French Terry, 50% Cotton, 50% Polyester, Elastic waistband with drawstrings, Set-in side stripe, Double Needle stitching at bottom hem, Front pockets, Imported',
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/4/3/43123bt_bkwh_m_2.jpg',
    inStock: 20,
    price: 58.0,
    size: 'L'
  },
  {
    name: 'Side Panel Vintage French Terry Track Pant for Men',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'Vintage athletic-inspired, these track pants feature a contrasting white side stripes, a drawstring closure & unbeatable comfort. Vintage French Terry, 50% Cotton, 50% Polyester, Elastic waistband with drawstrings, Set-in side stripe, Double Needle stitching at bottom hem, Front pockets, Imported',
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/4/3/43123bt_bkwh_m_2.jpg',
    inStock: 20,
    price: 58.0,
    size: 'XL'
  },
  {
    name: 'Standard Issue Sweatpants for Men',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'Cozy up in these retro French Terry sweatpants with an Alternative jock tag sewn into one of the back pockets. Or, pair with a muscle tee and head to the gym. These versatile pants are both breathable and comfy. Lightweight French Terry, 100% Cotton, Cuff ankle, Drawstring waist, Thick, banded waist and side pockets, Back right pocket with woven jock tag, Alternative, Exclusive, Heather Grey is 67% Polyester, 33% Cotton, Imported',
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/0/9/09507f2_ny_m_1_1.jpg',
    inStock: 20,
    price: 58.0,
    size: 'XS'
  },
  {
    name: 'Standard Issue Sweatpants for Men',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'Cozy up in these retro French Terry sweatpants with an Alternative jock tag sewn into one of the back pockets. Or, pair with a muscle tee and head to the gym. These versatile pants are both breathable and comfy. Lightweight French Terry, 100% Cotton, Cuff ankle, Drawstring waist, Thick, banded waist and side pockets, Back right pocket with woven jock tag, Alternative, Exclusive, Heather Grey is 67% Polyester, 33% Cotton, Imported',
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/0/9/09507f2_ny_m_1_1.jpg',
    inStock: 20,
    price: 58.0,
    size: 'S'
  },
  {
    name: 'Standard Issue Sweatpants for Men',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'Cozy up in these retro French Terry sweatpants with an Alternative jock tag sewn into one of the back pockets. Or, pair with a muscle tee and head to the gym. These versatile pants are both breathable and comfy. Lightweight French Terry, 100% Cotton, Cuff ankle, Drawstring waist, Thick, banded waist and side pockets, Back right pocket with woven jock tag, Alternative, Exclusive, Heather Grey is 67% Polyester, 33% Cotton, Imported',
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/0/9/09507f2_ny_m_1_1.jpg',
    inStock: 20,
    price: 58.0,
    size: 'M'
  },
  {
    name: 'Standard Issue Sweatpants for Men',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'Cozy up in these retro French Terry sweatpants with an Alternative jock tag sewn into one of the back pockets. Or, pair with a muscle tee and head to the gym. These versatile pants are both breathable and comfy. Lightweight French Terry, 100% Cotton, Cuff ankle, Drawstring waist, Thick, banded waist and side pockets, Back right pocket with woven jock tag, Alternative, Exclusive, Heather Grey is 67% Polyester, 33% Cotton, Imported',
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/0/9/09507f2_ny_m_1_1.jpg',
    inStock: 20,
    price: 58.0,
    size: 'L'
  },
  {
    name: 'Standard Issue Sweatpants for Men',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'Cozy up in these retro French Terry sweatpants with an Alternative jock tag sewn into one of the back pockets. Or, pair with a muscle tee and head to the gym. These versatile pants are both breathable and comfy. Lightweight French Terry, 100% Cotton, Cuff ankle, Drawstring waist, Thick, banded waist and side pockets, Back right pocket with woven jock tag, Alternative, Exclusive, Heather Grey is 67% Polyester, 33% Cotton, Imported',
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/0/9/09507f2_ny_m_1_1.jpg',
    inStock: 20,
    price: 58.0,
    size: 'XL'
  },
  {
    name: 'Dodgeball Eco-Fleece Pants for Men',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'The ultimate sweat pant for ultimate comfort. Made from our signature Eco Fleece, this pant features side pockets and ribbed cuffs. co-Fleece, 50% Polyester, 46% Cotton, 4% Rayon, Contains organic & recycled materials, Ribbed waistband with drawstring, Ribbed cuff at leg opening, Garment imported, made with U.S.A. fabric',
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/C/6/C66164F20.jpg',
    inStock: 20,
    price: 54.0,
    size: 'XS'
  },
  {
    name: 'Dodgeball Eco-Fleece Pants for Men',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'The ultimate sweat pant for ultimate comfort. Made from our signature Eco Fleece, this pant features side pockets and ribbed cuffs. co-Fleece, 50% Polyester, 46% Cotton, 4% Rayon, Contains organic & recycled materials, Ribbed waistband with drawstring, Ribbed cuff at leg opening, Garment imported, made with U.S.A. fabric',
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/C/6/C66164F20.jpg',
    inStock: 20,
    price: 54.0,
    size: 'S'
  },
  {
    name: 'Dodgeball Eco-Fleece Pants for Men',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'The ultimate sweat pant for ultimate comfort. Made from our signature Eco Fleece, this pant features side pockets and ribbed cuffs. co-Fleece, 50% Polyester, 46% Cotton, 4% Rayon, Contains organic & recycled materials, Ribbed waistband with drawstring, Ribbed cuff at leg opening, Garment imported, made with U.S.A. fabric',
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/C/6/C66164F20.jpg',
    inStock: 20,
    price: 54.0,
    size: 'M'
  },
  {
    name: 'Dodgeball Eco-Fleece Pants for Men',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'The ultimate sweat pant for ultimate comfort. Made from our signature Eco Fleece, this pant features side pockets and ribbed cuffs. co-Fleece, 50% Polyester, 46% Cotton, 4% Rayon, Contains organic & recycled materials, Ribbed waistband with drawstring, Ribbed cuff at leg opening, Garment imported, made with U.S.A. fabric',
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/C/6/C66164F20.jpg',
    inStock: 20,
    price: 54.0,
    size: 'L'
  },
  {
    name: 'Dodgeball Eco-Fleece Pants for Men',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      'The ultimate sweat pant for ultimate comfort. Made from our signature Eco Fleece, this pant features side pockets and ribbed cuffs. co-Fleece, 50% Polyester, 46% Cotton, 4% Rayon, Contains organic & recycled materials, Ribbed waistband with drawstring, Ribbed cuff at leg opening, Garment imported, made with U.S.A. fabric',
    imgUrl:
      'https://www.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/C/6/C66164F20.jpg',
    inStock: 20,
    price: 54.0,
    size: 'XL'
  },
  {
    name: 'Marathon Heavy Wash Pullover Hoodie',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      "A soft, lightweight hoodie made to be easily thrown over any outfit, featuring visible color variations as unique as you. We've worn it in, so you can wear it out. 100% Cotton. Imported.",
    imgUrl:
      'https://media.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/1/2/12365CG0.jpg',
    inStock: 20,
    price: 54.0,
    size: 'XS'
  },
  {
    name: 'Marathon Heavy Wash Pullover Hoodie',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      "A soft, lightweight hoodie made to be easily thrown over any outfit, featuring visible color variations as unique as you. We've worn it in, so you can wear it out. 100% Cotton. Imported.",
    imgUrl:
      'https://media.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/1/2/12365CG0.jpg',
    inStock: 20,
    price: 54.0,
    size: 'S'
  },
  {
    name: 'Marathon Heavy Wash Pullover Hoodie',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      "A soft, lightweight hoodie made to be easily thrown over any outfit, featuring visible color variations as unique as you. We've worn it in, so you can wear it out. 100% Cotton. Imported.",
    imgUrl:
      'https://media.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/1/2/12365CG0.jpg',
    inStock: 20,
    price: 54.0,
    size: 'M'
  },
  {
    name: 'Marathon Heavy Wash Pullover Hoodie',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      "A soft, lightweight hoodie made to be easily thrown over any outfit, featuring visible color variations as unique as you. We've worn it in, so you can wear it out. 100% Cotton. Imported.",
    imgUrl:
      'https://media.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/1/2/12365CG0.jpg',
    inStock: 20,
    price: 54.0,
    size: 'L'
  },
  {
    name: 'Marathon Heavy Wash Pullover Hoodie',
    brand: 'Alternative Apparel',
    category: 'Clothing',
    description:
      "A soft, lightweight hoodie made to be easily thrown over any outfit, featuring visible color variations as unique as you. We've worn it in, so you can wear it out. 100% Cotton. Imported.",
    imgUrl:
      'https://media.alternativeapparel.com/media/catalog/product/cache/1/image/585x/8d6882b137b3069e8cea9e13e57aa14a/1/2/12365CG0.jpg',
    inStock: 20,
    price: 54.0,
    size: 'XL'
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
