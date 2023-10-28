# ShootingProject

[유튜브 강의](https://www.youtube.com/watch?v=TJmvuyt6tT8)를 바탕으로 캔버스를 이용한 슈팅게임을 구현하였습니다. <br>


![](https://cdn.discordapp.com/attachments/905741784666230815/1167847428104409168/image.png?ex=654f9dac&is=653d28ac&hm=600c361b22b6a37d3588e9a7755be60e52e9f137e8a77e4f7d779890d41471b2&)

![](https://cdn.discordapp.com/attachments/905741784666230815/1167847428519632976/image.png?ex=654f9dac&is=653d28ac&hm=c849e8a2a8be531587305e28c88d4b0c924c60488165b75f23ec882a3893e8de&)

기본적인 렌더, 플레이어, 적, 총알, 스코어 기능을 강의를 보고 작성하였습니다. <br>
다시 하기, localStorage를 통한 HighScore 저장 및 불러오기 기능을 직접 작성하였습니다. <br>

---

```js
function RestartGame() {
    LoadScore();

    score = 0;
    enemyList = [];
    bulletList = [];
    spaceshipX = canvas.width / 2 - 32;
    spaceshipY = canvas.height - 64;

    gameover = false;
    main();
}

function SaveScore() {
    let jsonString = localStorage.getItem("HighScore");
    if (jsonString < score)
        localStorage.setItem("HighScore", JSON.stringify(score));
}

function LoadScore() {
    let jsonString = localStorage.getItem("HighScore");
    if (jsonString != null) {
        scoreData = JSON.parse(jsonString);
        highScore = scoreData;
    }
}
```
