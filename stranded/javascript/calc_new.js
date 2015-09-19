//////////////////////
//Actual Calc Stuff
//////////////////////
/*
	It can get pretty annoying adjusting the experiences and adding new things to the table. I should have done it in a way better way.
	Anyways, I'll try to explain how to as best as I can.
		1. The two functions you want to worry about when adding or adjusting the stuff is "doCalc()" and "dynamic1()".
		2. The experience which is stored in all the skill tables in the "doCalc" func is coherent I guess to say. 
		What I mean is you first entry on the "dynamic1" tables, well the experience to that item has to 
		be the first entry on the experience tables.
			Example: 
*/
function getExp(val)
{
	//Runescape experience formula http://rsdo.net/rsdonline/guides/Experience%20formula.html
	var points = 0,
	output = 0;

	for (lvl = 1; val > lvl; lvl++)
	{
		points += Math.floor(lvl + 300 * Math.pow(2, lvl / 7));
		output = Math.floor(points / 4)
	}

	return output;
}

function getVal(ele)
{
	return document.getElementById(ele)
}

function setVal(ele, val)
{
	document.getElementById(ele).value = val
}

function doCalc()
{
	document.getElementById("mob_level_label").style.display = "none";
	document.getElementById("mob_level").style.display = "none";

	//Pre Sets
	var levelCap = 70;

	//Skill EXP
	var woodcutting = [12, 19, 34, 50, 75],
	mining = [15, 30, 40, 50, 65, 90],
	construction = [6, 12, 16, 24, 30, 15, 30, 6, 12, 16, 2, 4, 6, 10, 20, 30, 40, 50, 4, 8, 12, 30, 60, 15, 24, 40, 30, 60, 90, 120, 150, 8, 16, 24, 80, 160, 32, 64, 96, 50, 100, 150, 200, 250, 12, 24, 36, 120, 240, 48, 96, 144, 8, 14, 18, 26, 32, 20, 40, 6, 4, 10, 15, 16, 18, 24, 32],
	smithing = [12, 25, 40, 60, 90, 180, 12, 25, 40, 60, 90, 115, 12, 32, 46, 75, 90, 150, 12, 32, 46, 75, 90, 180, 140, 12, 32, 55, 60, 90, 150, 25, 65, 140, 80, 100, 140, 20, 120, 30, 90, 160, 30, 130, 250, 10, 45, 90, 20, 90, 180, 30, 140, 275, 50, 230, 450, 110, 460, 850, 1000, 10, 45, 20, 50, 10, 60, 120, 160],
	farming = [35, 5, 9, 14, 25, 35, 50, 60, 30, 30, 16, 22, 37, 50, 80, 120, 180, 100, 130, 160, 190, 220, 24, 24],
	fishing = [10, 10, 30, 40, 50, 70, 90, 100],
	cooking = [30, 30, 60, 70, 80, 100, 120, 140, 50, 40, 80, 120, 160, 200, 320, 450, 220, 300, 450, 50, 120],
	combat = [45, 100, 1200],
	alchemy = [10, 30, 45, 75, 90, 125, 140, 180, 200, 300, 25, 30, 75, 125, 225, 260, 30, 110, 160, 340, 30, 70, 110, 180, 300, 650, 650, 650, 650, 2000, 900, 10, 60, 120, 180, 15, 120, 180, 80, 80],
	arcane = [6, 8, 20, 25, 30, 36, 44, 50, 56, 60, 65, 70, 10, 25, 25, 35, 45, 30, 75, 75, 70, 60, 70, 80, 65, 55, 25, 15, 60, 35, 75];

	//Index Array - All the skill arrays need to be listed in the array below
	var skillsIndex = [woodcutting, mining, construction, smithing, farming, fishing, cooking, combat, alchemy, arcane];

	//Bonus Values
	var elixirBonus = [1, 1.25, 1.5, 2], //no exlixer, 25%, 50%, 100%
	rankBonus  = [1, 1.08, 1.25]; //guest, member/veteran, donor/sponsor

	//Get Text Field Values
	var expAmount = getVal("exp_amount").value,
	serverBonus = getVal("server_bonus").value / 100 + 1,
	desireLevel = getVal("desired_level").value,
	totemBonus = getVal("totem_bonus").checked;

	//Get Select Options
	var rankGet = getVal("rank").selectedIndex,
	elixirGet = getVal("elixir_bonus").selectedIndex,
	skillGet = getVal("skills").selectedIndex,
	resourceGet = getVal("resource").selectedIndex;

	//Core Math Stuff
	if ( (desireLevel > levelCap) || (desireLevel < 0) ) desireLevel = 1;
	if ( (!serverBonus) || (serverBonus < 0) ) serverBonus = 1;
	if ( (!expAmount) || (expAmount < 0) ) expAmount = 1;
	if (totemBonus){ totemBonus = 1.25; }else{ totemBonus = 1; }

	var desireLevel = getExp(desireLevel);

	if (skillGet == 7)
	{
		document.getElementById("mob_level_label").style.display = "initial";
		document.getElementById("mob_level").style.display = "initial";

		if (resourceGet == 3)
		{ 
			mobLevel = 1; 
		}else{
			mobLevel = getVal("mob_level").value;
			if ( (!mobLevel) || (mobLevel < 0) || (mobLevel > 5) ){ return 1; }
		}

		mobExp = skillsIndex[skillGet][resourceGet] + ( (skillsIndex[skillGet][resourceGet] / 2) * (mobLevel - 1));

		exp2 = Math.ceil( (desireLevel - expAmount) / (.6 * mobExp * rankBonus[rankGet] * serverBonus * totemBonus) );
		exp = desireLevel - expAmount;
	}else{
		document.getElementById("mob_level_label").style.display = "none";
		document.getElementById("mob_level").style.display = "none";

		exp2 = Math.ceil( (desireLevel - expAmount) / (.6 * skillsIndex[skillGet][resourceGet] * rankBonus[rankGet] * serverBonus * totemBonus) );
		exp = desireLevel - expAmount;
	}

	setVal("result1", exp);
	setVal("result2", exp2);
}

