export function BoltEQ(major, pitch, uts) {
    this.Major = major;
    this.Pitch = pitch;
    this.UTS= uts;
    this.TenStressArea = () => {
        return .7854*(this.Major-(.9743/this.Pitch))
    }
    this.MaxLoad = () => {
        return this.UTS * this.TenStressArea()
    }
}

export const materials = [
    {name:"Stainless Steel" , uts: 84100, color: "#caccce"},
    {name:"Anodized Aluminum" , uts:30000 , color: "#1A1A74"},
    // 30,000 Aluminum 2024
    {name:"Grade 8 Steel" , uts: 150000, color: "#121213"},
    {name:"Plastic" , uts: 7000, color: "#FF0000"},
    {name:"Brass" , uts: 52200, color: "#b5a642"},
    {name:"Bronze" , uts: 40000, color: "#b87333"}
]