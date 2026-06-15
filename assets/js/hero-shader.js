// 封面流光背景（原生 WebGL，近似还原 Axion 的 Swirl + ChromaFlow + FlutedGlass + FilmGrain）。
// 主色山大红。无 WebGL 或减弱动效时退化为静态一帧/CSS 渐变。
function initHeroShader(reduced){
  const cv=document.getElementById("heroShader");
  if(!cv) return;
  const gl=cv.getContext("webgl")||cv.getContext("experimental-webgl");
  if(!gl) return; // 退化：CSS 渐变兜底（见 .hero-shader 背景）

  const vsrc="attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}";
  const fsrc=`
  precision highp float;
  uniform vec2 uRes; uniform float uTime; uniform vec2 uMouse;
  float hash(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}
  float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
    float a=hash(i),b=hash(i+vec2(1,0)),c=hash(i+vec2(0,1)),d=hash(i+vec2(1,1));
    return mix(mix(a,b,f.x),mix(c,d,f.x),f.y);}
  float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<5;i++){v+=a*noise(p);p*=2.0;a*=.5;}return v;}
  void main(){
    vec2 uv=gl_FragCoord.xy/uRes.xy;
    float ar=uRes.x/uRes.y;
    vec2 p=vec2(uv.x*ar,uv.y);
    float t=uTime*0.022;
    float PI=3.14159265;
    // 缓动的柔和底场（漩涡）
    vec2 q=vec2(fbm(p*1.05+t),fbm(p*1.05+vec2(4.2,1.3)-t));
    // 竖向凹槽玻璃
    float freq=34.0;
    float ridge=fract(p.x*freq);
    float lens=sin(ridge*PI);                 // 0 边缘 -> 1 中心
    float warp=(ridge-0.5)*0.05;              // 折射横向偏移
    float fr=fbm(vec2(p.x+warp,p.y)*1.05+q*1.15);
    // 底：浅灰 -> 近白
    vec3 col=mix(vec3(0.90),vec3(0.995),fr);
    // 凹槽明暗 + 细高光（玻璃感）
    col*=0.93+0.07*lens;
    col+=smoothstep(0.93,1.0,lens)*0.10;
    // 山大红：仅凹槽缝隙处极淡折射光，随底场明暗
    vec3 sdu=vec3(0.620,0.105,0.196); // #9E1B32
    float seam=pow(1.0-lens,2.5);
    col=mix(col,sdu,clamp(seam*(0.05+0.09*fr),0.0,0.15));
    // 一处缓慢柔光（右上）+ 鼠标处微光，都很淡
    vec2 g1=vec2((0.82+0.05*sin(uTime*0.05))*ar,0.74);
    col=mix(col,sdu,smoothstep(0.5,0.0,distance(p,g1))*0.07);
    vec2 mp=vec2(uMouse.x*ar,uMouse.y);
    col=mix(col,sdu,smoothstep(0.2,0.0,distance(p,mp))*0.09);
    // 颗粒（FilmGrain）
    col+=hash(gl_FragCoord.xy+fract(uTime))*0.035-0.017;
    gl_FragColor=vec4(col,1.0);
  }`;

  function sh(type,src){const s=gl.createShader(type);gl.shaderSource(s,src);gl.compileShader(s);return s;}
  const prog=gl.createProgram();
  gl.attachShader(prog,sh(gl.VERTEX_SHADER,vsrc));
  gl.attachShader(prog,sh(gl.FRAGMENT_SHADER,fsrc));
  gl.linkProgram(prog);
  if(!gl.getProgramParameter(prog,gl.LINK_STATUS)) return;
  gl.useProgram(prog);
  const buf=gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER,buf);
  gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),gl.STATIC_DRAW);
  const loc=gl.getAttribLocation(prog,"p");
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc,2,gl.FLOAT,false,0,0);
  const uRes=gl.getUniformLocation(prog,"uRes");
  const uTime=gl.getUniformLocation(prog,"uTime");
  const uMouse=gl.getUniformLocation(prog,"uMouse");

  const DPR=Math.min(devicePixelRatio||1,1.5);
  let mx=0.5,my=0.5,tmx=0.5,tmy=0.5;
  function resize(){const r=cv.getBoundingClientRect();cv.width=Math.max(1,r.width*DPR);cv.height=Math.max(1,r.height*DPR);gl.viewport(0,0,cv.width,cv.height);}
  resize(); addEventListener("resize",resize,{passive:true});
  addEventListener("mousemove",e=>{const r=cv.getBoundingClientRect();tmx=(e.clientX-r.left)/r.width;tmy=1.0-(e.clientY-r.top)/r.height;},{passive:true});

  function frame(now){
    mx+=(tmx-mx)*0.06; my+=(tmy-my)*0.06;
    gl.uniform2f(uRes,cv.width,cv.height);
    gl.uniform1f(uTime,now*0.001);
    gl.uniform2f(uMouse,mx,my);
    gl.drawArrays(gl.TRIANGLES,0,3);
    if(!reduced) requestAnimationFrame(frame);
  }
  if(reduced){ frame(0); } else { requestAnimationFrame(frame); }
}
