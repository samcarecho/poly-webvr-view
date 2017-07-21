/*
 * Copyright 2016 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var vrView;

// All the scenes for the experience
var scenes = {
  petra: {
    image: 'assets/gallery/petra.jpg',
    preview: 'assets/gallery/petra-preview.jpg'
  },
  christTheRedeemer: {
    image: 'assets/gallery/christ-redeemer.jpg',
    preview: 'assets/gallery/christ-redeemer-preview.jpg'
  },
  machuPicchu: {
    image: 'assets/gallery/machu-picchu.jpg',
    preview: 'assets/gallery/machu-picchu-preview.jpg'
  },
  chichenItza: {
    image: 'assets/gallery/chichen-itza.jpg',
    preview: 'assets/gallery/chichen-itza-preview.jpg'
  },
  tajMahal: {
    image: 'assets/gallery/taj-mahal.jpg',
    preview: 'assets/gallery/taj-mahal-preview.jpg'
  },
};

function onLoad() {
  console.log(window.screen.availWidth);
  console.log(window.screen.availHeight);
  const w = window.screen.availWidth;
  const h = window.screen.availHeight;

  vrView = new VRView.Player('#vrPlayer', {
    width: w,
    height: h,
    image: 'assets/gallery/petra.jpg',
    preview: 'assets/gallery/petra-preview.jpg',
    is_stereo: false,
    is_autopan_off: true,
  });

  vrView.on('ready', onVRViewReady);
  vrView.on('modechange', onModeChange);
  vrView.on('getposition', onGetPosition);
  vrView.on('error', onVRViewError);

  var goFS = document.getElementById("vrPlayer");
  goFS.addEventListener("click", function() {
    document.body.requestFullscreen();
  }, false);
}

function loadScene(id) {
  console.log('loadScene', id);

  // Set the image
  vrView.setContent({
    image: scenes[id].image,
    preview: scenes[id].preview,
    is_autopan_off: true
  });

  // Unhighlight carousel items
  var carouselLinks = document.querySelectorAll('ul.carousel li a');
  for (var i = 0; i < carouselLinks.length; i++) {
    carouselLinks[i].classList.remove('current');
  }
  vrView.getPosition();
  // Highlight current carousel item
  document.querySelector('ul.carousel li a[href="#' + id + '"]')
    .classList.add('current');
}

function onVRViewReady(e) {
  console.log('onVRViewReady');

  // Create the carousel links
  var carouselItems = document.querySelectorAll('ul.carousel li a');
  for (var i = 0; i < carouselItems.length; i++) {
    var item = carouselItems[i];
    item.disabled = false;

    item.addEventListener('click', function(event) {
      event.preventDefault();
      loadScene(event.target.parentNode.getAttribute('href').substring(1));
    });
  }

  loadScene('petra');
}

function onModeChange(e) {
  console.log('onModeChange', e.mode);
}

function onVRViewError(e) {
  console.log('Error! %s', e.message);
}

function onGetPosition(e) {
  console.log(e)
}

window.addEventListener('load', onLoad);
