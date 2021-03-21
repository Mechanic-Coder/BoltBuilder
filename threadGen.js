import { updateGlobal, MathConst } from "./globalClass.js"

const helperConst = new MathConst()


export function UniThread(Pitch, Major, Length) {
    // baby = window.BABYLON
    
    
    console.log('your mom')
    var curvePoints = ( r, o, profile) => {
        // o is the y offset
        // r is the x off set
    
        const D = threadGeo(GDims.Gpitch).d
        const pitch = GDims.Gpitch 
        
        var path = [];
        var highY = 0
        var increaseX = 0
        const radMin = profile.V.X
        var RadIncre = radMin
        const YStep = 1 / 125
        var startY = 2;
        const firstY = 2;
        const radStep = (D * helperConst.TE() / 125);
    
        for (var i = 0; i < GDims.PieHalfRevs() ; i += helperConst.Clarity()   ) {
          // reset for each itteration
          var xOffset = r
          var y = 0
          const firstRev = i < 4 * Math.PI && o <= 2;
          const SecondRev = i > 2 * Math.PI && i < 4 * Math.PI;
          const lastRev =  i > GDims.Highest()  && o > 0;
    
          if (SecondRev ) {
            switch(o) {
                // below is call fall-through
                case 1:
                case 2:
                xOffset = r
                y = (i + o * Math.PI) / pitch
                break;
            //   case 1:
            //       xOffset = r
            //       y = (i + o * Math.PI) / pitch
            //     break;
              case 0:
                y = (i + o * Math.PI) / pitch  
                increaseX += radStep
                xOffset = RadIncre + increaseX
                break;
    
    
              default:
            }
            path.push( createVector3(xOffset, y, xOffset, i) );
          }
          else if(firstRev) {
            switch(o) {
              case 2:
                y = (i + o * Math.PI) / pitch  
                increaseX += radStep
                xOffset = RadIncre + increaseX
                break;
              case 1:
                y = ((((o / 125) + startY) * Math.PI) / pitch)
                startY += YStep
                xOffset = r
                break;
              case 0:
                y = (firstY* Math.PI) / pitch  
                xOffset = radMin
                break;
              default:
            }
            path.push( createVector3(xOffset, y, xOffset, i) );
    //  eases out of last thread revolution, top
    } else if(lastRev) {
            switch(o) {
            case 1:
              highY += YStep
              //!  D * 4 is because i exgerated the pitch in the V.X cordinate by 4
              increaseX += radStep
              y = ((GDims.Highest() + (o + highY) * Math.PI) / pitch)
              xOffset = r + increaseX
              break;
            case 2:
              y = ((GDims.Highest() + o * Math.PI) / pitch)
              break;
            default:
            }
            path.push(createVector3(xOffset, y, xOffset, i))
        } else {
          // for top triggers on 0, for bottom triggers on 2
          path.push(createVector3(r, (i + o * Math.PI) / pitch, r, i))
        }
    
        }
          return path;
      };
      console.log(Major)
    var GDims = new updateGlobal(Pitch, Major, Length, 'red')
    console.log(GDims.GMAJ())
    const profile = createProfile(GDims.Gpitch, GDims.GMAJ(), GDims.Glength)
    var curve1 = curvePoints(profile.S.X, 0, profile);
    var curve2 = curvePoints(profile.V.X, 1, profile);
    var curve3 = curvePoints(profile.E.X, 2, profile);

    console.log(GDims.GMin())
    return [curve1, curve2, curve3];

}
export function createProfile(TPI, Major, length) {

    const thread = threadGeo(TPI)

    var a = thread.P/2;
    // X: S.X - d * 4 is just to pronounce threads normaly it would just be X: S.X - d
    // s and E are the top of thread V is root
    // refacter profile elimante y 
    var S = {X:Major/2,
        Y: 0}
    var V = {X: S.X - thread.d * helperConst.TE(), 
        Y: S.Y + a }
    var E = {X: S.X, 
        Y:  S.Y + thread.P }
        console.log( Major)
    return { S, V, E, length, TPI }
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
