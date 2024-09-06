function locomotiveAnimation() {

    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });


    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();

}
locomotiveAnimation()

function loadingAnimation() {
    let tl1 = gsap.timeline()
    tl1.from(".line h1", {
        y: 200,
        duration: 0.6,
        stagger: 0.25,
        opacity: 0,
        delay: 0.5
    })
    tl1.from(".blink", {
        y: 200,
        duration: 0.6,
        opacity: 0,
    })
    tl1.from(".timer", {
        opacity: 0,
        onStart: function () {
            let count = document.querySelector("#time")
            let grow = 0
            setInterval(() => {
                if (grow < 100) {
                    count.innerHTML = grow++
                } else {
                    count.innerHTML = grow
                }
            }, 29)
        }
    })

    tl1.to("#loader", {
        duration: 2,
        delay: 0.5,
    })
    tl1.to(".line", {
        opacity: 0,
        duration: 0.9,
    })
    tl1.to("#loader", {
        y: -1600,
        delay: 0.6,
        duration: 1.5,
        ease: "bounce.out",
    })
    tl1.from("#nav", {
        opacity: 0,
        duration: 0.2
    })

    tl1.from(".hero h1", {
        y: 120,
        opacity: 0,
        stagger: 0.2,
        duration: 0.4
    })
    tl1.from(".hero h2 ", {
        opacity: 0
    })
    tl1.from("#hero1, #page2 ", {
        opacity: 0
    }, "-=1.4")


}
loadingAnimation()

Shery.makeMagnet(".menu a");

function cursorAnimation() {
    Shery.mouseFollower({
        ease: "cubic-bezier(0.23, 1, 0.320, 1)",
        duration: 1,
        scale: 2
    });

    var video = document.querySelector("#video-container video");
    var videoContainer = document.querySelector("#video-container");
    videoContainer.addEventListener("mouseenter", function () {
        videoContainer.addEventListener("mousemove", function (dets) {
            gsap.to(".mousefollower", {
                opacity: 0
            });
            gsap.to("#video-cursor", {
                left: dets.x - 450,
                y: dets.y - 250,
            });
        });

        videoContainer.addEventListener("mouseleave", function () {
            gsap.to(".mousefollower", {
                opacity: 1
            });
            gsap.to("#video-cursor", {
                top: "-15%",
                left: "70%"
            });
        })

        var flag = 0
        videoContainer.addEventListener("click", function () {
            if (flag == 0) {
                video.play()
                video.style.opacity = 1
                document.querySelector("#video-cursor").innerHTML = `<i class="ri-pause-mini-fill"></i>`
                gsap.to("#video-cursor", {
                    scale: 0.5
                })
                flag = 1
            } else {
                video.pause()
                video.style.opacity = 0
                document.querySelector("#video-cursor").innerHTML = `<i class="ri-play-mini-fill"></i>`
                gsap.to("#video-cursor", {
                    scale: 1
                })
                flag = 0
            }
        })

    })
}
cursorAnimation()

function hoverHero() {

   document.addEventListener("mousemove", function (dets) {
    gsap.to("#flags", {
      x: dets.x,
      y: dets.y
    })
  })

  document.querySelector("#hero3").addEventListener("mouseenter", function () {
    gsap.to("#flags", {
      opacity: 1
    })
  })
  document.querySelector("#hero3").addEventListener("mouseleave", function () {
    gsap.to("#flags", {
      opacity: 0
    })
  })
}
hoverHero()

function sheryAnimation() {
    Shery.imageEffect(".imagess-con", {
      style: 5,
      gooey: true,
    //   debug:true,
      config:{"a":{"value":0.69,"range":[0,30]},"b":{"value":-0.59,"range":[-1,1]},"zindex":{"value":-9996999,"range":[-9999999,9999999]},"aspect":{"value":0.724163774061218},"ignoreShapeAspect":{"value":true},"shapePosition":{"value":{"x":0,"y":0}},"shapeScale":{"value":{"x":0.5,"y":0.5}},"shapeEdgeSoftness":{"value":0,"range":[0,0.5]},"shapeRadius":{"value":0,"range":[0,2]},"currentScroll":{"value":0},"scrollLerp":{"value":0.07},"gooey":{"value":true},"infiniteGooey":{"value":false},"growSize":{"value":4,"range":[1,15]},"durationOut":{"value":1,"range":[0.1,5]},"durationIn":{"value":1.5,"range":[0.1,5]},"displaceAmount":{"value":0.5},"masker":{"value":true},"maskVal":{"value":1,"range":[1,5]},"scrollType":{"value":0},"geoVertex":{"range":[1,64],"value":1},"noEffectGooey":{"value":true},"onMouse":{"value":1},"noise_speed":{"value":0.5,"range":[0,10]},"metaball":{"value":0.33,"range":[0,2]},"discard_threshold":{"value":0.5,"range":[0,1]},"antialias_threshold":{"value":0.01,"range":[0,0.1]},"noise_height":{"value":0.5,"range":[0,2]},"noise_scale":{"value":10,"range":[0,100]}} });
}
sheryAnimation()
