'use strict';

{
  let cnt = 0;
  function setWord() {
    word = words.splice(Math.floor(Math.random() * words.length), 1)[0];
    target.textContent = word;
    loc = 0;
    cnt = 0;
  }

  // const words = [
  //   'kamehameha',
  //   'gyarikkuhou',
  //   'dodonpa',
  //   'haaaaaaaaaaaa',
  // ];

  const words = [
    'kamehameha',
    'gyarikkuhou',
    'dodonpa',
    'haaaaaaaaaaaa',
    'genkidama',
    'masenkou',
    'desubi-mu',
    'kaiouken',
  ];


  // const words = [
  //   'red',

  // ];

  let word;
  let loc = 0;
  let startTime;
  let isPlaying = false;
  let misscount = 0;

  const target = document.getElementById('target');
  const title = document.getElementById('title');
  const click = document.getElementById('click');
  const crear1 = document.getElementById('crear1');
  const crear2 = document.getElementById('crear2');
  const furiza = document.getElementById('furiza');
  const goku = document.getElementById('goku');
  const kamehameha = document.getElementById('kamehameha');
  const bakuhatu = document.getElementById('bakuhatu');
  const kidan = document.getElementById('kidan');
  const warai = document.getElementById('warai');
  const gokuwin = document.getElementById('gokuwin');
  const spgoku = document.getElementById('spgoku');
  const furufuri = document.getElementById('furufuri');
  const lifeBar_goku = document.getElementById('life_goku')
  const lifeBar_furiza = document.getElementById('life_furiza')
  const gage = document.getElementById('gage')
  const background = document.getElementById('background')
  const message1 = document.getElementById("message1");
  const message2 = document.getElementById("message2");
  const timer = document.getElementById('timer');
  let TIME = 30;
  const power = 100 / (words[0].length + words[1].length + words[2].length + words[3].length)
  const damege = 10
  let life = 0
  let life_furiza = 0
  let condition = 1;

  target.style.display = "none";
  crear1.style.display = "none";
  crear2.style.display = "none";
  furiza.style.display = "none";
  goku.style.display = "none";
  gage.style.display = "none";
  background.style.display = "none";
  spgoku.style.display = "none";
  furufuri.style.display = "none";
  kamehameha.style.display = "none";
  bakuhatu.style.display = "none";
  kidan.style.display = "none";
  warai.style.display = "none";
  gokuwin.style.display = "none";
  message1.style.display = "none";
  message2.style.display = "none";

  function switchDisplay() {
    background.style.display = "none";
  }

  function alterLife() {
    // lifeの値を算出する
    life += power
    // ライフバーの値を更新する
    lifeBar_furiza.value = life
  }

  function alterLife_furiza() {
    // life_monsterの値を算出する
    life_furiza += damege
    // ライフバーの値を更新する
    lifeBar_goku.value = life_furiza
  }

  function finish1() {
    const retry = document.getElementById("retry").style.visibility = 'visible';
    // crear1.style.display = "block";
    // crear2.style.display = "block";
    spgoku.style.display = "none";
    furufuri.style.display = "none";
    warai.style.display = "none";
    switch (condition) {
      case 1:
        message1.style.display = "block";
        break;
      case 2:
        message2.style.display = "block";
        break;
    }
  }

  function finish2() {
    target.style.display = "none";
    gage.style.display = "none";
    background.style.display = "block";
    setTimeout(() => {
      switchDisplay();
    }, 1800);
  }

  function furizafinish() {
    condition = 2;
    furufuri.style.display = "block";
    warai.style.display = "block";
    furiza.style.display = "none";
    setTimeout(() => {
      warai.style.display = "none";
      kidan.style.display = "block";
    }, 1800);
    setTimeout(() => {
      goku.style.display = "none";
      bakuhatu.style.display = "block";
    }, 2500);
    setTimeout(() => {
      finish1();
      warai.style.display = "block";
      kidan.style.display = "none";
      bakuhatu.style.display = "none";
    }, 3700);
  }

  function finishcount() {
    alterLife_furiza();
    furizafinish();
    finish2();
  }

  let flag = false;
  let id;
  let timeoutid;
  document.addEventListener("keydown", (e) => {
    if (isPlaying === true) {
      return;
    }
    if (e.key == "Enter" && !flag) {
      timer.textContent = '制限時間：' + TIME + '秒';

      flag = true;
      let timeoutid = setTimeout(() => {
        finishcount();
      }, TIME * 1000
      );
      id = setInterval(() => {
        timer.textContent = '制限時間：' + --TIME + '秒';
        if (TIME <= 0) {
          clearInterval(id);
          clearTimeout(timeoutid);
          timer.style.display = "none";
        }
      }, 1000);

      target.style.display = "block";
      furiza.style.display = "block";
      goku.style.display = "block";
      gage.style.display = "block";
      title.style.display = "none";
      click.style.display = "none";
      isPlaying = true;
      startTime = Date.now();
      setWord();
    }
  });

  document.addEventListener('click', () => {
    if (isPlaying === true) {
      return;
    }
    timer.textContent = '制限時間：' + TIME + '秒';

    flag = true;
    timeoutid = setTimeout(() => {
      finishcount();
    }, TIME * 1000
    );

    id = setInterval(() => {
      timer.textContent = '制限時間：' + --TIME + '秒';
      if (TIME <= 0) {
        clearInterval(id);
        clearTimeout(timeoutid);
        timer.style.display = "none";
      }
    }, 1000);



    target.style.display = "block";
    furiza.style.display = "block";
    goku.style.display = "block";
    gage.style.display = "block";
    title.style.display = "none";
    click.style.display = "none";
    isPlaying = true;
    startTime = Date.now();
    setWord();
  });

  let win = false;

  document.addEventListener('keydown', e => {
    //TODO
    if (win) return;
    if (e.key == "Enter") return;
    if (word && e.key !== word[loc]) {
      alterLife_furiza();
      misscount++;
      if (life_furiza === 100) {
        clearInterval(id);
        clearTimeout(timeoutid);
        timer.style.display = "none";
        furizafinish();
        finish2();
        return;
      }
      return;
    }

    // loc++;


    // 1: _ed
    // 2: __d
    // 3: ___
    target.textContent = '_'.repeat(loc + 1) + word.substring(loc + 1);

    if (word && word[loc] === e.key) {
      cnt++;
      alterLife();
      if (words.length === 0 && word.length === cnt || life >= 100) {
        win = true;
        //todo

        clearInterval(id);
        clearTimeout(timeoutid);
        timer.style.display = "none";

        spgoku.style.display = "block";
        kamehameha.style.display = "block";
        goku.style.display = "none";
        setTimeout(() => {
          finish1();
          const elaosedTime = ((Date.now() - startTime) / 1000).toFixed(2);
          const result = document.getElementById('result');
          result.textContent = `タイム： ${elaosedTime} 秒`;
          const count = document.getElementById('count');
          count.textContent = `ミス合計： ${misscount}回`;
          kamehameha.style.display = "none";
          gokuwin.style.display = "block";
        }, 4400);
        setTimeout(() => {
          furiza.style.display = "none";
        }, 3800);
        finish2();
        return;
      }
      if (word.length === loc + 1) {
        setWord();
        return;
      }
      loc++
    }

  });

  count.style.color = '#ffffff';
  result.style.color = '#ffffff';

}