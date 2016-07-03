var socketio = require('socket.io');
var io;
var stevilkaGosta = 1;
var vzdevkiGledeNaSocket = {};
var uporabljeniVzdevki = [];
var trenutniKanal = {};
var availableRooms = []; // VSI KANALI
var roomPasswords = {};  // VSA GESLA PO KANALIH

exports.listen = function(streznik) {
  io = socketio.listen(streznik);
  io.set('log level', 1);
  io.sockets.on('connection', function (socket) {
    stevilkaGosta = dodeliVzdevekGostu(socket, stevilkaGosta, vzdevkiGledeNaSocket, uporabljeniVzdevki);
    pridruzitevKanalu1(socket, 'Skedenj');
    obdelajPosredovanjeSporocila(socket, vzdevkiGledeNaSocket);
    obdelajDregljaj(socket, vzdevkiGledeNaSocket);
    obdelajZahtevoZaSprememboVzdevka(socket, vzdevkiGledeNaSocket, uporabljeniVzdevki);
    obdelajPridruzitevKanalu(socket);
    socket.on('kanali', function() {
      socket.emit('kanali', {sobe: io.sockets.manager.rooms, sobeGesla:roomPasswords});
    });
    socket.on('uporabniki', function(kanal) {
      var uporabnikiNaKanalu = io.sockets.clients(kanal.kanal);
      var uporabniki = [];
      for (var i=0; i < uporabnikiNaKanalu.length; i++) {
        uporabniki[i] = vzdevkiGledeNaSocket[uporabnikiNaKanalu[i].id];
      }
      socket.to(kanal.kanal).emit('uporabniki', uporabniki);
    });
    obdelajOdjavoUporabnika(socket, vzdevkiGledeNaSocket, uporabljeniVzdevki);
  });
};

function dodeliVzdevekGostu(socket, stGosta, vzdevki, uporabljeniVzdevki) {
  var vzdevek = 'Gost' + stGosta;
  vzdevki[socket.id] = vzdevek;
  socket.emit('vzdevekSpremembaOdgovor', {
    uspesno: true,
    vzdevek: vzdevek
  });
  uporabljeniVzdevki.push(vzdevek);
  return stGosta + 1;
}

function pridruzitevKanalu1(socket, kanal) {
  if(getKanalIndex(availableRooms, kanal) >0){  //FIXME:uporabi drugo funkcijo namesto getKanalIndex
    pridruzitevKanalu(socket, kanal,null);
  }else{
    availableRooms.push(kanal);
    roomPasswords[kanal] === null;
    pridruzitevKanalu(socket, kanal,null);
  }
}

function pridruzitevKanalu(socket, kanal,geslo) {
  socket.join(kanal);
  trenutniKanal[socket.id] = kanal;
  socket.emit('pridruzitevOdgovor', {kanal: kanal, geslo: geslo}); 
  socket.broadcast.to(kanal).emit('sporocilo', {
    besedilo: vzdevkiGledeNaSocket[socket.id] + ' se je pridružil kanalu ' + kanal + '.'
  });

  var uporabnikiNaKanalu = io.sockets.clients(kanal);
  if (uporabnikiNaKanalu.length > 1) {
    var uporabnikiNaKanaluPovzetek = 'Trenutni uporabniki na kanalu ' + kanal + ': ';
    for (var i in uporabnikiNaKanalu) {
      var uporabnikSocketId = uporabnikiNaKanalu[i].id;
      if (uporabnikSocketId != socket.id) {
        if (i > 0) {
          uporabnikiNaKanaluPovzetek += ', ';
        }
        uporabnikiNaKanaluPovzetek += vzdevkiGledeNaSocket[uporabnikSocketId];
      }
    }
    uporabnikiNaKanaluPovzetek += '.';
    socket.emit('sporocilo', {besedilo: uporabnikiNaKanaluPovzetek});
  }
}

