// const url2 = 'https://weather-api-by-any-city.p.rapidapi.com/weather/Patna';
// const options2 = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': 'd400a94e48mshc343c76a70652cfp1f6e16jsna107bd5ddb67',
// 		'X-RapidAPI-Host': 'weather-api-by-any-city.p.rapidapi.com'
// 	}
// };

const url = 'https://open-weather13.p.rapidapi.com/city/patna/EN';
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '8ab23423a1msh53ba116cc68c692p1bde35jsn73b390ad4c75',
        'X-RapidAPI-Host': 'open-weather13.p.rapidapi.com'
    }
};
async function getdata(){
    try {
    //     const response = await fetch(url2, options2);
    //     const result2 = await response.json();
    //     console.log(result2);
    //    var rainfall=result2["condition"]["precip_mm"]
    //    var temp=result2["condition"]["temp_c"]
    //   var  u2=result2["condition"]["wind_mph"]

    var temp=30
    var rainfall=0
    var u2=5
    var humidity=50

    } catch (error) {
        console.error(error);
    }
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log("api fetched")
        console.log(result)
       var sunrise=result["sys"]["sunrise"]
       var sunset=result["sys"]["sunset"]
       var pressure=(result["main"]["pressure"])/10
      var  phi=(result["coord"]["lat"]*0.0174533)
      var  tmin=((result["main"]["temp_min"])-32)*0.55
      var  tmax=((result["main"]["temp_max"])-32)*0.55
        
    } catch (error) {
        console.error(error);
    }
    let d= new Date()
day=d.getDate()
month=d.getMonth()
J=(month*30)+day //jullian day or number of day
as=0.25
bs=0.50
dr=1+0.033*(Math.cos((6.28*J)/365))
console.log("dr"+dr)
del=0.409*(Math.sin(((6.28*J)/365)-1.39))
ws=Math.acos(-(Math.tan(phi))*(Math.tan(del)))
console.log("ws"+ws)
acv=88
N=7.6394*ws
n=(sunset-sunrise)/3600
console.log("Number of sunshine"+n)
Ra=458.366*0.082*dr*(ws*Math.sin(phi)*Math.sin(del)+Math.cos(phi)*Math.cos(del)*Math.sin(ws))
console.log("Ra"+Ra)
console.log("Ra")
Rs=(as+bs*(n/N))*Ra
console.log("RS", Rs)
Rso=(as+bs)*Ra
Rns=(1-0.23)*Rs
console.log("Rns"+Rns)
Rnl=(4.903*Math.pow(10,-9))
console.log("Rnl"+Rnl)
Rnl=Rnl*((Math.pow(tmax,4)+Math.pow(tmin,4))/2)
console.log("Rnl"+Rnl)
Rnl=Rnl*(0.34-0.14*Math.sqrt(acv))
console.log("Rnl"+Rnl)
Rnl=Rnl*(1.35*(Rs/Rso)-0.35)
console.log("Rnl"+Rnl)
Rn=Rns-Rnl
console.log("Rns"+Rns)
console.log("Rnl"+Rnl)
console.log(Rn+"rn for check")
e0=(Math.pow(0.611,((17.27*temp)/237.3+temp)));
console.log(e0)
es=e0*((tmax+tmin)/2)
console.log(es)
//saturation point = 6.11 x 10^{7.5 x air temp} / {237.3 + air temp}
saturation=6.11*Math.pow(10,(7.5*temp))
saturation/=(237.3+temp)
ea=(humidity*es)/100
console.log(ea)
tmean=tmax+tmin;
triangle=4098*(0.6108*Math.E*(17.27*tmean)/(tmean+237.3))
triangle/=Math.pow((tmean+237.3),2)
console.log(triangle)
gamma=0.665*Math.pow(10,-3)*pressure
console.log("string"+gamma)
console.log("rn"+Rn)
Eto=0.408*(Rn)+gamma*(900/(tmean+273))*u2*(es-ea)
Eto/=(triangle+gamma*(1+0.34*u2))
console.log(Eto)
let kc=document.getElementById("season").value
Kcini=0.4
Kcmid=1.15
Kcend=0.41
Etc=Eto*kc
console.log("etc"+Etc)
normal=10
Water_required=normal+Etc-rainfall
document.getElementById("data").innerHTML=Water_required;
console.log(Water_required)
}
