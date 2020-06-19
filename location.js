function renderAppView(view) {
  if (!view) throw new Error("must provide a view");
  console.log("rendered view:", view);
  if (view == "trash") {
    console.log("estas viendo los notes borrados");
  }
}

function browse(url, callback) {
  history.pushState({}, "", url);
  callback(url);
}

function CreateAppRouter(fn, routes) {
  const { origin: basePath } = window.location;

  return function RouteManager(currentRoute) {
    let { href: path } = window.location;
    path = path.replace(basePath, "");

    console.log("passedin", currentRoute);

    for (const route in routes) {
      if (route === path) return fn(routes[route]);
    }
    return fn("default");
  };
}

function deepLink(router) {
  const links = document.querySelectorAll("a");
  function attachLinkBrowser(link) {
    link.onclick = function (event) {
      event.preventDefault();
      browse(this.href, router);
    };
  }
  links.forEach(attachLinkBrowser);
}

const routes = { "/#trash": "trash", "/": "default" };
const router = CreateAppRouter(renderAppView, routes);

deepLink(router);

renderAppView("default");
