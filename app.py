import os
from flask import Flask, render_template, request, jsonify, send_from_directory

app = Flask(__name__, static_folder='static', template_folder='.')

# Configuração da pasta de uploads
UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)


# Rota 1: Tela de Login (Se existir o login.html)
@app.route('/')
def login():
    return render_template('login.html')


# Rota 2: O Sistema Principal (Dashboard)
@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html')


# Rota 3: Para abrir os arquivos salvos
@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)


# --- NOSSA LÓGICA DE IA ---
def simular_ia_classificacao(nome_arquivo):
    nome_lower = nome_arquivo.lower()
    if 'ata' in nome_lower or 'reuniao' in nome_lower:
        return 'Ata de Reunião'
    elif 'req' in nome_lower or 'funcional' in nome_lower:
        return 'Especificação de Requisitos'
    elif 'diagrama' in nome_lower or 'uml' in nome_lower:
        return 'Diagrama de Arquitetura'
    return 'Documento Técnico'


# Rota 4: API que recebe o arquivo
@app.route('/api/upload', methods=['POST'])
def upload():
    if 'file' not in request.files:
        return jsonify({'sucesso': False, 'erro': 'Nenhum arquivo enviado'}), 400

    file = request.files['file']
    doc_name = request.form.get('docName', 'Documento Sem Nome')
    id_projeto = request.form.get('projetoId')  # Agora o python sabe de qual projeto é!
    is_public = request.form.get('isPublic') == 'true'

    if file.filename == '':
        return jsonify({'sucesso': False, 'erro': 'Arquivo sem nome'}), 400

    # Salva o arquivo fisicamente
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(file_path)

    # Extrai a extensão
    extension = file.filename.split('.')[-1].upper()

    # Chama a nossa "IA"
    classificacao = simular_ia_classificacao(doc_name)

    return jsonify({
        'sucesso': True,
        'nomeDocumento': doc_name,
        'nomeArquivo': file.filename,
        'extensao': extension,
        'classificacaoIA': classificacao,
        'projetoId': id_projeto,
        'publico': is_public
    })


if __name__ == '__main__':
    app.run(debug=True, port=5000)