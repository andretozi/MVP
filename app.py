import os
from flask import Flask, render_template, request, jsonify, send_from_directory, redirect, url_for

app = Flask(__name__)

# Configuração da pasta de uploads
UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)


# Rota 1: Tela de Login
@app.route('/')
def login():
    return render_template('login.html')


# Rota 2: O Sistema Principal (Dashboard)
@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html')


# Rota 3: A Mágica para abrir os arquivos salvos
@app.route('/uploads/<filename>')
def uploaded_file(filename):
    # Essa rota permite que o navegador acesse a pasta "uploads" de forma segura
    return send_from_directory(UPLOAD_FOLDER, filename)


# Rota 4: API que recebe o arquivo
@app.route('/api/upload', methods=['POST'])
def upload():
    if 'file' not in request.files:
        return jsonify({'sucesso': False, 'erro': 'Nenhum arquivo enviado'}), 400

    file = request.files['file']
    doc_name = request.form.get('docName', 'Documento Sem Nome')
    is_public = request.form.get('isPublic') == 'true'

    if file.filename == '':
        return jsonify({'sucesso': False, 'erro': 'Arquivo sem nome'}), 400

    # Salva o arquivo fisicamente
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(file_path)

    # Extrai a extensão
    extension = file.filename.split('.')[-1].upper()

    return jsonify({
        'sucesso': True,
        'nomeDocumento': doc_name,
        'nomeArquivo': file.filename,  # Enviamos o nome exato para o Frontend poder criar o link
        'extensao': extension,
        'publico': is_public
    })


if __name__ == '__main__':
    app.run(debug=True, port=5000)