// --- 1. CONFIGURATION: Demo Websites System ---
        // GANTI LINK DI BAWAH INI DENGAN LINK DEMO ASLI ANDA
        const demoWebsites = [
            {
                id: 'demo-company',
                title: 'Phonna Raya Machinery - Company Profile',
                category: 'Company Profile',
                image: 'assets/phonna.png',
                url: 'https://www.phonnaraya.co.id/' // Ganti URL ini
            },
            {
                id: 'demo-landing',
                title: 'ProClean - Jasa Cleaning',
                category: 'Landing Page',
                image: 'https://placehold.co/600x400/111111/8b5cf6?text=Preview+Landing+Page',
                url: 'https://example.org' // Ganti URL ini
            },
            {
                id: 'demo-toko',
                title: 'Ayam Penyet jalan Cagak - Pesan Makanan Online',
                category: 'E-Commerce',
                image: 'assets/ayam.png',
                url: 'https://zhal06.github.io/ayam-penyet/' // Ganti URL ini
            }
        ];

        // --- 2. CONFIGURATION: WhatsApp Number ---
        const WHATSAPP_NUMBER = '6281234567890'; // Ganti dengan nomor WA Anda

        document.addEventListener('DOMContentLoaded', () => {
            
            // --- Init AOS ---
            AOS.init({
                duration: 800,
                once: true,
                offset: 100,
            });

            // --- Preloader ---
            setTimeout(() => {
                const preloader = document.getElementById('preloader');
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.style.display = 'none';
                    initGSAP(); // Start hero animations after preloader
                }, 800);
            }, 1500);

            // --- Navbar Scroll Effect ---
            const navbar = document.getElementById('navbar');
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    navbar.classList.add('glass', 'shadow-lg');
                    navbar.classList.remove('py-4');
                    navbar.classList.add('py-2');
                } else {
                    navbar.classList.remove('glass', 'shadow-lg');
                    navbar.classList.add('py-4');
                    navbar.classList.remove('py-2');
                }
            });

            // --- Mobile Menu Toggle ---
            const mobileBtn = document.getElementById('mobile-menu-btn');
            const closeBtn = document.getElementById('close-menu-btn');
            const mobileMenu = document.getElementById('mobile-menu');
            const mobileLinks = document.querySelectorAll('.mobile-link');

            function toggleMenu() {
                mobileMenu.classList.toggle('active');
                document.body.classList.toggle('menu-open');
            }

            mobileBtn.addEventListener('click', toggleMenu);
            closeBtn.addEventListener('click', toggleMenu);
            mobileLinks.forEach(link => link.addEventListener('click', toggleMenu));

            // --- Render Demo Cards ---
            const demoContainer = document.getElementById('demo-cards-container');
            demoWebsites.forEach((demo, index) => {
                const card = document.createElement('div');
                card.className = 'glass-card rounded-2xl overflow-hidden group cursor-pointer';
                card.setAttribute('data-aos', 'fade-up');
                card.setAttribute('data-aos-delay', index * 100);
                card.innerHTML = `
                    <div class="relative h-48 md:h-56 overflow-hidden bg-black border-b border-white/10">
                        <img src="${demo.image}" alt="${demo.title}" class="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500">
                        <div class="absolute inset-0 bg-gradient-to-t from-darker to-transparent opacity-80"></div>
                        <div class="absolute bottom-4 left-4">
                            <span class="px-2 py-1 bg-neonBlue/20 text-neonBlue text-xs font-bold rounded border border-neonBlue/30">${demo.category}</span>
                        </div>
                    </div>
                    <div class="p-6">
                        <h4 class="text-xl font-bold mb-4">${demo.title}</h4>
                        <button onclick="openDemoModal('${demo.url}', '${demo.title}')" class="w-full py-2.5 rounded-lg bg-white/5 hover:bg-neonBlue hover:text-white border border-white/10 hover:border-neonBlue transition-all text-sm font-semibold flex justify-center items-center gap-2">
                            <i class="fa-solid fa-play"></i> Lihat Demo
                        </button>
                    </div>
                `;
                demoContainer.appendChild(card);
            });

            // --- AI Chat Logic ---
            const chatBtn = document.getElementById('ai-chat-btn');
            const chatWindow = document.getElementById('ai-chat-window');
            const closeChatBtn = document.getElementById('close-chat-btn');
            const chatInput = document.getElementById('chat-input');
            const sendChatBtn = document.getElementById('send-chat-btn');
            const chatBody = document.getElementById('chat-body');

            chatBtn.addEventListener('click', () => {
                chatWindow.classList.remove('hidden');
                setTimeout(() => {
                    chatWindow.classList.remove('translate-y-10', 'opacity-0');
                }, 10);
            });

            closeChatBtn.addEventListener('click', () => {
                chatWindow.classList.add('translate-y-10', 'opacity-0');
                setTimeout(() => {
                    chatWindow.classList.add('hidden');
                }, 300);
            });

            const aiResponses = {
                'harga': 'Harga pembuatan website kami mulai dari Rp 1.5jt untuk Landing Page, hingga custom price untuk Web App kompleks. Anda butuh jenis web apa?',
                'price': 'Harga pembuatan website kami mulai dari Rp 1.5jt untuk Landing Page, hingga custom price untuk Web App kompleks. Anda butuh jenis web apa?',
                'lama': 'Waktu pengerjaan bervariasi. Landing Page (3-5 hari), Company Profile (7-14 hari), Toko Online (3-4 minggu).',
                'waktu': 'Waktu pengerjaan bervariasi. Landing Page (3-5 hari), Company Profile (7-14 hari), Toko Online (3-4 minggu).',
                'hosting': 'Ya, semua paket pembuatan website kami sudah termasuk GRATIS Domain (.com/.id) & Hosting selama 1 tahun pertama.',
                'domain': 'Ya, semua paket pembuatan website kami sudah termasuk GRATIS Domain (.com/.id) & Hosting selama 1 tahun pertama.',
                'toko online': 'Untuk Toko Online, harganya di Rp 5.5jt. Fitur sudah lengkap termasuk integrasi payment gateway dan hitung ongkir otomatis.',
                'default': 'Terima kasih atas pertanyaannya! Untuk konsultasi lebih detail agar saya tidak salah paham, silakan klik tombol Konsultasi WhatsApp di halaman ini ya.'
            };

            function appendMessage(text, isUser = false) {
                const msgDiv = document.createElement('div');
                msgDiv.className = `flex gap-2 w-[85%] ${isUser ? 'ml-auto flex-row-reverse' : ''}`;
                
                let avatar = isUser 
                    ? `<div class="w-8 h-8 rounded-full bg-neonBlue flex items-center justify-center flex-shrink-0 text-xs text-white"><i class="fa-solid fa-user"></i></div>`
                    : `<div class="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center flex-shrink-0 text-xs"><i class="fa-solid fa-robot"></i></div>`;
                
                let bubbleClass = isUser
                    ? `bg-neonBlue text-white p-3 rounded-2xl rounded-tr-sm`
                    : `bg-gray-800 text-gray-200 p-3 rounded-2xl rounded-tl-sm`;

                msgDiv.innerHTML = `
                    ${avatar}
                    <div class="${bubbleClass}">${text}</div>
                `;
                
                chatBody.appendChild(msgDiv);
                chatBody.scrollTop = chatBody.scrollHeight;
            }

            function showTyping() {
                const typingDiv = document.createElement('div');
                typingDiv.id = 'typing-indicator';
                typingDiv.className = `flex gap-2 w-[85%]`;
                typingDiv.innerHTML = `
                    <div class="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center flex-shrink-0 text-xs"><i class="fa-solid fa-robot"></i></div>
                    <div class="bg-gray-800 text-gray-200 p-3 rounded-2xl rounded-tl-sm typing-indicator">
                        <span></span><span></span><span></span>
                    </div>
                `;
                chatBody.appendChild(typingDiv);
                chatBody.scrollTop = chatBody.scrollHeight;
            }

            function handleChat() {
                const text = chatInput.value.trim().toLowerCase();
                if(!text) return;

                appendMessage(chatInput.value, true);
                chatInput.value = '';
                showTyping();

                setTimeout(() => {
                    const typingIndicator = document.getElementById('typing-indicator');
                    if(typingIndicator) typingIndicator.remove();

                    let response = aiResponses['default'];
                    for(let key in aiResponses) {
                        if(text.includes(key)) {
                            response = aiResponses[key];
                            break;
                        }
                    }
                    appendMessage(response, false);
                }, 1000);
            }

            sendChatBtn.addEventListener('click', handleChat);
            chatInput.addEventListener('keypress', (e) => {
                if(e.key === 'Enter') handleChat();
            });

            // --- WhatsApp Form Logic ---
            const waForm = document.getElementById('auto-wa-form');
            waForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const nama = document.getElementById('wa-nama').value;
                const bisnis = document.getElementById('wa-bisnis').value;
                const jenis = document.getElementById('wa-jenis').value;
                const budget = document.getElementById('wa-budget').value;
                const pesan = document.getElementById('wa-pesan').value;

                let textWa = `Halo ZSite! 👋\n\nSaya tertarik untuk membuat website. Berikut detail saya:\n\n*Nama:* ${nama}\n*Bisnis/Instansi:* ${bisnis}\n*Kebutuhan:* ${jenis}\n*Budget:* ${budget}\n\n*Pesan Tambahan:* \n${pesan}\n\nMohon informasi lebih lanjut. Terima kasih!`;
                
                let encodedText = encodeURIComponent(textWa);
                let waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedText}`;
                
                window.open(waUrl, '_blank');
            });

            // --- FAQ Accordion ---
            const faqBtns = document.querySelectorAll('.faq-btn');
            faqBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    const content = btn.nextElementSibling;
                    const icon = btn.querySelector('i');
                    
                    // Toggle current
                    if(content.classList.contains('hidden')) {
                        content.classList.remove('hidden');
                        icon.classList.add('rotate-180');
                    } else {
                        content.classList.add('hidden');
                        icon.classList.remove('rotate-180');
                    }
                });
            });

        }); // End DOMContentLoaded

        // --- Demo Modal Global Logic ---
        const modal = document.getElementById('demo-modal');
        const iframe = document.getElementById('demo-iframe');
        const iframeContainer = document.getElementById('iframe-container');
        const titleEl = document.getElementById('demo-modal-title');
        const loader = document.getElementById('iframe-loader');
        let currentDemoUrl = '';

        function openDemoModal(url, title) {
            currentDemoUrl = url;
            titleEl.textContent = title;
            iframe.src = 'about:blank'; // reset
            loader.style.display = 'flex';
            
            modal.classList.remove('hidden');
            // small delay for transition
            setTimeout(() => {
                modal.classList.remove('opacity-0');
            }, 10);
            
            // Set desktop view by default on open
            setDesktopView();
            
            // Load iframe
            iframe.src = url;
            iframe.onload = () => {
                loader.style.display = 'none';
            };
        }

        document.getElementById('close-demo-modal').addEventListener('click', () => {
            modal.classList.add('opacity-0');
            setTimeout(() => {
                modal.classList.add('hidden');
                iframe.src = '';
            }, 300);
        });

        // Toggle Views
        const btnDesktop = document.getElementById('btn-desktop-view');
        const btnMobile = document.getElementById('btn-mobile-view');

        function setDesktopView() {
            iframeContainer.classList.remove('iframe-mobile');
            iframeContainer.classList.add('iframe-desktop');
            btnDesktop.classList.replace('bg-transparent', 'bg-gray-800');
            btnDesktop.classList.replace('text-gray-400', 'text-white');
            btnMobile.classList.replace('bg-gray-800', 'bg-transparent');
            btnMobile.classList.replace('text-white', 'text-gray-400');
        }

        function setMobileView() {
            iframeContainer.classList.remove('iframe-desktop');
            iframeContainer.classList.add('iframe-mobile');
            btnMobile.classList.replace('bg-transparent', 'bg-gray-800');
            btnMobile.classList.replace('text-gray-400', 'text-white');
            btnDesktop.classList.replace('bg-gray-800', 'bg-transparent');
            btnDesktop.classList.replace('text-white', 'text-gray-400');
        }

        btnDesktop.addEventListener('click', setDesktopView);
        btnMobile.addEventListener('click', setMobileView);

        // Open Full window
        document.getElementById('btn-open-full').addEventListener('click', () => {
            if(currentDemoUrl) {
                window.open(currentDemoUrl, '_blank');
            }
        });

        // Helper for pricing buttons to auto-select option in form and scroll
        window.fillWaForm = function(paketName) {
            const selectEl = document.getElementById('wa-jenis');
            if(selectEl) {
                selectEl.value = paketName;
            }
            document.getElementById('wa-form-section').scrollIntoView({behavior: 'smooth'});
        };

        // --- GSAP Animations (Called after preloader) ---
        function initGSAP() {
            gsap.registerPlugin(ScrollTrigger);

            // Hero Text Animation
            gsap.from(".hero-text > *", {
                y: 30,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                ease: "power3.out"
            });

            // Hero Visual Animation
            gsap.from(".hero-visual", {
                x: 50,
                opacity: 0,
                duration: 1.2,
                delay: 0.3,
                ease: "power3.out"
            });
        }





        