//Code by RSJoomla - http://demo.rsjoomla.com/dynamic-drop-down-change-form-example
function dynamic1(parent,child){

	var parent_array = new Array();

	parent_array['woodcutting'] = ['Wood','Oak Wood','Maple Wood','Pine Wood','Yew Wood'];

	parent_array['mining'] = ['Stone','Iron Ore','Coal','Silver Ore','Trinium Ore','Naquadah Ore'];

	parent_array['construction'] = ['[Wood] Panel 1x1','[Wood] Panel 1x2','[Wood] Panel 2x2','[Wood] Panel 2x4','[Wood] Panel 4x4','[Wood] Semi Circle','[Wood] Circle','[Wood] Frame 1x1','[Wood] Frame 1x2','[Wood] Frame 2x2','[Wood] Plank 1','[Wood] Plank 2','[Wood] Plank 4',
	'[Oak] Panel 1x1','[Oak] Panel 1x2','[Oak] Panel 2x2','[Oak] Panel 2x4','[Oak] Panel 4x4','[Oak] Plank 1','[Oak] Plank 2','[Oak] Plank 4','[Oak] Semi Circle','[Oak] Circle','[Oak] Frame 1x1','[Oak] Frame 1x2','[Oak] Frame 2x2',
	'[Maple] Panel 1x1','[Maple] Panel 1x2','[Maple] Panel 2x2','[Maple] Panel 2x4','[Maple] Panel 4x4','[Maple] Plank 1','[Maple] Plank 2','[Maple] Plank 4','[Maple] Semi Circle','[Maple] Circle','[Maple] Frame 1x1','[Maple] Frame 1x2','[Maple] Frame 2x2',
	'[Pine] Panel 1x1','[Pine] Panel 1x2','[Pine] Panel 2x2','[Pine] Panel 2x4','[Pine] Panel 4x4','[Pine] Plank 1','[Pine] Plank 2','[Pine] Plank 4','[Pine] Semi Circle','[Pine] Circle','[Pine] Frame 1x1','[Pine] Frame 1x2','[Pine] Frame 2x2',
	'[Metal] Plate 1x1','[Metal] Plate 1x2','[Metal] Plate 2x2','[Metal] Plate 2x4','[Metal] Plate 4x4','[Metal] Semi-Circle','[Metal] Circle','[Metal] Tri-Plate 1x2','[Metal] Tri-plate 1x1','[Metal] Tri-Plate 2x2','[Metal] Tri-Plate 2x4','[Metal] Tri-Plate 4x4','Chainlink Fence 1x1','Chainlink Fence 1x2','Chainlink Fence 1x4'];

	parent_array['smithing'] = ['[T] Wooden Club','[T] Iron Rod','[T] Steel Rod','[T] Silver Rod','[T] Trinium Rod','[T] Naquadah Rod',
	'[T] Stone Hachet','[T] Iron Hachet','[T] Steel Hachet','[T] Silver Hachet','[T] Trinium Hachet','[T] Naquadah Hachet',
	'[T] Stone Pickaxe','[T] Iron Pickaxe','[T] Steel Pickaxe','[T] Silver Pickaxe','[T] Trinium Pickaxe','[T] Naquadah Pickaxe',
	'[T] Wooden Fishing Rod','[T] Iron Fishing Rod','[T] Steel Fishing Rod','[T] Silver Fishing Rod','[T] Trinium Fishing Rod','[T] Naquadah Fishing Rod','[T] Advanced Fishing Rod',
	'[T] Stone Hoe','[T] Iron Hoe','[T] Steel Hoe','[T] Silver Hoe','[T] Trinium Hoe','[T] Naquadah Hoe',
	'[T] Iron Sifter','[T] Steel Sifter','[T] Trinium Sifter',
	'[T] Grinding Stone','[T] Alchemists Stone','[T] Frying Pan','[T] Handheld Torch','[T] Construction Hammer',
	'[T] Iron Seed Extractor','[T] Silver Seed Extractor','[T] Trinium Seed Extractor',
	'[S] Wood to Coal','[S] Wood to Coal (x5)','[S]Wood to Coal (x10)','[S]Iron','[S]Iron (x5)','[S]Iron (x10)',
	'[S] Steel','[S] Steel (x5)','[S] Steel (x10)','[S] Silver','[S] Silver (x5)','[S] Silver (x10)',
	'[S] Trinium','[S] Trinium (x5)','[S] Trinium (x10)','[S] Naquadah','[S] Naquadah (x5)','[S] Naquadah (x10)','[S] Reinforced Naquadah',
	'[S] Metal (x5)','[S] Metal (x25)','[S] Glass','[S] Glass (x5)',
	'[S] Glass Vial','[S] Glass Flask','[S] Heavy Glass Flask','[S] Imbued Glass Flask'];

	parent_array['farming'] = ['[HARVEST]','[F] Pypa','[F] Guacca','[F] Arctus','[F] Liechi','[F] Lum','[F] Perriot','[F] Pallie','[F] Wheat','[F] Liferoot',
	'[P] Pypa','[P] Guacca','[P] Arctus','[P] Liechi','[P] Lum','[P] Perriot','[P] Pallie','[P] Tree','[P] Oak','[P] Maple',
	'[P] Pine','[P] Yew','[P] Wheat','[P] Liferoot'];


	parent_array['fishing'] = ['Herring','Trout','Tuna','Lobster','Bass','Sword Fish'];

	parent_array['cooking'] = ['[C] Herring','[C] Trout','[C] Cod','[C] Salmon','[C] Tuna','[C] Lobster','[C] Bass','[C] Swordfish',
	'Bread','Pypa Pie','Guacca Pie','Arctus Pie','Liechi Pie','Lum Pie','Parriot Pie','Pallie Pie',
	'Pizza','Antlion Pizza','Lobster Pizza','Antlion Steak','Surf and Turf'];

	parent_array['combat'] = ['Antlion','Zombie','Boss'];

	parent_array['alchemy'] = ['[T] Stone to Iron Ore','[T] Iron Ore to Stone','[T] Iron to Coal','[T] Coal to Iron','[T] Coal to Silver Ore','[T] Silver Ore to Coal','[T] Silver Ore to Trin Ore','[T] Trin Ore to Silver Ore','[T] Trin Ore to Naq Ore','[T] Naq Ore to Trin Ore',
	'[T] Pypa to Guacca','[T] Guacca to Arctus','[T] Arctus to Liechi','[T] Liechi to Lum','[T] Lum to Parriot','[T] Parriot to Pallie','[T] Tree to Oak','[T] Oak to Maple','[T] Maple to Pine','[T] Pine to Yew',
	'[T] Sapphire','[T] Emerald','[T] Ruby','[T] Diamond','[T] Prismatic Gem',
	'[T] Enchanted Pickhead','[T] Enchanted Axehead','[T] Enchanted Reel','[T] Enchanted Hoe Blade',
	'[T] Stable Core','[T] Identify Artifact',
	'[B] Minor Healing Potion','[B] Healing Potion','[B] Major Healing Potion','[B] Super Healing Potion','[B] The Cure','[B] Speed Potion','[B] Quick Speed Potion','[B] Water Breathing Potion','[B] Anti-Gravity Potion'];

	parent_array['arcane'] = ['Wind Bolt', 'Water Bolt', 'Earth Bolt', 'Fire Bolt', 'Wind Blast', 'Water Blast', 'Earth Blast', 'Fire Blast', 'Wind Wave', 'Water Wave', 'Earth Wave', 
	'Fire Wave', 'Tele to Spawn', 'Set Custom Tele Locat', 'Tele to Custom Locat', 'Tele to Cursor', 'Consume Tree', 'Collect Resources', 'Call Rain', 'Stop Rain', 'Set Midnight', 'Set Noon', 'Set Dawn', 'Set Dusk', 'Kill Berries',
	'Grow Seeds', 'Light Over Head', 'Self Heal', 'Heal Other', 'Self Cure', 'Cure Other']


	var thechild = document.getElementById(child);
	thechild.options.length = 0;

	var parent_value = parent.options[parent.selectedIndex].value;

	if (!parent_array[parent_value]) parent_value = 'woodcutting';

	thechild.options.length = parent_array[parent_value].length;

	for(var i = 0; i < parent_array[parent_value].length; i++){
		thechild.options[i].text = parent_array[parent_value][i];
		thechild.options[i].value = parent_array[parent_value][i];
	} 
}

