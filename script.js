// Konfigurasi Game
    const ARROWS = ['⬆️', '➡️', '⬇️', '⬅️'];
    const KEY_MAP = {
        'ArrowUp': '⬆️',
        'ArrowRight': '➡️',
        'ArrowDown': '⬇️',
        'ArrowLeft': '⬅️'
    };
    
    let sequence = [];
    let playerSequence = [];
    let isListeningInput = false;

    const statusEl = document.getElementById('status');
    const displayBoxEl = document.getElementById('display-box');
    const startBtn = document.getElementById('start-btn');

    // Fungsi untuk memulai game
    function startGame() {
        sequence = [];
        playerSequence = [];
        isListeningInput = false;
        startBtn.disabled = true;
        
        // 1. Buat urutan acak sebanyak 5 anak panah
        for (let i = 0; i < 5; i++) {
            const randomIndex = Math.floor(Math.random() * ARROWS.length);
            sequence.push(ARROWS[randomIndex]);
        }

        // 2. Tampilkan urutan ke pemain
        statusEl.innerText = "Perhatikan urutannya...";
        playSequence(0);
    }

    // Fungsi rekursif untuk menampilkan panah satu per satu setiap 0,5 detik
    function playSequence(index) {
        if (index < sequence.length) {
            // Tampilkan panah saat ini
            displayBoxEl.innerText = sequence[index];
            displayBoxEl.style.opacity = "1";
            
            // Pengaturan waktu total 0,5 detik (500ms)
            setTimeout(() => {
                displayBoxEl.style.opacity = "0"; // Sembunyikan sebentar agar ada jeda kedip
                setTimeout(() => {
                    playSequence(index + 1);
                }, 100); // Jeda kedip kosong 0,1 detik
            }, 400); // Panah tampil selama 0,4 detik
            
        } else {
            // Setelah semua panah selesai ditampilkan
            displayBoxEl.style.opacity = "1";
            displayBoxEl.innerText = "❓";
            statusEl.innerText = "Sekarang giliranmu! Masukkan urutannya:";
            isListeningInput = true;
        }
    }

    // Mendengarkan input keyboard dari pemain
    window.addEventListener('keydown', (e) => {
        if (!isListeningInput) return;

        if (KEY_MAP[e.key]) {
            e.preventDefault(); 
            
            const pressedArrow = KEY_MAP[e.key];
            playerSequence.push(pressedArrow);
            
            displayBoxEl.innerText = pressedArrow;
            
            checkInput();
        }
    });

    // Fungsi untuk memeriksa input pemain
    function checkInput() {
        const currentIndex = playerSequence.length - 1;

        if (playerSequence[currentIndex] !== sequence[currentIndex]) {
            statusEl.innerText = "❌ Salah! Urutanmu tidak tepat.";
            displayBoxEl.innerText = "💥";
            endGame();
            return;
        }

        if (playerSequence.length === sequence.length) {
            statusEl.innerText = "🎉 Hebat! Kamu berhasil mengingat semua urutan!";
            displayBoxEl.innerText = "👑";
            endGame();
        }
    }

    // Reset tombol untuk bermain lagi
    function endGame() {
        isListeningInput = false;
        startBtn.disabled = false;
        startBtn.innerText = "Main Lagi";
    }