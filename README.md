# Super spletna klepetalnica
# Navodila si dobil še naknadno
# Se nahajajo v poslani pdf datoteki
2\. domača naloga pri predmetu [Osnove informacijskih sistemov](https://ucilnica1516.fri.uni-lj.si/course/view.php?id=54) (navodila)

## Opis naloge in navodila

Na [GitHub](https://github.com) je na voljo javni repozitorij [https://github.com/lovre/klepet](https://github.com/lovre/klepet), ki vsebuje Node.js spletno klepetalnico predstavljeno na predavanjih in vajah. V okviru domače naloge ustvarite lastno kopijo repozitorija ter dopolnite obstoječo implementacijo spletne klepetalnice kot zahtevajo navodila. Domača naloga zahteva poznavanje GIT ukazov, HTML označb, CSS stilov, jezika JavaScript in Node.js tehnologije. Domača naloga ne zahteva veliko dela, a zahteva nekaj razmisleka. Pri delu **natančno sledite navodilom**!

Spletno povezavo na [GitHub](https://github.com) repozitorij podate kot `https://github.com/{študent}/klepet`, kjer _{študent}_ predstavlja vaše [GitHub](https://github.com) uporabniško ime. Spletno povezavo na uveljavitev v [GitHub](https://github.com) repozitoriju podate kot `https://github.com/{študent}/klepet/compare/{commit}`, kjer je _{commit}_ identifikator ustrezne uveljavitve. Le-tega pridobite na spletni strani [GitHub](https://github.com) repozitorija v zavihku _Commits_ pod _Code_, kjer je vsaki uveljavitvi pripisan SHA identifikator (uporabite možnost _Copy the full SHA_).

## Vzpostavitev okolja in repozitorija

Na [GitHub](https://github.com) z uporabo funkcije _Fork_ ustvarite lastno kopijo repozitorija [https://github.com/lovre/klepet](https://github.com/lovre/klepet) v okviru katere boste opravljali domačo nalogo. Kopija repozitorija naj ostane javna in naj ohrani ime _"klepet"_. Z uporabo podanih GIT ukazov v ukazni lupini razvojnega okolja [Cloud9](https://c9.io) vzpostavite lokalni repozitorij ter ustvarite veje razvoja _zasebna_, _slike_, _youtube_ in _dregljaj_ v okviru katerih boste reševali posamezne naloge. Na koncu vse spremembe uveljavite še v oddaljenem [GitHub](https://github.com) repozitoriju.

###### Kako naj rešujem?

```git
git clone (https://github.com/{študent}/klepet.git | git@github.com:{študent}/klepet.git)
git commit --allow-empty -m "Začetek dela na domači nalogi"
git checkout -b zasebna
git commit --allow-empty -m "Začetek dela na I. nalogi"
git checkout -b slike
git commit --allow-empty -m "Začetek dela na II. nalogi"
git checkout -b youtube
git commit --allow-empty -m "Začetek dela na III. nalogi"
git checkout -b dregljaj
git commit --allow-empty -m "Začetek dela na IV. nalogi"
git push --all
```

###### Kaj oddam na eUcilnici?
Spletno povezavo na ustvarjen [GitHub](https://github.com) repozitorij.

```
Repozitorij: https://github.com/{študent}/klepet
```

## I. Hitra zasebna sporočila

Spletna klepetalnica omogoča pošiljanje zasebnih sporočil le izbranemu uporabniku z uporabo ukaza `/zasebno`. Dopolnite implementacijo tako, da se ob pritisku na vzdevek uporabnika kanala izpisanem na desni strani klepetalnice v vnosno polje za sporočila doda predloga `/zasebno "{vzdevek}" `, kjer je _{vzdevek}_ vzdevek izbranega uporabnika. Za tem naj vnosno polje prevzame fokus spletne strani. Poleg tega poskrbite, da se miškin kazalec nad seznamom vzdevkov uporabnikov spremeni v kazalec za povezavo, dočim naj se ozadje trenutno izbranega uporabnika obarva sivo. Pri tem se zgledujte po implementaciji seznama kanalov na desni strani klepetalnice.

###### Kako naj rešujem?

Zahtevane spremembe implementirajte v predhodno ustvarjeni veji **_zasebna_**. Med delom lahko smiselno uveljavljajte spremembe v lokalnem in oddaljenem [GitHub](https://github.com) repozitoriju, dočim pa ob koncu spremembe uveljavite s sporočilom _"Zaključek dela na I. nalogi"_. V ta namen v ukazni lupini razvojnega okolja [Cloud9](https://c9.io) uporabite (vsaj) podane GIT ukaze.

```git
git checkout zasebna
...
git commit -a -m "Zaključek dela na I. nalogi"
git push origin zasebna
```

###### Kaj oddam na eUcilnici?
Spletno povezavo na zadnjo uveljavitev v [GitHub](https://github.com) repozitoriju v veji **_zasebna_** s sporočilom _"Zaključek dela na I. nalogi"_, ki vključuje vse zahtevane spremembe.

```
I. naloga: https://github.com/{študent}/klepet/compare/{commit}
```

## II. Deljenje slikovnih datotek

Dopolnite implementacijo spletne klepetalnice tako, da bo omogočala deljenje slikovnih datotek dostopnih preko spleta. V ta namen po vnosu sporočila uporabnika preverite ali le-to vsebuje povezave na slikovne datoteke. Predpostavite, da so to povezave, ki se začnejo z nizom `http://` ali `https://` ter končajo z nizom `.jpg`, `.png` ali `.gif`. V kolikor take povezave najdete poleg sporočila na kanalu dodajte ustrezno število HTML elementov `<img>` s povezavami na slikovne datoteke. Širina prikazanih slik naj bo `200px`, dočim naj bodo `20px` zamaknjene od levega roba. Pazite, da bodo slike prikazane tako pošiljatelju kot tudi prejemnikom.

###### Kako naj rešujem?

Zahtevane spremembe implementirajte v predhodno ustvarjeni veji **_slike_**. Med delom lahko smiselno uveljavljajte spremembe v lokalnem in oddaljenem [GitHub](https://github.com) repozitoriju, dočim pa ob koncu spremembe uveljavite s sporočilom _"Zaključek dela na II. nalogi"_. V ta namen v ukazni lupini razvojnega okolja [Cloud9](https://c9.io) uporabite (vsaj) podane GIT ukaze.

```git
git checkout slike
...
git commit -a -m "Zaključek dela na II. nalogi"
git push origin slike
```

###### Kaj oddam na eUcilnici?
Spletno povezavo na zadnjo uveljavitev v [GitHub](https://github.com) repozitoriju v veji **_slike_** s sporočilom _"Zaključek dela na II. nalogi"_, ki vključuje vse zahtevane spremembe.

```
II. naloga: https://github.com/{študent}/klepet/compare/{commit}
```

## III. Izmenjava YouTube posnetkov

Dopolnite implementacijo spletne klepetalnice tako, da bo omogočala enostavno izmenjavo in predvajanje YouTube posnetkov. V ta namen po vnosu sporočila uporabnika preverite ali le-to vsebuje povezave oblike `https://www.youtube.com/watch?v={video}`, kjer je _{video}_ identifikator YouTube posnetka. V kolikor take povezave najdete poleg sporočila na kanalu dodajte ustrezno število HTML elementov `<iframe src="https://www.youtube.com/embed/{video}" allowfullscreen></iframe>` s povezavami na ustrezne YouTube posnetke. Širina in višina prikazov naj bosta `200px` in `150px`, dočim naj bodo `20px` zamaknjeni od levega roba. Pazite, da bodo prikazi vidni tako pošiljatelju kot tudi prejemnikom.

###### Kako naj rešujem?

Zahtevane spremembe implementirajte v predhodno ustvarjeni veji **_youtube_**. Med delom lahko smiselno uveljavljajte spremembe v lokalnem in oddaljenem [GitHub](https://github.com) repozitoriju, dočim pa ob koncu spremembe uveljavite s sporočilom _"Zaključek dela na III. nalogi"_. V ta namen v ukazni lupini razvojnega okolja [Cloud9](https://c9.io) uporabite (vsaj) podane GIT ukaze.

```git
git checkout youtube
...
git commit -a -m "Zaključek dela na III. nalogi"
git push origin youtube
```

###### Kaj oddam na eUcilnici?
Spletno povezavo na zadnjo uveljavitev v [GitHub](https://github.com) repozitoriju v veji **_youtube_** s sporočilom _"Zaključek dela na III. nalogi"_, ki vključuje vse zahtevane spremembe.

```
III. naloga: https://github.com/{študent}/klepet/compare/{commit}
```

## IV. Pošiljanje dregljaja uporabniku

Dopolnite implementacijo spletne klepetalnice tako, da bo omogočala pošiljanje dregljaja, ki "zatrese" celotno vsebino spletne klepetalnice izbranega uporabnika. Na strani strežnika je funkcionalnost dregljajev že delno implementirana v okviru JavaScript funkcije `obdelajDregljaj()` v datoteki _lib/klepetalnica\_streznik.js_. Pri delu natančno sledite naslednjim štirim korakom.

1. V mapo _public/js_ dodajte JavaScript knjižnico za "tresenje" elementov spletne strani _jrumble.js_, ki jo prenesite iz spletnega mesta [https://jackrugile.com/jrumble/](https://jackrugile.com/jrumble/). Spletni strani klepetalnice dodajte povezavo na JavaScript knjižnico _jrumble.js_ ter pa navodilo za uporabo funkcionalnosti dregljajev kot `Pošiljanje dregljaja: /dregljaj [vzdevek]`.
2. Dopolnite implementacijo klepetalnice na strani odjemalca tako, da se ob uporabi ukaza `/dregljaj` na kanal `dregljaj` kot atribut `vzdevek` posreduje vzdevek uporabnika, ki naj bi dregljaj prejel. Pošiljatelj dregljaja naj v primeru uspeha prejme sporočilo `Dregljaj za {vzdevek}`, kjer je _{vzdevek}_ vzdevek prejemnika, sicer pa sporočilo `Neznan ukaz`.
3. Dopolnite implementacijo klepetalnice na strani odjemalca tako, da se bo ob prejetju sporočila na kanalu `dregljaj` "zatresla" vsebina spletne klepetalnice. V ta namen nad HTML elementom z identifikatorjem `vsebina` najprej uporabite JavaScript funkcijo `jrumble()`, nato pa pričnite s "tresenjem" z uporabo funkcije `trigger('startRumble')`. "Tresenje" ustavite z uporabo funkcije `trigger('stopRumble')`, ki naj se izvede sekundo in pol kasneje.
4. Dopolnite implementacijo klepetalnice na strani strežnika tako, da onemogočite pošiljanje dregljajev samemu sebi.

###### Kako naj rešujem?

Zahtevane spremembe implementirajte v predhodno ustvarjeni veji **_dregljaj_**. Med delom lahko smiselno uveljavljajte spremembe v lokalnem in oddaljenem [GitHub](https://github.com) repozitoriju, dočim pa ob koncu spremembe uveljavite s sporočilom _"Zaključek dela na IV. nalogi"_. V ta namen v ukazni lupini razvojnega okolja [Cloud9](https://c9.io) uporabite (vsaj) podane GIT ukaze.

```git
git checkout dregljaj
...
git commit -a -m "Zaključek dela na IV. nalogi"
git push origin dregljaj
```

###### Kaj oddam na eUcilnici?
Spletno povezavo na zadnjo uveljavitev v [GitHub](https://github.com) repozitoriju v veji **_dregljaj_** s sporočilom _"Zaključek dela na IV. nalogi"_, ki vključuje vse zahtevane spremembe.

```
IV. naloga: https://github.com/{študent}/klepet/compare/{commit}
```

## V. Združevanje sprememb v repozitoriju

Z uporabo GIT ukazov v ukazni lupini razvojnega okolja [Cloud9](https://c9.io) veje razvoja _zasebna_, _slike_, _youtube_ in _dregljaj_ združite v vejo _master_. Pri tem pazite, da samih vej ne izbrišete. Na koncu v repozitorij dodajte še Markdown datoteko _avtorstvo.md_, ki naj vsebuje podano vsebino.

```markdown
Študent z vpisno številko _{vpisna}_ potrjujem, da sem __edini avtor__ oddane domače naloge.
```

###### Kako naj rešujem?

Zahtevane spremembe implementirajte v veji **_master_**. Med delom lahko smiselno uveljavljajte spremembe v lokalnem in oddaljenem [GitHub](https://github.com) repozitoriju, dočim pa ob koncu spremembe uveljavite s sporočilom _"Zaključek dela na domači nalogi"_. V ta namen v ukazni lupini razvojnega okolja [Cloud9](https://c9.io) uporabite (vsaj) podane GIT ukaze.

```git
git checkout master
...
git commit -a -m "Zaključek dela na domači nalogi"
git push origin master
```

###### Kaj oddam na eUcilnici?
Spletno povezavo na zadnjo uveljavitev v [GitHub](https://github.com) repozitoriju v veji **_master_** s sporočilom _"Zaključek dela na domači nalogi"_, ki vključuje vse zahtevane spremembe.

```
V. naloga: https://github.com/{študent}/klepet/compare/{commit}
```