function fillOnLoad()
{
	var thechild = document.getElementById("resource");
	thechild.options.length = 0;
	var par = ['Wood', 'Oak Wood', 'Maple Wood', 'Pine Wood', 'Yew Wood'];
	thechild.options.length = par.length;

	for(var i = 0; i < par.length; i++){
		thechild.options[i].text = par[i];
		thechild.options[i].value = par[i];
	}
	
	doCalc();
}


//////////////////////
//Theme System
//////////////////////
/*
	I know this is a crude theme system, but I'm not sure of how I'd do more of a modular theme system. Anyways, here's how to 
	add themes.
		1. You must add the theme path to the array "themeList".
		2. Find the function getTheme() then do a else if statment checking if the cookie has that value. The value is determined in
		the buttons.
		3. Goto the index.html then scroll down until you find where the theme buttons are (should be right after the result section)
		then simply add a new button like this: 
		<input type='button' value='<name of button>' onClick="setTheme('<theme value>', '<theme path>');" />
*/
var themeCookie = "g4p_calc_theme";
var themeList = [
	"themes/default/default.css",
	"themes/girly/girly.css",
	"themes/lila/lila.css",
	"themes/bleu/bleu.css",
];

//Credits to Javascript Kit - http://www.javascriptkit.com/javatutors/loadjavascriptcss2.shtml
function createCSSFile(filename)
{
	var fileref = document.createElement("link");
	fileref.setAttribute("rel", "stylesheet");
	fileref.setAttribute("type", "text/css");
	fileref.setAttribute("href", filename);
	return fileref;
}

