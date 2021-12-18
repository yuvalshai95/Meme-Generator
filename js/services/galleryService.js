'use strict';

let gUserMemes = _loadUserMemes();

const gImgs = [
  {
    id: 1,
    url: 'img/memes/1.jpg',
    keywords: ['trump', 'angry', 'america', 'usa', 'politics'],
  },
  {
    id: 2,
    url: 'img/memes/2.jpg',
    keywords: ['dogs', 'cats', 'cute', 'animals', 'puppy', 'puppies', 'funny', 'happy', 'laugh', 'joke'],
  },
  {
    id: 3,
    url: 'img/memes/3.jpg',
    keywords: ['dogs', 'cats', 'cute', 'animals', 'puppy', 'puppies', 'funny'],
  },
  {
    id: 4,
    url: 'img/memes/4.jpg',
    keywords: ['dogs', 'cats', 'cute', 'animals', 'puppy', 'puppies', 'funny', 'happy', 'laugh', 'joke'],
  },
  {
    id: 5,
    url: 'img/memes/5.jpg',
    keywords: [
      'cute',
      'baby',
      'babies',
      'kids',
      'yes',
      'i did it',
      'sucess',
      'victory',
      'respect',
      'nice',
      'good work',
      'great',
    ],
  },
  {
    id: 6,
    url: 'img/memes/6.jpg',
    keywords: [],
  },
  {
    id: 7,
    url: 'img/memes/7.jpg',
    keywords: [],
  },
  {
    id: 8,
    url: 'img/memes/8.jpg',
    keywords: [],
  },
  {
    id: 9,
    url: 'img/memes/9.jpg',
    keywords: [],
  },
  {
    id: 10,
    url: 'img/memes/10.jpg',
    keywords: [],
  },
  {
    id: 11,
    url: 'img/memes/11.jpg',
    keywords: [],
  },
  {
    id: 12,
    url: 'img/memes/12.jpg',
    keywords: [],
  },
  {
    id: 13,
    url: 'img/memes/13.jpg',
    keywords: [],
  },
  {
    id: 14,
    url: 'img/memes/14.jpg',
    keywords: [],
  },
  {
    id: 15,
    url: 'img/memes/15.jpg',
    keywords: [],
  },
  {
    id: 16,
    url: 'img/memes/16.jpg',
    keywords: [],
  },
  {
    id: 17,
    url: 'img/memes/17.jpg',
    keywords: [],
  },
  {
    id: 18,
    url: 'img/memes/18.jpg',
    keywords: [],
  },
];

function getSelectedImage(imgId) {
  const img = gImgs.find(img => img.id === +imgId);
  return img;
}

function getImgs(searchBy) {
  if (!searchBy || searchBy === 'all') return gImgs;
  else {
    const filteredImgs = gImgs.filter(img => img.keywords.some(word => word.includes(searchBy)));
    return filteredImgs;
  }
}

function _loadUserMemes() {
  var memes = loadFromStorage('userMemes');
  if (!memes || !memes.length) memes = [];
  saveToStorage('userMemes', memes);
  return memes;
}

function getSavedMemes() {
  return gUserMemes;
}
