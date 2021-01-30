const wheelValues = {
    blue: {
        value: 50,
        from: 0,
        to: 30
    },
    
    blue: {
        value: 50,
        from: 330,
        to: 360
    },
   
    green: {
        value: 100,
        from: 270,
        to: 330
    },

    yellow: {
        value: 300,
        from: 210,
        to: 270
    },
    red: {
        value: 500,
        from: 150,
        to: 210
    },
    orange: {
        value: 400,
        from: 90,
        to: 150
    },
    pink: {
        value: 0,
        from: 30,
        to: 90
    }
}


const wheel = document.querySelector("#inner-wheel");
const spinBtn = document.querySelector("#spin");
const showBtn = document.querySelector("#wheel_button");
const backBtn = document.querySelector("#back");


spinBtn.addEventListener("click", spinWheel);
showBtn.addEventListener("click", () => showWheel());
backBtn.addEventListener("click",()=>{
    document.querySelector("#wheel-wrapper").style.display = 'none';
})

function spinWheel() {
    let random = (Math.random() * 360)*3600;
    wheel.style.transform = "rotate(" + random + "deg)";
    let pointer = ((random / 360) - Math.floor(random / 360)) * 360;
  
    for (let wheelObj of Object.values(wheelValues)) {
        if (wheelObj.to >= pointer && wheelObj.from < pointer) {
            setTimeout(function() {document.querySelector("#first_score").innerHTML = wheelObj.value}, 6000);
            
            return wheelObj.value;
        }
    }
}
function showWheel() {
    document.querySelector("#wheel-wrapper").style.display = 'block';
    document.querySelector("#wheel-wrapper").style.animation = "animation 2s forwards linear";
    
}