function replaceCSSFile(oldFilename, newFilename)
{
	var targetElement = "link";
	var targetAttr = "href";
	var allSuspects = document.getElementsByTagName(targetElement);

	for (var i = allSuspects.length; i >= 0; i--)
	{
		if (allSuspects[i] && allSuspects[i].getAttribute(targetAttr) != null && allSuspects[i].getAttribute(targetAttr).indexOf(oldFilename) !=- 1)
		{
			var newElement = createCSSFile(newFilename);
			allSuspects[i].parentNode.replaceChild(newElement, allSuspects[i]);
		}
	}
}

//Credits to W3Schools - http://www.w3schools.com/js/js_cookies.asp
function setCookie(cname, cvalue, exdays)
{
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toGMTString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
} 

function getCookie(cname)
{
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++)
    {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length,c.length);
    }
    return "";
}

//Theme Functions
function setTheme(themeName, themePath)
{
	setCookie(themeCookie, themeName, 365);

	replaceCSSFile('', getTheme());
}

function getTheme()
{
	var c = getCookie(themeCookie);
	if (c == null || c == "default")
	{
		return themeList[0];
	}else if (c == "girly")
	{
		return themeList[1];
	}else if (c == "lila")
	{
		return themeList[2];
	}else if (c == "bleu")
	{
		return themeList[3];
	}
}

function clearTheme()
{
	if (getCookie(themeCookie))
	{
		setCookie(themeCookie, "_" -1);
		for (var a = themeList.length; a >= 0; a--)
		{
			replaceCSSFile("", themeList[0]);
		}
	}
}

function loadThemes()
{
	if(getCookie(themeCookie))
	{
		replaceCSSFile("", getTheme());
	}else{
		clearTheme();
		//loadCSSFile(themeList[0]);
		replaceCSSFile("", themeList[0]);
	}
}