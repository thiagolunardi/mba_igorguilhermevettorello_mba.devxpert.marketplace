/**
 * MBA Marketplace - Sistema de Máscaras
 * Script centralizado para aplicação de máscaras em formulários
 */
(function() {
    'use strict';

    // Configurações padrão para todas as máscaras
    const maskOptions = {
        placeholder: '_',
        clearIfNotMatch: true,
        reverse: false
    };

    // Inicializar máscaras quando o DOM estiver carregado
    document.addEventListener('DOMContentLoaded', function() {
        initializeMasks();
    });

    // Também inicializar quando jQuery estiver disponível (para páginas que carregam via AJAX)
    $(document).ready(function() {
        initializeMasks();
    });

    function initializeMasks() {
        // Máscara para telefone/celular
        applyPhoneMask();
        
        // Máscara para CPF
        applyCpfMask();
        
        // Máscara para CNPJ
        applyCnpjMask();
        
        // Máscara para CEP
        applyCepMask();
        
        // Máscara para data
        applyDateMask();
        
        // Máscara para valores monetários (usando maskMoney)
        applyMoneyMask();
    }

    // Máscara para telefone (celular e fixo)
    function applyPhoneMask() {
        // Telefone com ID específico (usado na página de perfil)
        $('#Input_PhoneNumber').mask('(00) 00000-0000', {
            ...maskOptions,
            translation: {
                '0': { pattern: /[0-9]/ }
            }
        });

        // Telefones por classe ou atributo
        $('.phone-mask, input[name*="phone"], input[name*="telefone"], input[name*="celular"]').mask('(00) 00000-0000', {
            ...maskOptions,
            translation: {
                '0': { pattern: /[0-9]/ }
            }
        });

        // Máscara inteligente que se adapta para telefone fixo ou celular
        $('input[type="tel"]').mask('(00) 0000-00009', {
            ...maskOptions,
            translation: {
                '0': { pattern: /[0-9]/ },
                '9': { pattern: /[0-9]/, optional: true }
            }
        });
    }

    // Máscara para CPF
    function applyCpfMask() {
        $('.cpf-mask, input[name*="cpf"]').mask('000.000.000-00', {
            ...maskOptions,
            translation: {
                '0': { pattern: /[0-9]/ }
            }
        });
    }

    // Máscara para CNPJ
    function applyCnpjMask() {
        $('.cnpj-mask, input[name*="cnpj"]').mask('00.000.000/0000-00', {
            ...maskOptions,
            translation: {
                '0': { pattern: /[0-9]/ }
            }
        });
    }

    // Máscara para CEP
    function applyCepMask() {
        $('.cep-mask, input[name*="cep"]').mask('00000-000', {
            ...maskOptions,
            translation: {
                '0': { pattern: /[0-9]/ }
            }
        });
    }

    // Máscara para data
    function applyDateMask() {
        $('.date-mask, input[type="date"]').mask('00/00/0000', {
            ...maskOptions,
            translation: {
                '0': { pattern: /[0-9]/ }
            }
        });
    }

    // Máscara para valores monetários usando maskMoney
    function applyMoneyMask() {
        $('.money-mask, .preco-mask').maskMoney({
            prefix: 'R$ ',
            allowNegative: false,
            thousands: '.',
            decimal: ',',
            affixesStay: true,
            precision: 2
        });
    }

    // Função para aplicar máscara personalizada
    function applyCustomMask(selector, pattern, options = {}) {
        $(selector).mask(pattern, {
            ...maskOptions,
            ...options
        });
    }

    // Função para remover todas as máscaras de um elemento
    function removeMask(selector) {
        $(selector).unmask();
    }

    // Função para obter valor limpo (sem máscara)
    function getCleanValue(selector) {
        const $element = $(selector);
        if ($element.hasClass('money-mask') || $element.hasClass('preco-mask')) {
            // Para valores monetários, usar o método do maskMoney
            return $element.maskMoney('unmasked')[0];
        } else {
            // Para outras máscaras, remover caracteres não numéricos
            return $element.val().replace(/\D/g, '');
        }
    }

    // Validadores específicos
    const validators = {
        cpf: function(cpf) {
            cpf = cpf.replace(/\D/g, '');
            
            if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
                return false;
            }

            let sum = 0;
            let remainder;

            // Validação do primeiro dígito
            for (let i = 1; i <= 9; i++) {
                sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
            }
            remainder = (sum * 10) % 11;
            if (remainder === 10 || remainder === 11) remainder = 0;
            if (remainder !== parseInt(cpf.substring(9, 10))) return false;

            // Validação do segundo dígito
            sum = 0;
            for (let i = 1; i <= 10; i++) {
                sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
            }
            remainder = (sum * 10) % 11;
            if (remainder === 10 || remainder === 11) remainder = 0;
            if (remainder !== parseInt(cpf.substring(10, 11))) return false;

            return true;
        },

        cnpj: function(cnpj) {
            cnpj = cnpj.replace(/\D/g, '');

            if (cnpj.length !== 14 || /^(\d)\1{13}$/.test(cnpj)) {
                return false;
            }

            let tamanho = cnpj.length - 2;
            let numeros = cnpj.substring(0, tamanho);
            let digitos = cnpj.substring(tamanho);
            let soma = 0;
            let pos = tamanho - 7;

            for (let i = tamanho; i >= 1; i--) {
                soma += numeros.charAt(tamanho - i) * pos--;
                if (pos < 2) pos = 9;
            }

            let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
            if (resultado !== parseInt(digitos.charAt(0))) return false;

            tamanho = tamanho + 1;
            numeros = cnpj.substring(0, tamanho);
            soma = 0;
            pos = tamanho - 7;

            for (let i = tamanho; i >= 1; i--) {
                soma += numeros.charAt(tamanho - i) * pos--;
                if (pos < 2) pos = 9;
            }

            resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
            if (resultado !== parseInt(digitos.charAt(1))) return false;

            return true;
        },

        phone: function(phone) {
            const cleanPhone = phone.replace(/\D/g, '');
            return cleanPhone.length >= 10 && cleanPhone.length <= 11;
        },

        cep: function(cep) {
            const cleanCep = cep.replace(/\D/g, '');
            return cleanCep.length === 8;
        }
    };

    // Função para adicionar validação visual aos campos
    function addValidationFeedback(selector, validator) {
        $(selector).on('blur', function() {
            const $this = $(this);
            const value = $this.val();
            
            if (value && !validator(value)) {
                $this.addClass('is-invalid').removeClass('is-valid');
                
                // Adicionar feedback visual se não existir
                if (!$this.siblings('.invalid-feedback').length) {
                    $this.after('<div class="invalid-feedback">Formato inválido</div>');
                }
            } else if (value) {
                $this.addClass('is-valid').removeClass('is-invalid');
                $this.siblings('.invalid-feedback').remove();
            } else {
                $this.removeClass('is-valid is-invalid');
                $this.siblings('.invalid-feedback').remove();
            }
        });
    }

    // Aplicar validações aos campos
    function applyValidations() {
        addValidationFeedback('.cpf-mask, input[name*="cpf"]', validators.cpf);
        addValidationFeedback('.cnpj-mask, input[name*="cnpj"]', validators.cnpj);
        addValidationFeedback('.phone-mask, input[name*="phone"], input[name*="telefone"], #Input_PhoneNumber', validators.phone);
        addValidationFeedback('.cep-mask, input[name*="cep"]', validators.cep);
    }

    // Aplicar validações quando o DOM estiver pronto
    $(document).ready(function() {
        applyValidations();
    });

    // Função para replicar máscaras em elementos dinamicamente adicionados
    function reinitializeMasks() {
        initializeMasks();
        applyValidations();
    }

    // Expor funções públicas
    window.MBAMarketplaceMasks = {
        init: initializeMasks,
        reinit: reinitializeMasks,
        applyCustomMask: applyCustomMask,
        removeMask: removeMask,
        getCleanValue: getCleanValue,
        validators: validators
    };

    // Auto-reinicializar máscaras em conteúdo carregado dinamicamente
    $(document).on('DOMNodeInserted', function(e) {
        if ($(e.target).find('input').length > 0) {
            setTimeout(reinitializeMasks, 100);
        }
    });

})();