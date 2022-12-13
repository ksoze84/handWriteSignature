function makeid(length:number) {
  var result           = '';
  var characters       = 'abcdefghijklmnopqrstuvwxyz';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
  
export function handDrawnSign( canvas: HTMLCanvasElement, signString? : string, options? : { usable : number, controlPointProportion : number } ){
  if (canvas){
    const ctx = canvas.getContext("2d");

    if ( ctx ) {

      const points = [];
      const usable = options?.usable || 0.5;
      const controlPointProportion = options?.controlPointProportion || 1.3 ;
      
      let i = 0;
      let minC = 1000000;
      let maxC = -1000000;
      let stringRoot = signString;

      if (!stringRoot)
        stringRoot = makeid(7);

      //obtain min max char values
      for( const c of stringRoot){
        const charcode = c.charCodeAt(0);
        if( charcode < minC)
          minC = charcode;
        else if ( charcode > maxC )
          maxC = charcode;
      }

      const middleRange = (minC + maxC) / 2;

      //make points and control point array in px
      for( const c of stringRoot){
        const charcode = c.charCodeAt(0);
        const diffmid = charcode - middleRange;
        const xPx = ((i * canvas.width * usable ) / (stringRoot.length)  ) + canvas.width*(1-usable)/2;
        const yPx =(canvas.height/2 + ((diffmid/(maxC-minC))*canvas.height*usable/2) );

        points.push({ x : xPx,
                      y : yPx, 
                      cx  : xPx - (diffmid/(maxC-minC))*(canvas.width/controlPointProportion), 
                      cy  : yPx + (diffmid/(maxC-minC))*(canvas.height)*usable*controlPointProportion
                    });
        i++;
      }

      //draw
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (const point of points) {
        ctx.quadraticCurveTo(point.cx, point.cy, point.x, point.y);
      }
      ctx.stroke();
    }
    
  }
}
