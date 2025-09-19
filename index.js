let blocked = false;
let number = 140.85;

function intro() {
  if (blocked) return;
  blocked = true;

  var song = new Audio("sounds/Intro.mp3");
  song.play();

  song.addEventListener("ended", function () {
    blocked = false;
  });
}

function snakeSpeech() {
  var talk = new Audio("sounds/Snake2.wav");
  talk.play();
}

function endCall() {
  var bip = new Audio("sounds/End-call.mp3");
  bip.play();
}

function makeSoundNAnimation(key) {
  switch (key) {
    case "ArrowLeft":
      var arrow = new Audio("sounds/Arrow-sound.mp3");
      arrow.play();

      $(".left-triangle").addClass("pressed");
      setTimeout(function () {
        $(".left-triangle").removeClass("pressed");
      }, 100);

      if (key === "ArrowLeft") {
        if (number > 140.01) {
          number = parseFloat(number - 0.01);
          $(".frequency p").html(number.toFixed(2));
        }
      }
      break;

    case "ArrowRight":
      var arrow = new Audio("sounds/Arrow-sound.mp3");
      arrow.play();

      $(".right-triangle").addClass("pressed");
      setTimeout(function () {
        $(".right-triangle").removeClass("pressed");
      }, 100);

      if (key === "ArrowRight") {
        if (number < 141.98) {
          number = parseFloat(number + 0.01);
          $(".frequency p").html(number.toFixed(2));
        }
      }
      break;

    case "ArrowUp":
      if (blocked) return;

      if (number.toFixed(2) === "140.85") {
        blocked = true;
        var call = new Audio("sounds/Call-sound.mp3");
        call.play();

        $(".call").addClass("pressed");
        setTimeout(function () {
          $(".call").removeClass("pressed");
        }, 100);

        actionsAfterPtt();

        setTimeout(function () {
          endCall();
          removeGlow();
          resetActionsAfterPtt();
          blocked = false;
        }, 58980);
      } else {
        if (blocked) return;
        {
          blocked = true;
          $(".call").addClass("pressed");
          setTimeout(function () {
            $(".call").removeClass("pressed");
          }, 100);
          var short = new Audio("sounds/shortCall.mp3");
          short.play();
          short.addEventListener("ended", function () {
            blocked = false;
          });
        }
      }
      break;

    case "ArrowDown":
      var arrow = new Audio("sounds/Arrow-sound.mp3");
      arrow.play();

      $(".list").addClass("pressed");
      setTimeout(function () {
        $(".list").removeClass("pressed");
      }, 100);
      break;

    default:
      console.log("Good job");
  }
}

const originalState = {
  externalLine: {},
  leftArrow: {},
  rightArrow: {},
  imagesAdded: [],
  frequency: {},
  ptt: {},
  memory: {},
};

function makeGlow() {
  $(".bar12").css("animation", "glow 55s ease 0s infinite");

  $(".bar11").css("animation", "glow 55s ease 0.1s infinite");

  $(".bar10").css("animation", "glow 55s ease 0.2s infinite");

  $(".bar9").css("animation", "glow 55s ease 0.3s infinite");

  $(".bar8").css("animation", "glow 55s ease 0.4s infinite");

  $(".bar7").css("animation", "glow 55s ease 0.5s infinite");

  $(".bar6").css("animation", "glow 55s ease 0.6s infinite");

  $(".bar5").css("animation", "glow 2s step-end 0.7s infinite");

  $(".bar4").css("animation", "glow 2s step-end 0.8s infinite");

  $(".bar3").css("animation", "glow 3s step-end 0.9s infinite");
}

function moveLayout() {
  $(".external-line").css("width", "880px");

  $(".external-line").prepend('<img id="snake" src="images/Snake.webp" />');

  $(".external-line").prepend('<img id="Static" src="images/Static2.gif" />');
  originalState.imagesAdded = ["#snake", "#Static"];

  $(".left-arrow").css({
    position: "relative",
    left: "145px",
    top: "1px",
  });

  $(".right-arrow").css({
    position: "relative",
    left: "-110px",
    top: "2px",
  });

  $(".ptt").css({
    position: "relative",
    left: "-1px",
    top: "-375px",
  });

  $(".memory").css({
    position: "relative",
    left: "-1px",
    top: "-375px",
  });

  $(".frequency").css({
    position: "relative",
    left: "-1px",
    top: "-320px",
  });

  $("#Static").css({
    position: "relative",
    left: "690px",
    width: "190px",
    height: "370px",
  });

  $("#snake").css({
    position: "relative",
    height: "370px",
    width: "190px",
    left: "-190px",
  });
}

function actionsAfterPtt() {
  setTimeout(function () {
    originalState.externalLine = {
      width: $(".external-line").css("width"),
    };

    originalState.leftArrow = {
      left: $(".left-arrow").css("left"),
      top: $(".left-arrow").css("top"),
    };

    originalState.rightArrow = {
      left: $(".right-arrow").css("left"),
      top: $(".right-arrow").css("top"),
    };

    originalState.frequency = {
      position: $(".frequency").css("position"),
      top: $(".frequency").css("top"),
      left: $(".frequency").css("left"),
    };

    originalState.memory = {
      position: $(".memory").css("position"),
      top: $(".memory").css("top"),
      left: $(".memory").css("left"),
    };

    originalState.ptt = {
      position: $(".ptt").css("position"),
      top: $(".ptt").css("top"),
      left: $(".ptt").css("left"),
    };

    moveLayout();

    makeGlow();

    snakeSpeech();
  }, 3000);
}

function removeGlow() {
  setTimeout(function () {
    $(".bar12").css("animation", "none");

    $(".bar11").css("animation", "none");

    $(".bar10").css("animation", "none");

    $(".bar9").css("animation", "none");

    $(".bar8").css("animation", "none");

    $(".bar7").css("animation", "none");

    $(".bar6").css("animation", "none");

    $(".bar5").css("animation", "none");

    $(".bar4").css("animation", "none");

    $(".bar3").css("animation", "none");
  });
}

function resetActionsAfterPtt() {
  $(".external-line").css("width", originalState.externalLine.width);
  $(".left-arrow").css({
    left: originalState.leftArrow.left,
    top: originalState.leftArrow.top,
  });
  $(".right-arrow").css({
    left: originalState.rightArrow.left,
    top: originalState.rightArrow.top,
  });
  $(".frequency").css({
    position: originalState.frequency.position,
    top: originalState.frequency.top,
    left: originalState.frequency.left,
  });
  $(".memory").css({
    position: originalState.memory.position,
    top: originalState.memory.top,
    left: originalState.memory.left,
  });
  $(".ptt").css({
    position: originalState.ptt.position,
    top: originalState.ptt.top,
    left: originalState.ptt.left,
  });
  originalState.imagesAdded.forEach(function (id) {
    $(id).remove();
  });
  originalState.imagesAdded = [];
}

$(document).keydown(function (event) {
  if (blocked) return;

  if (event.key === "Enter") {
    intro();
  }
  makeSoundNAnimation(event.key);
});

$("button").click(function () {
  var clickedKey = $(this).data("key");
  makeSoundNAnimation(clickedKey);
});
