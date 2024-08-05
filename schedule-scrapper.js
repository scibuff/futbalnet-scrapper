// https://sportnet.sme.sk/futbalnet/z/bfz/s/4055/program/ 
// https://sportnet.sme.sk/futbalnet/z/bfz/s/4055/vyhodnotenie/
// https://sportnet.sme.sk/futbalnet/z/bfz/s/4056/program/
// https://sportnet.sme.sk/futbalnet/z/bfz/s/4056/vyhodnotenie/
// https://sportnet.sme.sk/futbalnet/z/obfz-bratislava-mesto/s/4058/program/
// https://sportnet.sme.sk/futbalnet/z/obfz-bratislava-mesto/s/4058/vyhodnotenie/

// update the class names for the current year
let rounds = document.getElementsByClassName('sc-kOixdN hZwVte');

for (let i = 0; i < rounds.length; i++){
  // update the class names for the current year
  let round = rounds[i].querySelector("div.sc-gVKVSY").innerText;
  // update the class names for the current year
  let gamesRoots = rounds[i].getElementsByClassName('sc-LUDBL');
  for (let j = 0; j < gamesRoots.length; j++){
    let game = gamesRoots[j];
    let datetime = game.querySelector("div div div a").innerText;
    let team1 = game.querySelectorAll("div div div a div.sc-gWnPEt")[0].innerText;
    let team2 = game.querySelectorAll("div div div a div.sc-gWnPEt")[1].innerText;
    let result = game.querySelectorAll("div div div a div.sc-dmqUcu")[0].innerText;
    console.log(`${round}|${datetime}|${team1}|${result}|${team2}`);
  }
  console.log("");
}
