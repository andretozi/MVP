// Renderiza os ícones
lucide.createIcons();

// Quando o formulário for enviado, redireciona para o Dashboard
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Evita recarregar a página

    // Na vida real aqui teria uma validação de banco, mas pro MVP vamos direto:
    window.location.href = 'dashboard.html';
});