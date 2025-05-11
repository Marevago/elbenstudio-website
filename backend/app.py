from flask import Flask, request, jsonify, make_response
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import os
from dotenv import load_dotenv

# Carrega variáveis de ambiente
load_dotenv()

app = Flask(__name__)

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', 'https://www.elben.com.br')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    response.headers.add('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    return response

@app.route('/api/contact', methods=['OPTIONS'])
def handle_options():
    response = make_response()
    response.headers.add('Access-Control-Allow-Origin', 'https://www.elben.com.br')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    response.headers.add('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    return response

# Configuração do banco de dados
database_url = os.getenv('DATABASE_URL', 'sqlite:///contacts.db')
if database_url.startswith('postgres://'):
    database_url = database_url.replace('postgres://', 'postgresql://', 1)

app.config['SQLALCHEMY_DATABASE_URI'] = database_url
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Modelo do banco de dados
class Contact(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    phone = db.Column(db.String(20))
    service = db.Column(db.String(50), nullable=False)
    message = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'phone': self.phone,
            'service': self.service,
            'message': self.message,
            'created_at': self.created_at.isoformat()
        }

# Criar o banco de dados
with app.app_context():
    db.create_all()

@app.route('/api/contact', methods=['POST'])
def submit_contact():
    try:
        data = request.json
        
        # Criar novo contato
        new_contact = Contact(
            name=data['name'],
            email=data['email'],
            phone=data.get('phone', ''),
            service=data['service'],
            message=data.get('message', '')
        )
        
        # Salvar no banco de dados
        db.session.add(new_contact)
        db.session.commit()
        
        return jsonify({
            'status': 'success',
            'message': 'Mensagem recebida com sucesso!',
            'contact': new_contact.to_dict()
        }), 201
        
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 400

# Rota para listar contatos (útil para teste)
@app.route('/api/contacts', methods=['GET'])
def list_contacts():
    contacts = Contact.query.order_by(Contact.created_at.desc()).all()
    return jsonify([contact.to_dict() for contact in contacts])

if __name__ == '__main__':
    app.run(debug=True)
