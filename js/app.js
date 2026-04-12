lucide.createIcons();

// ================= NAVEGAÇÃO SPA =================
function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));

    document.querySelectorAll('.nav-btn').forEach(el => {
        el.classList.remove('bg-blue-50', 'text-blue-700');
        el.classList.add('text-slate-600');
    });

    document.getElementById('tab-' + tabId).classList.add('active');

    const activeBtn = document.getElementById('nav-' + tabId);
    if(activeBtn) {
        activeBtn.classList.remove('text-slate-600');
        activeBtn.classList.add('bg-blue-50', 'text-blue-700');
    }
}


// ================= LÓGICA DE UPLOAD MVP =================
const fileInput = document.getElementById('fileInput');
const fileInfo = document.getElementById('fileInfo');
const docNameInput = document.getElementById('docName');
const docExtBadge = document.getElementById('docExtBadge');
const docExtText = document.getElementById('docExtText');
const uploadForm = document.getElementById('uploadForm');
const projectFileList = document.getElementById('project-file-list');
const emptyState = document.getElementById('empty-state');

let currentExtension = ''; // Variável global para guardar a extensão

// Ao escolher o arquivo
fileInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        // Atualiza a área de drag and drop
        fileInfo.innerHTML = `
            <i data-lucide="file-check" class="mx-auto h-12 w-12 text-emerald-500 mb-2"></i>
            <p class="text-sm font-bold text-emerald-700">${file.name}</p>
            <p class="text-xs text-slate-500">${(file.size / 1024 / 1024).toFixed(2)} MB</p>
        `;
        lucide.createIcons();

        // 1. Extrair o nome e a extensão real do arquivo
        const parts = file.name.split('.');
        if (parts.length > 1) {
            currentExtension = parts.pop().toUpperCase(); // Pega o que vem depois do último ponto
            docNameInput.value = parts.join('.'); // Pega apenas o nome sem a extensão

            // 2. Atualiza a UI mostrando a extensão detectada
            docExtBadge.innerText = currentExtension;
            docExtBadge.classList.replace('bg-slate-300', 'bg-emerald-100');
            docExtBadge.classList.replace('text-slate-700', 'text-emerald-700');
            docExtText.innerText = `Arquivo detectado como .${currentExtension.toLowerCase()}`;
        }
    }
});

// Ao confirmar o Upload
uploadForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const file = fileInput.files[0];
    if (!file) { alert("Ops! Selecione um arquivo clicando na área pontilhada."); return; }
    if (!docNameInput.value) { alert("Digite um nome para o documento!"); return; }

    const fileTempUrl = URL.createObjectURL(file);
    const isPublic = document.getElementById('isPublic').checked;

    // Cor condicional para o ícone dependendo se é público ou privado
    const iconColor = isPublic ? 'text-purple-600' : 'text-blue-600';
    const bgIconColor = isPublic ? 'bg-purple-100' : 'bg-blue-100';
    const publicBadge = isPublic ? `<span class="px-2 py-0.5 bg-purple-100 text-purple-700 rounded text-[10px] font-bold uppercase ml-2">Público</span>` : '';

    // Cria o card do arquivo que vai aparecer na tela de Projetos
    const cardHtml = `
        <div class="p-5 bg-white border border-slate-200 rounded-xl flex justify-between items-center hover:shadow-md transition-shadow">
            <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-lg ${bgIconColor} flex items-center justify-center shrink-0">
                    <span class="text-xs font-bold ${iconColor}">${currentExtension}</span>
                </div>
                <div>
                    <h4 class="font-bold text-slate-900 text-base">${docNameInput.value} ${publicBadge}</h4>
                    <p class="text-xs text-slate-500 mt-1">Adicionado hoje • Processado por IA • Tipo Oficial: .${currentExtension.toLowerCase()}</p>
                </div>
            </div>
            <a href="${fileTempUrl}" target="_blank" class="text-sm bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-700 font-semibold py-2 px-4 rounded-lg transition-colors flex items-center gap-2">
                <i data-lucide="eye" class="w-4 h-4"></i> Visualizar
            </a>
        </div>
    `;

    // Se o empty state (Nenhum arquivo) estiver lá, remove
    if (emptyState) emptyState.style.display = 'none';

    // Adiciona o card novo no TOPO da lista da aba de Projetos
    projectFileList.insertAdjacentHTML('afterbegin', cardHtml);
    lucide.createIcons();

    // Reseta o formulário
    uploadForm.reset();
    currentExtension = '';
    docExtBadge.innerText = '---';
    docExtBadge.classList.replace('bg-emerald-100', 'bg-slate-300');
    docExtBadge.classList.replace('text-emerald-700', 'text-slate-700');
    docExtText.innerText = 'Aguardando...';
    fileInfo.innerHTML = `
        <i data-lucide="upload-cloud" class="mx-auto h-14 w-14 text-blue-500 mb-4"></i>
        <p class="text-base font-semibold text-slate-700">Clique ou arraste o arquivo aqui</p>
        <p class="text-sm text-slate-500 mt-1">Arquivos suportados: PDF, DOCX, PNG, JPG, HTML (Máx: 10MB)</p>
    `;
    lucide.createIcons();

    // Redireciona o usuário direto para a aba de projetos para ver o que ele acabou de enviar!
    switchTab('projetos');
});