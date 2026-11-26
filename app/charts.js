// Draws accessible, responsive SVG charts and supplies shared number formatting.
export const fmt = (value, digits = 0) => Number(value).toLocaleString('en-US', { minimumFractionDigits: digits, maximumFractionDigits: digits });
export const fmtPct = (value, digits = 1) => `${fmt(value, digits)}%`;
export const COLORS = ['#c8102e','#0e7c66','#d9a441','#496a7b','#b16d50','#6c8065','#a58aab','#94b8aa','#84857b','#d8cbb5'];
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const text = (x,y,label,cls='',anchor='start') => `<text x="${x}" y="${y}" class="${cls}" text-anchor="${anchor}">${esc(label)}</text>`;
const line = (x1,y1,x2,y2,cls='grid-line')=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="${cls}"/>`;
function svg(w,h,body,opts) { return `<svg viewBox="0 0 ${w} ${h}" width="100%" role="img" aria-label="${esc(opts.title || 'Statistical chart')}" class="chart-svg"><title>${esc(opts.title || 'Statistical chart')}</title>${body}</svg>`; }
const numberLabel = (v,o) => `${fmt(v,o.digits ?? 2)}${o.suffix || ''}`;
// Scales include zero by default; explicit bounds can focus a line chart on its range.
function scale(series,o) {
  const max = Math.max(0,...series.map(d=>d.value)), min = Math.min(0,...series.map(d=>d.value));
  const top = o.max ?? (max > 0 ? max*1.23 : 1), bottom = o.min ?? (min < 0 ? min*1.5 : 0);
  const W=600,H=o.height || 252,L=48,R=24,T=30,B=42;
  const y=v=>T+(top-v)/(top-bottom)*(H-T-B);
  return {W,H,L,R,T,B,top,bottom,y,pw:W-L-R};
}
function axes(s,o) {
  let b=text(s.L,15,o.unit || '', 'axis-unit');
  for(let i=0;i<=4;i++) {const v=s.bottom+(s.top-s.bottom)*i/4,y=s.y(v);b+=line(s.L,y,s.W-s.R,y)+text(s.L-9,y+4,fmt(v,o.axisDigits ?? 1),'axis-label','end');}
  b+=line(s.L,s.y(0),s.W-s.R,s.y(0),'zero-line');
  return b;
}
export function barChart(series, opts={}) {
  if(!series.length) return svg(600,100,text(30,50,'No observations'),opts);
  const s=scale(series,opts),step=s.pw/series.length,bw=step*.55;
  let b=axes(s,opts);
  series.forEach((d,i)=>{const x=s.L+step*(i+.5),v=d.value,y=s.y(v),z=s.y(0);b+=`<rect x="${x-bw/2}" y="${Math.min(y,z)}" width="${bw}" height="${Math.max(1,Math.abs(y-z))}" rx="2" fill="${v<0?'#d9a441':opts.color || '#c8102e'}"><title>${esc(d.label)}: ${esc(numberLabel(v,opts))}</title></rect>`+text(x,v<0?y+19:y-9,numberLabel(v,opts),'value-label','middle')+text(x,s.H-16,d.label,'axis-label','middle');});
  return svg(s.W,s.H,b,opts);
}
export function lineChart(series, opts={}) {
  if(!series.length) return svg(600,100,text(30,50,'No observations'),opts);
  const s=scale(series,opts),step=s.pw/Math.max(1,series.length-1),color=opts.color || '#0e7c66';
  const points=series.map((d,i)=>[s.L+step*i,s.y(d.value)]);
  let b=axes(s,opts);
  b+=`<path d="M ${s.L} ${s.y(0)} ${points.map(p=>`L ${p[0]} ${p[1]}`).join(' ')} L ${points.at(-1)[0]} ${s.y(0)} Z" fill="${color}" opacity=".055"/>`;
  b+=`<polyline points="${points.map(p=>p.join(',')).join(' ')}" fill="none" stroke="${color}" stroke-width="2.6" stroke-linejoin="round"/>`;
  points.forEach(([x,y],i)=>{b+=`<circle cx="${x}" cy="${y}" r="4" fill="${color}" stroke="#fffdf8" stroke-width="2"><title>${esc(series[i].label)}: ${esc(numberLabel(series[i].value,opts))}</title></circle>`+text(x,y+(opts.stagger && i%2?24:-12),numberLabel(series[i].value,opts),'value-label','middle')+text(x,s.H-16,series[i].label,'axis-label','middle');});
  return svg(s.W,s.H,b,opts);
}
export function hbarChart(rows, opts={}) {
  const W=600,gap=opts.gap || 43,H=40+rows.length*gap;
  const max=Math.max(0,...rows.map(d=>d.value)),min=Math.min(0,...rows.map(d=>d.value));
  const left=8,right=60,plot=W-left-right,span=max-min || 1,zero=left-min/span*plot;
  let b=text(left,15,opts.unit || '', 'axis-unit');
  rows.forEach((d,i)=>{const y=38+i*gap,w=plot*Math.abs(d.value)/span,x=d.value<0?zero-w:zero;b+=text(left,y,d.label,'bar-name')+text(W-7,y,numberLabel(d.value,opts),'value-label','end')+`<rect x="${left}" y="${y+9}" width="${plot}" height="9" rx="2" fill="#eee9df"/><rect x="${x}" y="${y+9}" width="${w}" height="9" rx="2" fill="${d.value<0?'#d9a441':i===0?'#c8102e':opts.color || '#0e7c66'}"><title>${esc(d.label)}: ${esc(numberLabel(d.value,opts))}</title></rect>`;});
  if(min<0)b+=line(zero,26,zero,H-17,'zero-line');
  b+=text(left,H-1,fmt(min,opts.digits ?? 1),'axis-label')+text(left+plot,H-1,fmt(max,opts.digits ?? 1),'axis-label','end');
  return svg(W,H,b,opts);
}
export function donutChart(parts, opts={}) {
  const W=400,H=340,cx=200,cy=160,r=111,circ=2*Math.PI*r,total=parts.reduce((n,d)=>n+d.value,0);let offset=0;
  let b='';
  parts.forEach((d,i)=>{const length=d.value/total*circ,angle=(offset+length/2)/circ*Math.PI*2-Math.PI/2; b+=`<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${COLORS[i%COLORS.length]}" stroke-width="43" stroke-dasharray="${Math.max(0,length-2)} ${circ}" stroke-dashoffset="${-offset}" transform="rotate(-90 ${cx} ${cy})"><title>${esc(d.label)}: ${fmtPct(d.value)}</title></circle>`+text(cx+Math.cos(angle)*r,cy+Math.sin(angle)*r+4,fmt(d.value,1),'donut-value','middle');offset+=length;});
  b+=text(cx,cy-7,'2024','donut-year','middle')+text(cx,cy+25,'GDP composition','donut-center','middle')+text(cx,H-9,opts.unit || 'Share of GDP · percent','axis-label','middle');
  return svg(W,H,b,opts);
}
export function pyramidChart(groups, opts={}) {
  const W=600,H=490,cx=300,top=43,row=25,scale=45;
  let b=text(110,18,'MALE','axis-unit','middle')+text(490,18,'FEMALE','axis-unit','middle');
  for(const v of [0,2,4,6]) {if(v){b+=line(cx-35-v*scale,30,cx-35-v*scale,H-38)+line(cx+35+v*scale,30,cx+35+v*scale,H-38);}b+=text(cx-35-v*scale,H-17,`${v}%`,'axis-label','middle')+text(cx+35+v*scale,H-17,`${v}%`,'axis-label','middle');}
  [...groups].reverse().forEach((d,i)=>{const y=top+i*row,m=d.value*d.maleShare/100,f=d.value-m;b+=`<rect x="${cx-35-m*scale}" y="${y}" width="${m*scale}" height="17" rx="2" fill="#0e7c66"/><rect x="${cx+35}" y="${y}" width="${f*scale}" height="17" rx="2" fill="#c8102e"/>`+text(cx,y+13,d.label,'axis-label','middle')+text(cx-42-m*scale,y+13,fmt(m,1),'value-label','end')+text(cx+42+f*scale,y+13,fmt(f,1),'value-label');});
  b+=text(cx,H-0,'Share of total population · percent','axis-label','middle');
  return svg(W,H,b,opts);
}
