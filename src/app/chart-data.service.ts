import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/toPromise';

import { ChartData, ChartDataEntry, ChartDataEntryPosition, AxisScale, ChartAxes } from './chart-data';

const SERIES: number[][][] = [
  [[0.0,0.0],[0.09033301095242417,0.09968300015480613],[0.1626566908153391,0.1975893526574798],[0.2189267536743472,0.2922693219736493],[0.261034921143457,0.3825943520983544],[0.2907862882126919,0.4677192697843292],[0.3098823596321072,0.54704621085475],[0.319909035924728,0.6201906100748462],[0.322328869227062,0.6869494959955199],[0.318476955112901,0.7472722467088313],[0.3095598756531122,0.801233889653587],[0.2966571597433546,0.8490109674998223],[0.2807247779692679,0.8908599417101231],[0.2626002399643472,0.9270980646004432],[0.2430089115322301,0.9580866185909714],[0.2225712161082185,0.9842163968634338],[0.2018104299334517,1.005895281879738],[0.181160822252544,1.023537766272699],[0.1609759306813915,1.037556253654383],[0.141536797485665,1.048353974124858],[0.1230600248057766,1.056319349992128],[0.1057055358743397,1.06182165078673],[0.08958395506779941,1.065207782491655],[0.0747635423309059,1.066800063493745],[0.06127663726195721,1.066894848642377],[0.04912558512521492,1.065761872579715],[0.03828813145957784,1.063644193844332],[0.02872228398576729,1.06075863185798],[0.02037065038968641,1.05729659954294],[0.01316426848968869,1.053425244786591],[0.007025951489350044,1.049288824111919],[0.001873175677615447,1.045010241603179],[-0.002379458741457475,1.040692695281483],[-0.005818160843910284,1.036421381658887],[-0.00852824218390071,1.03226521707811],[-0.01059273562466193,1.028278541644514],[-0.01209130576984144,1.024502778070188],[-0.01309941785469362,1.020968023583488],[-0.01368773328667423,1.017694558228831],[-0.013921701689623,1.014694257417268],[-0.01386132121415296,1.011971900521663],[-0.01356104095036141,1.009526370679055],[-0.01306978145009515,1.007351743808485],[-0.01243105157775332,1.005438267218408],[-0.01168314211360643,1.003773230108111],[-0.01085937869316916,1.002341729806153],[-0.00998841874944368,1.001127338779097],[-0.009094579107975863,1.000112678327115],[-0.008198182749904961,0.999279905499247],[-0.007315914993153756,0.9986111201473399],[-0.006461180938816717,0.998088699228704],[-0.005644457484785569,0.9976955654952733],[-0.004873634521101274,0.9974153976005711],[-0.004154341093524595,0.9972327884413807],[-0.003490253357623237,0.9971333582521055],[-0.002883382051225737,0.9971038286071237],[-0.002334337995614247,0.9971320630781147],[-0.001842574803460541,0.9972070798550186],[-0.001406608532996085,0.9973190411843614],[-0.001024214492327607,0.9974592240183788],[-0.0006926017744,0.997619975811995],[-0.0004085664005,0.9977946589598279],[-0.0001686241796,0.9979775869379427]],
  [[0.0,0.0],[0.09818331540963536,0.02144180701545506],[0.1921561754169688,0.05206382636764995],[0.2811075161107982,0.09125582124451714],[0.3643035793291761,0.138341006470136],[0.441092789023452,0.1925850655566701],[0.5109096377402018,0.2532054531920056],[0.5732775764208853,0.3193808798529256],[0.6278109110082096,0.3902608767811511],[0.6742157192647653,0.4649753420841118],[0.7122898106655919,0.5426439721663607],[0.7419217611415135,0.622385486996174],[0.763089062752061,0.7033265627936666],[0.775855435991817,0.7846103915146851],[0.7803673593272603,0.8654047929172265],[0.7768498766770381,0.9449098119489132],[0.765601748850745,1.022364741597268],[0.7469900194228929,1.09705451910957],[0.7214440691222908,1.168315451525692],[0.6894492355542639,1.235540234685404],[0.6515400769447797,1.298182238182261],[0.6082933596110951,1.355759037052408],[0.5603208490407866,1.407855179224209],[0.5082619838256942,1.454124185832996],[0.4527765102824264,1.494289789347999],[0.3945371534365025,1.528146421994223],[0.3342223971989609,1.555558974114596],[0.2725094430738312,1.576461848847076],[0.2100674126585789,1.590857345733747],[0.1475508545978412,1.598813411587203],[0.08559361158720258,1.600460802073625],[0.02480309756467656,1.595989701998733],[-0.034244970558927,1.585645856176606],[-0.09101134832428628,1.569726266003486],[-0.1449975142294747,1.548574509437824],[-0.1957493695974655,1.522575743999655],[-0.2428603684897026,1.492151453649431],[-0.2859740647398167,1.457754000997979],[-0.3247860694922475,1.419861046250703],[-0.3590454188011388,1.378969893622075],[-0.3885553568176738,1.335591824697827],[-0.4131735458151696,1.290246476404159],[-0.4328117197212342,1.243456318902497],[-0.4474348029002168,1.19574128590552],[-0.4570595206171815,1.147613606649777],[-0.4617525318819803,1.099572885109404],[-0.4616281191894132,1.05210146804395],[-0.4568454730151105,1.005660139192599],[-0.4476056117784457,0.960684172409844],[-0.4341479803307825,0.9175797718373193],[-0.4167467718625498,0.87672092237648],[-0.3957070194442402,0.8384466688201988],[-0.3713605042279523,0.8030588370701597],[-0.3440615276460536,0.7708202059618064],[-0.3141825947652572,0.7419531333882217],[-0.2821100553056735,0.7166386357049995],[-0.2482397477372093,0.6950159148535424],[-0.2129726903458093,0.6771823233007472],[-0.1767108612486839,0.6631937527958489],[-0.1398531070630741,0.6530654291237122],[-0.102791217332063,0.64677309151764],[-0.06590619892045137,0.6442545322093303],[-0.02956478145243738,0.6454114687602637]],
  [[0.0,0.0],[0.0989299530069583,0.01400033556990077],[0.1950898009338927,0.03759179734569051],[0.2875694765166552,0.07036605997660272],[0.3755120493459496,0.1118304818921273],[0.4581213233331898,0.1614145425839358],[0.534668690969288,0.2184769413806374],[0.6044991893400662,0.2823132749288072],[0.6670367118225832,0.3521642063080241],[0.7217883386457967,0.4272240353684288],[0.7683477589588309,0.5066495775028435],[0.806397766612633,0.5895692566581548],[0.8357118214286573,0.6750923179490484],[0.8561546772058235,0.7623180657482971],[0.8676820870113261,0.8503450345693837],[0.8703396053224846,0.9382800023981243],[0.864260515250538,1.025246759330572],[0.8496629173030638,1.110394548387397],[0.8268460238553305,1.192906100145433],[0.7961857106345746,1.272005188293914],[0.7581293830141649,1.346963639318935],[0.7131902207136193,1.417107736172702],[0.6619408695600529,1.481823962917703],[0.6050066532497055,1.540564044870197],[0.5430583815259271,1.592849246619882],[0.4768048338422013,1.638273898389236],[0.4069849993938445,1.676508129431777],[0.3343601553769038,1.707299795468537],[0.2597058654728894,1.730475595442291],[0.1838039798769616,1.745941381047341],[0.1074347167066418,1.753681670488923],[0.03136890237721663,1.753758385664298],[-0.0436395544548937,1.746308839364429],[-0.1168608844554049,1.731543006103077],[-0.1875963080743803,1.709740116726295],[-0.2551844532045501,1.681244622982629],[-0.3190072837653794,1.64646158369205],[-0.3784954888388799,1.605851528995525],[-0.4331332882761632,1.559924863359874],[-0.4824626173134223,1.509235871523995],[-0.526086659610428,1.454376394379997],[-0.563672705180518,1.395969243870789],[-0.594954316844735,1.334661427346425],[-0.6197327960407709,1.271117252454536],[-0.6378779459772304,1.206011383552199],[-0.6493281371746275,1.140021919831547],[-0.6540896873080831,1.073823563869982],[-0.6522355738974221,1.008080947175112],[-0.6439035047165171,0.9434421765277992],[-0.6292933767575701,0.8805326615728927],[-0.6086641601345882,0.8199492802102988],[-0.582330248395668,0.7622549339478224],[-0.5506573212934472,0.7079735405443275],[-0.5140577701005784,0.6575855060534987],[-0.4729857390218268,0.6115237128338356],[-0.4279318391220777,0.5701700542807204],[-0.3794175934423322,0.5338525410242543],[-0.3279896736022321,0.5028429971857081],[-0.2742139891828407,0.477355359059798],[-0.2186696915487673,0.4575445823530621],[-0.1619431535119366,0.4435061579228643],[-0.104621985374169,0.435276229887793],[-0.04728914643182864,0.4328323040771022]],
  [[0.0,0.0],[0.09921140360831154,0.01119521750350039],[0.1962014207321779,0.03210800471798114],[0.2900308265457638,0.06240918446584443],[0.3798035691792691,0.1016800829663176],[0.4646751654719151,0.1494178150189576],[0.5438604783821758,0.205041342972816],[0.6166408062093748,0.2678982394719092],[0.6823702215084348,0.3372720778219095],[0.7404811058304445,0.4123903685127023],[0.7904888351070577,0.4924329559992273],[0.831995579524584,0.576540786322095],[0.8646931910097123,0.663824953563625],[0.888365160877605,0.753375931498353],[0.902887639678689,0.8442728961142179],[0.90822952072763,0.9355930449465277],[0.9044515981129766,1.026420820366982],[0.8917048190776222,1.115856946080922],[0.8702276594406682,1.203027189075241],[0.8403426591168632,1.287090763086304],[0.8024521627018066,1.367248294273231],[0.7570333174566003,1.442749275131225],[0.7046323877779459,1.512898938699739],[0.6458584513191465,1.577064491743007],[0.5813765472818141,1.634680652732061],[0.511900351982973,1.685254448060244],[0.4381844605815095,1.728369227896788],[0.361016356793903,1.76368787134127],[0.2812081545228629,1.790955158999901],[0.199588196553606,1.809999299675698],[0.1169925958394816,1.82073260646188],[0.0342568044085683,1.82315132606534],[-0.04779270640874585,1.817334633580253],[-0.128346572880601,1.803442813099127],[-0.2066203942879486,1.781714652411057],[-0.2818622419201204,1.752464087520232],[-0.3533597511035301,1.716076139751789],[-0.42044673074814,1.673002194732537],[-0.4825092305196682,1.623754678482124],[-0.5389910118960165,1.568901191173868],[-0.5893983759762086,1.509058163778208],[-0.6333043079076508,1.44488410674772],[-0.670351905108192,1.377072523110121],[-0.7002570640065024,1.30634456078202],[-0.7228104077295431,1.233441480586331],[-0.7378784449505893,1.159117017343284],[-0.7454039578968182,1.084129711509752],[-0.7454056252242381,1.00923528817276],[-0.737976893023867,0.9351791587769309],[-0.7232841145530954,0.8626891188057846],[-0.7015639863198748,0.792468311773944],[-0.6731203148182917,0.7251885263586664],[-0.6383201544602513,0.6614838893481476],[-0.5975893630124043,0.6019450123598584],[-0.5514076260786348,0.5471136450389857],[-0.5003030068208617,0.4974778817435535],[-0.4448460811454032,0.4534679626215979],[-0.3856437219661795,0.415452703552588],[-0.3233325988639174,0.3837365827284018],[-0.2585724614736942,0.3585575047585954],[-0.1920392762401635,0.3400852561715497],[-0.1244182867764005,0.3284206591187649],[-0.05639706795135398,0.3235954230451598]]
];

