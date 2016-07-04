//**************DOM NAVIGATION*****************************************
var dom = {
	id :	function(id){
			return document.getElementById(id);
	},
	cl : 	function(cl){
			return document.getElementsByClassName(cl);
	}
};

//***************************************************************************
//**********UTILITY FUNCTIONS*******************************************
function checkConfig(obj){
	var map = [];
	
	for(var key in obj){
		if(obj[key].isOn){
			map.push(key);
		};
	};
	return map;
}
function random(obj){

	if( obj.constructor === Object){
		var map = [];
		var objectLength = function(obj){
			  var count = 0;
			  for(key in obj){count++; map.push(key)}
			  return count;
		};
		return map[Math.floor(Math.random() * objectLength(obj))];
	};		
	if( obj.constructor === Array){
		return obj[Math.floor(Math.random() * (obj.length) ) ];}
};
function checkWordType(word, type, action){
	if(word[type] != true){ action();}
};
function checkCaseUse(elementId){
	return dom.id(elementId).addEventListener("click", changeIsOn, false);
	function changeIsOn(){
		grammarList[elementId]['isOn'] = this.checked;
	}
	
}
function englishPluralNouns(word){
	var dontAddS = false;
	var exceptions={
		'boy': true, 
		'human': true,
		'walkway': true,
		'money': true,
		}
	if(!(word in exceptions)){
		if(word.match(/y$/)){ 
			word = word.replace(/y$/, 'ies')
			dontAddS = true;	
			}
		else if(word.match(/man$/)){ 
			word = word.replace(/man$/, 'men')
			dontAddS = true;
			}
	}
	if(!dontAddS){word = word + "s"}
	return word
};
//***************************************************************************
//***************GLOBAL VARIABLES*************************************
var word = "word";
var sentence = [];
//*****************CONSTRUCTORS***************************************
//***************************************************************************
function Noun(dictEntry, meaning, types, chapter, section){
	
	this["firstDict"] = dictEntry.match(/^[a-zA-Z]+(?=,)/).join();
	//Order Matters.  Gender must be in front of Declension to remove any of the info.
	//For words that don't have a declared gender those are dealt with under the declension section.
	this['gen'] = undefined;
		dictEntry = dictEntry.replace(/\(/, '');
		dictEntry = dictEntry.replace(/\)/, '');
			if(dictEntry.match(/m\/f$/i)){
				this['gen'] = 'C';
				dictEntry = dictEntry.replace(/ m\/f$/i, '' );
			}
			if(dictEntry.match(/m$/i)){
				this['gen'] = 'M'
				dictEntry = dictEntry.replace(/ m$/i,'' );
			}
			if(dictEntry.match(/f$/i)){
				this['gen'] = 'F';
				dictEntry = dictEntry.replace(/ f$/i,'' );
			}
			if(dictEntry.match(/n$/i)){
				this['gen'] = 'N';
				dictEntry = dictEntry.replace(/ n$/i,'' );
			}
			if(dictEntry.match(/c$/i)){
				this['gen'] = 'C';
				dictEntry = dictEntry.replace(/ c$/i,'' );
			}
	this['decl'] = undefined;
		if(dictEntry.match(/i$/)){
			this['decl'] = '2nd';
			if(this['gen'] == undefined){ 
				if(dictEntry.match(/um(?=,)/)){this['gen'] = 'N'; }
				else{ this['gen'] = 'M';}
			}
		}
		if(dictEntry.match(/ae$/)){this['decl'] = '1st'}
				if(this['gen'] == undefined){this['gen'] = 'F'; }
			
		if(dictEntry.match(/is$/)){this['decl'] = '3rd'}
		if(dictEntry.match(/ei$/)){this['decl'] = '5th'}
		if(dictEntry.match(/us$/)){this['decl'] = '4th'}		
	this['stem'] = undefined;
		if(this['decl'] == '2nd'){
			if(dictEntry.match(/[a-z](?=,)/).join() == 'r') {
				this['stem'] = dictEntry.match(/[a-zA-Z]+(?=,)/)
			}
			else if(this['gen'] == 'M'){
				this['stem'] = dictEntry.match(/[a-zA-Z]+(?=us,)/i).join();
			}
			else{ this['stem'] = dictEntry.match(/[a-zA-Z]+(?=um,)/i).join();}
		}
		if(this['decl'] == '1st'){this['stem'] = dictEntry.match(/[a-zA-Z]+(?=a,)/i).join();}
	this['meaning'] = meaning;
	this['types'] = types;
	this.chapter = chapter;
	this.section = section;
};
function Verb(dictEntry, meaning, types){
	this["conj"] = undefined;
		if(dictEntry.match(/are,/i)){ this['conj'] = '1st';}
		else if(dictEntry.match(/ire,/i)){ this['conj'] = '4th'}
		else if(dictEntry.match(/eo,/i) && dictEntry.match(/ere,/i)){ this['conj'] = '2nd'}
		else if(dictEntry.match(/io,/i) && dictEntry.match(/ere,/i)){ this['conj'] = '3rd io'}
		else if(dictEntry.match(/ere,/)){ this['conj'] = '3rd'}
	this["presStem"] = undefined;
		if(this['conj'] == '1st' || this['conj']  == '3rd'){
			this['presStem'] = dictEntry.match(/[a-zA-Z]+(?=o,)/).join();
		}
		else{
			this['presStem'] = dictEntry.match(/[a-zA-Z]+(?=eo,|io,)/).join();
		}
	this['perfStem'] = dictEntry.match(/[a-zA-Z]+(?=i,)/).join();
		if(this['conj'] == '1st'){ this['perfStem'] = this['presStem'] + 'av'
		}
	this['partStem'] = dictEntry.match(/[a-zA-Z]+(?=us$)/).join();
		if(this['conj'] == '1st'){ this['partStem'] = this['presStem'] + 'at'
		}
	this['meaning'] = meaning;
	this['types'] = types;
	this['transitive'] = true; 
	this['intransitive'] = false;
	this['linking'] = false;
		for(var i = 0; i < Verb.arguments.length; i++){
			if(Verb.arguments[i] == 'intransitive') {this["intransitive"] = true};
			if(Verb.arguments[i] == 'linking') {this['linking'] = true};
	};		
		if(this['intransitive'] == true){this['transitive'] = false;}
};
//***************************************************************************
//****************DATA*****************************************************
var structuresList= {
	subjDoV : {
		isOn: true,
		latinOrder: ["subject","prepositionAblative", "directObject", "verb"],
		englishOrder: ["subject","verb", "directObject","prepositionAblative"]
	},
	subjLvPred: {
		isOn: false,
		latinOrder: ["subject", "predicateNominative", "linkingVerb"],
		englishOrder: ["subject", "linkingVerb", "predicateNominative", ]
	},
};
var grammarList = {
	'1stF': {
		"nominative":{ sg: 'a', pl: 'ae'},
		"accusative":{ sg: 'am', pl: 'As'},
		"ablative":{ sg: 'A', pl: 'is'},
	},
	'2ndM': {
		"nominative":{ sg: 'us', pl: 'i'},
		"accusative":{ sg: 'um', pl: 'Os'},
		"ablative":{ sg: 'O', pl: 'is'},
	},
	'2ndN': {
		"nominative":{ sg: 'um', pl: 'a'},
		"accusative":{ sg: 'um', pl: 'a'},
		"ablative":{ sg: 'O', pl: 'is'},
	},
	'presentActive': {
		endings: {
			'1st': 		['o','as','at','amus','atis','ant'],
			'2nd' : 	['eo', 'es', 'et', 'emus', 'etis', 'ent'],
			'3rd' : 	['o', 'is', 'it', 'imus', 'itis', 'unt'],
			'3rd io':	['io', 'is', 'it', 'imus', 'itis', 'iunt'],
			'4th' : 	['io', 'is', 'it', 'imus', 'itis', 'iunt'],
		},
	},
	createWord : function(nounUse){
		var	use = grammarList[nounUse];
			//*************CLEAR OLD WORD*******************************
			delete use.word, use.decl, use.gender, use.number, use.ending, use.form, use.translation, use.meaning, use.types
			//************SET DEFAULT use**************************
			if(checkConfig(grammarList).join("").match(nounUse) == null){
//				console.log('default ' + nounUse)
				use.gender = random(['M','F','N']);
				use.decl =  random(['1stF', '2ndN', '2ndM']);
					var decl = use.decl;
				use.number = random(['sg','pl']);
					var number = use.number;
				use.form = "____";
					var translation;
						if(number == 'sg'){translation = "the " + nounUse}
						if(number == 'pl'){translation = "the " + englishPluralNouns(nounUse)}
							else{translation = "the " + nounUse}	
				use.translation = translation;
				use.word = 'default ' + nounUse; 
				use.meaning = nounUse;
			}
			//************IF CHOSEN*****************************************
			if(checkConfig(grammarList).join("").match(nounUse)){
//				console.log(nounUse + ' chosen')		
				use.word = dictionary["nouns"][random(dictionary["nouns"])];
					var word = use.word;
				use.decl =  word["decl"] + word["gen"];
					var decl = use.decl;
				use.gender = word["gen"]
				use.number = random(grammarList[decl][grammarList[nounUse]['nounCase']]);
					var number = use.number;
				use.ending = grammarList[decl][grammarList[nounUse]["nounCase"]][number];
					var ending = use.ending;
				if((number == 'sg') && (grammarList[nounUse]["nounCase"] == 'nominative')) {grammarList[nounUse].form = word["firstDict"] + " ";}
				else{grammarList[nounUse].form = word["stem"] + ending}
				var translation;
					if(number == 'sg'){translation = "the " + word["meaning"]}
					else{translation = "the " + englishPluralNouns(word["meaning"])};
				use.translation = translation;
				use.meaning= word["meaning"];
				use.types= word["types"];			
			}
			return word;		
	},
	'subject': {
		nounCase: "nominative",
		isOn: dom.id('subject').checked,
		check: checkCaseUse('subject'),
		create: function(){
			grammarList.createWord('subject')
			grammarList['verb'].number = grammarList['subject'].number
		},
	},
	'directObject': {
		nounCase: "accusative",
		isOn: dom.id('directObject').checked,
		check: checkCaseUse('directObject'),
		create: function(){grammarList.createWord('directObject')},
	},
	"prepositionAblative":{
		nounCase: "ablative",
		isOn: dom.id('prepositionAblative').checked,
		check: checkCaseUse('prepositionAblative'),
		create: function(){
			var prep = grammarList["prepositionAblative"];	
			delete prep.preposition, prep.form, prep.translation, prep.meaning, prep.word, prep.decl, prep.gender, prep.number, prep.ending, prep.types;
			if(checkConfig(grammarList).join("").match("prepositionAblative") == null){
				prep.translation = " ";
				prep.word = 'default ' + 'prepostionAblative'; 
				prep.meaning = " ";
				prep.form = " ";
			}
			if(checkConfig(grammarList).join("").match("prepositionAblative")){			
				prep.preposition = random(dictionary['prepositions']);
					while(!(dictionary['prepositions'][prep.preposition]['ablative'])){
						prep.preposition = random(dictionary['prepositions']);
						if('no ablative prep phrase'){console.log('beware of no ablative preps');}
					}
					//*************MAKE SURE THE NOUN IS THE RIGHT TYPE FOR THE PREP************
					var prepTypes = dictionary['prepositions'][prep.preposition]['types'];
					var isType = false;
					while(!(isType)){
						grammarList.createWord('prepositionAblative');
						var nounTypes = prep.word['types']
							if(nounTypes == undefined){prep.word.types = 'nothing'}
						for(var i = 0; i < prepTypes.length; i++){
							for(var j = 0; j < nounTypes.length; j++){
								if(prepTypes[i] == nounTypes[j]){isType = true;}
							}
						}				
					}
				prep.form = prep.preposition + " " + prep.form;
				prep.translation = dictionary['prepositions'][prep.preposition]['meaning']  + " " + prep.translation
			}
		},
		
	},
	"verb" : {
		isOn: dom.id('verb').checked,
		check: checkCaseUse('verb'),
//		number: grammarList['subject']['number'],
		create: function(type, transitive){
		
			//*************MAIN SCOPE VARIABLES****************
			var verb = grammarList['verb'];
			var number = grammarList['subject']['number']
				if(!number) {console.log('oops no subject number for verb')}
			//***********RESET TO DEFAULT****************************************
			delete verb.word, verb.conj, verb.ending, verb.form, verb.meaning, verb.types, verb.translation;

			//*******************SET DEFAULT****************************************
			verb.meaning = "verb";
			if(checkConfig(grammarList).join("").match('verb') == null){
				verb.word = 'default';
					var word = verb.word
				verb.form = "____";
					var form = verb.form
				verb.translation = verb.meaning;
					if(number == 'sg'){verb.translation = verb.meaning + "s"}
					if(number == 'pl'){verb.translation = verb.meaning}
//				console.log(verb.word + " verb created")
			}	
			if(checkConfig(grammarList).join("").match('verb')){
				verb.word = dictionary["verbs"][random(dictionary["verbs"])];
					var word = verb.word
					//Check for directObject
/*				if(sentence.join("").match("directObject"))
					if (word['intransitive'] == true){
						return grammarList["verb"].create();
					}
*/
				//Temp stop intransitives
				if (word['intransitive']){
						return grammarList["verb"].create();
					}
				verb.conj = word['conj']
					var conj =  verb.conj
				var ending;
					if(number == 'sg'){ending = grammarList['presentActive']['endings'][conj][2]};
					if(number == 'pl'){ending = grammarList['presentActive']['endings'][conj][5]};
					verb.ending = ending;
				verb.form = word['presStem'] + ending;
					var form = verb.form;
				var translation;
					if(number == 'sg'){translation = word['meaning'] + 's'};
					if(number == 'pl'){translation =  word['meaning']};
					verb.translation = translation;
				verb.meaning = word['meaning'];
			}
			return word;
		}
		
	},
}
var dictionary = {
	nouns:{

		// Noun(dictEntry, meaning, types, chapter, section)
		servus :		new Noun('servus, i', 'slave',['person']),
		puella: 		new Noun('puella, ae','girl',['person']),
		fluvius:		new Noun('fluvius, i', 'river',['place']),
		insula : 		new Noun('insula, ae','island',['place']),
		oppidum : 	new Noun('oppidum, i' , 'town', 'place'),
//		rex:		new Noun('rex', 'reg', '3rd', 'm', 'king', ['person']),

ancilla	:  new Noun(	'ancilla, -ae',	'slave woman',	['person'],	'II',	2	),
aqua	:  new Noun(	'aqua, ae',	'water',	['thing'],	'V',	1	),
atrium	:  new Noun(	'atrium, i',	'main room',		'V',	1	),
baculum	:  new Noun(	'baculum, -i',	'stick',	['thing'],	'IV',	2	),
cubiculum	:  new Noun(	'cubiculum, i',	'room',	['place'],	'V',	1	),
domina	:  new Noun(	'domina, -ae',	'female master',	['person'],	'II',	2	),
dominus	:  new Noun(	'dominus, -i',	'master',	['person'],	'II',	2	),
familia	:  new Noun(	'familia, -ae',	'family',	['person'],	'II',	1	),
femina	:  new Noun(	'femina, -ae',	'woman',	['person'],	'II',	1	),
fenestra	:  new Noun(	'fenestra, ae',	'window',	'thing',	'V',	1	),
filia	:  new Noun(	'filia, -ae',	'daughter',	['person'],	'II',	1	),
filius	:  new Noun(	'filius, -i',	'son',	['person'],	'II',	1	),
fluvius	:  new Noun(	'fluvius, -i',	'river',	['place'],	'I',	1	),
hortus	:  new Noun(	'hortus, i',	'garden',	['place'],	'V',	1	),
imperium	:  new Noun(	'imperium, -i',	'empire',	'thing',	'I',	2	),
impluvium	:  new Noun(	'impluvium, -i',	'water basin',		'V',	1	),
insula	:  new Noun(	'insula, -ae',	'island',	['place'],	'I',	1	),
liber	:  new Noun(	'liber, libri',	'book',	'thing',	'II',	3	),
//  liberi	:  new Noun(	'liberi, -orum',	'children',	['person'],	'II',	1	),
lilium	:  new Noun(	'lilium, i',	'lilly',	'thing',	'V',	1	),
littera	:  new Noun(	'littera, -ae',	'letter',	'thing',	'I',	3	),
// mater	:  new Noun(	'mater, matris',	'mother',	['person'],	'II',	1	),
mensa	:  new Noun(	'mensa, -ae',	'table',	'thing',	'IV',	2	),
nasus	:  new Noun(	'nasus, i',	'nose',	'thing',	'V',	1	),
numerus	:  new Noun(	'numerus, -i',	'number',	'thing',	'I',	3	),
nummus	:  new Noun(	'nummus, -i',	'money',	'thing',	'IV',	1	),
oceanus	:  new Noun(	'oceanus, -i',	'ocean',	['place'],	'I',	1	),
oppidum	:  new Noun(	'oppidum, -i',	'city',	['place'],	'I',	1	),
ostium	:  new Noun(	'ostium, i',	'(o) door',	'thing',	'V',	1	),
pagina	:  new Noun(	'pagina, -ae',	'page',	'thing',	'II',	3	),
// pater	:  new Noun(	'pater, patris',	'father',	['person'],	'II',	1	),
pecunia	:  new Noun(	'pecunia, -ae',	'money',	'thing',	'IV',	1	),
peristylum	:  new Noun(	'peristylum, i',	'walkway',	['place'],	'V',	1	),
persona	:  new Noun(	'persona, -ae',	'person',	['person'],	'III',	1	),
provincia	:  new Noun(	'provincia, -ae',	'province',	['place'],	'I',	2	),
puella	:  new Noun(	'puella, -ae',	'girl',	['person'],	'II',	1	),
puer	:  new Noun(	'puer, -i',	'boy',	['person'],	'II',	1	),
rosa	:  new Noun(	'rosa, ae',	'rose',	'thing',	'V',	1	),
sacculus	:  new Noun(	'sacculus, -i',	'little bag',	'thing',	'IV',	1	),
scaena	:  new Noun(	'scaena, -ae',	'scene',	'thing',	'III',	1	),
servus	:  new Noun(	'servus, -i',	'slave',	['person'],	'II',	2	),
syllaba	:  new Noun(	'syllaba, -ae',	'syllable',	'thing',	'I',	3	),
verbum	:  new Noun(	'verbum, -i',	'(ve) word',	'thing',	'III',	2	),
villa	:  new Noun(	'villa, -ae',	'country house',	['place'],	'V',	1	),
vir	:  new Noun(	'vir, -i',	'man',	['person'],	'II',	1	),
vocabulum	:  new Noun(	'vocabulum, -i',	'(vo) word',	'thing',	'I',	3	),


	},
	verbs:{
		//Verb(dictEntry, meaning, types)
		moveo:	new Verb('moveo, movere, movi, motus', 'move', ['motion'], 'intransitive'),
		pulso :	new Verb('pulso, pulsare, pulsavi, pulsatus', 'hit', ['action']),
		video : 	new Verb("video, videre, vidi, visus", "see", ['perception']),
		amo :	new Verb('amo, -are, -avi, -atus', 'love', ['feeling']),
		habeo :	new Verb('habeo, habere, habui, habitus', 'have', ['has']),
		ago :		new Verb('ago, agere, egi, actus', 'act upon', ['action']), 
		capio :	new Verb('capio, capere, cepi, captus', 'capture', ['action']),
		audio :	new Verb('audio, audire, audivi, auditus', 'hear', ['perception']),
accuso	: new Verb(	'accuso, accusare, accusavi, accusatus',	'accuse',	[' ']		),
ago	: new Verb(	'ago, agere, egi, actus',	'act',	[' ']		),
amo	: new Verb(	'amo, amare, amavi, amatus',	'love',	[' ']		),
audio	: new Verb(	'audio, audire, audivi, auditus',	'hear',	[' ']		),
canto	: new Verb(	'canto, are, avi, atus',	'sing',	[' ']		),
carpo	: new Verb(	'carpo, carpere, carpsi, carptus',	'pick',	[' ']		),
delecto	: new Verb(	'delecto, delectare, delectavi, delectatus',	'delight',	[' ']		),
discedo	: new Verb(	'discedo, discedere, discessi, discessus',	'leave',	[' '],	'intransitive'	),
dormio	: new Verb(	'dormio, dormire, dormivi, dormitus',	'sleep',	[' '],	'intransitive'	),
habeo	: new Verb(	'habeo, habere, habui, habitus',	'have',	[' ']		),
habito	: new Verb(	'habito, habitare, habitavi, habitatus',	'live in',	[' ']		),
interrogo	: new Verb(	'interrogo, interrogare, interrogavi, interrogatus',	'ask',	[' ']		),
numero	: new Verb(	'numero, numerare, numeravi, numeratus',	'count',	[' ']		),
ploro	: new Verb(	'ploro, plorare, ploravi, ploratus',	'crys',	[' '],	'intransitive'	),
pono	: new Verb(	'pono, ponere, posui, positus',	'put',	[' ']		),
pulso	: new Verb(	'pulso, pulsare, pulsavi, pulsatus',	'hit',	[' ']		),
respondeo	: new Verb(	'respondeo, respondere, respondi, responsus',	'respond',	[' ']		),
rideo	: new Verb(	'rideo, ridEre, risi, risus',	'laugh',	[' ']		),
saluto	: new Verb(	'saluto, salutare, salutavi, salutatus',	'salute',	[' ']		),
sumo	: new Verb(	'sumo, sumere, sumpsi, sumptus',	'pick up',	[' ']		),
taceo	: new Verb(	'taceo, tacere, tacui, tacitus',	'be quiet',	[' '],	'intransitive'	),
venio	: new Verb(	'venio, venire, veni, ventus',	'come',	[' '],	'intransitive'	),
verbero	: new Verb(	'verbero, verberare, verberavi, verberatus',	'beat',	[' ']		),
video	: new Verb(	'video, vidEre, vidi, visus',	'see',	[' ']		),
voco	: new Verb(	'voco, vocare, vocavi, vocatus',	'call',	[' ']		),




	},	
	prepositions:{
		'in' : {
			stem: 'in',
			meaning: 'in',
			'ablative' : true,
			types: ['place']
		},
		'ad' : {
			stem: 'ad',
			meaning: 'toward',
			'accusative' : true,
			types : ['place', 'person', 'thing']
		},
		'cum' : {
			stem: 'cum',
			meaning: 'with',
			'ablative' : true,
			types : ['person']
		},
		'sine' : {
			stem: 'sine',
			meaning: 'without',
			'ablative' : true,
			types : ['person']
		},		
		
	},
}
function createSentence(){
//********************************************************Clear old Sentence
	for(var i = 0; i < sentence.length; i++){
		sentence.splice(i);
		showAnswer();
	}
//**********************************************
	var structure = structuresList[random(checkConfig(structuresList))]
	var latinOrder = structure.latinOrder;
	var englishOrder = structure.englishOrder;
	var data = [];
//***********CREATE***********************
	for(var i = 0; i < latinOrder.length; i++){
		grammarList[latinOrder[i]].create();
		//NO REPEATS
		for(var j = 0; j < i; j++){
			if(j != i){
				while(grammarList[latinOrder[i]]["word"] == grammarList[latinOrder[j]]["word"]){
					grammarList[latinOrder[i]].create();
				}
			}
		}
		console.log(grammarList[latinOrder[i]]['meaning']);
	}
//**********STORE INFO********************************************
	for(var i = 0; i < latinOrder.length; i++){
		data.push(grammarList[englishOrder[i]]["translation"]);
		sentence.push(grammarList[latinOrder[i]]["form"]);
//				console.log("the sentence section : " + i + " was "+ grammarList[englishOrder[i]]["translation"]);
	}	
		english.innerHTML = data.join(" ")
//		console.log("the sentence was "+ data.join(" "))
	return data;
}
function showAnswer(){
	dom.id('latin').innerHTML = sentence.join(" ");
	if(dom.id('latin').innerHTML == ""){dom.id('latin').innerHTML = "Latin"}
}