const questions = [
    { 'short' : "[W]e wanted to drain the swamp here in our country.",
      'full': "Well yes, to tell you the truth, we are trying to work hard because <span class='in-context'>we wanted to drain the swamp here in our country.</span> We brought in many many new people. Not the old politicians, not the typical politicians, because we want to have a new format and a new type of government. You are a great teacher for us and in that.",
      'answer' : 'ua'
    },
    { 'short' : '[T]he United States is doing quite a lot for Ukraine. Much more than the European Union especially when we are talking about sanctions',
      'full' : "[...] It turns out even though logically, the European Union should be our biggest partner but technically the United States is a much bigger parter than the European Union and I'm very grateful to you for that because <span class='in-context'>the United States is doing quite a lot for Ukraine. Much more than the European Union especially when we are talking about sanctions</span> against the Russian Federation. I would also like to thank you for your great support in the area of defense. We are ready to continue to cooperate for the next steps specifically we are almost ready to buy more Javelins from the United States for defense purposes.",
      'answer' : 'ua'
    },
    { 'short' : 'Germany does almost nothing for [Ukraine]. All they do is talk',
      'full' :"Well it's very nice for you to say that. I will say that we do a lot for Ukraine. We spend a lot of effort and a lot of time. Much more than the European countries are doing and they should be helping you more than they are. <span class='in-context'>Germany does almost nothing for you. All they do is talk</span> and I think it's something you should really ask them about. When I was speaking to Angela Merkel she talks Ukraine, but she doesn't do anything.",
      'answer' : 'us'
    },
    { 'short' : 'Yes you are absolutely right. Not only 100%, but actually 1000%',
      'full' : "<span class='in-context'>Yes you are absolutely right. Not only 100%, but actually 1000%</span> and I can tell you the following; I did talk to Angela Merkel and I did meet with her. I also met and talked with Macron and I told them that they are not doing quite as much as they need to be doing on the issues with the sanctions. They are not working as much as they should work for Ukraine.",
      'answer' : 'ua'
    },
    { 'short' : '[T]he United States has been very very good to Ukraine.',
      'full' : "Well it's very nice for you to say that. I will say that we do a lot for Ukraine. We spend a lot of effort and a lot of time. Much more than the European countries are doing and they should be helping you more than they are. Germany does almost nothing for you. [...] A lot of the European countries are the same way so I think it's something you want to look at but <span class='in-context'>the United States has been very very good to Ukraine.</span> I wouldn't say that it's reciprocal necessarily because things are happening that are not good but <span class='in-context'>the United States has been very very good to Ukraine.</span>",
      'answer' : 'us'
    },
    { 'short' : "I surround myself with the best and most experienced people.",
      'full' : "Yes it is very important for me and everything that you just mentioned earlier. For me as a President, it is very important and we are open for any future cooperation. We are ready to open a new page on cooperation in relations between the United States and Ukraine. [...] I just wanted to assure you once again that you have nobody but friends around us. I will make sure that <span class='in-context'>I surround myself with the best and most experienced people.</span>",
      'answer' : "ua",
      'footer' : `Trump said "I'm going to surround myself only with the best and most serious people. We want top of the line professionals" <a href="https://www.washingtonpost.com/news/post-politics/wp/2015/08/08/trump-ends-relationship-with-longtime-political-adviser-roger-stone/">to Robert Acosta</a> during the campaign and other variants on those words <a href="https://abcnews.go.com/Politics/video/candidate-trump-promised-best-people-cabinet-50183308">many other times</a>.`
    }
]

function transcriptName(country) {
    if (country === 'us') {
	return "The President"
    } else {
	return "President Zelenskyy"
    }
}

Vue.component('quiz-buttons', {
    props: ['answer', 'choice'],
    methods: {
	choose: function (country) {
	    this.$emit('choose', country);	    
	},
	countryClasses: function (country) {	    
	    if (this.choice === country) {	    
		return {
		    correct : (this.choice === this.answer),
		    incorrect : ! (this.choice === this.answer)
		}
	    }
	}
    },    
    template : `
<div class='buttons'>
<button 
v-on:click="choose('ua')" 
v-bind:class="countryClasses('ua')"
v-bind:disabled="choice"
>
President Zelensky <img src='/img/ukraine-flag.png' class='button-flag'/>
</button>

<button 
v-on:click="choose('us')" 
v-bind:class="countryClasses('us')"
v-bind:disabled="choice"
>
President Trump <img src='/img/us-flag.png' class='button-flag'/>
</button>
</div>
`
})

Vue.component('quiz-question', {
    props : ['question'],
    data :  function () {
	return {
	    choice: null,
	}
    },
    methods: {
	onChoice(choice) {
	    this.choice = choice;
	}
    },
    template : `
<div>
<div class='question-prompt'>
<blockquote>
<p> {{question.short}} </p>
</blockquote>
</div>
<quiz-buttons
v-bind:answer='question.answer'
v-bind:choice='choice'
@choose='onChoice'
></quiz-buttons>
<div 
class='question-context'
v-bind:class='{ unanswered : ! choice, answered : choice }'
>
<blockquote>
<p> 
<s>(S/NF)</s> <u>{{ transcriptName(question.answer) }}</u>: 
<span v-html="question.full"></span> 
</p>
</blockquote>
<p v-if="question.footer" v-html="question.footer"> </p>

</div>

</div>
`,
});


Vue.component('app-content', {
    template : `
<div>
<quiz-question 
v-for='(question, idx) in questions'
v-bind:question='question'
></quiz-question>
</div>
`,
    data: function () {
	return {
	    questions: questions
	}}
});


let app = new Vue({
    delimiters : ["((", "))"],
    el: '#app',
    data: { message : 'Hello, Vue!' }
})

