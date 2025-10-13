// api.js - File xử lý API đã được cập nhật

// Cấu hình API - ĐÃ SỬA
const API_CONFIG = {
    baseURL: 'http://127.0.0.1:8000', // Đã sửa từ /api
    endpoints: {
        createEvent: '/api/events/', // Endpoint tạo event
    },
    // Token CSRF từ API của bạn
    csrfToken: getCookie('csrftoken')   
};

// Lưu trữ dữ liệu tạm thời giữa các trang
const EventData = {
    // Dữ liệu từ trang 1
    name: '',
    category: '',
    description: '',
    content: '',
    conditions: '',
    logo_url: '',
    banner_url: '',
    location: '',
    start_time: '',
    end_time: '',
    status: 'draft',
    organizer: 1, // ĐÃ SỬA: Mặc định là 1 (integer)
    
    // Lưu vào localStorage
    save: function() {
        localStorage.setItem('eventData', JSON.stringify(this));
        console.log('Đã lưu dữ liệu:', this);
    },
    
    // Tải từ localStorage
    load: function() {
        const data = localStorage.getItem('eventData');
        if (data) {
            const parsed = JSON.parse(data);
            Object.assign(this, parsed);
            console.log('Đã tải dữ liệu:', this);
        }
    },
    
    // Xóa dữ liệu
    clear: function() {
        localStorage.removeItem('eventData');
        this.name = '';
        this.category = '';
        this.description = '';
        this.content = '';
        this.conditions = '';
        this.logo_url = '';
        this.banner_url = '';
        this.location = '';
        this.start_time = '';
        this.end_time = '';
        this.status = 'draft';
        this.organizer = 1;
    }
};

// Helper function để gọi API
async function apiCall(endpoint, method = 'GET', data = null) {
    try {
        const options = {
            method: method,
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFTOKEN': API_CONFIG.csrfToken
            }
        };
        
        if (data) {
            options.body = JSON.stringify(data);
        }
        
        console.log('API Call:', API_CONFIG.baseURL + endpoint, options);
        
        const response = await fetch(API_CONFIG.baseURL + endpoint, options);
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error('API Error Response:', errorData);
            throw new Error(errorData.detail || `API Error: ${response.status}`);
        }
        
        const result = await response.json();
        console.log('API Success Response:', result);
        return result;
    } catch (error) {
        console.error('API Call Error:', error);
        throw error;
    }
}

// ĐÃ SỬA: Format datetime cho API (ISO 8601)
function formatDateTime(datetimeLocal) {
    if (!datetimeLocal) return '';
    
    // Input: "2025-10-11T18:25"
    // Output: "2025-10-11T18:25:00.000Z"
    const date = new Date(datetimeLocal);
    return date.toISOString();
}

// API: Tạo sự kiện
async function createEvent() {
    try {
        // Validate
        if (!EventData.name || !EventData.category || !EventData.location) {
            throw new Error('Vui lòng điền đầy đủ thông tin bắt buộc');
        }
        
        if (!EventData.start_time || !EventData.end_time) {
            throw new Error('Vui lòng chọn thời gian');
        }
        
        // Tạo payload theo đúng format API
        const payload = {
            name: EventData.name,
            category: EventData.category,
            description: EventData.description || '',
            content: EventData.content || '',
            conditions: EventData.conditions || '',
            logo_url: EventData.logo_url || '',
            banner_url: EventData.banner_url || '',
            location: EventData.location,
            start_time: EventData.start_time, // Đã là ISO format
            end_time: EventData.end_time,     // Đã là ISO format
            status: EventData.status || 'draft',
            organizer: 1 // Integer - ID của organizer
        };
        
        console.log('📤 Sending to API:', payload);
        
        // Gọi API
        const result = await apiCall(API_CONFIG.endpoints.createEvent, 'POST', payload);
        
        console.log('✅ API Response:', result);
        return result;
        
    } catch (error) {
        console.error('❌ Create Event Error:', error);
        throw error;
    }
}

// Validation
function validatePage1Data() {
    const errors = [];
    
    if (!EventData.name.trim()) {
        errors.push('Vui lòng nhập tên sự kiện');
    }
    
    if (!EventData.category) {
        errors.push('Vui lòng chọn thể loại sự kiện');
    }
    
    if (!EventData.location.trim()) {
        errors.push('Vui lòng nhập địa điểm');
    }
    
    if (!EventData.content.trim()) {
        errors.push('Vui lòng nhập thông tin sự kiện');
    }
    
    return errors;
}

function validatePage3Data() {
    const errors = [];
    
    if (!EventData.start_time) {
        errors.push('Vui lòng chọn thời gian bắt đầu');
    }
    
    if (!EventData.end_time) {
        errors.push('Vui lòng chọn thời gian kết thúc');
    }
    
    if (EventData.start_time && EventData.end_time) {
        if (new Date(EventData.start_time) >= new Date(EventData.end_time)) {
            errors.push('Thời gian kết thúc phải sau thời gian bắt đầu');
        }
    }
    
    return errors;
}

// Hiển thị thông báo lỗi
function showErrors(errors) {
    if (errors.length > 0) {
        alert('Lỗi:\n' + errors.join('\n'));
        return false;
    }
    return true;
}

// Hiển thị loading
function showLoading(message = 'Đang xử lý...') {
    const overlay = document.createElement('div');
    overlay.id = 'loading-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        color: white;
        font-size: 20px;
        font-family: Arial, sans-serif;
    `;
    overlay.innerHTML = `<div>${message}</div>`;
    document.body.appendChild(overlay);
}

function hideLoading() {
    const overlay = document.getElementById('loading-overlay');
    if (overlay) {
        overlay.remove();
    }
}
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}