@Injectable()
export class ChartDataService {

  private count = 0;
  private maxZIndex = 99;
  private data = new ChartData();

  constructor() { }

  getChartData(): Observable<ChartDataEntry[]> {
    console.log('Returning chart data.');
    return Observable.of(this.data.entries());
  }

  private handleError(error: any) {
    console.error('An error occured', error);
    return Promise.reject(error.message || error);
  }

  create(): Promise<ChartDataEntry> {
    console.log('creating a new chart');
    return new Promise((resolve, reject) => setTimeout(() => {
          let index = this.count++;
          let entry = new ChartDataEntry(
            index,
            'trajectory',
            SERIES, 
            new ChartDataEntryPosition(250, 250, 99999),
            new ChartAxes('x', 'y', 'equal')
          );
          this.data.set(index, entry);
          resolve(entry);
        },
        50
      ))
      .catch(this.handleError);
  }

  delete(index: number): Promise<boolean> {
    console.log('deleting chart #' +  index);
    return new Promise((resolve, reject) => setTimeout(() => {
          this.data.delete(index);
          resolve(true);
        },
        50
      ))
      .catch(this.handleError);
  }

  incrementAndGetMaxZIndex(): number {
    let result = ++this.maxZIndex;
    console.log('Issuing new max z-index: ' + result);
    return result;
  }

  bringToFront(index: number): Promise<boolean> {
    console.log('bringing to front chart #' +  index);
    return new Promise((resolve, reject) => setTimeout(() => {
          this.data.get(index).setZIndex(this.incrementAndGetMaxZIndex());
          resolve(true);
        },
        50
      ))
      .catch(this.handleError);
  }

}