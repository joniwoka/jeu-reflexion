var QB={video:QUESTIONS.slice(),geo4:[],geo3:[],geo2:[],his4:[],his3:[],his2:[],eng3:[]};
function QLOAD(b,t){t.trim().split('\n').forEach(function(l){var p=l.split('|');if(p.length===6&&QB[b])QB[b].push({q:p[0],a:[p[1],p[2],p[3],p[4]],e:p[5]})})}
