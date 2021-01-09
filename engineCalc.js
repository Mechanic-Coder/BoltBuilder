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
    // ,
    // {name:"Grade 5 steel" , uts: 120000, color: "#37415B"}
    // removed so there a even amount
    // <option value="#caccce"> Stainless Steel</option>
    // <!-- 84100  18-8 & 316 Stainless-->
    // <option value="#1A1A74"> anodized aluminum</option>

    // <!-- 30,000 Aluminum 2024-->
    // <option value="#121213"> hardened grade 8</option>
    // <!-- 150000 grade 8 -->

    // <option value="#FF0000"> plastic </option>
    // <!-- 7000 -->

    // <option value="#b5a642"> brass</option>
    // <!-- 52200 -->

    // <option value="#b87333"> Bronze</option>
    // <!-- 40,000  651 Silicon bronze-->
    // <option value="#37415B"> steel Grade 5</option>
    // <!-- 120,000 -->
]