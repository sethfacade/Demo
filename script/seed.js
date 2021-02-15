const db = require('../server/db')
const {
  User,
  Client,
  Fund,
  Investment,
  CashFlow
} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'canoe@email.com', password: '123'})
  ])

  const clients = await Promise.all([
    Client.create({
      id: 1,
      name: 'Client 1',
      permission: 'all',
      description: 'This is client 1'
    }),
    Client.create({
      id: 2,
      name: 'Client 2',
      permission: 'VC, RE',
      description: 'This is client 2'
    }),
    Client.create({
      id: 3,
      name: 'Client 3',
      permission: 'PL, HF',
      description: 'This is client 3'
    })
  ])

  const funds = await Promise.all([
    Fund.create({
      id: 1,
      name: 'ABC',
      type: 'HF',
      inceptionDate: '2018-02-01',
      description: 'This is the ABC HedgeFund'
    }),
    Fund.create({
      id: 2,
      name: 'DEF',
      type: 'VC',
      inceptionDate: '2018-02-01',
      description: 'This is the DEF VC fund'
    }),
    Fund.create({
      id: 3,
      name: 'XYZ',
      type: 'RE',
      inceptionDate: '2018-01-01',
      description: 'This is the XYZ RE fund'
    }),
    Fund.create({
      id: 4,
      name: 'GHI',
      type: 'PC',
      inceptionDate: '2019-02-01',
      description: 'This is the GHI PC fund'
    }),
    Fund.create({
      id: 5,
      name: 'JKL',
      type: 'PL',
      inceptionDate: '2019-02-01',
      description: 'This is the JKL PL fund'
    }),
    Fund.create({
      id: 6,
      name: 'MNO',
      type: 'HF',
      inceptionDate: '2020-02-01',
      description: 'This is the MNO HF fund'
    }),
    Fund.create({
      id: 7,
      name: 'PQR',
      type: 'PC',
      inceptionDate: '2020-02-01',
      description: 'This is the MNO PC fund'
    })
  ])

  const investments = await Promise.all([
    Investment.create({
      id: 123,
      name: 'investment abc',
      clientId: 1,
      fundId: 1,
      date: '2020-05-01',
      amount: 1000000
    })
  ])

  const cashFlow = await Promise.all([
    CashFlow.create({
      id: 456,
      investmentId: 123,
      date: '2020-06-01',
      return: 5
    })
  ])

  console.log(`seeded ${clients.length} clients`)
  console.log(`seeded ${funds.length} funds`)
  console.log(`seeded ${investments.length} investments`)
  console.log(`seeded ${cashFlow.length} cash flows`)
  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
