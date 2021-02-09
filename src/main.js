// BUSINESS LOGIC ------------------

import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

class Dino {
  static getDinos(p, w) {
    let request = new XMLHttpRequest();
    return new Promise(function(resolve, reject) {
      const url = `http://dinoipsum.herokuapp.com/api/?format=json&paragraphs=${p}&words=${w}`;
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(request.reponse);
        }
      };
      request.open("GET", url, true);
      request.send();
    });
  }
}

// UI LOGIC ------------------------

const display = (displayData) => {
  $('#dino').html(displayData);
};

$(document).ready(function() {
  const paragraph = '5';
  const words = '15';
  Dino.getDinos(paragraph, words).then(response => {
    const dinoParagraphs = JSON.parse(response);
    const bodyMapper = dinoParagraphs.map(
      paragraph => {
        const words = paragraph;
        return `
          ${
            words.map(
              word => {
                return ` ${word}`;
              }
            )
          }`
      }
    );
    display(bodyMapper)
  })
});
