/* ============================================================
   OUR STORY — edit everything here.
   You do not need to touch any other file.

   - Change MY_NAME below to your name. It's used at the end of
     the final letter and on the final screen.
   - Photos: drop image files into /photos using the filenames
     listed in each `photo:` field. Until you do, a soft glowing
     placeholder is shown automatically — nothing breaks.
   - Music: drop an mp3 into /audio/our-song.mp3 (see AUDIO below).
   - Every block of text can be edited safely. Keep the quotes.
   ============================================================ */

window.STORY = {

  // ===== EDIT YOUR STORY HERE =====
  HER_NAME: "Samanwita",
  HER_AGE: 21,
  MY_NAME: "Bodhiosattwa Sarkar", // <-- change this to your name

  AUDIO: {
    // Put a file at /audio/our-song.mp3 and this will just work.
    src: "audio/our-song.mp3",
    label: "our song \u266b",
  },

  // ---------- OPENING ----------
  prologue: {
    address: "To Samanwita,",
    lines: [
      "21.",
      "Happy birthday, my love.",
      "I made you something.",
      "Don't judge the website too much.",
    ],
    button: "Come in",
  },

  // ---------- SECTIONS ----------
  chapters: [
    {
      id: 1,
      roman: "I",
      title: "A Few Memories",
      mood: "curious",
      blocks: [
        { type: "text", lines: [
          "Funny that we've technically known each other since nursery.",
          "Took us years to figure out what we were doing.",
        ]},
        { type: "pathmotif" },
        { type: "divider" },
        { type: "text", lines: [
          "That stupid Truth or Dare.",
          "We were both way too embarrassed to just do it normally.",
        ]},
        { type: "text", emphasis: true, lines: [
          "So obviously, we ran.",
        ]},
        { type: "text", small: true, italic: true, lines: [
          "First kiss. For both of us.",
        ]},
        { type: "twobooks" },
        { type: "text", lines: [
          "Two books. You beside me. Nothing special.",
        ]},
        { type: "text", small: true, italic: true, lines: [
          "Except it kind of was.",
          "I think I was already falling for you here.",
        ]},
        { type: "text", lines: [
          "Your Name. Arunangshu's place.",
          "And somehow that was the day I decided I wanted you in my life.",
        ]},
        { type: "photo", file: "proposal.jpg", caption: "That day.", alt: "Photo from the day of the proposal" },
        { type: "divider" },
        { type: "objects" },
        { type: "text", small: true, italic: true, lines: [
          "We haven't always gotten everything right.",
          "But I'm glad we're here now.",
        ]},
      ],
      outro: [
        "Feels ridiculous that all of that was just the beginning.",
      ],
    },

    {
      id: 2,
      roman: "II",
      title: "The Little Things",
      mood: "tender",
      blocks: [
        { type: "text", lines: [
          "There are so many tiny things about you that I love.",
        ]},
        { type: "text", emphasis: true, lines: [
          "Your laugh.",
          "Your hair when you leave it open.",
          "The way you feed me.",
          "The way you say \u201cbasically\u201d about seven times a minute.",
          "Our stupid jokes that only we find funny.",
        ]},
        { type: "photo", file: "ho-gang.jpg", caption: "The HO gang.", alt: "Photo of the HO gang" },
        { type: "photo", file: "saraswati-puja.jpg", caption: "You. Basically always this pretty.", alt: "Samanwita in a saree on Saraswati Puja" },
        { type: "text", lines: [
          "I don't think I need a bigger reason than that.",
        ]},
        { type: "text", emphasis: true, lines: [
          "I love you.",
        ]},
      ],
      outro: [
        "Just\u2026 you.",
      ],
    },

    {
      id: 3,
      roman: "III",
      title: "That Day In Kolkata",
      mood: "magical",
      blocks: [
        { type: "text", lines: [
          "I still think about this day a lot.",
        ]},
        { type: "photo", file: "durga-puja.jpg", caption: "Durga Puja.", alt: "Photo from Durga Puja outing" },
        { type: "text", lines: [
          "Pandal hopping. Victoria Memorial.",
        ]},
        { type: "text", emphasis: true, lines: [
          "Your hand in mine.",
          "We didn't even talk about it. We just did.",
        ]},
        { type: "song", title: "Bhalobashar Mor Shum", artists: "Shreya Ghoshal \u00b7 Arijit Singh",
          lines: ["Some random singer decided we were already a couple.", "Honestly, he wasn't wrong."] },
        { type: "text", small: true, italic: true, lines: [
          "I don't think we needed to say much that day.",
          "Somehow, I already knew.",
        ]},
      ],
      outro: [
        "Still one of my favorite days with you.",
      ],
    },

    {
      id: 4,
      roman: "IV",
      title: "Us, Now",
      mood: "warm",
      blocks: [
        { type: "text", lines: [
          "We're not always in the same place.",
          "We don't always get as much time as I'd want.",
        ]},
        { type: "photo", file: "umbrella.jpg", caption: "It was raining. You looked beautiful. Your dad was right there. So I behaved.", alt: "Samanwita under an umbrella in the rain" },
        { type: "text", emphasis: true, lines: [
          "But I still love talking to you.",
          "I still love seeing you.",
          "I still love hearing your laugh.",
        ]},
        { type: "text", lines: [
          "And I still choose you. Every time.",
        ]},
        { type: "divider" },
        { type: "alwaysreveal" },
        { type: "text", small: true, italic: true, lines: [
          "Snape's word. Your favorite character.",
          "Yeah. That one. You know what I mean.",
        ]},
      ],
      outro: [
        "Every time.",
      ],
    },

    {
      id: 5,
      roman: "V",
      title: "The Future",
      mood: "joyful",
      blocks: [
        { type: "text", lines: [
          "I don't know exactly what our life will look like.",
        ]},
        { type: "text", emphasis: true, lines: [
          "But I know I want you in it.",
        ]},
        { type: "text", lines: [
          "I want the trips. I want the random days.",
          "I want the boring days. I want the big days.",
        ]},
        { type: "text", small: true, italic: true, lines: [
          "Japan, probably. China, for you.",
          "Too many pictures. An argument or two over where to eat.",
        ]},
        { type: "text", lines: [
          "I want to watch you get everything you're working for.",
        ]},
        { type: "text", emphasis: true, lines: [
          "I want to spend my life with you.",
        ]},
      ],
      outro: [
        "That's really it.",
        "That's the whole point of this website.",
      ],
    },
  ],

  // ---------- SECTION I — tiny tappable references (physics tuition) ----------
  objects: [
    { icon: "chair", label: "The seat", text: "I always kept this one saved for you." },
    { icon: "headphones", label: "The songs", text: "Your Name songs, on loop, pretending to study." },
    { icon: "heart", label: "The cake", text: "Little hearts on our teacher's birthday cake. We ate half of them." },
    { icon: "candy", label: "The gift", text: "Wrapped like one giant piece of toffee." },
  ],

  // ---------- FINAL SCREEN ----------
  finale: {
    memoryStars: [
      "Two books",
      "That kiss",
      "Durga Puja",
      "A rainy umbrella",
      "Always",
    ],
    lines: [
      "Samanwita.",
      "You're 21.",
      "I hope this year is kind to you.",
      "I hope you get everything you've been working for.",
    ],
    pause: "And I hope I get to be there for a lot of it.",
    finalLine: "I love you.",
    bigLove: "More than I probably know how to explain properly.",
    bigLoveSub: "So I don't really want to try anymore. I just want to keep showing you.",
    closing: [
      "I want to keep making memories with you.",
      "I want to keep choosing you.",
      "I want to spend my life with you.",
      "Happy 21st birthday, my love.",
    ],
    signature: "\u2014 Bodhiosattwa Sarkar",
    // The full letter — edit this freely. It's yours.
    letter: `My Samanwita,

21. I still can't quite believe it.

I don't want to write you a whole history lesson — you were there for all of it, you don't need me explaining it back to you. So I'll just say the simple things instead.

I love your laugh. I love your hair when you leave it open. I love the way you feed me like it's nothing, when to me it's never nothing. I love that you say "basically" in almost every sentence. I love our stupid jokes that make sense to literally no one else.

I know distance isn't easy, and that we don't get as much time together as I'd like. That hasn't changed how I feel, not even a little. I still choose you. I still want you. I still want the future with you — the trips, the random days, the boring days, all of it.

I want to spend my life with you.

Happy 21st birthday. I love you.

Always,
Bodhisattwa Sarkar`,
  },

  // ---------- EASTER EGGS ----------
  easterEggs: {
    basically: "\u2026she says \u201cbasically\u201d basically all the time.",
  },

  // ---------- PHOTOS ----------
  // Drop files with these exact names into /photos to replace the placeholders.
  photoManifest: [
    "proposal.jpg",
    "umbrella.jpg",
    "durga-puja.jpg",
    "saraswati-puja.jpg",
  ],
};

// Make the story available to app.js — do not remove this line.
window.STORY = STORY;
