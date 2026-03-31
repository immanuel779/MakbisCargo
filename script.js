  // Initialize AOS
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100
        });

        // WhatsApp Number
        const WHATSAPP_NUMBER = "2348038558309";

        // Navbar Scroll Effect
        window.addEventListener('scroll', function() {
            const navbar = document.querySelector('.navbar');
            const backToTop = document.getElementById('backToTop');
            
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
                backToTop.classList.add('show');
            } else {
                navbar.classList.remove('scrolled');
                backToTop.classList.remove('show');
            }
        });

        // Smooth Scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Back to Top
        document.getElementById('backToTop').addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Tracking Form Handler
        document.getElementById('trackingForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const trackingNumber = document.getElementById('trackingNumber').value;
            
            if (trackingNumber) {
                const resultDiv = document.getElementById('trackingResult');
                document.getElementById('displayTrackingNumber').textContent = trackingNumber;
                
                const progress = Math.floor(Math.random() * 70) + 30;
                document.getElementById('progressBar').style.width = progress + '%';
                
                let status = '';
                if (progress < 40) status = 'Picked Up';
                else if (progress < 60) status = 'In Transit';
                else if (progress < 85) status = 'Out for Delivery';
                else status = 'Delivered';
                
                document.getElementById('currentStatus').textContent = status;
                
                const today = new Date();
                const deliveryDate = new Date(today);
                deliveryDate.setDate(today.getDate() + Math.floor(Math.random() * 4) + 2);
                document.getElementById('estimatedDelivery').textContent = deliveryDate.toLocaleDateString('en-US', { 
                    month: 'long', 
                    day: 'numeric', 
                    year: 'numeric' 
                });
                
                resultDiv.style.display = 'block';
            }
        });

        // Contact Form Handler
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value;
            
            if (!name || !email || !phone || !message) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Please fill in all required fields',
                    confirmButtonColor: '#dc3545'
                });
                return;
            }
            
            const whatsappMessage = `*NEW INQUIRY FROM MAKBIS CARGO WEBSITE*%0A%0A` +
                `*Name:* ${name}%0A` +
                `*Email:* ${email}%0A` +
                `*Phone:* ${phone}%0A` +
                `*Service:* ${service || 'Not specified'}%0A%0A` +
                `*Message:*%0A${message}%0A%0A` +
                `_Sent from Makbis Cargo website_`;
            
            const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;
            
            const submitBtn = document.getElementById('submitBtn');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Redirecting...';
            submitBtn.disabled = true;
            
            window.open(whatsappURL, '_blank');
            
            Swal.fire({
                icon: 'success',
                title: 'Message Ready!',
                text: 'You are being redirected to WhatsApp.',
                timer: 2000,
                showConfirmButton: false
            });
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 3000);
            
            this.reset();
        });

        // Active Navigation
        window.addEventListener('scroll', function() {
            const sections = document.querySelectorAll('section');
            const navLinks = document.querySelectorAll('.nav-link');
            
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.clientHeight;
                if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + current) {
                    link.classList.add('active');
                }
            });
        });