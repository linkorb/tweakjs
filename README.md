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

## Demo

Check the `demo/` directory for an demonstration + example on how to use tweak.js

## How to use

To support tweak.js in your application, you'll need to include two tags in the `<head />` of your application:

```html
<script type="text/javascript" src="https://my.host/path/to/my/tweaks.js"></script>
<script type="text/javascript" src="../tweak.js"></script>
```

Your custom `tweaks.js` looks like this:

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
    },
];
```

It should simply define a variable called `tweaks` that contains an array of tweak instructions.

## Advanced usage

* In A/B testing scenarios, you could have a server generate tweaks.js based on visitor properties
* You could have your app generate the `tweaks` variable server-side and include it in the script tag's body (instead of the src attribute)

## License

MIT (see [LICENSE](LICENSE))

## Brought to you by the LinkORB Engineering team

<img src="http://www.linkorb.com/d/meta/tier1/images/linkorbengineering-logo.png" width="200px" /><br />
Check out our other projects at [linkorb.com/engineering](http://www.linkorb.com/engineering).

Btw, we're hiring!
