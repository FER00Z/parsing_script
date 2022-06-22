// import * as fs from "fs";
const fs = require('fs'); 

const data = fs.readFileSync('data', 'utf8').toString();
    //const arr = data.toString().replace(/\r\n/g,'\n').split('\n');
    //(?<=Physical interface: ).+?(?=\n)
    //for(let i of arr) {
    //    console.log(i);
    //}
    // str = data.toString().match(/(?<=Physical interface: ).+?(?=\n)/)[0];
    // console.log(str);
    // return data.toString();
const traffic = data.match(/Traffic statistics:\n((?:.*\n){1,4})/)
const trafficInError = data.match(/Input errors:\n((?:.*\n){1,2})/)
const trafficOutError = data.match(/Output errors:\n((?:.*\n){1,2})/)

const parseResult1 = [
    {
      name: data.match(/(?<=Physical interface: ).+?(?=\n)/)[0].split(',')[0],
      state: {
            admin: data.match(/(?<=Physical interface: ).+?(?=\n)/)[0].split(',')[1].trim(), 
            link: state(data.match(/(?<=Physical interface: ).+?(?=\n)/)[0].split(',')[2])
        },
      dscr: data.match(/(?<=Description: ).+?(?=\n)/)[0].split(',')[0],
      linkLevelType: data.match(/(?<=Link-level type: ).+?(?=\n)/)[0].split(',')[0],
      mtu: parseInt(data.match(/(?<=MTU: ).+?(?=\n)/)[0].split(',')[0]),
      speed: parseInt(data.match(/(?<=Speed: ).+?(?=\n)/)[0].split(',')[0]) * 1000000,
      duplex: data.match(/(?<=Link-mode: ).+?(?=\n)/)[0].split(',')[0].split('-')[0], 
      mac: data.match(/(?<=Hardware address: ).+?(?=\n)/)[0].split(',')[0],
      clearing: data.match(/(?<=Statistics last cleared: ).+?(?=\n)/)[0].split(',')[0],
      statsList: [
        {
          type: 'traffic',
          counters: {
            inBytes: parseInt(traffic[0].match(/(?<=Input  bytes  :).+?(?=\n)/)[0].split(' ').filter(Boolean)[0]),
            outBytes: parseInt(traffic[0].match(/(?<=Output bytes  :).+?(?=\n)/)[0].split(' ').filter(Boolean)[0]),
            inPkts: parseInt(traffic[0].match(/(?<=Input  packets:).+?(?=\n)/)[0].split(' ').filter(Boolean)[0]),
            outPkts: parseInt(traffic[0].match(/(?<=Output packets:).+?(?=\n)/)[0].split(' ').filter(Boolean)[0]),
          },
          load: {
            inBytes: parseInt(traffic[0].match(/(?<=Input  bytes  :).+?(?=\n)/)[0].split(' ').filter(Boolean)[1]),
            outBytes: parseInt(traffic[0].match(/(?<=Output bytes  :).+?(?=\n)/)[0].split(' ').filter(Boolean)[1]),
            inPkts: parseInt(traffic[0].match(/(?<=Input  packets:).+?(?=\n)/)[0].split(' ').filter(Boolean)[1]), 
            outPkts: parseInt(traffic[0].match(/(?<=Output packets:).+?(?=\n)/)[0].split(' ').filter(Boolean)[1]),
          },
        },
        {
            type: 'inErrors', counters: {
                inErr: parseInt(trafficInError[0].match(/(?<=Errors:).+?(?=\n)/)[0].split(',')[0]),
                inDrops: parseInt(trafficInError[0].match(/(?<=Drops:).+?(?=\n)/)[0].split(',')[0]),
            }},
        {
            type: 'outErrors', counters: {
                outErr: parseInt(trafficOutError[0].match(/(?<=Errors:).+?(?=\n)/)[0].split(',')[0]), 
                outDrops: parseInt(trafficOutError[0].match(/(?<=Drops:).+?(?=\n)/)[0].split(',')[0]),
            }},
      ],
      logIntList: [
        {
          name: data.match(/(?<=Logical interface ).+?(?=\n)/)[0].split(' ')[0],
          protocolList: [
            {
              type: 'inet',
              value: {
                ipList: [
                  {
                    ip: '10.241.80.1',
                    mask: 31,
                    net: '10.241.80.0/31',
                    netLong: 183586816,
                    broadLong: 183586817,
                    flagList: ['is-preferred', 'is-primary'],
                  },
                ],
              },
            },
            {type: 'iso'},
            {type: 'mpls'},
          ],
          statsList: [
            {
              type: 'traffic',
              counters: {
                inBytes: 79748727,
                outBytes: 160678589,
                inPkts: 1115935,
                outPkts: 1591473,
              },
            },
            {
              type: 'local',
              counters: {
                inBytes: 69656698,
                outBytes: 150343645,
                inPkts: 951675,
                outPkts: 1424433,
              },
            },
          ],
          mtu: 1500,
        },
      ],
    },
    {
      name: 'ae0',
      state: {admin: 'enabled', link: 'up'},
      linkLevelType: 'ethernet',
      mtu: 1514,
      speed: 2000000000,
      mac: '4c96.1410.0100',
      clearing: 'never',
      statsList: [
        {
          type: 'traffic',
          counters: {
            inBytes: 594864555,
            outBytes: 451212986,
            inPkts: 4483538,
            outPkts: 4037657,
          },
          load: {inBytes: 425, outBytes: 382, inPkts: 2, outPkts: 2},
        },
        {type: 'inErrors', counters: {inErr: 0, inDrops: 0}},
        {type: 'outErrors', counters: {outErr: 0, outDrops: 0}},
      ],
      logIntList: [
        {
          name: 'ae0.0',
          dscr: 'STATIC1R18',
          protocolList: [
            {
              type: 'inet',
              value: {
                ipList: [
                  {
                    ip: '10.241.80.33',
                    mask: 29,
                    net: '10.241.80.32/29',
                    netLong: 183586848,
                    broadLong: 183586855,
                    flagList: ['is-preferred', 'is-primary'],
                  },
                ],
              },
            },
            {type: 'iso'},
            {type: 'mpls'},
          ],
          statsList: [
            {
              type: 'bundle',
              counters: {
                inPkts: 2247311,
                inBytes: 317572407,
                outPkts: 1719136,
                outBytes: 123546352,
              },
              load: {inPkts: 2, inBytes: 179, outPkts: 0, outBytes: 37},
            },
          ],
          mtu: 1500,
        },
      ],
    },
  ];
  
//Testing output
//   const result = (parseResultIndex) => {
//   const str = `Result of ${parseResultIndex}`;
//   const rslt = parseResult1[parseResultIndex].logIntList;
//   return `${str}\n${rslt}`;
// };
// console.log(result(0));
// console.log(result(1));

console.log(parseResult1[0].logIntList);
console.log(parseResult1[1].logIntList);
  
  // console.log(traffic[0].match(/(?<=Input  bytes  :).+?(?=\n)/)[0].split(' ').filter(Boolean)[0])
function state(state) {
    var n = state.split(" ");
    return n[n.length - 1];

};

