const f = document.getElementById('form');
f.addEventListener('submit', (e) => {
    e.preventDefault();
    data();
    saveData();

    document.getElementById('nama').value = '';
    document.getElementById('email').value = '';
})


function data() {
    const nama = document.getElementById('nama').value;
    const email = document.getElementById('email').value;
    const idKu = id();
    const waktuKu = waktu()
    const a = objectData(nama,email,idKu,waktuKu);
    database.push(a);

    document.dispatchEvent(new Event(DATA_ORANG));
    saveData()
}

function id() {
    return +new Date();
}

function waktu() {
    return new Date().toLocaleDateString();
}

function objectData(nama,email,id,waktu) {
    return {
        nama,
        email,
        id,
        waktu,
    }
}


const database = [];
const DATA_ORANG = 'data';
console.log(database)

function cari2(okay) {
    for(u of database) {
        if(u.id === okay) {
            return u;
        }
    }
}

function tampilkan(ok) {
    const n1 = document.createElement('h3');
    const e1 = document.createElement('h3');
    const w1 = document.createElement('h5');
    n1.innerHTML = `Nama: ${ok.nama}`;
    e1.innerHTML = `Email: ${ok.email}`;
    w1.innerHTML = `Tanggal dibuat ${ok.waktu}`;

    const m = document.getElementById('main');

    // membuat div baru
    const d1 = document.createElement('div');
    d1.setAttribute('id',`${ok.id}`);
    d1.classList.add('ubah');
    m.classList.add('ubahMain');
    m.append(d1);
    d1.append(n1,e1,w1);

    // membuat tombol hapus
    const hapusData = document.createElement('button');
    hapusData.setAttribute('type','button');
    hapusData.classList.add('hapus');
    hapusData.appendChild(document.createTextNode('Hapus'))
    d1.append(hapusData);

    hapusData.addEventListener('click', () => {
        hapus(ok.id);
    })

    // membuat tombol edit
    const editData = document.createElement('button');
    editData.appendChild(document.createTextNode('Edit'));
    editData.setAttribute('type', 'button');
    editData.classList.add('edit1');
    d1.append(editData);

    editData.addEventListener('click', () => {
        editDataBase(ok.id);  
        const h = document.querySelector('.form2');
        h.classList.add('form10');
        const c = document.getElementById('edit');
        c.classList.add('over')
        const j = document.getElementById('canvas');
        j.classList.add('hapusJam')
    })
    return d1;
}

document.addEventListener(DATA_ORANG, function() {
    const m1 = document.getElementById('main');
    m1.innerHTML = '';
    for(let d of database) {
        const t = tampilkan(d);
        m1.append(t)
    }
})

function hapus(yaaa) {
    const k = cari1(yaaa);
    if(k === -1) return;
    database.splice(k, 1);
    document.dispatchEvent(new Event(DATA_ORANG));
    saveData()
}

function cari1(ya) {
    for(iya in database) {
        if(database[iya].id === ya ) {
            return iya;
        }
    }
    return -1;
}

function editDataBase(siap) {
    const t = cari2(siap);
    if(t === null) return;

    const v = document.getElementById('edit');
    v.classList.toggle('hidden')
    v.innerHTML =`<form action="" class="form2">
    <label for="nama">Nama</label><br>
    <input type="text" name="nama" id="nama2" value = ${t.nama}><br><br>
    <label for="email">Email</label><br>
    <input type="email" name="email" id="email2" value = ${t.email}><br><br>
    <button type="submit" id ="editData">Edit data</button>
    <button type="button" id="cancel">Cancel</button>
    </form>`
    const z = document.querySelector('.form2');
    z.addEventListener('submit', (e) => {
        e.preventDefault();
        v.classList.add('hidden');
        const a = document.getElementById('canvas');
        a.classList.remove('hapusJam')
        editData2(siap);
    })
    
    const m = document.getElementById('cancel');
    m.addEventListener('click', () => {
        v.classList.add('hidden');
        const a = document.getElementById('canvas');
        a.classList.remove('hapusJam')
    })
    saveData()
}

