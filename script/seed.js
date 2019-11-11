'use strict';

const db = require('../server/db');
const {User, Order, Item} = require('../server/db/models');

async function seed() {
  await db.sync({force: true});
  console.log('db synced!');

  const users = await Promise.all([
    User.create({
      firstName: 'cody',
      lastName: 'codyLastName',
      email: 'cody@email.com',
      password: '123'
    }),
    User.create({
      firstName: 'murphy',
      lastName: 'Smith',
      email: 'murphy@email.com',
      password: '123'
    }),
    User.create({
      firstName: 'danny',
      lastName: 'gutmann',
      email: 'danny@gmail.com',
      password: 'danny123',
      flag: 1
    })
  ]);
  const items = await Promise.all([
    Item.create({
      name: 'Pappy Van Winkle 10 Yr.',
      description:
        'Old Rip Van Winkles 10 Year Bourbon is the youngest of Pappy Van Winkles award-winning lineup. A splash of limestone well-water is added before bottling for two reasons: to make an exceptionally smooth whiskey and to keep it as close to barrel proof as possible.',
      price: 699.99,
      imageUrl:
        'https://cdn.liquor.com/wp-content/uploads/2014/11/Old_Rip_Van_Winkle_10yr.jpg',
      stock: 99,
      region: 'United States'
    }),
    Item.create({
      name: 'Blantons Single Barrel',
      description:
        'In a special metal-clad aging barn, master distillers carefully select the best barrels of Bourbon exclusively for Blantons. Why metal and not brick? The metal heats and cools quicker, allowing faster aging.',
      price: 65.0,
      imageUrl:
        'https://ilikewine.com.au/wp-content/uploads/2019/06/blantons-reserve-bourbon.jpg',
      stock: 99,
      region: 'United States'
    }),
    Item.create({
      name: 'Four Roses',
      description:
        'Hints of corn and vanilla compliment floral aromas and mix with a taste of mint and spice. Simple and mellow with a unique, long and soft finish. 80 proof. Great for creating mixed drinks with a sophisticated, contemporary flare.',
      price: 25.0,
      imageUrl:
        'https://www.totalwine.com/dynamic/490x/media/sys_master/twmmedia/hb8/ha8/11152769941534.png',
      stock: 99,
      region: 'United States'
    }),
    Item.create({
      name: 'Elmer T Lee',
      description:
        'The nose brings notes of clove, vanilla, and old leather. The flavor balances fruit, honey and vanilla with a light spiciness. A long and warm finish.',
      price: 150.0,
      imageUrl:
        'https://cdn.shopify.com/s/files/1/0173/0930/products/Elmer_1024x1024.jpg?v=1571262653',
      stock: 99,
      region: 'United States'
    }),
    Item.create({
      name: 'Hillrock',
      description:
        'Hillrock marries small barrel-aged Hillrock Estate Bourbon with mature seed bourbon before finishing in 20 year-old Oloroso Sherry casks to balance the flavors and add layers of complexity',
      price: 89.99,
      imageUrl:
        'https://www.totalwine.com/dynamic/490x/media/sys_master/twmmedia/h8f/h29/10870897082398.png',
      stock: 99,
      region: 'United States'
    }),
    Item.create({
      name: 'Laphroaig 10 Year',
      description:
        'one of the most divisive Scotch whiskies, loved by those who enjoy its medicinal, smoky flavour and looked on in amazement by those who dont, it remains one of the most popular',
      price: 54.99,
      imageUrl:
        'https://cdn.powered-by-nitrosell.com/product_images/21/5185/large-laphroaig%2010%20year%20single%20malt%20scotch%20whisky.jpg',
      stock: 99,
      region: 'Scotland'
    }),
    Item.create({
      name: 'Lagavulin 16 Year',
      description:
        'One of the great classics from Islay. Remarkably balanced, with very dry and assertive flavors offset by the sweetness of Sherry oak. Complex, full-bodied, smoky, peaty tastes combine with a salty tang',
      price: 89.99,
      imageUrl:
        'https://www.totalwine.com/dynamic/490x/media/sys_master/twmmedia/h79/h54/11428594024478.png',
      stock: 99,
      region: 'Scotland'
    }),
    Item.create({
      name: 'Oban 14 Year',
      description:
        'This western Highland malt is said to have been originally founded in 1794. Oban is a true classic with an amber color, an assertive, round nose, and a rich, slightly viscous body. On the palate, it is dry with malty and fruity undertones.',
      price: 79.99,
      imageUrl:
        'https://www.totalwine.com/dynamic/490x/media/sys_master/twmmedia/haa/h9e/8815689334814.png',
      stock: 99,
      region: 'Scotland'
    }),
    Item.create({
      name: 'Glenfiddich 26 Year',
      description:
        'A rare & aged single malt Scotch whisky that has spent 26 long years carefully maturing in American Oak ex-bourbon casks. Created to honor Glenfiddichs line of continuous family ownership since William Grant founded our distillery in 1887.',
      price: 539.99,
      imageUrl:
        'https://www.totalwine.com/dynamic/490x/media/sys_master/twmmedia/h83/h89/9121274462238.png',
      stock: 99,
      region: 'Scotland'
    }),
    Item.create({
      name: 'Macallan 18 Year Sherry Oak',
      description:
        'Outstanding, complex Single Malt, matured at The Macallan distillery for a minimum of 18 years in selected Sherry oak casks from Spain. Rich palate of dried fruits, spice, orange and wood smoke. Full-bodied, lingering, smooth, elegant and aromatic finish.',
      price: 299.99,
      imageUrl:
        'https://www.totalwine.com/dynamic/490x/media/sys_master/twmmedia/h16/h6d/11731615219742.png',
      stock: 99,
      region: 'Scotland'
    }),
    Item.create({
      name: 'Teeling Single Grain Irish Whiskey',
      description:
        'A highly unique, award winning Irish Whiskey, embracing difference by focusing on corn whiskey, while layering wholly unique flavor through maturation in ex-Cabernet Sauvignon barrels from the Napa Valley in California.',
      price: 54.99,
      imageUrl:
        'https://www.totalwine.com/dynamic/490x/media/sys_master/twmmedia/h72/h79/11941388714014.png',
      stock: 99,
      region: 'Ireland'
    }),
    Item.create({
      name: 'Redbreast 21 Year',
      description:
        'Single Pot Still, non-chill filtered. Aromas of banana, butterscotch, fresh cream and bacon fat. The palate is rich, tropical and very deep. Ripe mango, brioche and toffee lead into a textured dusty and smoky finish.',
      price: 399.99,
      imageUrl:
        'https://www.totalwine.com/dynamic/490x/media/sys_master/twmmedia/hef/hdc/8799616663582.png',
      stock: 99,
      region: 'Ireland'
    }),
    Item.create({
      name: 'Jameson 18 Year',
      description:
        'Jameson 18 Years Old Limited Reserve is a mellow tasting rare old whiskey matured for at least 18 years in hand selected American barrels and European oak casks. Finished in first-fill bourbon barrels add subtle traces of vanilla on the palate.',
      price: 129.99,
      imageUrl:
        'https://www.totalwine.com/dynamic/490x/media/sys_master/twmmedia/hf3/h4e/11698283937822.png',
      stock: 99,
      region: 'Ireland'
    }),
    Item.create({
      name: 'Sexton',
      description:
        'Triple Distilled In Copper Pot Stills made from 100% Irish Malted Barley then Matured in European Oak Ex-Sherry Butts for 4 years. High proportion of 1st fill casks, delivering a smooth, rich dried fruit flavors.',
      price: 30.0,
      imageUrl:
        'https://www.totalwine.com/dynamic/490x/media/sys_master/twmmedia/h29/he1/11440498212894.png',
      stock: 99,
      region: 'Ireland'
    }),
    Item.create({
      name: 'The Dubliner',
      description:
        'The Dubliners blended whiskey is aged exclusively in bourbon casks. Mellow and rounded with notes of honey and a hint of pepper, this is a great introduction to Irish whiskey.',
      price: 45.0,
      imageUrl: 'https://img.thewhiskyexchange.com/900/irish_dub4.jpg',
      stock: 99,
      region: 'Ireland'
    }),
    Item.create({
      name: 'Hibiki Japanese Harmony Whiskey',
      description:
        'Represents the harmony of Japanese nature and craftsmanship. Blossoming. Exuberant. A dazzling, echoing roundness. Pineapple, plum, raspberry, honey and hibiscus aromas. Banana, pomegranate, custard and pink pepper on the palate. Finish is sweet, sour, and complex.',
      price: 67.99,
      imageUrl:
        'https://www.totalwine.com/dynamic/490x/media/sys_master/twmmedia/hc8/hc7/12034957803550.png',
      stock: 99,
      region: 'Japan'
    }),
    Item.create({
      name: 'Sensei Japanese Whiskey',
      description:
        'Sensei Whiskey is a blended Japanese Whiskey that showcases sweet notes of oak and slight caramel flavors, which are followed by light spice throughout the palate. The finish is long and smooth.',
      price: 52.99,
      imageUrl:
        'https://www.totalwine.com/dynamic/490x/media/sys_master/twmmedia/h0c/he2/11170745909278.png',
      stock: 99,
      region: 'Japan'
    }),
    Item.create({
      name: 'Mars Whiskey Iwai',
      description:
        'Japans highest distillery at 800 meters in Miyata village in Nagano Prefecture, situated between the north and south Alps of Japan. Mars Shinshu distillery was founded in 1985 by Hombo Shuzo Ltd. The tasting notes are sweet with fruit flavors like pear, and quince.',
      price: 35.99,
      imageUrl:
        'https://www.totalwine.com/dynamic/490x/media/sys_master/twmmedia/ha5/h4f/11589693374494.png',
      stock: 99,
      region: 'Japan'
    }),
    Item.create({
      name: 'Nikka Taketsuru 21 Year Pure Malt',
      description:
        'A pure malt whisky that is characterized by the deep and flavorful richness with excellent balance that is unique to its age. A blend of rich ripe fruit and aged cask on the nose with complex changes in character as the finish approaches.',
      price: 249.99,
      imageUrl:
        'https://www.totalwine.com/dynamic/490x/media/sys_master/twmmedia/ha5/hed/9137441800222.png',
      stock: 99,
      region: 'Japan'
    }),
    Item.create({
      name: 'Yamazaki Single 12 Year Malt Whiskey',
      description:
        'Aged in casks of three different kinds of oaks: American, Spanish and Japanese which gives a unique taste. This is a medium-bodied whisky with the aromas of dried fruits and honey. It has a delicate, mellow taste with a lingering, woody, dry finish.',
      price: 119.99,
      imageUrl:
        'https://www.totalwine.com/dynamic/490x/media/sys_master/twmmedia/hf4/hf8/12034958753822.png',
      stock: 99,
      region: 'Japan'
    }),
    Item.create({
      name: 'Carinou Crossing Canadian Whiskey',
      description:
        'Single barrel Whisky. Fragrant with vanilla and honey; smooth and silky, with toasty oak and mellow notes of caramel and spice; lovely depth on a long, balanced finish',
      price: 49.99,
      imageUrl:
        'https://www.totalwine.com/dynamic/490x/media/sys_master/twmmedia/h1f/h34/8812350275614.png',
      stock: 99,
      region: 'Canada'
    }),
    Item.create({
      name: 'Canadian Club Reserve 9 Year',
      description:
        'For those who appreciate the deeper oak notes, this aged whisky has unique character and richness. Aromas of creamy toffee and toastiness. Flavors are rich, mellow oak with hints of nutmeg and clove.',
      price: 33.99,
      imageUrl:
        'https://www.totalwine.com/dynamic/490x/media/sys_master/twmmedia/hb5/h4d/12034953773086.png',
      stock: 99,
      region: 'Canada'
    }),
    Item.create({
      name: 'Crown Royal XR',
      description:
        'Handcrafted unique blend that includes the final batch of whiskies from renowned LaSalle distillery. A sophisticated blend of dried fruits and honey in a harmonious balance with spicy notes of Canadian rye, finishing in a lovely taste of raisins, cocoa and brown sugar.',
      price: 149.99,
      imageUrl:
        'https://www.totalwine.com/dynamic/490x/media/sys_master/twmmedia/h51/h5a/11428588847134.png',
      stock: 99,
      region: 'Canada'
    }),
    Item.create({
      name: 'Pendleton Canadian Whiskey',
      description:
        'Golden amber. Subtle, caramel, butter, and brown sugar aromas. A smooth, supple entry medium-bodied palate with clean fruity, aged-rum-barrel and buttery vanilla flavors. Finishes smoothly with vanilla cake and slight nuttiness.',
      price: 39.99,
      imageUrl:
        'https://www.totalwine.com/dynamic/490x/media/sys_master/twmmedia/h5f/h18/8796495314974.png',
      stock: 99,
      region: 'Canada'
    }),
    Item.create({
      name: '8 Seconds Canadian Black Label',
      description:
        'A rich full flavored premium Canadian whisky. Rich amber in color with hints of vanilla, toffee, and spice aromas. Bold flavors of mocha and peppery spice lead to a smooth polished finish.',
      price: 89.99,
      imageUrl:
        'https://www.totalwine.com/dynamic/490x/media/sys_master/twmmedia/hb7/h01/10560992182302.png',
      stock: 99,
      region: 'Canada'
    })
  ]);

  const orders = await Promise.all([
    Order.create({total: 10, status: 'pending', userId: 2}),
    Order.create({total: 189, status: 'completed', userId: 2}),
    Order.create({total: 121, status: 'pending', userId: 1}),
    Order.create({total: 9, status: 'completed', userId: 3})
  ]);

  console.log(`seeded ${items.length} items`);
  console.log(`seeded ${orders.length} orders`);
  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
