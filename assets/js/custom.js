
document.addEventListener('DOMContentLoaded', function () {

  
  const forma = document.getElementById('kontaktuForma');
  if (!forma) {
    return;
  }


  const siustiMygtukas = document.getElementById('siustiMygtukas');
  const isvalytiMygtukas = document.getElementById('isvalytiMygtukas');
  const rezultatai = document.getElementById('formosRezultatai');

  const vardas = document.getElementById('vardas');
  const pavarde = document.getElementById('pavarde');
  const elPastas = document.getElementById('elPastas');
  const telefonas = document.getElementById('telefonas');
  const adresas = document.getElementById('adresas');
  const klausimas1 = document.getElementById('klausimas1');
  const klausimas2 = document.getElementById('klausimas2');
  const klausimas3 = document.getElementById('klausimas3');

  // Visi privalomi laukai viename masyve
  const visiLaukai = [vardas, pavarde, elPastas, telefonas, adresas, klausimas1, klausimas2, klausimas3];


  
  const tikRaides = /^\p{L}+$/u;                      
  const elPastoFormatas = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
  const telefonoFormatas = /^\+370 6\d{2} \d{5}$/;    

  
  function rastiKlaida(laukas) {
    const reiksme = laukas.value.trim();

    
    if (reiksme === '') {
      return 'Šis laukas privalomas.';
    }

    
    if (laukas === vardas || laukas === pavarde) {
      if (!tikRaides.test(reiksme)) {
        return 'Galima įvesti tik raides.';
      }
    }

    
    if (laukas === elPastas) {
      if (!elPastoFormatas.test(reiksme)) {
        return 'Neteisingas el. pašto formatas (pvz. vardas@pastas.lt).';
      }
    }

    
    if (laukas === telefonas) {
      if (!telefonoFormatas.test(reiksme)) {
        return 'Numeris turi būti formatu +370 6xx xxxxx.';
      }
    }

    
    if (laukas === klausimas1 || laukas === klausimas2 || laukas === klausimas3) {
      const skaicius = Number(reiksme);
      if (!Number.isInteger(skaicius) || skaicius < 1 || skaicius > 10) {
        return 'Įveskite sveiką skaičių nuo 1 iki 10.';
      }
    }

    return '';
  }

  
  function rodytiKlaida(laukas) {
    const klaida = rastiKlaida(laukas);
    const klaidosTekstas = laukas.nextElementSibling; 

    if (klaida === '') {
      laukas.classList.remove('is-invalid');
      laukas.classList.add('is-valid');
      klaidosTekstas.textContent = '';
    } else {
      laukas.classList.remove('is-valid');
      laukas.classList.add('is-invalid');
      klaidosTekstas.textContent = klaida;
    }
  }

  
  function atnaujintiMygtuka() {
    let visiGeri = true;

    for (const laukas of visiLaukai) {
      if (rastiKlaida(laukas) !== '') {
        visiGeri = false;
      }
    }

    siustiMygtukas.disabled = !visiGeri;
  }


  
  function formatuotiTelefona() {
    let tekstas = telefonas.value;

    
    if (tekstas.startsWith('+370')) {
      tekstas = tekstas.slice(4);
    }

    
    let skaitmenys = tekstas.replace(/\D/g, '');

    
    skaitmenys = skaitmenys.slice(0, 8);

    
    if (skaitmenys === '') {
      telefonas.value = '';
      return;
    }

    
    let rezultatas = '+370 ' + skaitmenys.slice(0, 3);
    if (skaitmenys.length > 3) {
      rezultatas = rezultatas + ' ' + skaitmenys.slice(3);
    }

    telefonas.value = rezultatas;
  }


 
  for (const laukas of visiLaukai) {
    laukas.addEventListener('input', function () {
      if (laukas === telefonas) {
        formatuotiTelefona();
      }
      rodytiKlaida(laukas);
      atnaujintiMygtuka();
    });
  }

  
  forma.addEventListener('submit', function (ivykis) {
    
    ivykis.preventDefault();

    
    const duomenys = {
      vardas: vardas.value.trim(),
      pavarde: pavarde.value.trim(),
      elPastas: elPastas.value.trim(),
      telefonas: telefonas.value.trim(),
      adresas: adresas.value.trim(),
      klausimas1: Number(klausimas1.value),
      klausimas2: Number(klausimas2.value),
      klausimas3: Number(klausimas3.value)
    };

    
    console.log(duomenys);

    
    const vidurkis = (duomenys.klausimas1 + duomenys.klausimas2 + duomenys.klausimas3) / 3;

    
    const eilutes = [
      'Vardas: ' + duomenys.vardas,
      'Pavardė: ' + duomenys.pavarde,
      'El. paštas: ' + duomenys.elPastas,
      'Tel. numeris: ' + duomenys.telefonas,
      'Adresas: ' + duomenys.adresas,
      '1 klausimas: ' + duomenys.klausimas1,
      '2 klausimas: ' + duomenys.klausimas2,
      '3 klausimas: ' + duomenys.klausimas3
    ];

    rezultatai.innerHTML = '';   

    const antraste = document.createElement('h4');
    antraste.textContent = 'Pateikti duomenys';
    rezultatai.appendChild(antraste);

    for (const tekstas of eilutes) {
      const p = document.createElement('p');
      p.textContent = tekstas;
      rezultatai.appendChild(p);
    }

    
    const vidurkioEilute = document.createElement('p');
    vidurkioEilute.className = 'vidurkis';
    vidurkioEilute.textContent = duomenys.vardas + ' ' + duomenys.pavarde + ': ' + vidurkis.toFixed(2);
    rezultatai.appendChild(vidurkioEilute);
  });

  
  isvalytiMygtukas.addEventListener('click', function () {
    forma.reset();               
    rezultatai.innerHTML = '';   

    for (const laukas of visiLaukai) {
      laukas.classList.remove('is-invalid', 'is-valid');   
      laukas.nextElementSibling.textContent = '';          
    }

    siustiMygtukas.disabled = true;   
  });

});
