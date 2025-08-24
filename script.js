document.addEventListener('DOMContentLoaded', () => {

    // --- 1. ANIMAÇÃO DE DIGITAÇÃO ---
    const elementoTitulo = document.querySelector('#titulo-animado');
    if (elementoTitulo) {
        const texto = elementoTitulo.innerHTML;
        elementoTitulo.innerHTML = '';

        function typeWriter(text, i) {
            if (i < text.length) {
                elementoTitulo.innerHTML += text.charAt(i);
                setTimeout(() => typeWriter(text, i + 1), 100);
            }
        }
        typeWriter(texto, 0);
    }


    // --- 2. LÓGICA DO MENU RESPONSIVO ---
    const botaoMenu = document.querySelector('.botao-menu');
    const menuNav = document.querySelector('.menu');
    const menuLinks = document.querySelector('#menu-links');

    if (botaoMenu && menuNav) {
        botaoMenu.addEventListener('click', () => {
            menuNav.classList.toggle('ativo');
            const menuAtivo = menuNav.classList.contains('ativo');
            botaoMenu.setAttribute('aria-expanded', menuAtivo);
            if (menuAtivo) {
              botaoMenu.setAttribute('aria-label', 'Fechar Menu');
            } else {
              botaoMenu.setAttribute('aria-label', 'Abrir Menu');
            }
        });
    }
    
    // Fecha o menu ao clicar em um link
    if(menuLinks){
        menuLinks.addEventListener('click', () => {
            menuNav.classList.remove('ativo');
            botaoMenu.setAttribute('aria-expanded', false);
            botaoMenu.setAttribute('aria-label', 'Abrir Menu');
        });
    }


    // --- 3. VALIDAÇÃO DO FORMULÁRIO DE CONTATO ---
    const form = document.getElementById('form-contato');
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Impede o envio padrão do formulário

            const nomeInput = document.getElementById('nome');
            const emailInput = document.getElementById('email');
            const mensagemInput = document.getElementById('mensagem');

            let ehValido = true;

            // Limpa erros anteriores
            limparErros();

            // Validação do nome
            if (nomeInput.value.trim() === '') {
                mostrarErro(nomeInput, 'Por favor, preencha seu nome.');
                ehValido = false;
            }

            // Validação do email
            if (emailInput.value.trim() === '') {
                mostrarErro(emailInput, 'Por favor, preencha seu e-mail.');
                ehValido = false;
            } else if (!validarEmail(emailInput.value)) {
                mostrarErro(emailInput, 'Por favor, insira um e-mail válido.');
                ehValido = false;
            }
            
            // Validação da mensagem
            if (mensagemInput.value.trim() === '') {
                mostrarErro(mensagemInput, 'Por favor, deixe uma mensagem.');
                ehValido = false;
            }

            // Se tudo estiver válido, envia o formulário
            if (ehValido) {
                form.submit();
            }
        });
    }

    function mostrarErro(input, mensagem) {
        input.classList.add('com-erro');
        const spanErro = input.nextElementSibling;
        spanErro.innerText = mensagem;
        spanErro.style.display = 'block';
    }

    function limparErros() {
        const inputsComErro = document.querySelectorAll('.com-erro');
        inputsComErro.forEach(input => input.classList.remove('com-erro'));
        
        const mensagensErro = document.querySelectorAll('.mensagem-erro');
        mensagensErro.forEach(msg => msg.style.display = 'none');
    }
    
    function validarEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }
});