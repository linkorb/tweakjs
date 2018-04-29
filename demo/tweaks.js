var tweaks = [
  {
    "description": "Set custom header text",
    "action": "setInnerText",
    "selector": "h1:first-of-type",
    "value": "This is a tweaked header",
  },
  {
    "description": "Set avatar to batman",
    "action": "setAttribute",
    "selector": "img#avatar",
    "attribute": "src",
    "value": "http://www.iconwanted.com/downloads/david-lanham/heroes-and-villains/png/128x128/batman.png",
  },
  {
    "description": "Use Bing for search instead of Google",
    "action": "setAttribute",
    "selector": "a[href='http://google.com']",
    "attribute": "href",
    "value": "http://bing.com",
  },
  {
    "description": "Open search in new tab",
    "action": "setAttribute",
    "selector": "a.search",
    "attribute": "target",
    "value": "_blank",
  },
  {
    "description": "Remove h3 in footer",
    "action": "hide",
    "selector": "footer h3",
  },
  {
    "description": "Show a text that was hidden",
    "action": "show",
    "selector": "footer p",
  },
  {
    "description": "Set header style to underline",
    "action": "setStyleAttribute",
    "selector": "h1",
    "attribute": "text-decoration",
    "value": "underline",
  },
];