function obdelajZahtevoZaSprememboVzdevka(socket, vzdevkiGledeNaSocket, uporabljeniVzdevki) {
  socket.on('vzdevekSpremembaZahteva', function(vzdevek) {
    if (vzdevek.indexOf('Gost') == 0) {
      socket.emit('vzdevekSpremembaOdgovor', {
        uspesno: false,
        sporocilo: 'Vzdevki se ne morejo začeti z "Gost".'
      });
    } else {
      if (uporabljeniVzdevki.indexOf(vzdevek) == -1) {
        var prejsnjiVzdevek = vzdevkiGledeNaSocket[socket.id];
        var prejsnjiVzdevekIndeks = uporabljeniVzdevki.indexOf(prejsnjiVzdevek);
        uporabljeniVzdevki.push(vzdevek);
        vzdevkiGledeNaSocket[socket.id] = vzdevek;
        delete uporabljeniVzdevki[prejsnjiVzdevekIndeks];
        socket.emit('vzdevekSpremembaOdgovor', {
          uspesno: true,
          vzdevek: vzdevek
        });
        socket.broadcast.to(trenutniKanal[socket.id]).emit('sporocilo', {
          besedilo: prejsnjiVzdevek + ' se je preimenoval v ' + vzdevek + '.'
        });
      } else {
        socket.emit('vzdevekSpremembaOdgovor', {
          uspesno: false,
          sporocilo: 'Vzdevek je že v uporabi.'
        });
      }
    }
  });
}

function obdelajPosredovanjeSporocila(socket) {
  socket.on('sporocilo', function (sporocilo) {
    if (sporocilo.kanal) {
      socket.broadcast.to(sporocilo.kanal).emit('sporocilo', {besedilo: vzdevkiGledeNaSocket[socket.id] + ': ' + sporocilo.besedilo});
    } else if (sporocilo.vzdevek) {
      var socketIdNaslovnika = null;
      for (var id in vzdevkiGledeNaSocket) {
       if (sporocilo.vzdevek == vzdevkiGledeNaSocket[id]) {
         socketIdNaslovnika = id;
         break;
       }
      }
      if (socketIdNaslovnika) {
       if (socketIdNaslovnika == socket.id) {
         io.sockets.sockets[socket.id].emit('sporocilo', {besedilo: "Sporočila '" + sporocilo.besedilo + "' uporabniku z vzdevkom '" + sporocilo.vzdevek + "' ni bilo mogoče posredovati."});
       } else {
         io.sockets.sockets[socketIdNaslovnika].emit('sporocilo', {besedilo: vzdevkiGledeNaSocket[socket.id] + ' (zasebno): ' + sporocilo.besedilo});
       }
      } else {
       io.sockets.sockets[socket.id].emit('sporocilo', {besedilo: "Sporočila '" + sporocilo.besedilo + "' uporabniku z vzdevkom '" + sporocilo.vzdevek + "' ni bilo mogoče posredovati."});
      }
    }
  });
}

function obdelajDregljaj(socket) {
  socket.on('dregljaj', function (dregljaj) {
    if (dregljaj.vzdevek) {
      var socketIdNaslovnika = null;
      for (var id in vzdevkiGledeNaSocket) {
       if (dregljaj.vzdevek == vzdevkiGledeNaSocket[id]) {
         socketIdNaslovnika = id;
         break;
       }
      }
      if (socketIdNaslovnika) {
       io.sockets.sockets[socketIdNaslovnika].emit('dregljaj', { dregljaj: true });
      } else {
       io.sockets.sockets[socket.id].emit('sporocilo', {
         besedilo: "Dregljaja uporabniku z vzdevkom '" + dregljaj.vzdevek + "' ni bilo mogoče posredovati."
       });
      }
    }
  });
}

function getKanalIndex(arr, kanal){
var i = arr.indexOf(kanal);
	if(i === -1){
	  return -1;
	}
	else
	{
	  return 1;
	}
}

function jeGesloPravo(kanal, geslo){
  if(undefined !== roomPasswords[kanal])
  {
    if(roomPasswords[kanal] === geslo)
    {
      return true;
    }
    else
    {
      return false;
    }
  }
  else
  {
    return false;
  }
}

function kanalObstajaInPotrebujeGeslo(kanal, geslo){
  // ALI KANAL OBSTAJA
  if(getKanalIndex(availableRooms, kanal) > 0)
  {
    // ALI IMA KANAL VNOS V ARRAYU GESEL
    if(roomPasswords[kanal] != null){
        if(roomPasswords[kanal].length > 0)
        {
          return true;
        }
        else 
        {
          return false;
        }
    }
    else
    {
      return false;
    }
  }
  else
  {
    return false;
  }
}

function jeGesloZaKanalPodano(data){
  if(data.novoGeslo != null){
      if(data.novoGeslo.length > 0) return true;
      else return false;
  }
  else
  return false;
}

function aliKanalObstaja(arr, kanal){
  var i = arr.indexOf(kanal);
    if(i === -1){
      return false;
    }
    else
    {
      return true;
    }
}

