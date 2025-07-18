// 滚动动画效果
document.addEventListener('DOMContentLoaded', function() {
    // 滚动监听，高亮导航
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 300) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
    
    // 悬浮动画延迟加载
    const animatedItems = document.querySelectorAll('.pricing-card, .service-card, .step');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'translateY(0)';
                }, 200);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    
    animatedItems.forEach(item => {
        item.style.opacity = 0;
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(item);
    });
    
    // 图片懒加载处理
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    const imgObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.removeAttribute('data-src');
                imgObserver.unobserve(img);
            }
        });
    }, { rootMargin: '0px 0px 200px 0px' });
    
    lazyImages.forEach(img => {
        const src = img.src;
        img.dataset.src = src;
        img.src = '';
        imgObserver.observe(img);
    });
});