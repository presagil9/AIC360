(function(){
  "use strict";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function ancho(){
    var w = document.documentElement.clientWidth + "px";
    document.querySelectorAll(".aic").forEach(function(r){ r.style.setProperty("--aicvw", w); });
  }

  function hero(root){
    var h = root.querySelector(".aic-hero");
    if(!h) return;
    requestAnimationFrame(function(){ setTimeout(function(){ h.classList.add("is-ready"); }, 60); });
    var imgs = h.querySelectorAll(".aic-hero__media img");
    var dots = h.querySelectorAll(".aic-hero__dots button");
    if(imgs.length < 2) return;
    var i = 0, t;
    function ir(n){
      imgs[i].classList.remove("is-on");
      if(dots[i]){ dots[i].classList.remove("is-on"); dots[i].setAttribute("aria-current","false"); }
      i = (n + imgs.length) % imgs.length;
      imgs[i].classList.add("is-on");
      if(dots[i]){ dots[i].classList.add("is-on"); dots[i].setAttribute("aria-current","true"); }
    }
    function auto(){ clearInterval(t); if(!reduce) t = setInterval(function(){ ir(i + 1); }, 6500); }
    dots.forEach(function(d, k){ d.addEventListener("click", function(){ ir(k); auto(); }); });
    document.addEventListener("visibilitychange", function(){ if(document.hidden) clearInterval(t); else auto(); });
    auto();
  }

  function aparecer(root){
    var els = root.querySelectorAll(".aic-wipe, .aic-proceso, [data-contar]");
    if(!("IntersectionObserver" in window) || reduce){
      els.forEach(function(el){ el.classList.add("is-in"); if(el.hasAttribute("data-contar")) contar(el, true); });
      return;
    }
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(!e.isIntersecting) return;
        if(e.target.__aicWipe) e.target.__aicWipe.forEach(function(w){ w.classList.add("is-in"); });
        if(!e.target.__aicWipe || e.target.matches(".aic-wipe, .aic-proceso, [data-contar]")) e.target.classList.add("is-in");
        if(e.target.hasAttribute("data-contar")) contar(e.target, false);
        io.unobserve(e.target);
      });
    }, { rootMargin: "0px 0px -12% 0px", threshold: 0.12 });
    els.forEach(function(el){
      // Un elemento recortado con clip-path no cuenta como visible: se observa su contenedor.
      if(el.classList.contains("aic-wipe")){ el.parentElement.__aicWipe = (el.parentElement.__aicWipe || []).concat(el); io.observe(el.parentElement); }
      else io.observe(el);
    });
  }

  function contar(el, ya){
    var fin = parseFloat(el.getAttribute("data-contar"));
    var fmt = function(n){ return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, "."); };
    if(ya){ el.textContent = fmt(fin); return; }
    var t0 = null, dur = 1400;
    function paso(ts){
      if(!t0) t0 = ts;
      var p = Math.min((ts - t0) / dur, 1);
      el.textContent = fmt(fin * (1 - Math.pow(1 - p, 3)));
      if(p < 1) requestAnimationFrame(paso);
    }
    requestAnimationFrame(paso);
  }

  var visor, vImg, vCap, vCont, lista = [], pos = 0, origen = null;
  var ico = {
    x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>',
    l: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="m15 5-7 7 7 7"/></svg>',
    r: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="m9 5 7 7-7 7"/></svg>'
  };
  function crearVisor(){
    if(visor) return;
    visor = document.createElement("div");
    visor.className = "aic-visor";
    visor.setAttribute("role","dialog");
    visor.setAttribute("aria-modal","true");
    visor.setAttribute("aria-label","Visor de imágenes");
    visor.innerHTML = '<span class="aic-visor__cont"></span><figure><img alt=""><figcaption></figcaption></figure>' +
      '<button type="button" class="aic-visor__cerrar" aria-label="Cerrar">' + ico.x + '</button>' +
      '<button type="button" class="aic-visor__ant" aria-label="Imagen anterior">' + ico.l + '</button>' +
      '<button type="button" class="aic-visor__sig" aria-label="Imagen siguiente">' + ico.r + '</button>';
    document.body.appendChild(visor);
    vImg = visor.querySelector("img"); vCap = visor.querySelector("figcaption"); vCont = visor.querySelector(".aic-visor__cont");
    visor.querySelector(".aic-visor__cerrar").addEventListener("click", cerrar);
    visor.querySelector(".aic-visor__ant").addEventListener("click", function(){ mostrar(pos - 1); });
    visor.querySelector(".aic-visor__sig").addEventListener("click", function(){ mostrar(pos + 1); });
    visor.addEventListener("click", function(e){ if(e.target === visor) cerrar(); });
    document.addEventListener("keydown", function(e){
      if(!visor.classList.contains("is-open")) return;
      if(e.key === "Escape") cerrar();
      else if(e.key === "ArrowLeft") mostrar(pos - 1);
      else if(e.key === "ArrowRight") mostrar(pos + 1);
      else if(e.key === "Tab"){
        var b = visor.querySelectorAll("button"), first = b[0], last = b[b.length - 1];
        if(e.shiftKey && document.activeElement === first){ e.preventDefault(); last.focus(); }
        else if(!e.shiftKey && document.activeElement === last){ e.preventDefault(); first.focus(); }
      }
    });
    var x0 = null;
    visor.addEventListener("touchstart", function(e){ x0 = e.touches[0].clientX; }, { passive: true });
    visor.addEventListener("touchend", function(e){
      if(x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0;
      if(Math.abs(dx) > 50) mostrar(pos + (dx < 0 ? 1 : -1));
      x0 = null;
    });
  }
  function mostrar(n){
    pos = (n + lista.length) % lista.length;
    var b = lista[pos], im = b.querySelector("img");
    vImg.src = b.getAttribute("data-full") || im.currentSrc || im.src;
    vImg.alt = im.alt;
    vCap.textContent = b.getAttribute("data-cap") || im.alt;
    vCont.textContent = (pos + 1) + " / " + lista.length;
  }
  function cerrar(){
    visor.classList.remove("is-open");
    document.documentElement.style.overflow = "";
    if(origen) origen.focus();
  }
  function galerias(root){
    root.querySelectorAll("[data-galeria]").forEach(function(g){
      var bs = Array.prototype.slice.call(g.querySelectorAll("button"));
      bs.forEach(function(b, k){
        b.addEventListener("click", function(){
          crearVisor();
          lista = bs; origen = b;
          mostrar(k);
          visor.classList.add("is-open");
          document.documentElement.style.overflow = "hidden";
          visor.querySelector(".aic-visor__cerrar").focus();
        });
      });
    });
  }

  function areas(root){
    var imgs = root.querySelectorAll(".aic-area__img img[data-src]");
    if(!imgs.length) return;
    var hover = window.matchMedia && window.matchMedia("(hover: hover)").matches;
    if(!hover) return;
    var cargar = function(){ imgs.forEach(function(i){ if(!i.getAttribute("src")) i.src = i.getAttribute("data-src"); }); };
    if("IntersectionObserver" in window){
      var io = new IntersectionObserver(function(e){ if(e[0].isIntersecting){ cargar(); io.disconnect(); } }, { rootMargin: "400px 0px" });
      io.observe(root.querySelector(".aic-areas"));
    } else cargar();
  }
  function mapas(root){
    root.querySelectorAll("[data-mapa]").forEach(function(m){
      var frame = m.querySelector("iframe");
      var tabs = m.querySelectorAll("[data-q]");
      tabs.forEach(function(t){
        t.addEventListener("click", function(){
          tabs.forEach(function(o){ o.setAttribute("aria-selected", o === t ? "true" : "false"); });
          frame.src = "https://maps.google.com/maps?q=" + encodeURIComponent(t.getAttribute("data-q")) + "&z=15&output=embed";
          frame.title = "Mapa: " + t.textContent;
        });
      });
    });
  }

  function formularios(root){
    root.querySelectorAll("form[data-mailto]").forEach(function(f){
      var aviso = f.querySelector(".aic-aviso");
      function err(campo, msg){
        var e = f.querySelector('[data-err="' + campo.name + '"]');
        campo.setAttribute("aria-invalid", msg ? "true" : "false");
        if(e) e.textContent = msg || "";
        return !msg;
      }
      function validar(campo){
        if(campo.type === "checkbox") return err(campo, campo.checked ? "" : "Marca la casilla para poder enviarnos tus datos.");
        var v = campo.value.trim();
        if(campo.required && !v) return err(campo, "Este campo es obligatorio.");
        if(campo.type === "email" && v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return err(campo, "Escribe un correo válido.");
        if(campo.name === "telefono" && v && v.replace(/[^\d]/g, "").length < 9) return err(campo, "Mínimo 9 cifras.");
        return err(campo, "");
      }
      f.querySelectorAll("input[name], textarea[name]").forEach(function(c){
        if(c.type === "radio") return;
        c.addEventListener("blur", function(){ if(c.value.trim() && c.type !== "checkbox") validar(c); });
        c.addEventListener(c.type === "checkbox" ? "change" : "input", function(){ if(c.getAttribute("aria-invalid") === "true") validar(c); });
      });
      f.addEventListener("submit", function(e){
        e.preventDefault();
        var ok = true, primero = null;
        f.querySelectorAll("[required]").forEach(function(c){
          if(!validar(c)){ ok = false; if(!primero) primero = c; }
        });
        if(!ok){ primero.focus(); return; }
        var d = new FormData(f);
        var tipo = d.get("tipo") || "Sin especificar";
        var cuerpo = [
          "Nombre: " + d.get("nombre"),
          "Empresa: " + (d.get("empresa") || "-"),
          "Correo: " + d.get("email"),
          "Teléfono: " + (d.get("telefono") || "-"),
          "Tipo de proyecto: " + tipo,
          "Ubicación de la obra: " + (d.get("ubicacion") || "-"),
          "",
          d.get("mensaje")
        ].join("\n");
        var asunto = "Consulta web: " + tipo + " - " + d.get("nombre");
        window.location.href = "mailto:" + f.getAttribute("data-mailto") + "?subject=" + encodeURIComponent(asunto) + "&body=" + encodeURIComponent(cuerpo);
        if(aviso){ aviso.classList.add("is-on"); aviso.focus(); }
      });
    });
  }

  function init(){
    ancho();
    document.querySelectorAll(".aic:not([data-aic-ok])").forEach(function(root){
      root.setAttribute("data-aic-ok", "");
      root.classList.add("aic-js");
      hero(root); aparecer(root); areas(root); galerias(root); mapas(root); formularios(root);
    });
  }
  var rt;
  window.addEventListener("resize", function(){ clearTimeout(rt); rt = setTimeout(ancho, 100); });
  if(document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
