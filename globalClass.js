export function updateGlobal(pitch, major, length, mat) {
    this.Gpitch = pitch;
    this.Gmajor = major;
    this.Glength = length;
    this.GMat = mat

    this.GMAJ = () => {
        // return this.Gmajor
        return this.Gmajor * 4
    }
    this.GMin = () => {
        var math = new MathConst()
        const Angle = 30;
        const P = 1 / this.Gpitch;
        const pieHalf = (Math.PI/180)
        const d = P * Math.cos((Angle*pieHalf));
        // let diff = 1 / this.Gpitch 
        return (this.Gmajor * 2) - d * math.TE() 
    }

    this.AllG = () => {
        return {Glength: this.Glength, Gpitch: this.Gpitch, Gmajor: this.GMAJ()() }
    }
    this.HalfRevs = () => {
        return 2 * this.Gpitch * this.Glength
    }
    this.PieHalfRevs = () => {
        return this.HalfRevs() * Math.PI
    }
    this.Highest = () => {
       return (this.HalfRevs() - 2) * Math.PI
    }
    this.TopOfThread = () => {
       return  (this.Highest() + 2 * Math.PI) / this.Gpitch
    }
    this.BottomOfThread = () => {
        return 2 * Math.PI / this.Gpitch
    }
    this.BottomOfChamfer = () => {
        const offset = this.GMAJ() / 10;
        return this.BottomOfThread() - offset;
    }
    this.Rad = () => {
        return this.GMAJ() / 2
    }
// GDims
}

export function MathConst() {
    this.Clarity = () => {
        return 1 / 20;
    }
    this.TE = () => {
        const threadExaggeration = 4
        return threadExaggeration
    }
    this.RotBottom = () => {
        return Math.PI*3/2
    }
    this.RotTop = () => {
        return Math.PI/2
    }
    // helperConst
}