function obdelajPridruzitevKanalu(socket) {
  socket.on('pridruzitevZahteva', function(data) 
    {
      var theKanal = data.novKanal;
      var theGeslo = data.novoGeslo;
      var jeUporabnikPodalGeslo = jeGesloZaKanalPodano(data);
      var jePravoGeslo = jeGesloPravo(theKanal, theGeslo);
      var kanalPotrebujeGesloInObstaja = kanalObstajaInPotrebujeGeslo(theKanal, theGeslo);
      var kanalObstaja = aliKanalObstaja(availableRooms, theKanal);

      if(kanalObstaja)
      // KANAL ŽE OBSTAJA (Najde ga v arrayu kanalov)
      {
        if(kanalPotrebujeGesloInObstaja)
        // POTEBUJE GESLO
        {
          if(jeUporabnikPodalGeslo)
          // ALI JE UPORABNIK PODAL GESLO
          {
            if(jePravoGeslo)
            // UPORABNIK JE PODAL GESLO IN JE PRAVO
            {
              io.sockets.sockets[socket.id].emit('sporocilo', {besedilo: 'Pridružitev kriptiranemu kanalu '+ theKanal + ' uspešna!'}); // Sam seb ne more poslat.
              socket.leave(trenutniKanal[socket.id]);     
              pridruzitevKanalu(socket, theKanal, theGeslo);
            }
            // UPORABNIK JE PODAL GESLO IN NI PRAVO
            else
            {
              io.sockets.sockets[socket.id].emit('sporocilo', {besedilo: 'Pridružitev v kanal '+ theKanal + ' ni bilo uspešno, ker je geslo napačno!'}); 
            }
          }
          // KANAL GA POTEBUJE UPORABNIK GA NI VNESEL
          else
          {
              io.sockets.sockets[socket.id].emit('sporocilo', {besedilo: 'Pridružitev v kanal '+ theKanal + ' ni bilo uspešno, ker je geslo napačno!'}); 
          }
        }
        // NE POTEBUJE GESLA
        else
        {
          if(jeUporabnikPodalGeslo)
          // ALI JE UPORABNIK PODAL GESLO
          {
          io.sockets.sockets[socket.id].emit('sporocilo', {besedilo: "Izbrani kanal " + theKanal + ' je prosto dostopen in ne zahteva prijave z geslom, zato se prijavite z uporabo /pridruzitev "' + theKanal + '" ali zahtevajte kreiranje kanala z drugim imenom.'}); // Sam seb ne more poslat.
          }
          else
          // ČE GA NI PODAL IN GA KANAL NE ZAHTEVA GA PRIDRUŽI
          {
            socket.leave(trenutniKanal[socket.id]);
            pridruzitevKanalu1(socket, theKanal);
          }
        }
      }
      // KANAL NE OBSTAJA (Ga dejansko ne najde v arrayu kanalov)
      else
      {
        io.sockets.sockets[socket.id].emit('sporocilo', {besedilo: "Izbrani kanal " + theKanal + " še ne obstaja. Ustvarjam Kanal."}); // Sam seb ne more poslat.
        // DODAMO KANAL KER JE NOV
        availableRooms.push(theKanal);
        
        if(jeUporabnikPodalGeslo)
        // ALI JE UPORABNIK ZAHTEVAL DODELITEV GESLA ZA NOV KANAL
        {
        io.sockets.sockets[socket.id].emit('sporocilo', {besedilo: "Kriptiram kanal " + theKanal + " z geslom."}); // Sam seb ne more poslat.
          // UPORABNIK JE ZAHTEVAL GESLO ZA KANAL ZATO GA DODAMO
          roomPasswords[theKanal] = theGeslo;
          //PRIDRUŽI SE KANALU
          socket.leave(trenutniKanal[socket.id]);
          pridruzitevKanalu(socket, theKanal, theGeslo); 
        }
        // UPORABNIK BO NAREDIL KANAL BREZ GESLA
        else
        {
          // PRIDRUŽI SE KANALU BREZ GESLA
          socket.leave(trenutniKanal[socket.id]);
          pridruzitevKanalu1(socket, theKanal);
        }
      }
    }
  );
}

function obdelajOdjavoUporabnika(socket) {
  socket.on('odjava', function() {
    var vzdevekIndeks = uporabljeniVzdevki.indexOf(vzdevkiGledeNaSocket[socket.id]);
    delete uporabljeniVzdevki[vzdevekIndeks];
    delete vzdevkiGledeNaSocket[socket.id];
  });
}
