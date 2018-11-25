const keys = [
  [
    'q','w','e','r','t','y','u','i','o','p'
  ],
  [
    'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'
  ],
  [
    'z', 'x', 'c', 'v', 'b', 'n', 'm'
  ]
]

let urlHash = {};

if (localHashStorage('get')) {
  urlHash = localHashStorage('get');
} else {
  urlHash = {
    'q': 'www.qq.com',
    'y': 'www.youtube.com',
    'b': 'www.bilibili.com',
    'g': 'www.google.com',
    't': 'www.twitter.com',
    'j': 'xiedaimala.com',
    'h': 'nba.hupu.com',
    'z': 'www.zhihu.com'
  }
}

let keyRows = document.querySelectorAll('.keys-row');

function generateKeys() {
  for (let i = 0; i < keyRows.length; i++) {
    keys[i].forEach(letter => {
      let iconUrl = './noicon.png';
      if (urlHash[letter]) {
        iconUrl = 'https://' + urlHash[letter] + '/favicon.ico';
      }
      htmlText = [
        '<div class="key" id="',
        letter,
        '">',
        '<img src="',
        iconUrl,
        '">',
        '<button>Edit</button>',
        '<kbd>',
        letter,
        '</kbd>',
        '</div>'
      ].join('');
      keyRows[i].innerHTML += htmlText;
    });
  }
}

let keysElem = document.querySelectorAll('.key');

function addKeysListener() {
  document.addEventListener('keypress', function(event) {
    let keyPressed = event.key;
    if (urlHash[keyPressed]) {
      window.open('https://' + urlHash[keyPressed], '_blank');
    } else {
      return
    }
  });
}

function localHashStorage(getOrset, hash) {
  if (getOrset === 'get') {
    let newHash = JSON.parse(localStorage.getItem('url'));
    return newHash;
  } else if (getOrset === 'set') {
    localStorage.setItem('url', JSON.stringify(hash));
  } else {
    return null;
  }
}

function addButtonsListener() {
  let buttonElem = document.querySelectorAll('.key > button');
  for (let i = 0; i < buttonElem.length; i++) {
    buttonElem[i].addEventListener('click', function(event) {
      let url = prompt('请输入网址');
      let parentKey = this.parentNode;
      urlHash[parentKey.id] = url;
      localHashStorage('set', urlHash);
      let siblingIcon = this.previousSibling;
      siblingIcon.src = 'https://' + url + '/favicon.ico';
      checkIcon(siblingIcon);
    });
  }
}

function checkIcon(img) {
  img.addEventListener('error', function(event) {
    this.src = './noicon.png';
  });
}

generateKeys();
addButtonsListener();
addKeysListener();