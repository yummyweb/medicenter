import { Web } from "sip.js";

TweenMax.to(".loading-screen", 4, {
      delay: 6.6,
      top: "-110%",
      ease: Expo.easeInOut
});

TweenMax.from(".logo", 3, {
      delay: 8.4,
      opacity: 0,
      y: 20,
      ease: Expo.easeInOut
});

TweenMax.from(".contact", 3, {
      delay: 8.5,
      opacity: 0,
      y: 20,
      ease: Expo.easeInOut
});

TweenMax.from(".options", 3, {
      delay: 8.4,
      opacity: 0,
      y: 20,
      ease: Expo.easeInOut
});

TweenMax.from(".bottom-text", 3, {
      delay: 8.7,
      opacity: 0,
      y: 20,
      ease: Expo.easeInOut
});

TweenMax.from(".copyright", 3, {
      delay: 8.9,
      opacity: 0,
      y: 20,
      ease: Expo.easeInOut
});

TweenMax.staggerFrom(".media ul li", 2, {
      delay: 8.7,
      opacity: 0,
      y: 20,
      ease: Power3.easeInOut
}, 0.1);

TweenMax.from(".menu", 3, {
      delay: 8.8,
      opacity: 0,
      y: 20,
      ease: Expo.easeInOut
});

TweenMax.from(".p1", 3, {
      delay: 9,
      opacity: 0,
      y: 20,
      ease: Expo.easeInOut
});

TweenMax.from(".p2", 3, {
      delay: 9.2,
      opacity: 0,
      y: 20,
      ease: Expo.easeInOut
});

TweenMax.from("#one", 3, {
      delay: 9.4,
      opacity: 0,
      y: 20,
      ease: Expo.easeInOut
});

TweenMax.from("#two", 3, {
      delay: 9.7,
      opacity: 0,
      y: 20,
      ease: Expo.easeInOut
});

var t1 = new TimelineMax();

t1.from(".ringOne", 4, {
      delay: 0.4,
      opacity: 0,
      y:40,
      ease: Expo.easeInOut
}).from(".ringTwo", 4, {
      delay: 0.9,
      opacity: 0,
      y: 40,
      ease: Expo.easeInOut
}, "-=5").to(".ringOne", 4, {
      delay: 0.4,
      x: 40,
      ease: Expo.easeInOut
}).to(".ringTwo", 4, {
      delay: 0.9,
      x: 40,
      ease: Expo.easeInOut
},"-=5");

var textWrapper = document.querySelector('.ml7 .letters');
textWrapper.innerHTML = textWrapper.textContent.replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>");

anime.timeline({loop: false})
  .add({
    targets: '.ml7 .letter',
    translateY: ["1.1em", 0],
    translateX: ["0.55em", 0],
    translateZ: 0,
    rotateZ: [180, 0],
    duration: 750,
    easing: "easeOutExpo",
    delay: function(el, i) {
      return 9000 + 50 * i;
    }
  });


  const api = "http://localhost:8000";
  const startButton = document.getElementById("two");
  const hangupButton = document.getElementById("one");
  
  const getAccount = async () => {
    const response = await fetch(`${api}/sip`);
    const { aor, endpoint } = await response.json();
    return { aor, endpoint };
  };
  
  const createUser = async (aor, server) => {
    const user = new Web.SimpleUser(server, { aor });
    await user.connect();
    await user.register();
    return user;
  };
  
  const runCall = async (aor, name) => {
    const data = { aor, name };
    await fetch(`${api}/call`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };
  
  const main = async () => {
    const { aor, endpoint } = await getAccount();
    const user = await createUser(aor, endpoint);
  
    const audio = new Audio();
    user.delegate = {
      onCallReceived: async () => {
        await user.answer();
        startButton.hidden = true;
        hangupButton.hidden = false;
        hangupButton.disabled = false;
        audio.srcObject = user.remoteMediaStream;
        audio.play();
      },
      onCallHangup: () => {
        audio.srcObject = null;
        startButton.hidden = false;
        startButton.disabled = false;
        hangupButton.hidden = true;
      },
    };
  
    startButton.addEventListener("click", async () => {
      startButton.disabled = true;
      runCall(aor, "Peter").catch(() => {
        startButton.disabled = false;
      });
    });
  
    hangupButton.addEventListener("click", async () => {
      hangupButton.disabled = true;
      await user.hangup().catch(() => {
        hangupButton.disabled = false;
      });
    });
  };
  
  main();