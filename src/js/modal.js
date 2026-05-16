// src/js/modal.js
export function initModalManager() {
    const modal = document.getElementById('modal');
    const embedFrame = document.getElementById('embedFrame');
    const embedLoader = document.getElementById('embedLoader');
    const embedFallback = document.getElementById('embedFallback');
    const modalTitle = document.getElementById('modalTitle');
    const btnDownload = document.getElementById('btnDownload');
    const btnDrive = document.getElementById('btnDrive');
    const fallbackDrive = document.getElementById('fallbackDrive');
    const fallbackDl = document.getElementById('embedFallback').querySelector('.fallback-btn-secondary');
    const btnClose = document.getElementById('btnClose');
    
    let fallbackTimer = null;
    let lastActiveElement = null;

    function openPoem(fileId, rawTitle) {
        const previewUrl = `https://drive.google.com/file/d/${encodeURIComponent(fileId)}/preview?rm=minimal`;
        const viewUrl = `https://drive.google.com/file/d/${encodeURIComponent(fileId)}/view?usp=sharing`;
        const downloadUrl = `https://drive.google.com/uc?export=download&id=${encodeURIComponent(fileId)}`;
        
        lastActiveElement = document.activeElement;

        // إرجاع الحالة الافتراضية للمكونات
        embedLoader.classList.remove('hidden');
        embedFallback.classList.remove('visible');
        embedFrame.style.display = 'block';
        embedFrame.src = '';
        
        modalTitle.textContent = '📖 ' + rawTitle;
        btnDownload.href = downloadUrl;
        btnDrive.href = viewUrl;
        fallbackDrive.href = viewUrl;
        if(fallbackDl) fallbackDl.href = downloadUrl;

        modal.classList.add('open');
        document.body.style.overflow = 'hidden';

        requestAnimationFrame(() => {
            embedFrame.src = previewUrl;
        });

        // تشغيل المهلة الذكية للكشف عن حجب الـ Embed من الـ Drive
        fallbackTimer = setTimeout(showFallback, 12000);
        setTimeout(() => btnClose.focus(), 350);
    }

    function closePoem() {
        modal.classList.remove('open');
        document.body.style.overflow = '';
        clearTimeout(fallbackTimer);
        
        setTimeout(() => {
            embedFrame.src = '';
            embedLoader.classList.remove('hidden');
            embedFallback.classList.remove('visible');
            embedFrame.style.display = 'block';
        }, 380);

        if (lastActiveElement) lastActiveElement.focus();
    }

    function showFallback() {
        clearTimeout(fallbackTimer);
        embedLoader.classList.add('hidden');
        embedFallback.classList.add('visible');
        embedFrame.style.display = 'none';
    }

    // ربط الأحداث بأزرار القراءة عبر الـ Event Delegation
    document.getElementById('poemsGrid').addEventListener('click', (e) => {
        const btn = e.target.closest('.btn-primary');
        if (btn) {
            const fileId = btn.getAttribute('data-fileid');
            const title = btn.getAttribute('data-title');
            openPoem(fileId, title);
        }
    });

    btnClose.addEventListener('click', closePoem);

    // إدارة أحداث لوحة المفاتيح والـ Accessibility Focus Trap
    modal.addEventListener('keydown', e => {
        if (!modal.classList.contains('open')) return;
        if (e.key === 'Escape') {
            closePoem();
            return;
        }
        if (e.key !== 'Tab') return;

        const focusable = [...modal.querySelectorAll(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )].filter(el => !el.closest('.embed-fallback:not(.visible)'));
        
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
            if (document.activeElement === first) {
                e.preventDefault();
                last.focus();
            }
        } else {
            if (document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        }
    });

    modal.addEventListener('pointerdown', e => {
        if (e.target === modal) closePoem();
    });
}
