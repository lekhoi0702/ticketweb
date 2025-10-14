// page3-script.js - Logic cho trang taosukien3.html (Vé và thời gian)

// Store tickets data
let tickets = [];

document.addEventListener('DOMContentLoaded', function() {
    console.log('Page 3 loaded');
    
    // Tải dữ liệu từ localStorage
    EventData.load();
    
    // Tải danh sách vé đã lưu (nếu có)
    loadTickets();
    
    // Setup Next Page button
    setupNextPageButton();
    
    // Setup navigation tabs
    setupNavigationTabs();
    
    console.log('Current event data:', EventData);
});

function loadTickets() {
    const savedTickets = localStorage.getItem('tickets');
    if (savedTickets) {
        tickets = JSON.parse(savedTickets);
        console.log('Loaded tickets:', tickets);
    }
}

function saveTickets() {
    localStorage.setItem('tickets', JSON.stringify(tickets));
}

function addTicket() {
    console.log('Adding ticket...');
    
    const ticketName = document.getElementById('ticket-name').value;
    const startTime = document.getElementById('start-time').value;
    const endTime = document.getElementById('end-time').value;
    const ticketPrice = document.getElementById('ticket-price').value;
    const ticketQuantity = document.getElementById('ticket-quantity').value;
    const ticketInfo = document.getElementById('ticket-info').innerText;

    // Validate
    if (!ticketName || !startTime || !endTime || !ticketPrice || !ticketQuantity) {
        alert('Vui lòng điền đầy đủ thông tin vé!');
        return;
    }

    // Validate price
    if (ticketPrice <= 0) {
        alert('Giá vé phải lớn hơn 0!');
        return;
    }

    // Validate quantity
    if (ticketQuantity <= 0) {
        alert('Số lượng vé phải lớn hơn 0!');
        return;
    }

    // Validate time
    if (new Date(startTime) >= new Date(endTime)) {
        alert('Thời gian kết thúc phải sau thời gian bắt đầu!');
        return;
    }

    const ticket = {
    name: ticketName,
    startTime: startTime,
    endTime: endTime,
    price: parseFloat(ticketPrice),
    quantity: parseInt(ticketQuantity),
    info: ticketInfo || ''
};

tickets.push(ticket);
console.log('Ticket added:', ticket);

// ⚠️ QUAN TRỌNG: Format datetime TRƯỚC KHI lưu vào EventData
if (tickets.length === 1) {
    EventData.start_time = formatDateTime(startTime); // ← THÊM HÀM FORMAT
    EventData.end_time = formatDateTime(endTime);     // ← THÊM HÀM FORMAT
    console.log('Set event times:', {
        start: EventData.start_time,
        end: EventData.end_time
    });
} else {
    const newStart = new Date(startTime);
    const newEnd = new Date(endTime);
    const currentStart = new Date(EventData.start_time);
    const currentEnd = new Date(EventData.end_time);
    
    if (newStart < currentStart) {
        EventData.start_time = formatDateTime(startTime); // ← FORMAT
    }
    if (newEnd > currentEnd) {
        EventData.end_time = formatDateTime(endTime);     // ← FORMAT
    }
}

// Lưu vào localStorage
saveTickets();
EventData.save();
    // Clear form...
    alert(`Đã thêm vé thành công!\n\nTổng số loại vé: ${tickets.length}`);
}

function setupNextPageButton() {
    const nextButton = document.querySelector('.next-page');
    
    if (!nextButton) {
        console.error('Next button not found!');
        return;
    }
    
    nextButton.addEventListener('click', function() {
        console.log('Next button clicked');
        
        // Validate
        if (tickets.length === 0) {
            alert('Vui lòng thêm ít nhất một loại vé!');
            return;
        }
        
        // Validate EventData has times
        if (!EventData.start_time || !EventData.end_time) {
            alert('Lỗi: Không có thông tin thời gian sự kiện!');
            return;
        } 
        
        // Validate page 3 specific data
        const errors = validatePage3Data();
        if (errors.length > 0) {
            alert('Lỗi:\n' + errors.join('\n'));
            return;
        }
        
        // Lưu vào localStorage
        EventData.save();
        saveTickets();
        
        console.log('Data validated and saved. Navigating to page 4...');
        console.log('Event times:', {
            start: EventData.start_time,
            end: EventData.end_time
        });
        
        // Chuyển sang trang 4
        window.location.href = 'taosukien4.html';
    });
}

function validatePage3Data() {
    const errors = [];
    
    if (!EventData.start_time) {
        errors.push('Vui lòng thêm vé để có thời gian bắt đầu');
    }
    
    if (!EventData.end_time) {
        errors.push('Vui lòng thêm vé để có thời gian kết thúc');
    }
    
    if (EventData.start_time && EventData.end_time) {
        if (new Date(EventData.start_time) >= new Date(EventData.end_time)) {
            errors.push('Thời gian kết thúc phải sau thời gian bắt đầu');
        }
    }
    
    // Validate tickets
    if (tickets.length === 0) {
        errors.push('Phải có ít nhất một loại vé');
    }
    
    return errors;
}

function setupNavigationTabs() {
    // Tab 1: Thông tin
    const tab1 = document.querySelector('.overlap-group-wrapper .overlap-group-2');
    if (tab1) {
        tab1.addEventListener('click', function() {
            EventData.save();
            saveTickets();
            window.location.href = 'taosukien1.html';
        });
    }
    
    // Tab 2: Hình ảnh
    const tab2 = document.querySelector('.group-3 .overlap-group-2');
    if (tab2) {
        tab2.addEventListener('click', function() {
            EventData.save();
            saveTickets();
            window.location.href = 'taosukien2.html';
        });
    }
    
    // Tab 3: Vé và thời gian (current page) - không cần làm gì
    
    // Tab 4: Cài đặt
    const tab4 = document.querySelector('.group-2 .overlap-group-2');
    if (tab4) {
        tab4.addEventListener('click', function() {
            EventData.save();
            saveTickets();
            window.location.href = 'taosukien4.html';
        });
    }
}