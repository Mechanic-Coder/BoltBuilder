import { updateGlobal, MathConst } from "./globalClass.js"

const helperConst = new MathConst()


export function UniThread(Pitch, Major, Length) {
    // baby = window.BABYLON
    
    
    console.log('your mom')
    // var d = new Date();
    
    var curvePoints = (o, profile) => {
        // o is the y offset
        // r is the x off set
        var r = profile.X[o]

        const D = threadGeo(GDims.Gpitch).d
        const pitch = GDims.Gpitch 
        
        var path = [];
        var highY = 0
        var increaseX = 0
        const radMin = profile.X[1]
        var RadIncre = radMin
        const YStep = 1 / 125
        var startY = 2;
        const firstY = 2;
        const radStep = (D * helperConst.TE() / 125);
        const PI =  Math.PI 
        function stanY(E){
            return((E + o * PI) / pitch)
        }
        var firstRev = (R, o) => R < 4 * PI && o <= 2;
        var SecondRev = (R) => R > 2 * PI && R < 4 * PI;
        var lastRev = (R, o) => R > GDims.Highest()  && o > 0;

        for (var i = 0; i < GDims.PieHalfRevs() ; i += helperConst.Clarity()   ) {
          // reset for each itteration
          var xOffset = r
          var y = 0
          if (SecondRev(i) ) {
            // SecondRev.O[o]()
            switch(o) {
                // below is call fall-through
                case 1:
                case 2:
                xOffset = r
                y = stanY(i)
                break;
              case 0:
                y = stanY(i) 
                increaseX += radStep
                xOffset = RadIncre + increaseX
                break;
    
    
              default:
            }
            path.push( createVector3(xOffset, y, xOffset, i) );
          }
         else if(firstRev(i, o)) {
            switch(o) {
              case 2:
                y = stanY(i) 
                increaseX += radStep
                xOffset = RadIncre + increaseX
                break;
              case 1:
                y = ((((o / 125) + startY) * PI) / pitch)
                startY += YStep
                xOffset = r
                break;
              case 0:
                y = (firstY* PI) / pitch  
                xOffset = radMin
                break;
              default:
            }
            path.push( createVector3(xOffset, y, xOffset, i) );
        //  eases out of last thread revolution, top
        } else if(lastRev(i, o)) {
            switch(o) {
            case 1:
              highY += YStep
              //!  D * 4 is because i exgerated the pitch in the V.X cordinate by 4
              increaseX += radStep
              y = ((GDims.Highest() + (o + highY) * PI) / pitch)
              xOffset = r + increaseX
              break;
            case 2:
              y = ((GDims.Highest() + o * PI) / pitch)
              break;
            default:
            }
            path.push(createVector3(xOffset, y, xOffset, i))
        } else {
          // for top triggers on 0, for bottom triggers on 2
          path.push(createVector3(r, (i + o * PI) / pitch, r, i))
        }
    
        }
          return path;
      };
      
      
    var GDims = new updateGlobal(Pitch, Major, Length, 'red')
    console.log(GDims.GMAJ())
    const profile = createProfile(GDims.Gpitch, GDims.GMAJ())

    var f = performance.now();
    var curve1 = curvePoints(0, profile);
    var curve2 = curvePoints(1, profile);
    var curve3 = curvePoints(2, profile);
    // took between 7 and 17 milli seconds originaly with cases and ifs
    var l = performance.now();
    console.log( l - f, "milli seconds")
    return [curve1, curve2, curve3];

}
export function createProfile(TPI, Major) {
    const thread = threadGeo(TPI)
    // X: S.X - d * 4 is just to pronounce threads normaly it would just be X: S.X - d
    // s and E are the top of thread V is root
    const S = Major/2
    const V = S - thread.d * helperConst.TE()
    const E = S
    const X = [S, V, E]
    return {X, TPI }
    }

    
export function threadGeo(TPI) {
        const Angle = 30;
        const P = 1 / TPI;
        const pieHalf = (Math.PI/180)
        const d = P * Math.cos((Angle*pieHalf));
        return {P:P, d:d}
      }
export function createVector3(x, y, z, i) {
        return new BABYLON.Vector3(x * Math.sin(i), y, z * Math.cos(i))
      }
