let Question = `7. What is the output of the given code?<div class="hk1_style-wrap4"><div class="hk1_style-wrap3"><div class="hk1_style-wrap2"><div class="hk1_style-wrap"><div class="hk1_style"><div class="ruby"><pre class="de1">boolean_1 = <span class="nu0">77</span><span class="sy0">&lt;</span><span class="nu0">78</span> <span class="kw3">puts</span><span class="br0">(</span>boolean_1<span class="br0">)</span></pre></div></div></div></div></div></div>""`;

let code = Question.substring(Question.indexOf("<"));
let ques = Question.replace(code, "");
console.log(code + "\n\n");
console.log(ques);