function editData2(id) {
    const q = cari2(id);

    if(q === null) return;
    const n3 = document.getElementById('nama2').value;
    const e3 = document.getElementById('email2').value;
    q.nama = n3;
    q.email = e3;

    document.dispatchEvent(new Event(DATA_ORANG));
    saveData()
}


// membuat fitur jam
// window.toLocaleDateString("jam()" ,1000)

// function jam() {
//     const a = new Date();
//     setTimeout("jam()" ,1000)
//     const p = document.getElementById('kotak');
//     p.innerHTML =` ${a.getHours()} : ${a.getMinutes()} : ${a.getSeconds()}`;
// }

// membuat fitur jam

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let radius = canvas.height / 2;
ctx.translate(radius, radius);
radius = radius * 0.90
setInterval(drawClock, 1000);

function drawClock() {
  drawFace(ctx, radius);
  drawNumbers(ctx, radius);
  drawTime(ctx, radius);
}

function drawFace(ctx, radius) {
  let grad;
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, 2*Math.PI);
  ctx.fillStyle = 'white';
  ctx.fill();
  grad = ctx.createRadialGradient(0,0,radius*0.95, 0,0,radius*1.05);
  grad.addColorStop(0, '#333');
  grad.addColorStop(0.5, 'white');
  grad.addColorStop(1, '#333');
  ctx.strokeStyle = grad;
  ctx.lineWidth = radius*0.1;
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, 0, radius*0.1, 0, 2*Math.PI);
  ctx.fillStyle = '#333';
  ctx.fill();
}

function drawNumbers(ctx, radius) {
  let ang;
  let num;
  ctx.font = radius*0.15 + "px arial";
  ctx.textBaseline="middle";
  ctx.textAlign="center";
  for(num = 1; num < 13; num++){
    ang = num * Math.PI / 6;
    ctx.rotate(ang);
    ctx.translate(0, -radius*0.85);
    ctx.rotate(-ang);
    ctx.fillText(num.toString(), 0, 0);
    ctx.rotate(ang);
    ctx.translate(0, radius*0.85);
    ctx.rotate(-ang);
  }
}

function drawTime(ctx, radius){
    let now = new Date();
    let hour = now.getHours();
    let minute = now.getMinutes();
    let second = now.getSeconds();
    //hour
    hour=hour%12;
    hour=(hour*Math.PI/6)+
    (minute*Math.PI/(6*60))+
    (second*Math.PI/(360*60));
    drawHand(ctx, hour, radius*0.5, radius*0.07);
    //minute
    minute=(minute*Math.PI/30)+(second*Math.PI/(30*60));
    drawHand(ctx, minute, radius*0.8, radius*0.07);
    // second
    second=(second*Math.PI/30);
    drawHand(ctx, second, radius*0.9, radius*0.02);
}

function drawHand(ctx, pos, length, width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0,0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
}

  function saveData() {
    if (cek()) {
      const parsed = JSON.stringify(database);
      localStorage.setItem(STORAGE_KEY, parsed);
      document.dispatchEvent(new Event(SAVED_EVENT));
    }
  }

  const SAVED_EVENT = 'saved-books';
  const STORAGE_KEY = 'BOOK_APPS';  
  function cek() {
    if (typeof (Storage) === undefined) {
      alert('Browser kamu tidak mendukung local storage');
      return false;
    }
    return true;
  }

  document.addEventListener(SAVED_EVENT, function () {
    console.log(localStorage.getItem(STORAGE_KEY));
  });

  function loadDataFromStorage() {
    const serializedData = localStorage.getItem(STORAGE_KEY);
    let data = JSON.parse(serializedData);
   
    if (data !== null) {
      for (const booksss of data) {
        database.push(booksss);
      }
    }
   
    document.dispatchEvent(new Event(DATA_ORANG));
  }

  if (cek()) {
    loadDataFromStorage();
  }
