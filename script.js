(function () {
  "use strict";

  var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    World = Matter.World,
    Mouse = Matter.Mouse,
    MouseConstraint = Matter.MouseConstraint,
    Events = Matter.Events;

  var zone = document.getElementById("physics-zone");
  if (!zone) return;

  var elements = zone.querySelectorAll(".physics-el");
  if (!elements.length) return;

  var engine = Engine.create({
    positionIterations: 8,
    velocityIterations: 6,
  });
  var world = engine.world;
  world.gravity.y = 0.8;

  var zoneRect = zone.getBoundingClientRect();
  var ground = Bodies.rectangle(
    zoneRect.width / 2,
    zoneRect.height + 40,
    zoneRect.width + 200,
    80,
    {
      isStatic: true,
      render: { visible: false },
    }
  );
  World.add(world, ground);

  var pairs = [];
  var dropOffset = 350;

  function getZoneRect() {
    return zone.getBoundingClientRect();
  }

  elements.forEach(function (el) {
    var r = getZoneRect();
    var er = el.getBoundingClientRect();
    var cx = er.left - r.left + er.width / 2;
    var cy = er.top - r.top + er.height / 2;
    var w = Math.max(el.offsetWidth, 20);
    var h = Math.max(el.offsetHeight, 20);

    var body = Bodies.rectangle(cx, cy - dropOffset, w, h, {
      restitution: 0.3,
      friction: 0.4,
      frictionAir: 0.01,
      density: 0.002,
      render: { visible: false },
    });
    Body.setPosition(body, { x: cx, y: cy - dropOffset });
    World.add(world, body);
    pairs.push({ el: el, body: body, w: w, h: h });
  });

  var mouse = Mouse.create(zone);
  var mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
      stiffness: 0.2,
      render: { visible: false },
    },
  });
  World.add(world, mouseConstraint);

  function syncDom() {
    var r = getZoneRect();
    pairs.forEach(function (p) {
      var b = p.body;
      var x = b.position.x - p.w / 2;
      var y = b.position.y - p.h / 2;
      p.el.style.left = x + "px";
      p.el.style.top = y + "px";
      p.el.style.transform = "rotate(" + b.angle + "rad)";
    });
  }

  syncDom();
  Events.on(engine, "afterUpdate", syncDom);

  var runner = Runner.create();
  Runner.run(runner, engine);

  window.addEventListener("resize", function () {
    var r = getZoneRect();
    Body.setPosition(ground, { x: r.width / 2, y: r.height + 40 });
  });

  var menuBtn = document.getElementById("menu-btn");
  var navOverlay = document.getElementById("nav-overlay");
  if (menuBtn && navOverlay) {
    var menuDown = { x: 0, y: 0 };
    menuBtn.addEventListener("mousedown", function (e) {
      menuDown.x = e.clientX;
      menuDown.y = e.clientY;
    });
    menuBtn.addEventListener("click", function (e) {
      var dx = e.clientX - menuDown.x;
      var dy = e.clientY - menuDown.y;
      if (dx * dx + dy * dy < 100) {
        e.preventDefault();
        navOverlay.classList.toggle("is-open");
        navOverlay.setAttribute("aria-hidden", navOverlay.classList.contains("is-open") ? "false" : "true");
      }
    });
    navOverlay.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        navOverlay.classList.remove("is-open");
        navOverlay.setAttribute("aria-hidden", "true");
      });
    });
  }
})();
