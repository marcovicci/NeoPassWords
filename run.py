from flask import Flask, render_template, jsonify, request, g
import sqlite3
app = Flask(__name__)

PWDB = 'passwords.db'

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/pass', methods = ['POST', 'GET'])
def pass_list():
    db = sqlite3.connect(PWDB)
    passwords = []
    if request.method == 'POST':
        entry = str(request.json)
        print(entry)
        cur = db.execute('SELECT * FROM passfreq WHERE field1 LIKE \'%' + entry + '%\' ORDER BY 2 DESC LIMIT 200')
    else:
        cur = db.execute('SELECT * FROM passfreq LIMIT 200')
    for row in cur:
        print(row)
        passwords.append(list(row))
    db.close()
    return jsonify(passwords)

@app.route('/random', methods=['GET'])
def random_pass():
    db = sqlite3.connect(PWDB)
    passwords = []
    cur = db.execute('SELECT * FROM passfreq WHERE id IN (SELECT id FROM passfreq ORDER BY RANDOM() LIMIT 200)')
    for row in cur:
        print(row)
        passwords.append(list(row))
    db.close()
    return jsonify(passwords)
