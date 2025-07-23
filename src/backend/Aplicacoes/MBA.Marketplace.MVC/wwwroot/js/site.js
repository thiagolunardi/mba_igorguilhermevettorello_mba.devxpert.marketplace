// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
$(document).ready(function () {
    // Admin Layout Enhancements
    initializeAdminLayout();
    
    // Existing functionality
    initializeMoneyMask();
    initializeFormValidation();
});

function initializeAdminLayout() {
    // Add active class to current menu item
    const currentPath = window.location.pathname;
    $('.admin-menu-item').each(function() {
        const href = $(this).attr('href');
        if (href && currentPath.includes(href.split('/').pop())) {
            $(this).addClass('active');
        }
    });

    // Smooth hover effects for menu items
    $('.admin-menu-item').hover(
        function() {
            $(this).find('.admin-menu-icon').addClass('animate__animated animate__pulse');
        },
        function() {
            $(this).find('.admin-menu-icon').removeClass('animate__animated animate__pulse');
        }
    );

    // Initialize tooltips
    $('[data-bs-toggle="tooltip"]').tooltip();

    // Add loading states to buttons
    $('.btn').on('click', function() {
        if (!$(this).hasClass('btn-loading')) {
            $(this).addClass('btn-loading');
            $(this).prop('disabled', true);
            
            // Remove loading state after 2 seconds (for demo purposes)
            setTimeout(() => {
                $(this).removeClass('btn-loading');
                $(this).prop('disabled', false);
            }, 2000);
        }
    });

    // Responsive sidebar toggle (for mobile)
    if (window.innerWidth < 768) {
        $('.admin-sidebar').addClass('collapsed');
    }

    // Add window resize handler
    $(window).resize(function() {
        if (window.innerWidth < 768) {
            $('.admin-sidebar').addClass('collapsed');
        } else {
            $('.admin-sidebar').removeClass('collapsed');
        }
    });
}

function initializeMoneyMask() {
    // Initialize money mask for price inputs
    $('.money-input').maskMoney({
        prefix: 'R$ ',
        allowNegative: false,
        thousands: '.',
        decimal: ',',
        affixesStay: false
    });
}

function initializeFormValidation() {
    // Custom form validation
    $('form').on('submit', function(e) {
        const requiredFields = $(this).find('[required]');
        let isValid = true;

        requiredFields.each(function() {
            if (!$(this).val()) {
                $(this).addClass('is-invalid');
                isValid = false;
            } else {
                $(this).removeClass('is-invalid');
            }
        });

        if (!isValid) {
            e.preventDefault();
            showNotification('Por favor, preencha todos os campos obrigatórios.', 'warning');
        }
    });

    // Remove validation classes on input
    $('input, select, textarea').on('input change', function() {
        $(this).removeClass('is-invalid');
    });
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = $(`
        <div class="alert alert-${type} alert-dismissible fade show position-fixed" 
             style="top: 20px; right: 20px; z-index: 9999; min-width: 300px;">
            <i class="bi bi-${type === 'success' ? 'check-circle' : type === 'warning' ? 'exclamation-triangle' : type === 'error' ? 'x-circle' : 'info-circle'} me-2"></i>
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `);

    // Add to body
    $('body').append(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.alert('close');
    }, 5000);
}

// Utility functions
function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
}

function formatDate(date) {
    return new Intl.DateTimeFormat('pt-BR').format(new Date(date));
}

// Export functions for global use
window.adminUtils = {
    showNotification,
    formatCurrency,
    formatDate
};
