// page2-script.js - Logic cho trang taosukien2.html (Hình ảnh)

document.addEventListener("DOMContentLoaded", () => {
    // Tải dữ liệu từ localStorage
    EventData.load();
    console.log('Page 2 loaded. Current data:', EventData);
    
    // Setup upload images
    setupImageUpload();
    
    // Setup Next Page button
    setupNextPageButton();
    
    // Setup navigation tabs
    setupNavigationTabs();

   
});

function setupImageUpload() {
    const posterInput = document.getElementById("upload-poster");
    const backgroundInput = document.getElementById("upload-background");
    const seatmapInput = document.getElementById("upload-seatmap");
    const posterPreview = document.getElementById("preview-poster");
    const backgroundPreview = document.getElementById("preview-background");
    const seatmapPreview = document.getElementById("preview-seatmap");
    const removePoster = document.getElementById("remove-poster");
    const removeBackground = document.getElementById("remove-background");
    const removeSeatmap = document.getElementById("remove-seatmap");
    
    // Hiển thị ảnh tạm thời cho poster
    posterInput.addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (file) {
            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                alert('Kích thước file quá lớn! Vui lòng chọn file dưới 5MB');
                posterInput.value = '';
                return;
            }
            
            // Validate file type
            if (!file.type.startsWith('image/')) {
                alert('Vui lòng chọn file ảnh!');
                posterInput.value = '';
                return;
            }
            
            const reader = new FileReader();
            reader.onload = (e) => {
                posterPreview.style.backgroundImage = `url(${e.target.result})`;
                posterPreview.querySelector(".placeholder").style.display = "none";
                removePoster.style.display = "flex";
                
                // Lưu URL tạm (Base64)
                EventData.logo_url = e.target.result;
                console.log('Poster uploaded');
            };
            reader.readAsDataURL(file);
        }
    });
    
    // Hiển thị ảnh tạm thời cho hình nền
    backgroundInput.addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (file) {
            // Validate file size
            if (file.size > 5 * 1024 * 1024) {
                alert('Kích thước file quá lớn! Vui lòng chọn file dưới 5MB');
                backgroundInput.value = '';
                return;
            }
            
            // Validate file type
            if (!file.type.startsWith('image/')) {
                alert('Vui lòng chọn file ảnh!');
                backgroundInput.value = '';
                return;
            }
            
            const reader = new FileReader();
            reader.onload = (e) => {
                backgroundPreview.style.backgroundImage = `url(${e.target.result})`;
                backgroundPreview.querySelector(".placeholder").style.display = "none";
                removeBackground.style.display = "flex";
                
                // Lưu URL tạm (Base64)
                EventData.banner_url = e.target.result;
                console.log('Background uploaded');
            };
            reader.readAsDataURL(file);
        }
    });
    
    // Hiển thị ảnh tạm thời cho seatmap
    seatmapInput.addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (file) {
            // Validate file size
            if (file.size > 5 * 1024 * 1024) {
                alert('Kích thước file quá lớn! Vui lòng chọn file dưới 5MB');
                seatmapInput.value = '';
                return;
            }
            
            // Validate file type
            if (!file.type.startsWith('image/')) {
                alert('Vui lòng chọn file ảnh!');
                seatmapInput.value = '';
                return;
            }
            
            const reader = new FileReader();
            reader.onload = (e) => {
                seatmapPreview.style.backgroundImage = `url(${e.target.result})`;
                seatmapPreview.querySelector(".placeholder").style.display = "none";
                removeSeatmap.style.display = "flex";
                
                console.log('Seatmap uploaded (optional)');
            };
            reader.readAsDataURL(file);
        }
    });
    
    // Xóa ảnh của poster
    removePoster.addEventListener("click", (e) => {
        e.stopPropagation();
        posterPreview.style.backgroundImage = "none";
        posterPreview.querySelector(".placeholder").style.display = "block";
        removePoster.style.display = "none";
        posterInput.value = "";
        EventData.logo_url = "";
        console.log('Poster removed');
    });
    
    // Xóa ảnh của hình nền
    removeBackground.addEventListener("click", (e) => {
        e.stopPropagation();
        backgroundPreview.style.backgroundImage = "none";
        backgroundPreview.querySelector(".placeholder").style.display = "block";
        removeBackground.style.display = "none";
        backgroundInput.value = "";
        EventData.banner_url = "";
        console.log('Background removed');
    });
    
    // Xóa ảnh của seatmap
    removeSeatmap.addEventListener("click", (e) => {
        e.stopPropagation();
        seatmapPreview.style.backgroundImage = "none";
        seatmapPreview.querySelector(".placeholder").style.display = "block";
        removeSeatmap.style.display = "none";
        seatmapInput.value = "";
        console.log('Seatmap removed');
    });
    
    // Restore images nếu có
    if (EventData.logo_url) {
        posterPreview.style.backgroundImage = `url(${EventData.logo_url})`;
        posterPreview.querySelector(".placeholder").style.display = "none";
        removePoster.style.display = "flex";
        console.log('Restored poster from storage');
    }
    
    if (EventData.banner_url) {
        backgroundPreview.style.backgroundImage = `url(${EventData.banner_url})`;
        backgroundPreview.querySelector(".placeholder").style.display = "none";
        removeBackground.style.display = "flex";
        console.log('Restored background from storage');
    }
}

function setupNextPageButton() {
    nextButton.addEventListener('click', function() {
        // Validate images
        if (!EventData.logo_url) {
            alert('Vui lòng thêm poster/logo');
            return;
        }
        
        if (!EventData.banner_url) {
            alert('Vui lòng thêm hình nền/banner');
            return;
        }
        
        EventData.save();      // Lưu logo_url, banner_url
        
        window.location.href = 'taosukien3.html';
    });
}


function setupNavigationTabs() {
    // Tab 1: Thông tin
    const tab1 = document.querySelector('.overlap-group-wrapper .overlap-group');
    if (tab1) {
        tab1.addEventListener('click', function() {
            EventData.save();
            window.location.href = 'taosukien1.html';
        });
    }
    
    // Tab 2: Hình ảnh (current page) - không cần làm gì
    
    // Tab 3: Vé và thời gian
    const tab3 = document.querySelector('.overlap-wrapper .overlap-group');
    if (tab3) {
        tab3.addEventListener('click', function() {
            EventData.save();
            window.location.href = 'taosukien3.html';
        });
    }
    
    // Tab 4: Cài đặt
    const tab4 = document.querySelector('.div-wrapper .overlap-group');
    if (tab4) {
        tab4.addEventListener('click', function() {
            EventData.save();
            window.location.href = 'taosukien4.html';
        });
    }
}