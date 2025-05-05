// DiscordTrail.cjs
const { Client, GatewayIntentBits, Partials } = require('discord.js');
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Channel],
});

const shadowTrail = {
  action: false,
  players: new Set(),
  allowedChannel: 'shadow-trail', // Channel name for shadow trail
};

client.once( 'ready', () => {
  console.log(`✅ DieHeartBot is online as ${client.user.tag}!`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  if (message.channel.name !== shadowTrail.allowedChannel) return;

  const content = message.content.toLowerCase();
  const userId = message.author.id;

  // Start the Shadow Trail
  if (content === '!startshadowtrail') {
    if (!message.member.permissions.has('ManageMessages')) {
      return message.reply('😈 Only admins can start the Shadown Trail.');
    }

    if (shadowTrail.active) {
      return message.reply('😒 The Shadow Trail is already in progress....');
    }

    shadowTrail.active = true;
    shadowTrail.players.clear();

    return message.channel.send(`✨✨Welcome to SHADOW TRAIL✨✨ The Game No One Should Play! 🫢 Late one night, in a corner of the gaming world few dared to tread, a new gme surfaced in an abscure Discord server known only to underground streamers and thrill-seekers. It was called Shadow Trail, created by a developer no one had ever heard of HeartofDead. There was no trailer. No Twitch stream, No Twitter buzz. Just a whisper: "Once you join, there's no backing out." At first, it seemed like a twisted social experiment a survial game that mixed voice chat with text decisions. But as soon as players typed !accept, things began to change. Streamer RayvenDieHeart, known for her fearless horror playthroughs, was the first to try it live. Her camera flickered. Her overlay glitched. Then her mic cut out. The chat spammed "WTF?" before it went ded. The stream never resumed. That same night, dozen more joined. Some laughed. Some dared each other. But then came the eerir messages not from any player. Not even from RayvenDieHeart. it was him. HeartofDead: "You play for your soul. Not your stats." Now, the Discord server pulses ith new players. Some think it's an elaborate ARG. Others belive it's haunted code. But those who join quickly realize yout choices aren't just yours. Type \`!join\` to step into the darkness. The game watches....The bit decided....And someone always vanishes.`);
  }

  // Join the Shadow Trail
  if (content === '!join' && shadowTrail.active) {
    if (shadowTrail.players.has(userId)) {
      return message.reply('🤦‍♀️ You already joined the trail. Typle `!accept` if you dare.');
    }

    shadowTrail.players.add(userId);

    return message.channel.send(`✨✨Chapter 1: The Invitation✨✨ The chilling silence before the scream....👀 It was just another late night on Discord. Some were lurking. Others were streaming. A few shared memes in the #memes-and-vibes channel. Nothing unusual until a new user joined. HeartOfDead. No profile picture. No roles. No welcome message triggered. It was like Discord itself didnt notice the user enter. Moments later, a new channel appeared: #shadow-trail. Most thouht it was a glitch. Some laughed. But curiosity is a killer. One by one, users started clicking in. A pinned message appeared glitchy text, flickering like it was typed by something...not human. "Welcome, streamer. You've been chosen. Not to win. Not to play. But to survive. Type \`!accept\` to answer the invitation if you dare. 😈" ${message.author.username}...., ypu've been marked.`);
  }

  // Accept the invitation and enter the trail
  if (content === '!accept' && shadowTrail.players.has(userId)) {
    return message.channel.send(`✨✨Chapter 2: Welcome to the Shadows✨✨ ${message.author.username} has accepted the initation. The room round you begins to dim-not in light, but in sound. The Discord notification chimes fade. Voices from other servers drop into static. Even your own keyboard seems quieter now. And then....your screen flickers. A fake Twitch link appears in the chat: https://twitch.tv/${message.author.username}. It looks familiar. The username? Yours. The title? "Shadown Trail - LIVE" The viewer count: 1. but no one's typing. No one ever joins. You stare at the black-and-white stream....it's your face. Like a mirror. But the backgroun is pitch black. Behind you, the words "Starting Game Soon" flicker. A countdown begins at 10....9....8...."Welcome to HeartOfDEad's Cabin. Only the forgotten survive. Before you can blink, the video vanishes. Then a new message appears, etched into digital stone: "You're no loner watching the stream....You ARE the stream. Everything goes still. Now, you must choosse: \`!clickthelink\` - 🧿 You lean into the scream....and feel it looking back or \`!closetheapp\` - 📴 You try to escape. But is it already too late?. The game watches...And someone always vanishes.`);
  }

  // Chapter 3 handling - Shadow Trail
  if (content === '!closetheapp' && shadowTrail.players.has(userId)) {
    return message.channel.send(`✨✨Chapter 3: The Illusion of Escape✨✨ ${message.author.username} chose to quit....or at least tried to. You clciekd to close the app. YOu thought it woudld end. But something followed. Your screen didnt shut down it rebooted into a static screen with your Discord name slowly glitching letter by letter then came a message: "You didn't accpet....but the game did." YOu try to close Discord entirey. It wont close. Yoou uninstall the pp but it reinstalls. You powered off your phone. But nothing changed. The screen in your mind kept streaming. Black and white. Silent. Your reflection still staring. Your discord ping again even though everything is turned off. A message appears in #shadow-trail.....but you didn't send it. "Nice try, ${message.author.username}. There is no app to close. Only a game to survive." You've triggered the Reaper's eye 👁️ From this moment forward, you cannot control your own fate. Only another player can eliminate you from the game Until then....you remain, watched. Hunted. Choose wisely: \`!clickthelink\` - 🧿 You lean into the scream....and feel it looking back. or \`closetheapp\` - 📴 Try to leave....but shadows are watching.`);
  }

  if (content === '!clickthelink' && shadowTrail.players.has(userId)) {
    return message.channel.send(`✨✨Chapter 3: The SMeeting Grounds✨✨ ${message.author.username} leaned closer....and clicked the link. Your screen dissolved into shadow then rebuilt itself as a massive, dilapidated lobby. Flickering chandeliers. Broken TVs replaying old VHS clips of missing Twitch Streamers. Other players stood nearby....or at least, their oulines did. Some frozen. Some twitching. A voice static laced whispered from nowhere: "You've arrived at the Meeting Grounds. Only one path remains Only one survuves," You look ahead. A sinlge, dim hallway stretches endlessely before you. Choose wisely: \`!enterthehallway\` - 🚪 Step into the dark corridor and begin the real game. or \`!closetheapp\` - 📴 Try to leave....but shadows are watching.`);
  }

// Chapter 4 logiv for Shadow Trail
const chapter4 = async (message, userState) => {
  const { content, author, channel } = message;
  coonst username = author.username;
  const userID = author.id;

  if (!userState[userId]) return;

  // Chapter4 - !enterthehallway route
  if (userState[userId].chapter3 === `!clickthelink` && content === `!enterthehallway`) {
    userState[userId].chapter4 = `enteredHallway`;
    return channel.send(`✨✨Chapter 4: The Gatheringy✨✨ You step into the hallway. the air feels electric, tense. Figures emerge from the shadow other players, like you, eyes wide, uncertain. Each of them trapped in the same cursed game. A flickering neon sign above reads: "Choose your path. Trust no one." You hear whispers around you. Some offer alliances, Others size you up like prey. Then a sound....*CLANK!* A metal gate seals behind you. The ahllway is no longer an entrance it's a cage. A message carves itself into the wall: "Only the cunning survive the night." You have one mission: Find the reaper's token hiddent in one of three places. Only one will protect you. Options: \`!searchlibrary\` - 📚 Dusty books hold more than knowlege. \`!searchbasement\` - 🩸 The smell of blood still lingers. \`!searchmirrorroom\` - 🧿 You might not like who's staring back.`);
  }

  //Chapter 4 - !clickthelink after !closetheapp
  if (userState[userId].chapter3 === `!closetheapp` && content === `!clickthelink`) {
    userState[userId].chapter4 = `enteredHallwayAfterHesitation`;
    return channel.send(`✨✨Chapter 4: The Gathering✨✨ You hesitated....but the game didn't. Your screen flickers and drags you in anyway. You're dropped into the hallways. 😈" Too late to turn back now." All the others turn to look. The whispers pause. YOu feel exposed, like prey entering a den of hunters. The hallway seals shut behind you. A message etches itself on the wall: "your hesitation has been noted. The shadows are watching you closer now." The mission awaits: \`!searchlibrary\` - 📚 Dusty books hold more than knowlege. \`!searchbasement\` - 🩸 The smell of blood still lingers. \`!searchmirrorroom\` - 🧿 You might not like who's staring back.`);
  }

  // Chapter 4 - !closetheapp twice
  if (userState[userId].chapter3 === `!closetheapp` && content === `!closetheapp`) {
    const randomRoom = [`!searchlibrary`, `!searchbasement`, `!searchmirrorroom`] [Math.floor(Math.random() * 3)];
    userState[userId].chapter4 = 'botForcedEntry';
    userState[userId].forcedChoice = randomRoom;

    return channel.send(`💀 ${username}, you tried to escape again....But the game does't forget. It doesn't forgive. The bot has chosen for you. You're thrown into a random room. "Your location: ${randomRoom.replace('!search', '')}" Your fate now lies in the hands of the others....or the Reaper.`);
  }
};

module.exports = chapter4;

  
  
  }
})