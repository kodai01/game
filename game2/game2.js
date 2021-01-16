const $number = $(".number");
let $pi = "141592653589793238462643383279502884197169399375105820974944592307816406286208998628034825342117067982148086513282306647093844609550582231725359408128481117450284102701938521105559644622948954"
let $success = 0;
let $ok = [];

//ボタンが押された時の処理
$(".button-list").find("button").on("click", function() {
  const $primeNumber = $(this).text();
  const $stringNumber = $pi.split("")
  //もし、押された数が問題で用意された数で割り切ることができれば割り算を実行
  if ($primeNumber == $stringNumber[$success]) { 
    $success = $success + 1
    $ok.push($primeNumber)
    $(".number").text(`3.${$ok.join("")}`)
  }
})
