function runCode() {
    // 获取文本框中的内容
    var code = document.getElementById('code-input').value;
    // var code = 'print("Hello world")';
    // 发送到服务器
    fetch('http://137.117.174.215:8080/run-code', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ code: code })
    })
        .then(response => response.json())
        .then(data => {
            // 解析JSON字符串
            var parsedData = JSON.parse(data);
            // 在这里处理服务器返回的数据
            console.log(parsedData);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}