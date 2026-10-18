/* weCare Sport-fysiotherapie — kleine scripts. De site blijft bruikbaar zonder JavaScript. */
(function () {
  "use strict";

  /* Openingstijden: pas hier aan (0 = zondag). null = gesloten.
     Let op: ook aanpassen in de HTML (footer + contact) en in het schema in de <head>. */
  var HOURS = {
    0: null,
    1: ["08:00", "20:00"],
    2: ["08:00", "20:00"],
    3: ["08:00", "18:00"],
    4: ["08:00", "20:00"],
    5: ["08:00", "17:00"],
    6: ["09:00", "12:00"]
  };

  /* Mobiel menu */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("hoofdmenu");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.querySelector(".nav-toggle__label").textContent = open ? "Sluiten" : "Menu";
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) { toggle.click(); toggle.focus(); }
    });
  }

  /* Lijntje onder de header zodra je scrolt */
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () { header.classList.toggle("is-scrolled", window.scrollY > 8); };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* "Nu geopend" kaartje + vandaag markeren in de openingstijden */
  var now = new Date();
  var day = now.getDay();
  var minutes = now.getHours() * 60 + now.getMinutes();
  var toMin = function (t) { var p = t.split(":"); return +p[0] * 60 + +p[1]; };
  var today = HOURS[day];
  var names = ["zondag", "maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag"];

  var card = document.querySelector("[data-today]");
  if (card) {
    var state = card.querySelector(".today__label");
    var hours = card.querySelector(".today__hours");
    if (today && minutes >= toMin(today[0]) && minutes < toMin(today[1])) {
      card.classList.add("is-open");
      state.textContent = "Nu geopend";
      hours.textContent = "Vandaag tot " + today[1] + " uur";
    } else if (today && minutes < toMin(today[0])) {
      state.textContent = "Nu gesloten";
      hours.textContent = "Vandaag open vanaf " + today[0] + " uur";
    } else {
      state.textContent = "Nu gesloten";
      var next = 1;
      while (!HOURS[(day + next) % 7] && next < 7) next++;
      var nd = (day + next) % 7;
      hours.textContent = (next === 1 ? "Morgen" : "Op " + names[nd]) + " weer open vanaf " + HOURS[nd][0] + " uur";
    }
  }
  var row = document.querySelector('.hours li[data-day="' + day + '"]');
  if (row) row.classList.add("is-today");

  /* Melding na versturen van een formulier (?verzonden=1 / ?fout=1) */
  var params = new URLSearchParams(window.location.search);
  var ok = document.getElementById("form-ok");
  var err = document.getElementById("form-error");
  if (ok && params.get("verzonden") === "1") { ok.hidden = false; ok.focus(); }
  if (err && params.get("fout") === "1") { err.hidden = false; err.focus(); }

  /* Knop "Toon placeholders" (alleen aanwezig in de conceptversie) */
  var ph = document.querySelector(".ph-toggle");
  if (ph) {
    var setPh = function (on) {
      document.documentElement.classList.toggle("show-ph", on);
      ph.setAttribute("aria-pressed", on ? "true" : "false");
      try { localStorage.setItem("wecare-ph", on ? "1" : "0"); } catch (e) {}
    };
    var saved = null;
    try { saved = localStorage.getItem("wecare-ph"); } catch (e) {}
    setPh(saved === "1");
    ph.addEventListener("click", function () { setPh(ph.getAttribute("aria-pressed") !== "true"); });
  }

  /* Jaartal in footer */
  var y = document.querySelector("[data-year]");
  if (y) y.textContent = now.getFullYear();
})();
