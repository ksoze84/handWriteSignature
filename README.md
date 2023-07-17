# handWriteSignature

Hand Drawn signature generator for Canvas HTML element. Allows to generate the a unique signature from a string or generate a random signature.

This draw a stroke based on generated points and curves. This is NOT based on fonts.

## Installation

```
yarn add handwrite-signature
```


## Simple Example

``` javascript
handDrawnSign(myCanvas, 'jhonMyers')
```

results in

![example](https://raw.githubusercontent.com/ksoze84/handWriteSignature/main/example.png)



## Complete Example with all options, react and typescript

``` typescript
const cvs = useRef<HTMLCanvasElement>(null); // <canvas ref={cvs} /> somewhere

useEffect( () => {

  var gradient = cvs?.current?.getContext("2d")?.createLinearGradient(0, 0, 170, 0);

  if (gradient){
    gradient.addColorStop(0, "magenta");
    gradient.addColorStop(0.5 ,"blue");
    gradient.addColorStop(1.0, "red");

    handDrawnSign(cvs.current, "kaysersoze8", {lineWidth:2, strokeStyle : gradient, controlPointProportion: 1.7, usableProportionArea:0.7 })

  }

} , [] )

```

results in

![example](https://raw.githubusercontent.com/ksoze84/handWriteSignature/main/example2.png)


## How to use


1. Just call function handDrawnSign with a canvas Element, a string for signature generation (or undefinded for Random ) and optional configuration.

2. enjoy!

3. **controlPointProportion** configures the amplitude of the strokes, so at a very large amplitude the **usableProportionArea** must be reduced so that the strokes do not come out of the canvas. <br>Default values are conservative = { controlPointProportion: 1.3, usableProportionArea:0.5 }

