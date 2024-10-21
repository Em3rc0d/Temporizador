let hour = document.getElementById("hour");
let minute = document.getElementById("minute");
let second = document.getElementById("second");
let time = document.getElementById("time");
let btnStart = document.getElementById("start");
let btnStop = document.getElementById("stop");
let btnReset = document.getElementById("reset");

let btnPersonalizado = document.getElementsByClassName("opciones")[0];
let btnPorDefecto = document.getElementsByClassName("opciones")[1];
let opcionesPersonalizadas = document.getElementById("opcionesPersonalizadas");
let opcionesPorDefecto = document.getElementById("opcionesDefecto");

let countdown;
let isRunning = false;
let totalTime = 0;

const canvas = document.getElementById('confetti-canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

btnPersonalizado.addEventListener("click", () => {
    opcionesPorDefecto.style.display = "none";
    opcionesPersonalizadas.style.display = "block";
});

btnPorDefecto.addEventListener("click", () => {
    opcionesPersonalizadas.style.display = "none";
    opcionesPorDefecto.style.display = "block";
});

function updateTime(hours, minutes, seconds) {
    time.innerHTML = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

btnStart.addEventListener("click", () => {
    if (isRunning) return;

    if (totalTime === 0) {
        totalTime = (parseInt(hour.value) || 0) * 3600 + (parseInt(minute.value) || 0) * 60 + (parseInt(second.value) || 0);
    }

    if (totalTime <= 0) return;

    isRunning = true;
    countdown = setInterval(() => {
        if (totalTime <= 0) {
            clearInterval(countdown);
            isRunning = false;
            document.getElementById("alert-sound").play();
            startConfetti();
        } else {
            totalTime--;
            const hours = Math.floor(totalTime / 3600);
            const minutes = Math.floor((totalTime % 3600) / 60);
            const seconds = totalTime % 60;
            updateTime(hours, minutes, seconds);
        }
    }, 1000);
});

btnStop.addEventListener("click", () => {
    clearInterval(countdown);
    isRunning = false;
});

btnReset.addEventListener("click", () => {
    clearInterval(countdown);
    isRunning = false;
    totalTime = 0;
    updateTime(0, 0, 0);
    hour.value = 0;
    minute.value = 0;
    second.value = 0;
});

document.querySelectorAll('#opcionesDefecto button').forEach(item => {
    item.addEventListener('click', () => {
        const timePreset = item.id;
        switch (timePreset) {
            case '15s':
                totalTime = 15;
                updateTime(0, 0, 15);
                break;
            case '30s':
                totalTime = 30;
                updateTime(0, 0, 30);
                break;
            case '1m':
                totalTime = 60;
                updateTime(0, 1, 0);
                break;
            case '15m':
                totalTime = 15 * 60;
                updateTime(0, 15, 0);
                break;
            case '1h':
                totalTime = 3600;
                updateTime(1, 0, 0);
                break;
            case '15h':
                totalTime = 15 * 3600;
                updateTime(15, 0, 0);
                break;
            case '1d':
                totalTime = 24 * 3600;
                updateTime(24, 0, 0);
                break;
            default:
                totalTime = 0;
                updateTime(0, 0, 0);
                break;
        }
    });
});

function startConfetti() {
    const count = 200;
    const duration = 3000;
    const animationEnd = Date.now() + duration;

    (function frame() {
        confetti({
            particleCount: count,
            startVelocity: 30,
            spread: 360,
            ticks: 60,
            gravity: 0.5,
            colors: ['#FFC700', '#FF6000', '#FF0081', '#3B3DDF', '#0096FF', '#00D100'],
            origin: { y: 0.4 },
        });

        if (Date.now() < animationEnd) {
            requestAnimationFrame(frame);
        }
    })();
}
