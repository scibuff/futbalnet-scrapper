// https://ical.marudot.com/

// https://sportnet.sme.sk/futbalnet/k/sko-miloslavov/tim/51343/program/?sutaz=4058
const DEFAULT_YEAR = 2024;

// update the class names
let rounds = document.getElementsByClassName("sc-gVKVSY KkkUH");
let dates = document.getElementsByClassName("sc-jVcspg hypnpy");
let teams = document.getElementsByClassName("sc-HUqiv euIifc");

let numberOfRounds = rounds.length;

// update the locations/maps
let addresses = {};
addresses['ŠKO Miloslavov'] = {'street': 'Športová\\, 900 42 Miloslavov', 'url':'https://goo.gl/maps/g61cYWwF7U3sDi9p6'} 
addresses['ŠK Hamuliakovo'] = {'street': 'Topoľová 23\\, 900 43 Hamuliakovo', 'url':'https://goo.gl/maps/sBRkejY9H8D6GLkf6'} 
addresses['ŠK Kaplna'] = {'street': 'Kaplna\\, 90084 Kaplna', 'url':'https://goo.gl/maps/3Xp4CsB4zuFaNpuQA'} 
addresses['TJ Malinovo'] = {'street': 'Športová 324\\, 900 45 Malinovo', 'url':'https://goo.gl/maps/UiQFiZZrrwRU2jaJA'} 
addresses['Lokomotíva Devínska Nová Ves B'] = {'street': 'Vápencová 34\\, Bratislava - Devínska Nová Ves', 'url':'https://goo.gl/maps/69ETigeSbMqzUuBy6'} 
addresses['MFK Záhorská Bystrica'] = {'street': 'Tatranská\\, 841 06 Bratislava - Záhorská Bystrica', 'url':'https://goo.gl/maps/JZzvR6C9Lr6GB48G7'} 
addresses['FK Vajnory'] = {'street': 'Pri Struhe\\, 83107 Bratislava - Vajnory', 'url':'https://maps.app.goo.gl/AX8jo5GUC2Q4wSU47'} 
addresses['NŠK 1922 Bratislava B'] = {'street': 'Tomášikova 12444\\, 831 04 Bratislava', 'url':'https://goo.gl/maps/noX3fhSsKTREkmhF9'} 
addresses['FC Volkswagen Bratislava'] = {'street': 'Na Barine 11\\, 84103 Bratislava - Lamač', 'url':'https://goo.gl/maps/WBmFpkUyABXETqBDA'} 
addresses['MŠK Iskra Petržalka'] = {'street': 'Budatínska 59\\, 851 01 Bratislava - Petržalka', 'url':'https://goo.gl/maps/od8519jUCCvnaUzh6'} 
addresses['Š.Ú.R.'] = {'street': 'Hrubý Šúr\\, 90301 Hrubý Šúr', 'url':'https://maps.app.goo.gl/9y3RtstdciMrX9rs6'} 
addresses['OŠK Chorvátsky Grob'] = {'street': 'Obchodná\\, 900 25 Chorvátsky Grob', 'url':'https://maps.app.goo.gl/mcHPuzLCKBEGRSeA7'} 
addresses['ŠK Igram'] = {'street': 'Igram 180\\, 90084 Igram', 'url':'https://goo.gl/maps/S4mFtFUv3ssLGM7EA'} 
addresses['Futbalová komunita Kozmos'] = {'street': 'Račianska 105\\, 831 02 Bratislava', 'url':'https://goo.gl/maps/qCvuSS3mQQAmPgam6'} 
// addresses['ŠK Krasňany Bratislava'] = {'street': 'Pekná cesta 1968\\, Bratislava - Rača', 'url':'https://goo.gl/maps/7Z8QmrTpsttbRUWa6'} 

let events = [];
for (let i = 0; i < numberOfRounds; i++){
	let round = rounds[i].innerText.split(' - ')[1];

	let start = get_date(dates[i]);
	let end = get_date(dates[i]);
	end.setHours(end.getHours()+2);
	let team1 = teams[i * 2].innerText;
	let team2 = teams[i * 2 + 1].innerText;
	//console.log(round, start, end, team1, team2);
	//console.log(round, date_to_caldate(start), date_to_caldate(end), team1, team2);
	let created = date_to_caldate(new Date()) + 'Z';
	let uuid = (Math.random()).toString(36).substring(2) + "@miloslavov"
	let address = addresses[team1];
	let event = `BEGIN:VEVENT
DTSTAMP:${created}
UID:${uuid}
DTSTART;TZID=Europe/Berlin:${date_to_caldate(start)}
DTEND;TZID=Europe/Berlin:${date_to_caldate(end)}
SUMMARY:${round}
URL:${address.url}
DESCRIPTION:${team1} - ${team2}
LOCATION:${address.street}
BEGIN:VALARM
ACTION:DISPLAY
DESCRIPTION:${round}
TRIGGER:-P1D
END:VALARM
END:VEVENT`;
	events.push(event);
}

console.log(events.join('\n'));

function date_to_caldate(date){
  //return date.toISOString().replace(/[\-\.:]/g, '').substring(0,15)
  return date.getFullYear() 
    + (date.getMonth()+1).toString().padStart(2, '0') 
	+ date.getDate().toString().padStart(2, '0') 
	+ 'T' 
	+ date.getHours() 
	+ date.getMinutes().toString().padStart(2, '0') 
	+ '00'
  ;
}

function get_date(div){

  const text_parts = div.innerText.split(' ');
  const date_text = text_parts[0];
  const time_text = text_parts[1];

  let parts = date_text.split('.');
  const day = parseInt(parts[0]);
  const month = parseInt(parts[1]);
  const year = (parts.length == 2) ? DEFAULT_YEAR : parts[2];
  
  parts = time_text.split(':');
  const hour = parts[0];
  const min = parts[1];
  
  const d = new Date();
  d.setFullYear(year);
  d.setMonth(month - 1);
  d.setDate(day);
  d.setHours(hour);
  d.setMinutes(min);
  d.setSeconds(0);
  d.setMilliseconds(0);
  
  return d;
};
