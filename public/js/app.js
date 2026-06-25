// =============================================
// APP.JS - QOF (Có liên kết ngược với EcoSphere)
// =============================================

// URL của web EcoSphere
const ECOSPHERE_URL = 'http://localhost:3001';

function initApp() {
    console.log('🌾 QUYNH ORGANIC FARM - Đã khởi động!');
    
    // Render footer
    if (typeof renderFooter === 'function') {
        renderFooter();
    }
    
    // ===== 1. XỬ LÝ MENU CHÍNH =====
    const navItems = document.querySelectorAll('.nav-item.has-submenu');
    navItems.forEach(item => {
        const header = item.querySelector('.nav-header');
        if (header) {
            header.addEventListener('click', function(e) {
                e.stopPropagation();
                // Đóng các menu khác
                navItems.forEach(other => {
                    if (other !== item) {
                        other.classList.remove('open');
                    }
                });
                item.classList.toggle('open');
            });
        }
    });
    
    // ===== 2. XỬ LÝ SẢN XUẤT NÔNG NGHIỆP (Submenu dọc) =====
    const productionParent = document.querySelector('.submenu li.has-submenu-vertical');
    if (productionParent) {
        const productionHeader = productionParent.querySelector('.submenu-header');
        if (productionHeader) {
            productionHeader.addEventListener('click', function(e) {
                e.stopPropagation();
                productionParent.classList.toggle('open');
            });
        }
    }
    
    // ===== 3. XỬ LÝ CLICK VÀO 7 MỤC CON (GIỮ NGUYÊN) =====
    const menuItems = document.querySelectorAll('.submenu-vertical li');
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Bỏ active cũ
            menuItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            
            // Lấy pageId và render
            const pageId = this.dataset.production;
            if (pageId && typeof renderProductionContent === 'function') {
                renderProductionContent(pageId);
            }
        });
    });
    
    // ===== 4. XỬ LÝ LIÊN KẾT NGƯỢC VỚI ECOSPHERE =====
    // Tất cả các mục có data-link="true" sẽ chuyển sang EcoSphere
    const linkItems = document.querySelectorAll('[data-link="true"]');
    linkItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.stopPropagation();
            e.preventDefault();
            
            // Mở EcoSphere trong tab mới
            window.open(ECOSPHERE_URL, '_blank');
        });
    });
    
    // ===== 5. MẶC ĐỊNH: MỞ SẴN MENU =====
    // Mở menu Nông nghiệp
    const agriMenu = document.getElementById('menu-production');
    if (agriMenu) {
        agriMenu.classList.add('open');
    }
    
    // Mở submenu Sản xuất nông nghiệp
    if (productionParent) {
        productionParent.classList.add('open');
    }
    
    // ===== 6. HIỂN THỊ TRANG CHỦ =====
    if (typeof renderProductionContent === 'function') {
        const trangChuItem = document.querySelector('.submenu-vertical li[data-production="trangChu"]');
        if (trangChuItem) {
            trangChuItem.classList.add('active');
        }
        renderProductionContent('trangChu');
    }
}

// Khởi động khi DOM sẵn sàng
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}