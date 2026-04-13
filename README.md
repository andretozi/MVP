# ArchiDocs: Plataforma de Documentação Inteligente

> **Disciplina:** Projeto de Engenharia de Software
> **Instituição:** Universidade Presbiteriana Mackenzie
> **Semestre:** 2026-1

## Visão Geral do Projeto
A plataforma ArchiDocs foi concebida para mitigar o problema da defasagem na documentação técnica, comum em ecossistemas de desenvolvimento ágil. O sistema opera como um hub centralizador de conhecimento, integrando código-fonte, diagramas de arquitetura e artefatos diversos. O diferencial técnico da solução é o emprego de Inteligência Artificial Generativa (LLMs) para interpretar, classificar e estruturar esses documentos de forma automatizada.

A arquitetura final do ecossistema é baseada em microsserviços integrados. Este repositório contempla exclusivamente o **Módulo 2: Ingestão e Gerenciamento de Dados**.

---

## Escopo do Módulo 2: Ingestão de Dados
Este microsserviço atua como a principal interface de entrada da plataforma. É responsável pelo recebimento dos artefatos técnicos, estruturação hierárquica em workspaces e extração preliminar de metadados.

### Funcionalidades do Produto Mínimo Viável (MVP)
* **Gerenciamento de Workspaces:** Criação de projetos modulares com suporte à vinculação de membros da equipe e associação de repositórios do GitHub.
* **Navegação SPA (Single Page Application):** Interface de usuário otimizada para garantir transições fluidas entre o dashboard de projetos e as interfaces de upload, sem recarregamento do navegador.
* **Upload Estruturado:** Módulo de ingestão de arquivos com detecção dinâmica e extração automática de extensões.
* **Isolamento e Integridade de Dados:** Lógica de negócio que garante que cada artefato ingerido seja estritamente vinculado ao seu respectivo projeto, assegurando a organização e privacidade do workspace.
* **Simulação de Classificação via IA (Auto-Tagging):** Na atual versão de front-end, o sistema simula a etapa de processamento analítico, classificando automaticamente os documentos (ex: identificando "Atas de Reunião" ou "Diagramas") com base em heurísticas de nomenclatura, homologando o fluxo para a futura integração com o backend.

---

## Stack Tecnológica
* **Frontend:** HTML5, JavaScript (Vanilla ES6), Tailwind CSS (para estilização utilitária) e Lucide Icons.
* **Backend (Integração Futura):** Python, utilizando os frameworks Flask para a orquestração da API RESTful.
* **Armazenamento (Fase MVP):** Banco de dados em memória (*In-Memory Database* baseado em estruturas de dados do JavaScript) empregado para validação dos fluxos de interface (UX/UI). A persistência definitiva será implementada durante a integração dos microsserviços.

---

## Instruções de Execução Local

Nesta fase de validação de interface e testes de usabilidade, o MVP opera de forma independente e não exige a configuração prévia de servidores locais ou instalação de dependências.

1. **Clone o repositório:**
   ```bash
   git clone [https://github.com/SEU-USUARIO/seu-repositorio.git](https://github.com/SEU-USUARIO/seu-repositorio.git)
