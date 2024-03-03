from flask import Flask, request, jsonify
import subprocess
import sys
from flask_cors import CORS
app = Flask(__name__)
CORS(app)  # 这将使你的应用支持CORS

@app.route('/run-code', methods=['POST'])
def store_code():
    # 获取请求中的代码
    code = request.json.get('code')

    # 将代码写入临时文件
    with open('temp.py', 'w') as file:
        file.write(code)

    return jsonify({'message': 'Code received'})

@app.route('/run-code', methods=['GET'])
def run_code():
    # 使用Python运行代码并获取输出
    result = subprocess.run([sys.executable, 'temp.py'], capture_output=True, text=True)

    # 返回结果
    return jsonify({
        'stdout': result.stdout,
        'stderr': result.stderr
    })

if __name__ == '__main__':
    app.run(host='137.117.174.215', port=8080)