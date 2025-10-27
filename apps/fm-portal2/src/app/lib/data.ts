export type Asset = {
  id:string; site:string; building:string; location:string;
  kind:"tap"|"shower"; lastFlushedAt:string; tempC:number|null; freqDays:number;
};
export type RAG = "GREEN"|"AMBER"|"RED";
export function getRag(a:Asset, now=new Date()):RAG{
  const last=new Date(a.lastFlushedAt); const due=new Date(last);
  due.setDate(due.getDate()+a.freqDays);
  const msToDue=due.getTime()-now.getTime();
  const within24=msToDue<=24*3600*1000 && msToDue>=0;
  const overdue=now.getTime()>due.getTime()+24*3600*1000;
  const tempRed=a.tempC!==null && a.tempC<50;
  if(overdue||tempRed) return "RED"; if(within24) return "AMBER"; return "GREEN";
}
export function kpis(d:Asset[]){
  const now=new Date(); const total=d.length||1;
  const reds=d.filter(a=>getRag(a,now)==="RED").length;
  const ambers=d.filter(a=>getRag(a,now)==="AMBER").length;
  const greens=total-reds-ambers;
  return { compliancePct:Math.round((greens/total)*100), reds, ambers, greens, total, greensCount:greens };
}
export const MOCK_ASSETS:Asset[]=[
  {id:"A-1001",site:"Lincoln County",building:"Ward A",location:"Room 12 – Basin",kind:"tap",lastFlushedAt:new Date(Date.now()-5*864e5).toISOString(),tempC:54,freqDays:7},
  {id:"A-1002",site:"Lincoln County",building:"Ward B",location:"Shower 2",kind:"shower",lastFlushedAt:new Date(Date.now()-9*864e5).toISOString(),tempC:48,freqDays:7},
  {id:"A-1003",site:"Community Clinic",building:"Main",location:"Reception Basin",kind:"tap",lastFlushedAt:new Date(Date.now()-6*864e5).toISOString(),tempC:52,freqDays:7},
];
