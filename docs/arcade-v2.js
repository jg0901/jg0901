"use strict";
/* Jemma's Math Arcade — 15-level progressive puzzle game.
   Shared leaderboard is optional; see LEADERBOARD_SETUP.md.
   Short sequences may fit multiple formulas; hints identify intended patterns. */
const PUZZLES = [
{title:"The Checksum Mystery",desc:"The daily values follow a simple polynomial pattern.",seq:["3","8","15","24","35","?"],answer:["48"],difficulty:2,hint:"Successive differences: 5, 7, 9, 11, ...",explain:"The nth term is n(n+2); the next value is 6×8 = 48."},
{title:"Fibonacci in Disguise",desc:"The differences, rather than the values, hide a familiar sequence.",seq:["2","5","10","18","31","52","?"],answer:["86"],difficulty:3,hint:"Consecutive differences: 3, 5, 8, 13, 21, ...",explain:"Next difference is 34, so 52+34 = 86."},
{title:"Two Streams, One Log",desc:"Two rules are interleaved into one apparently chaotic sequence.",seq:["1","2","1","4","2","8","3","16","5","?"],answer:["32"],difficulty:4,hint:"Separate odd-position terms from even-position terms.",explain:"Odd positions form 1,1,2,3,5 (Fibonacci); even positions form 2,4,8,16,32."},
{title:"Tribonacci Engine",desc:"A recurrence uses more history than the usual Fibonacci sequence.",seq:["1","1","2","4","7","13","24","?"],answer:["44"],difficulty:4,hint:"Each new term is the sum of the previous three terms.",explain:"7 + 13 + 24 = 44."},
{title:"Read the Data",desc:"This isn't arithmetic. Describe the consecutive digits aloud.",seq:["1","11","21","1211","111221","?"],answer:["312211"],difficulty:5,hint:"111221 is three 1s, two 2s, one 1.",explain:"Look-and-say: 111221 becomes 31 22 11 → 312211."},
{title:"Base-Seven Lock",desc:"A familiar sequence looks strange because the numbers are base seven.",seq:["1","4","12","22","34","51","100","?"],answer:["121","1217","121₇","121_7"],difficulty:5,hint:"Convert from base 7 to decimal: 1,4,9,16,25,36,49.",explain:"The next square is 64 in decimal, which is 121 in base 7."},
{title:"Modular Feedback",desc:"A first-order linear recurrence wraps around modulo a prime.",seq:["1","5","0","2","8","9","12","4","?"],answer:["14"],difficulty:5,hint:"Try a(next) = (3×a(current) + 2) mod 17.",explain:"(3×4+2) mod 17 = 14."},
{title:"Gray-Code Transmitter",desc:"This four-bit code follows a special ordering.",seq:["0000","0001","0011","0010","0110","0111","0101","0100","1100","?"],answer:["1101"],difficulty:5,hint:"Binary-reflected Gray code is n XOR (n >> 1).",explain:"At index n=9: 1001 XOR 0100 = 1101."},
{title:"Fibonacci on a Clock",desc:"Fibonacci numbers, but the clock only has seven positions.",seq:["0","1","1","2","3","5","1","6","0","6","6","5","?"],answer:["4"],difficulty:5,hint:"Add the previous two values modulo 7.",explain:"(6+5) mod 7 = 4. This is Fibonacci modulo 7."},
{title:"Central Binomial Vault",desc:"A factorial expression generates this rapidly growing pattern.",seq:["1","2","6","20","70","252","?"],answer:["924"],difficulty:5,hint:"The nth term is the central binomial coefficient C(2n,n), beginning at n=0.",explain:"C(12,6) = 924."},
{title:"Thue–Morse Signal",desc:"The bit pattern is generated recursively, not randomly.",seq:["0","1","1","0","1","0","0","1","1","0","0","1","0","1","1","0","?"],answer:["1"],difficulty:5,hint:"The nth bit is the parity of the number of 1s in n's binary representation.",explain:"16 in binary is 10000; it has one 1, so the next bit is 1."},
{title:"Duodecimal Fibonacci",desc:"Fibonacci takes a turn into base twelve (digits 0–9, A, B).",seq:["1","1","2","3","5","8","11","19","2A","47","?"],answer:["75","75₁₂","75_12"],difficulty:5,hint:"Convert 11 (base 12)=13, 19=21, 2A=34, 47=55 in decimal.",explain:"Next Fibonacci number is 89 decimal, which is 75 in base 12."},
{title:"Catalan's Workshop",desc:"The sequence counts ways to build recursively nested structures.",seq:["1","1","2","5","14","42","132","429","?"],answer:["1430"],difficulty:5,hint:"Catalan numbers: C_n = (1/(n+1)) × binomial(2n,n).",explain:"C_8 = (1/9) × binomial(16,8) = 1430."},
{title:"Second-Order Modulo",desc:"A two-step recurrence runs modulo nineteen.",seq:["1","4","11","15","6","0","18","17","?"],answer:["12"],difficulty:5,hint:"With a₀=1, a₁=4, use aₙ₊₂ = (2aₙ₊₁ + 3aₙ) mod 19.",explain:"(2×17 + 3×18) mod 19 = 88 mod 19 = 12."},
{title:"Chinese Remainder Lock",desc:"Every term satisfies two congruences, creating one modular cycle.",seq:["0","16","32","13","29","10","26","7","?"],answer:["23"],difficulty:5,hint:"At index n starting at 0, xₙ ≡ n (mod 5), and xₙ ≡ 2n (mod 7).",explain:"The unique solution modulo 35 is xₙ ≡ 16n (mod 35). For n=8, x₈ = 128 mod 35 = 23."}
];
const $ = (id)=>document.getElementById(id);
const SESSION_KEY="jemma_math_arcade_session_v2";
const SCORES_KEY="jemma_math_arcade_scores_v2";
const backend = window.MATH_ARCADE_BACKEND || {};
const sharedEnabled = /^https:\/\/[a-z0-9-]+\.supabase\.co\/?$/i.test(backend.url||"") && /^sb_publishable_/.test(backend.publishableKey||"");
let name="", level=0, unlocked=0, elapsed=0, runningAt=0, hints=[],completed=false,scoreSaved=false,transitioning=false;
const getJson=(key,fallback)=>{try {const result=JSON.parse(localStorage.getItem(key));return result??fallback;}catch(_){return fallback}};
const saveJson=(key,data)=>{try{localStorage.setItem(key,JSON.stringify(data))}catch(_){}};
const liveSeconds=()=>Math.max(0,elapsed+(runningAt?(Date.now()-runningAt)/1000:0));
const secondsToClock=(secs)=>{let s=Math.max(0,Math.floor(secs));return [Math.floor(s/3600),Math.floor(s%3600/60),s%60].map((v,i)=>i===0?String(v):String(v).padStart(2,"0")).join(":")};
function persist(){saveJson(SESSION_KEY,{name,level,unlocked,elapsed:liveSeconds(),hints,completed,scoreSaved})}
function startClock(){runningAt=Date.now()}
function stopClock(){elapsed=liveSeconds();runningAt=0}
function feedback(message,kind){$("feedback").textContent=message;$("feedback").className="feedback"+(kind?" "+kind:"")}
function renderBoardEntries(records){
 const list=$("leaderboard-list");list.replaceChildren();
 if(!records.length){const empty=document.createElement("li");empty.textContent="No scores yet. Be the first to complete all 15 levels!";empty.className="empty-score";list.append(empty);return}
 for(const [index,score] of records.slice(0,10).entries()){
  const li=document.createElement("li");li.className="score-row";
  const rank=document.createElement("span");rank.className="score-rank";rank.textContent=String(index+1).padStart(2,"0");
  const player=document.createElement("span");player.className="score-player";player.textContent=String(score.player_name||"Player").slice(0,24);
  const details=document.createElement("span");details.className="score-detail";details.textContent=secondsToClock(score.elapsed_seconds)+" · "+score.hints_used+" hint"+(score.hints_used===1?"":"s");
  li.append(rank,player,details);list.append(li)
 }
}
function sortedScores(scores){return scores.slice().sort((a,b)=>a.elapsed_seconds-b.elapsed_seconds||a.hints_used-b.hints_used||String(a.created_at).localeCompare(String(b.created_at)))}
function localScores(){return sortedScores(getJson(SCORES_KEY,[]).filter(x=>x&&typeof x.elapsed_seconds==="number"&&typeof x.player_name==="string"))}
function saveLocalScore(score){let scores=localScores();scores.push(score);saveJson(SCORES_KEY,sortedScores(scores).slice(0,100))}
async function loadBoard(){
 $("board-scope").textContent=sharedEnabled?"Loading public scores…":"On this browser";
 if(!sharedEnabled){renderBoardEntries(localScores());$("board-status").textContent="Personal records stored only on this device. Shared rankings need a database connection.";return}
 try{
  const uri=backend.url.replace(/\/$/,"")+"/rest/v1/math_arcade_scores?select=player_name,elapsed_seconds,hints_used,created_at&order=elapsed_seconds.asc,hints_used.asc,created_at.asc&limit=10";
  const res=await fetch(uri,{headers:{"apikey":backend.publishableKey,"Accept":"application/json"}});
  if(!res.ok)throw Error("Leaderboard unavailable ("+res.status+")");
  const scores=await res.json();if(!Array.isArray(scores))throw Error("Unexpected leaderboard response");
  renderBoardEntries(scores);$("board-scope").textContent="Public leaderboard";$("board-status").textContent="Shared results are visible to everyone. Rankings are casual and not cheat-proof.";
 }catch(error){$("board-scope").textContent="Local leaderboard";$("board-status").textContent="Shared leaderboard unavailable; showing records on this device.";renderBoardEntries(localScores())}
}
function showWelcome(){
 $("welcome").classList.remove("hidden");$("game-shell").classList.add("hidden");
 $("nickname").value=name;$("nickname").focus()
}
function render(){
 transitioning=false;$("welcome").classList.add("hidden");$("game-shell").classList.remove("hidden");
 $("player-label").textContent="PLAYER: "+name;$("solved").textContent=unlocked+" / "+PUZZLES.length+" COMPLETED";
 $("timer").textContent=secondsToClock(liveSeconds());
 $("progress").replaceChildren();
 PUZZLES.forEach((_,i)=>{let el=document.createElement("span");el.className="segment"+(i<unlocked?" done":i===level?" current":"");el.title="Level "+(i+1);$("progress").append(el)});
 $("level").textContent="LEVEL "+String(level+1).padStart(3,"0")+" / "+String(PUZZLES.length).padStart(3,"0");
 if(completed){
  $("game").classList.add("hidden");$("complete").classList.remove("hidden");
  $("result-stats").textContent="Time "+secondsToClock(elapsed)+" · "+hints.length+" hints used";
  $("submit-score").disabled=scoreSaved;$("submit-score").textContent=scoreSaved?"SCORE SAVED ✓":"SAVE MY SCORE";
  return
 }
 $("game").classList.remove("hidden");$("complete").classList.add("hidden");
 const p=PUZZLES[level];$("title").textContent=p.title;$("difficulty").textContent="★".repeat(p.difficulty)+"☆".repeat(5-p.difficulty);
 $("description").textContent=p.desc;
 $("numbers").replaceChildren();p.seq.forEach((val,i)=>{let cell=document.createElement("span");cell.className="tile"+(i===p.seq.length-1?" missing":"");cell.textContent=val;$("numbers").append(cell)});
 const solved=level<unlocked;
 $("answer").value="";$("answer").disabled=solved;$("submit").disabled=false;$("submit").textContent=solved?"CONTINUE →":"CHECK ANSWER ↗";
 $("hint").classList.add("hidden");$("hint").textContent="";$("hint-btn").textContent="☼ Reveal a hint";$("hint-btn").disabled=solved;
 $("back-btn").disabled=level===0; $("next-btn").disabled=level>=unlocked||level>=PUZZLES.length-1;
 feedback(solved?"✓ Solved — "+p.explain:"",solved?"correct":"");
 persist()
}
function moveNext(){if(level<PUZZLES.length-1){level++;render();if(!($("answer").disabled))$("answer").focus()}}
function completeRun(){
 completed=true;stopClock();unlocked=PUZZLES.length;level=PUZZLES.length-1;persist();render();loadBoard()
}
function check(e){
 e.preventDefault();if(transitioning||completed)return;
 if(level<unlocked){moveNext();return}
 let input=$("answer").value.trim().toLowerCase().replace(/\s+/g,"");
 if(!input){feedback("Enter a value to check your pattern.","error");return}
 let p=PUZZLES[level];
 if(p.answer.some(a=>a.toLowerCase().replace(/\s+/g,"")===input)){
  transitioning=true;unlocked=Math.max(unlocked,level+1);
  feedback("✓ Correct! "+p.explain+" Unlocking next level…","correct");
  $("answer").disabled=true;$("submit").disabled=true;persist();
  window.setTimeout(()=>{if(level===PUZZLES.length-1)completeRun();else moveNext()},1150)
 }else{feedback("Not quite. Try another rule, or use a hint.","error");$("answer").select()}
}
async function submitScore(){
 if(!completed||scoreSaved)return;
 const score={player_name:name,elapsed_seconds:Math.max(1,Math.round(elapsed)),hints_used:hints.length,created_at:new Date().toISOString()};
 $("submit-score").disabled=true;$("submit-score").textContent="SAVING…";
 saveLocalScore(score);scoreSaved=true;persist();
 let message="Saved on this device.";
 if(sharedEnabled){
  try{
   const response=await fetch(backend.url.replace(/\/$/,"")+"/rest/v1/math_arcade_scores",{
    method:"POST",headers:{"apikey":backend.publishableKey,"Content-Type":"application/json","Prefer":"return=minimal"},
    body:JSON.stringify({player_name:score.player_name,elapsed_seconds:score.elapsed_seconds,hints_used:score.hints_used})
   });
   if(!response.ok)throw Error("Shared leaderboard rejected score");
   message="Saved locally and to the public leaderboard.";
  }catch(_){message="Saved locally; the public leaderboard is unavailable."}
 }
 $("score-feedback").textContent=message;
 $("submit-score").textContent="SCORE SAVED ✓";await loadBoard()
}
function resetRun(){
 if(transitioning)return;
 if(!window.confirm("Restart the game at Level 001? Your saved leaderboard scores will remain."))return;
 level=0;unlocked=0;elapsed=0;runningAt=0;hints=[];completed=false;scoreSaved=false;startClock();render()
}
function restore(){
 const s=getJson(SESSION_KEY,{});
 if(!s||typeof s.name!=="string")return false;
 name=s.name.slice(0,24);if(name.trim().length<2)return false;
 level=Math.min(PUZZLES.length-1,Math.max(0,Math.trunc(s.level)||0));
 unlocked=Math.min(PUZZLES.length,Math.max(0,Math.trunc(s.unlocked)||0));
 if(level>unlocked)level=Math.min(unlocked,PUZZLES.length-1);
 elapsed=Math.max(0,Number(s.elapsed)||0);hints=Array.isArray(s.hints)?s.hints.filter(x=>Number.isInteger(x)&&x>=0&&x<PUZZLES.length):[];
 completed=Boolean(s.completed)&&unlocked===PUZZLES.length;scoreSaved=Boolean(s.scoreSaved);
 return true
}
$("name-form").addEventListener("submit",e=>{
 e.preventDefault();const entered=$("nickname").value.trim().replace(/\s+/g," ");
 if(entered.length<2||entered.length>24){$("name-error").textContent="Choose a nickname between 2 and 24 characters.";return}
 if(name!==entered){name=entered;level=0;unlocked=0;elapsed=0;runningAt=0;hints=[];completed=false;scoreSaved=false;}
 $("name-error").textContent="";if(!completed)startClock();render()
});
$("quiz").addEventListener("submit",check);
$("hint-btn").addEventListener("click",()=>{
 if(level<unlocked)return;
 let h=$("hint"),reveal=h.classList.contains("hidden");h.textContent=PUZZLES[level].hint;h.classList.toggle("hidden",!reveal);
 $("hint-btn").textContent=reveal?"Hide hint":"☼ Reveal a hint";
 if(reveal&&!hints.includes(level)){hints.push(level);persist()}
});
$("back-btn").addEventListener("click",()=>{if(transitioning||level===0)return;level--;render()});
$("next-btn").addEventListener("click",()=>{if(transitioning||level>=unlocked)return;moveNext()});
$("reset").addEventListener("click",resetRun);
$("replay").addEventListener("click",resetRun);
$("submit-score").addEventListener("click",submitScore);
$("change-player").addEventListener("click",()=>{if(transitioning)return;stopClock();persist();showWelcome()});
$("board-refresh").addEventListener("click",loadBoard);
window.setInterval(()=>{if(runningAt){$("timer").textContent=secondsToClock(liveSeconds());persist()}},1000);
if(restore()){if(!completed)startClock();render()}else showWelcome();
loadBoard();