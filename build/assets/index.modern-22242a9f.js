import"./index-9161d9d4.js";function p(r){try{if(r.split(".").length!==3||typeof r!="string")return null;var e=r.split(".")[1],n="=".repeat((4-e.length%4)%4),o=e.replace("-","+").replace("_","/")+n,a=decodeURIComponent(window.atob(o).split("").map(function(t){return"%"+("00"+t.charCodeAt(0).toString(16)).slice(-2)}).join("")),i=JSON.parse(a);return i}catch{return null}}export{p as d};
