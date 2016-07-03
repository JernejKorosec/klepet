/* global io */
/* global geslo */

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

Klepet.prototype.spremeniKanal = function(kanal, geslo) {
  this.socket.emit('pridruzitevZahteva', {novKanal: kanal, novoGeslo: geslo});
};

Klepet.prototype.procesirajUkaz = function(ukaz) {
  var besede = ukaz.split(' ');
  ukaz = besede[0].substring(1, besede[0].length).toLowerCase();
  var sporocilo = false;

  switch(ukaz) {
    case 'pridruzitev':
      besede.shift();
      var data = besede.join(' '); // joina z spacei
      var kanal_in_geslo = data.split(" ");
      var theKanal = kanal_in_geslo[0];
      var parametri = theKanal.split('\"');
      var kanal_1 = parametri[1];
      var geslo_1 = '';
      if(kanal_in_geslo.length > 1){
        var theGeslo = kanal_in_geslo[1];  
        var parametri = theGeslo.split('\"');
        geslo_1 = parametri[1];
      }
      this.spremeniKanal(kanal_1,geslo_1);
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
      if (parametri) {
        this.socket.emit('sporocilo', { vzdevek: parametri[1], besedilo: parametri[3] });
        sporocilo = '(zasebno za ' + parametri[1] + '): ' + parametri[3];
      } else {
        sporocilo = 'Neznan ukaz';
      }
      break;
    default:
      sporocilo = 'Neznan ukaz.';
      break;
  };

  return sporocilo;
};
