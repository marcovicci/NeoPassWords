//variables

let colors = [
  '#ff0000',
  '#ff2d00',
  '#ff4300',
  '#ff5400',
  '#ff6300',
  '#ff7100',
  '#ff7d00',
  '#ff8900',
  '#ff9500',
  '#ffa000',
  '#ffab00',
  '#ffb600',
  '#ffc000',
  '#ffca00',
  '#ffd400'
];

let passwords = [

];

//percentage change between numbers
//this allows me to scale all passwords on the page according to their relationship
//to the most-commonly-used password
//source: https://ourcodeworld.com/articles/read/557/how-to-calculate-a-percentage-change-increase-and-decrease-from-2-values-in-javascript

/**
 * Calculates in percent, the change between 2 numbers.
 * e.g from 1000 to 500 = 50%
 *
 * @param oldNumber The initial value
 * @param newNumber The value that changed
 */
function getPercentageChange(oldNumber, newNumber){
    var decreaseValue = oldNumber - newNumber;

    return (decreaseValue / oldNumber) * 100;
}

//random button
document.querySelector("#random a").addEventListener('click', () => {
  console.log("help")
  passwords = [];
  document.getElementById('content').innerHTML = '';
  fetch('/random', { method: 'GET' })
  .then(response => response.json())
  .then(data => {
    for (let i=0; i<data.length; i++) {
      printPasswords([
        data[i][0],
        data[i][1]
      ]);
    }
  });
});

document.querySelector("#home a").addEventListener('click', () => {
  passwords = [];
  fetch('/pass', { method: 'GET' })
  .then(response => response.json())
  .then(data => {
    for (let i=0; i<data.length; i++) {
      printPasswords([
        data[i][0],
        data[i][1]
      ]);
    }
  });
});

//search for password

//print NEOPASSWORDS
function printPasswords(entry) {
  passwords.push(entry);
  document.getElementById('content').innerHTML = '';
  for (let i=0; i < passwords.length; i++) {
    let color = colors[i%colors.length];
    let row = document.createElement('a');
      row.style.fontSize = ('100' - (getPercentageChange(passwords[0][1], passwords[i][1]) / 1.5)) + 'px';
      row.style.color = color;
      row.innerHTML += passwords[i][0] + ' ';
      row.title += 'Password used ' + passwords[i][1] + ' times';
      document.getElementById('content').appendChild(row);
  }
}

// search for a password
    document.querySelector('#search a').addEventListener('click', () => {
      document.getElementById('content').innerHTML = '';
      passwords = [];
      let entry = String(document.getElementById('searchterm').value);
      fetch('/pass', {
            method: 'POST',
            body: JSON.stringify(document.getElementById('searchterm').value),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        })
        .then(response => response.json())
        .then(data => {
          for (let i=0; i<data.length; i++) {
            printPasswords([
              data[i][0],
              data[i][1]
            ]);
          }
        });
  });

  // load pass
fetch('/pass', { method: 'GET' })
.then(response => response.json())
.then(data => {
  for (let i=0; i<data.length; i++) {
    printPasswords([
      data[i][0],
      data[i][1]
    ]);
  }
});
