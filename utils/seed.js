const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getRandomName, getRandomThoughts, getRandomArrItem } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
  // Delete the collections if they exist
  let thoughtCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
  if (thoughtCheck.length) {
    await connection.dropCollection('thoughts');
  }

  let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
  if (userCheck.length) {
    await connection.dropCollection('users');
  }

  const users = [];
  const thoughts = getRandomThoughts(10);

  for (let i = 0; i < 20; i++) {
    const username = getRandomName();

    const emails = [
      'me@aol.com',
      'you@aol.com',
      'we@me.com',
      'amiko3@gmail.com',
      'wee@yahoo.com'
    ]
   

    users.push({
      username,
      email: getRandomArrItem(emails),
    });

    thoughts.push({
      thoughtText,
      username,
    })
  }

  await User.insertMany(users);
  await Thought.insertMany(thoughts);

  // loop through the saved videos, for each video we need to generate a video response and insert the video responses
  console.table(users);
  console.table(thoughts);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
