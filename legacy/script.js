// ========================================
// O Mundo de Lizzie - Interactive Features
// Lazy Loading, Gallery, Forms, Animations
// ========================================

// ===== Configuration =====
const IMAGES_PER_LOAD = 12; // Load 12 images at a time
let currentImageIndex = 0;

// All image filenames from the Nova pasta folder
const imageFiles = [
    '308831532_526861909440336_6960891521338262788_n.jpg',
    '492567160_1235303968596123_1558610559926115379_n.jpg',
    '500479703_1268215255304994_2190074944031818237_n.jpg',
    '503356173_1270780811715105_3585457014756298423_n.jpg',
    '503955882_1272978191495367_1259029507324117401_n.jpg',
    '504302848_1274130318046821_6411365025580302180_n.jpg',
    '504476912_1275755824550937_600314385295192109_n.jpg',
    '504825134_1274129608046892_3109281561392485481_n.jpg',
    '505093782_1275758421217344_5595030618061354671_n.jpg',
    '505527920_1277063197753533_8303134941454620117_n.jpg',
    '505847008_1277959920997194_8637665904469497843_n.jpg',
    '512610234_1290170593109460_343932261076472151_n.jpg',
    '516760416_1301583191968200_573345431021709887_n.jpg',
    '521545235_1316522737140912_742486866772985696_n.jpg',
    '522625828_1316197500506769_1548112039296115475_n.jpg',
    '524097128_1318571073602745_2591289051688151077_n.jpg',
    '527419959_1325217249604794_7732449473838215693_n.jpg',
    '528216914_1327545969371922_5512854349939373150_n.jpg',
    '528884370_1327865346006651_6898331659181917085_n.jpg',
    '529126327_1327559796037206_8948434612342413434_n.jpg',
    '529312113_1327559399370579_5199509753974377737_n.jpg',
    '530224731_1328700482589804_280715494848157615_n.jpg',
    '530360359_1330979185695267_166729002681624854_n.jpg',
    '530818914_1332737008852818_1426746766247628440_n.jpg',
    '530880316_1330978479028671_202268589373224263_n.jpg',
    '530924824_1332200652239787_526441722086288855_n.jpg',
    '532622100_1334609521998900_5689632699867210943_n.jpg',
    '533684214_1333459015447284_1682251154050863854_n.jpg',
    '534998805_1335403388586180_1140207367146619021_n.jpg',
    '535553833_1339380104855175_2956572723110827022_n.jpg',
    '540892444_1351103907016128_7129878426010571937_n.jpg',
    '541630513_1349053270554525_7951597672278924104_n.jpg',
    '549399456_1362991779160674_2761378718601576157_n.jpg',
    '555460385_1371953011597884_6485761056439918245_n.jpg',
    '557609995_1375556994570819_3995287166069226416_n.jpg',
    '557658850_1374962317963620_4764493448286023358_n.jpg',
    '558012393_1375933164533202_5493525798801292819_n.jpg',
    '568260508_1394977315962120_1748571582006060296_n.jpg',
    '568359160_1395644705895381_4182729529688770673_n.jpg',
    '568391692_1394980929295092_6069194961874672099_n (1).jpg',
    '568391692_1394980929295092_6069194961874672099_n.jpg',
    '571245990_1400432292083289_2735578402339152913_n.jpg',
    '587459661_1427839312675920_5950483030295648644_n.jpg',
    '588683652_1427469869379531_5212996974743229533_n.jpg',
    '589019499_1427315862728265_7738544879344437625_n.jpg',
    '589799588_1427471336046051_9029928038266569087_n.jpg'
];

// ===== DOM Elements =====
const navbar = document.getElementById('navbar');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navLinks = document.getElementById('navLinks');
const galleryGrid = document.getElementById('galleryGrid');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxClose = document.getElementById('lightboxClose');
const contactForm = document.getElementById('contactForm');

// ===== Navbar Scroll Effect =====
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== Mobile Menu Toggle =====
mobileMenuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = mobileMenuToggle.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

// Close mobile menu when clicking on a link
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = mobileMenuToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// ===== Smooth Scroll =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Fade-in Animation on Scroll =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(element => {
    observer.observe(element);
});

// ===== Gallery - Lazy Loading with Pagination =====
function loadImages() {
    const imagesToLoad = imageFiles.slice(currentImageIndex, currentImageIndex + IMAGES_PER_LOAD);

    imagesToLoad.forEach((filename, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item fade-in';

        const img = document.createElement('img');
        img.dataset.src = `Nova pasta/${filename}`; // Use data-src for lazy loading
        img.alt = `Trabalho artesanal ${currentImageIndex + index + 1}`;
        img.loading = 'lazy'; // Native lazy loading

        // Intersection Observer for lazy loading
        const imgObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    imgObserver.unobserve(img);
                }
            });
        });

        imgObserver.observe(img);

        const overlay = document.createElement('div');
        overlay.className = 'gallery-overlay';

        galleryItem.appendChild(img);
        galleryItem.appendChild(overlay);

        // Click to open lightbox
        galleryItem.addEventListener('click', () => {
            openLightbox(img.dataset.src);
        });

        galleryGrid.appendChild(galleryItem);

        // Observe for fade-in animation
        observer.observe(galleryItem);
    });

    currentImageIndex += imagesToLoad.length;

    // Show/hide "Load More" button
    if (currentImageIndex >= imageFiles.length) {
        loadMoreBtn.style.display = 'none';
    } else {
        loadMoreBtn.style.display = 'inline-block';
    }
}

// Load initial images
loadImages();

// Load More button
loadMoreBtn.addEventListener('click', () => {
    loadImages();
});

// ===== Lightbox Functionality =====
function openLightbox(imageSrc) {
    lightboxImage.src = imageSrc;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
}

lightboxClose.addEventListener('click', closeLightbox);

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Close lightbox with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
    }
});

// ===== Contact Form Validation & Submission =====
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    // Basic validation
    if (!name || !email || !message) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Por favor, insira um email válido.');
        return;
    }

    // Create mailto link (simple solution without backend)
    const subject = encodeURIComponent('Contacto - O Mundo de Lizzie');
    const body = encodeURIComponent(
        `Nome: ${name}\n` +
        `Email: ${email}\n` +
        `Telefone: ${document.getElementById('phone').value || 'Não fornecido'}\n\n` +
        `Mensagem:\n${message}`
    );

    // Open email client
    window.location.href = `mailto:betamcbatista@hotmail.com?subject=${subject}&body=${body}`;

    // Show success message
    alert('Obrigada pelo seu contacto! O seu cliente de email irá abrir para enviar a mensagem.');

    // Reset form
    contactForm.reset();
});

// ===== Prevent right-click on images (optional protection) =====
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });
});

// ===== Console Message =====
console.log('%c✨ O Mundo de Lizzie ✨', 'font-size: 20px; color: #A8D8EA; font-weight: bold;');
console.log('%cFeito com 💕 e muito carinho', 'font-size: 14px; color: #FFB6C1;');
