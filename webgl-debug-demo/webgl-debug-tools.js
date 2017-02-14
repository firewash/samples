function getWebGLContext (_canvas, width, height) {
    let canvas = null;
    if (typeof _canvas === 'string') {
        canvas = document.getElementById(_canvas);
    }
    canvas.width = width || canvas.offsetWidth;
    canvas.height = height || canvas.offsetHeight;

    let gl = null;
    try {
        gl = canvas.getContext('experimental-webgl');   // 从canvas中获取webgl上下文
        gl.viewport(0, 0, canvas.width, canvas.height);     // 设置视口
        // gl.clearColor(0.0, 0.0, 0.0, 1.0);
        // gl.clear(gl.COLOR_BUFFER_BIT);
    } catch (e) {
        const msg = `Error creating WebGL Context!: ${e.toString()}`;
        alert(msg);  // 弹出错误信息
    }
    return gl;
}

function ShaderSourceFromScript(scriptID) {
    let shaderScript = document.getElementById(scriptID);
    if (shaderScript == null) return '';

    let sourceCode = '';
    let child = shaderScript.firstChild;
    while (child) {
        if (child.nodeType === child.TEXT_NODE) {
            sourceCode += child.textContent;
        }
        child = child.nextSibling;
    }

    return sourceCode;
}

function createShaders(gl, vertextShaderScript, fragmentShaderScript) {
    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(vertexShader, ShaderSourceFromScript(vertextShaderScript));
    gl.shaderSource(fragmentShader, ShaderSourceFromScript(fragmentShaderScript));
    gl.compileShader(vertexShader);
    gl.compileShader(fragmentShader);

    var shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    if( !gl.getProgramParameter( shaderProgram, gl.LINK_STATUS ))
    {
        alert( "Shader 初始化失败" );
        return null;
    }
    gl.useProgram(shaderProgram);
    return {
        gl,
        vertexShader,
        fragmentShader,
        shaderProgram
    }
}
