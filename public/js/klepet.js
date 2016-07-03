var Klepet = function(socket) {
  this.socket = socket;
};

Klepet.prototype.posljiSporocilo = function(kanal, besedilo) {
  var sporocilo = {
    kanal: kanal,
    besedilo: besedilo
  };
  this.socket.emit('sporocilo', sporocilo);
};

Klepet.prototype.spremeniKanal = function(kanal) {
  this.socket.emit('pridruzitevZahteva', {
    novKanal: kanal
  });
};

Klepet.prototype.procesirajUkaz = function(ukaz) {
  var besede = ukaz.split(' ');
  ukaz = besede[0].substring(1, besede[0].length).toLowerCase();
  var sporocilo = false;

  switch(ukaz) {
    case 'pridruzitev':
      besede.shift();
      var kanal = besede.join(' ');
      this.spremeniKanal(kanal);
      break;
    case 'vzdevek':
      besede.shift();
      var vzdevek = besede.join(' ');
      this.socket.emit('vzdevekSpremembaZahteva', vzdevek);
      break;
    case 'zasebno':
      besede.shift();
      var besedilo = besede.join(' ');
      var parametri = besedilo.split('\"');
      var naslovniki = parametri[1].split(',');
      for(var i=0, len=naslovniki.length; i < len; i++)			
      {
          if (naslovniki[i]) {
          this.socket.emit('sporocilo', { vzdevek: naslovniki[i], besedilo: parametri[3] });  
          if(len>1){
            if(i==0) sporocilo = '(zasebno za ' + naslovniki[i] + '): ' + parametri[3];
            else     sporocilo += '<br>(zasebno za ' + naslovniki[i] + '): ' + parametri[3];
          }
          else{
          sporocilo = '(zasebno za ' + naslovniki[i] + '): ' + parametri[3];
          }
          
        } else {
          sporocilo = 'Neznan ukaz';
        }
      }
      break;
    default:
      sporocilo = 'Neznan ukaz.';
      break;
  };

  return sporocilo;
};
