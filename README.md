tweak.js
========

This simple javascript library allows you to tweak the DOM of your pages simply by passing it an array of tweaks.

## Use-cases:

tweak.js can be used to quickly implement:

* A/B Testing
* Text corrections
* Replace images, styles, etc

Anybody can change tweaks:

* Without changes to the underlying application
* Without developer support
* Without delay

## Installation
```
npm install @linkorb/tweakjs
```

## Demo

Check the `demo/` directory for an demonstration + example on how to use tweak.js

## How to use

To support tweak.js in your application, you'll need to include two tags in the `<head />` of your application:

```html
<script type="text/javascript" src="../tweak.js"></script>
```
`tweak.js` is responsible for parsing and executing the tweaks. 
__Tweaks__ are JavaScript objects which describes how to tweak. Here is an example of an array of tweaks:
```js
var tweaks = [
    {
        "description": "Set custom header text",
        "action": "setInnerText",
        "selector": "h1:first-of-type",
        "value": "This is a my custom header text",
    },
    {
        "description": "Change background color",
        "action": "setStyleAttribute",
        "selector": "body",
        "attribute": "background-color",
        "value": "#c0d0e0",
    }
];
```
The __tweaks__ shall be loaded separately.

## Loading tweaks

There are 3 ways to load tweaks
1. __Load tweaks from global variable__ - It should simply define a variable called `tweaks` that contains an array of tweak instructions. This array should be loaded before `tweak.js`
```html
<script type="text/javascript" src="https://my.host/path/to/my/tweaks.js"></script>
<script type="text/javascript" src="../tweak.js"></script>
```
2. __Load tweaks in the document__ - A variable `tweakjs` is exposed to the global scope. Therefore, after the `tweak.js` gets loaded, you can still add tweaks like this in your HTML:
```html
<script>
tweakjs.loader.load(
  [
    {
        "description": "Set div text to bold",
        "action": "setInnerText",
        "selector": ".post-load>div",
        "value": "This text is replaced after pageload.",
    },
    {
        "description": "Set custom inner HTML",
        "action": "setInnerHtml",
        "selector": ".post-load>span",
        "value": "<i>Italic</i>",
    }
  ]
)
</script>
```
3. __Load tweaks from external resource__ - Add a URL query parameter `tweaksUrl` to specify an external js file.
```
http://localhost:8080/demo?tweaksUrl=https://my.host/path/to/my/tweaks.js
```

## Supported actions
* setInnerText
* setInnerHtml
* setAttribute
* setStyleAttribute
* addClass
* hide
* show
* removeClass
* remove
* addStyle
* addScript
* execute

You can find demo's of all the actions in the `demo/` directory.

## Build from source
To change the source file and build, simply use `webpack`.
```
# generates dist/tweak.js
webpack -d
# generates dist/tweak.min.js
webpack -p
```

## Advanced usage

* In A/B testing scenarios, you could have a server generate tweaks.js based on visitor properties
* You could have your app generate the `tweaks` variable server-side and include it in the script tag's body (instead of the src attribute)

## License

MIT (see [LICENSE](LICENSE))

## Brought to you by the LinkORB Engineering team

<img src="http://www.linkorb.com/d/meta/tier1/images/linkorbengineering-logo.png" width="200px" /><br />
Check out our other projects at [linkorb.com/engineering](http://www.linkorb.com/engineering).

Btw, we're hiring!
