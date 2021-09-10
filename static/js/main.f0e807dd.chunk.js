(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{22:function(e,t,n){e.exports=n(29)},26:function(e,t,n){},29:function(e,t,n){"use strict";n.r(t);var a=n(14),o=n(21),r=n(18),i=n(3),c=n(13),s=n(0),u=n.n(s),l=n(6),v={vertexShader:"\n    varying vec2 vUv; \n\n    void main() {\n      vUv = uv;\n\n      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n    }\n  ",fragmentShader:"\n    precision highp float; \n\n    uniform sampler2D texture;\n    uniform float imageAspectRatio;\n    uniform float aspectRatio;\n    uniform float opacity;\n    uniform float hover;\n    varying vec2 vUv;\n\n    float exponentialInOut(float t) {\n      return t == 0.0 || t == 1.0 \n        ? t \n        : t < 0.5\n          ? +0.5 * pow(2.0, (20.0 * t) - 10.0)\n          : -0.5 * pow(2.0, 10.0 - (t * 20.0)) + 1.0;\n    } \n\n    void main() {\n      vec2 uv = vUv;\n\n      // fix aspectRatio\n      float u = imageAspectRatio/aspectRatio;\n      if(imageAspectRatio > aspectRatio) {\n        u = 1. / u;\n      }\n\n      uv.y *= u;\n      uv.y -= (u)/2.-.5;\n\n      // hover effect\n      float zoomLevel = .2;\n      float hoverLevel = exponentialInOut(min(1., (distance(vec2(.5), uv) * hover) + hover));\n      uv *= 1. - zoomLevel * hoverLevel;\n      uv += zoomLevel / 2. * hoverLevel;\n      uv = clamp(uv, 0., 1.);\n      vec4 color = texture2D(texture, uv);\n      if(hoverLevel > 0.) {\n        hoverLevel = 1.-abs(hoverLevel-.5)*2.;\n        //Pixel displace\n        uv.y += color.r * hoverLevel * .05;\n        color = texture2D(texture, uv);\n        // RGBshift\n        color.r = texture2D(texture, uv+(hoverLevel)*0.01).r;\n        color.g = texture2D(texture, uv-(hoverLevel)*0.01).g;\n      }\n\n      gl_FragColor = mix(vec4(1.,1.,1.,opacity), color, opacity);\n    }\n  ",uniforms:{texture:{type:"t",value:""},imageAspectRatio:{type:"f",value:1},aspectRatio:{type:"f",value:1},opacity:{type:"f",value:1},hover:{type:"f",value:0}}},p=(n(26),["url"]),m=["https://raw.githubusercontent.com/adnjoo/artExplorer/main/assets/mona2.png","https://raw.githubusercontent.com/adnjoo/react-three-fiber-gallery/main/assets/ape.jpg","https://raw.githubusercontent.com/adnjoo/react-three-fiber-gallery/main/assets/picasso.jpeg","https://raw.githubusercontent.com/adnjoo/react-three-fiber-gallery/main/assets/murakami.jpeg","https://raw.githubusercontent.com/adnjoo/react-three-fiber-gallery/main/assets/starry.jpeg"],f=0;function h(){function e(e){var t=e.url,n=Object(o.a)(e,p),r=Object(s.useMemo)(function(){return[(new i.TextureLoader).load(t)]},[t]),l=Object(a.a)(r,1)[0];return u.a.createElement(c.a.mesh,Object.assign({},n,{onClick:function(e){return console.log("test"),void(f+1!=m.length?h(m[++f]):h(m[f=0]))}}),u.a.createElement("planeBufferGeometry",{attach:"geometry",args:[5,7]}),u.a.createElement(c.a.shaderMaterial,{attach:"material",transparent:!0,args:[v],"uniforms-texture-value":l}))}var t=Object(s.useState)("https://raw.githubusercontent.com/adnjoo/artExplorer/main/assets/mona2.png"),n=Object(a.a)(t,2),r=n[0],h=n[1],g=Object(c.b)(function(){return{pos:[0,0,0],scale:[1,1,1],rotation:[0,0,0],config:{mass:10,tension:1e3,friction:300,precision:1e-5}}}),d=Object(a.a)(g,2),b=d[0],x=d[1];return u.a.createElement("div",{className:"main",style:{position:"relative"},onMouseMove:function(e){var t=e.clientX,n=e.clientY,a=t/window.innerWidth*2-1,o=-n/window.innerHeight*2+1;x({pos:[a,0,0],scale:[1-.1*o,1-.1*o,1],rotation:[-o*(Math.PI/3)*.3,a*(Math.PI/3)*.3,0]})}},u.a.createElement(l.a,{pixelRatio:window.devicePixelRatio||1,style:{background:"#272727"},camera:{fov:65,position:[0,0,7]}},u.a.createElement(e,Object.assign({url:r},b))))}Object(r.render)(u.a.createElement(h,null),document.getElementById("root"))}},[[22,1,2]]]);
//# sourceMappingURL=main.f0e807dd.chunk.js.map