const puppeteer = require('puppeteer'),
      validateDate = require('../validation/validation'),
      hotelId = 5462;

function getRooms() {
  return Array.from(document.querySelectorAll('.colExcerpt')).map(element => {
    let room = {},
        roomDiv = element.querySelector('.roomExcerpt');

    room.name = roomDiv.querySelector('h5 > a').textContent
    room.images = Array.from(element.querySelectorAll('.slide a')).map(a => a.href)
    room.description = roomDiv.querySelector('p > a.description').textContent
    room.price = (roomDiv.querySelector('div.sincePriceContent > h6 ').textContent) ? roomDiv.querySelector('div.sincePriceContent > h6 ').textContent : 'Verifique as restrições do tarifário'
    return room;
  })
}


async function startCrawler(params) {

  if(!validateDate(params)) return false

  var checkIn = params.checkIn.replace(/\//g, '')
      checkOut = params.checkOut.replace(/\//g, '')

  const browser = await puppeteer.launch(),
        page = await browser.newPage();


  await page.goto(`https://myreservations.omnibees.com/default.aspx?q=${hotelId}&version=MyReservation#/&diff=false&CheckIn=${checkIn}&CheckOut=${checkOut}&Code=&group_code=&loyality_card=&NRooms=1&ad=1&ch=0&ag=-`, {waitUntil: 'networkidle0'});

  const rooms = await page.evaluate(getRooms);

  await browser.close();

  return rooms

}


module.exports = startCrawler
