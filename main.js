function main()
{
    var canvas = document.getElementById("myCanvas");
    var gl = canvas.getContext("webgl");

    var vertices = [
        -0.2, 0.3,  //titik A
        0.1, 0.3,   //titik B
        0.1, 0.2,   //titik C
        -0.1, 0.2,  //titik D
        -0.1, 0.1,  //titik E
        0.07, 0.1,  //titik F
        0.07, 0.0,  //titik G
        -0.1, 0.0,  //titik H
        -0.1, -0.1, //titik I
        -0.1, -0.1, //titik J
        -0.1, -0.2, //titik K
        -0.2, -0.2, //titik L
    ];

    var positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    
    var vertextShaderCode =`
    attribute vec2 a_Position;
    void main(){
        gl_Position = vec4(a_Position, 0.0, 1.0);
        gl_PointSize = 20.0;
    }
    `;

    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertextShaderCode);
    gl.compileShader(vertexShader);

    // Menentukan fragment
    var fragmentShaderCode = `
    void main(){
        gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0);
    }
    `;

    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderCode);
    gl.compileShader(fragmentShader);

    gl.lineWidth(0.1);

    var shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    gl.useProgram(shaderProgram);

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    var aPosition = gl.getAttribLocation(shaderProgram, "a_Position");
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aPosition);

    gl.clearColor(1.0, 1.0, 1.0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.LINE_LOOP, 0, 12);
}