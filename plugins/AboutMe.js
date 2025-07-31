let handler = async (m) => {
  const bio = `📚 *About Me:*

I’m Rolith, 25 years old, and someone who genuinely enjoys meeting new people and hanging out. I love being around others, sharing time and conversations, and I find a lot of joy in building connections. I’m also the community admin for We The Barodians, a WhatsApp group for my city, where I stay involved and connected with people around me.

Traveling has been a big part of my life since 2021. I’ve been solo traveling to different places, which has helped me grow personally and discover more about myself and the world. While I live in Vadodara, I often travel to Delhi for study purposes as well.

Alongside my job, I’m pursuing two degrees through open distance learning. It keeps me busy, but I enjoy learning and growing in different directions at the same time. I also love tech, and I’ve been deeply interested in AI — I’ve been working on my own AI project for over a year now.

In the past, I’ve worked as a pre-alpha and alpha tester for various games and have done some white hat work too. I know and work with multiple coding languages including JavaScript, Core Java, HTML, CSS, C, C++, and Pawn. I’ve also created my own WhatsApp bot using JavaScript and the Baileys library, which has been one of my favorite personal projects.
`;
  m.reply(bio);
};

handler.help = ['aboutme'];
handler.tags = ['main'];
handler.command = ['aboutme'];

export default handler;
