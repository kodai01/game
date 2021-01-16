const $number = $(".number");
const $timer = $("#timer");
const $point = $("#point");
let $max = 100
let $question;
let $time = 60;
let $score = 0;
let $level = 1;
let $typeMiss = 0;

let $primeArray = []
function checkPrimeNumber(n) {
  for (let i = 2; i < n ; i++) {
    if (n % i === 0) {
      // console.log(`${n}はsetPrimeNumberだけど3,5,7などで割り切れる可能性があります`)
      return true
    }
  }
  // console.log("素数の問題として出題できます")
  $primeArray.push(n)
}

function setPrimeNumber() {
  for (let j = 17; j < Math.pow(10, 4); j = j + 2) {
    checkPrimeNumber(j)
  }
  // console.log($primeArray)
}

function ignoreUnmatchNumber(n) {
  // console.log("ignoreunmatchnumber")
  // console.log(`checkPrimeNumber ${n}`)
  for (let i = 0; i < $primeArray.length ; i++) {
    if (n % $primeArray[i] === 0 || n === $primeArray[i]) {
      //問題選びなおし
      // console.log(`${n}は素数になったり、条件に合わないので出題できません`)
      setNumber()
    }
  }
  // console.log(`${n}は出題できます`)
}

//数字を用意する
function setNumber() {
  // console.log("setNumber")
  $question = Math.floor(Math.random() * $max)
  // console.log($question)
  const $ex = Math.random()
  // console.log($ex)
  if ($ex > 0.8) {
    // console.log("素数を出題")
    //素数を出題
    if(!$primeArray.includes($question)) {
      //もし素数じゃなかったら選びなおし
      setNumber()
      // console.log("素数じゃないから出題できないです")
    } else {
      // console.log("出題できます")
    }
  } else {
    // console.log("合成数を出題")
    //合成数を出題
    ignoreUnmatchNumber($question);
  }
  if($question === 1 || $question % 100 === 0 ) {
    // console.log("1または100で割り切れる")
    setNumber();
  }
  $number.text($question);
  $("#level").text($level);
  $("#point").text($score);
}

// function checkOrdinalNumber() {
//   console.log("checkOrdinalNumber")
//   for (i = 17; i < $question; i = i + 2) {
//     console.log(i)
//     if ($question % i === 0) {
//       console.log(`${$question}は${i}で割り切れます`)
//       setNumber();
//     }
//   }
// }


function initial() {
  $(".button-list").find("button").prop("disabled", false)
  $("#typemiss").text("")
}

//windowが立ち上がったときの処理
$(window).on("load",setPrimeNumber(), setNumber(), initial(), 
// $(".button-list").find(".levelup").prop("disabled", true)
 )

//ボタンが押された時の処理
$(".button-list").find(".prime-number").on("click", function() {
  // console.log(".primenumberが押されました")
  const $primeNumber = $(this).text();

  //もし、押された数が問題で用意された数で割り切ることができれば割り算を実行
  if ($question % $primeNumber === 0) {

    $question = $question / $primeNumber;
    $number.text($question);
    $score = $score + parseInt($primeNumber, 10);

    //もし、割る数がもうなくなってしまった場合は、もう一度数字を用意して無限に遊べるようにする
    if ($question === 1) {
      if ($score >= 30 * $level) {
        $level++;
        if($level = 4) {
          $max = 1000
        }
        $("#level").text($level);
        $(".button-list").find("button").prop("disabled", false);
      }
      setNumber();
    }
  } else {
    $typeMiss++;
    $score = Math.floor($score / 2)
  }
  $point.text($score);
})

$("#sosuu").on("click", function() {
  // console.log("素数ボタンが押されました")
  if ($question % 2 !== 0 && $question % 3 !== 0 && $question % 5 !== 0 && $question % 7 !== 0 && $question % 11 !== 0 && $question % 13 !== 0 ) {
    $score = $score + 20;
    setNumber();
  } else {
    $score = Math.floor($score / 2);
  }
  $point.text($score);
})
//<<timerに関する処理
function setTimer() {
  $timer.text($time);
  $time = $time - 1;
  const $timeOutId = setTimeout(setTimer, 1000);

  if($time < 0) {　
    clearTimeout($timeOutId);
    $(".button-list").find("button").prop("disabled", true);
    $timer.text("0");
    $("#typemiss").text($typeMiss);
  }
}

setTimer();

//>>
