var fa = [
	'bone', 'ambulance', 'bolt', 'bath', 'apple-alt', 'briefcase', 'beer', 'blender', 'bug', 
	'atlas', 'certificate', 'box-open', 'bus', 'car-side','charging-station', 'couch',
	'basketball-ball',
	'gas-pump',
	'futbol',
	'music',
	'moon',
	'suitcase',
	'video',
	'truck-monster',
	'wallet',
	'transgender-alt',
	'sun',
	'swimmer',
	'snowflake',
	'smile-beam',
	'space-shuttle',
	'recycle', 'paper-plane'
];
(function(){
	var memory = {
		rows:0,
		columns:0,
		fieldId:null,
		activeCards: [],
		allCards: [],
		start:function(fieldId){
			var that = this;
			this.fieldId = fieldId;
			window.addEventListener('resize', function(){that.onResize()}, false);
			this.onResize();
		},
		onResize:function(){
			this.columns = Math.floor(this.getWidth() / 160);
			this.rows = Math.floor(this.getHeight() / 160);

			this.refreshFieldSize((this.columns-1), this.rows);
		},
		getWidth:function(){
			return window.innerWidth;
		},
		getHeight:function(){
			return window.innerHeight;
		},
		refreshFieldSize: function(columns, rows){
			var randomKey, element = document.getElementById(this.fieldId);

			element.style.cssText = 'grid-template-columns:repeat(' + columns + ', 1fr);';

			this.clearField(element);
			var cards = columns*rows;

			this.allCards = [];

			var faCopy = fa.slice();

			for(var i=0; i < cards/2; i++){
				randomKey = Math.floor(Math.random() * faCopy.length);
				this.allCards.push(faCopy[randomKey]);
				this.allCards.push(faCopy[randomKey]);
				faCopy.splice(randomKey, 1);
			}
			
			this.shuffleArray(this.allCards);

			for(var i=0; i < this.allCards.length; i++){
				element.appendChild(this.createCard(this.allCards[i]));
			}
		},
		clearField: function(element){
			while(element.firstChild){
			    element.removeChild(element.firstChild);
			}
		},
		checkCard: function(element, icon){
			if(this.activeCards.length>1) return;
			if(this.activeCards[0] && this.activeCards[0].element === element) return;
			var that = this;

			this.activeCards.push({element: element, icon:icon});

			element.classList.add('active');

			if(this.activeCards[1]){
				var oldCardState = Object.assign(this.activeCards);
				window.setTimeout(function(){
					that.getResult(oldCardState);
				}, 1000);
				if(this.activeCards[0].icon == this.activeCards[1].icon){
					this.activeCards[0].element.classList.add('success');
					this.activeCards[1].element.classList.add('success');
				}else{
					this.activeCards[0].element.classList.add('error');
					this.activeCards[1].element.classList.add('error');
				}
				
			}
		},
		getResult: function(oldCardState){
			if(oldCardState[0].icon !== oldCardState[1].icon){
				oldCardState[0].element.classList.remove('error');
				oldCardState[1].element.classList.remove('error');
				oldCardState[0].element.classList.remove('active');
				oldCardState[1].element.classList.remove('active');
			}
			this.activeCards = [];
		},
		createCard: function(icon){
			var that = this;
			var item = document.createElement('div');
			item.classList.add('item');
			item.addEventListener('click', function(e){that.checkCard(item, icon)});

			var card = document.createElement('div');
			card.classList.add('card');
			item.appendChild(card);

			var flipper = document.createElement('div');
			flipper.classList.add('flipper');
			card.appendChild(flipper);

			var front = document.createElement('div');
			front.classList.add('front');
			flipper.appendChild(front);

			var back = document.createElement('div');
			back.classList.add('back');//'fas fa-' + icon
			var i = document.createElement('i');
			i.classList.add('fas', 'fa-' + icon); 
			back.appendChild(i);
			var text = document.createElement('div');
			text.appendChild(document.createTextNode('fas fa-' + icon)); 
			back.appendChild(text);

			flipper.appendChild(back);

			return item;
		},
		//https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
		shuffleArray: function(a) {
		    for (var i = a.length - 1; i > 0; i--) {
		        const j = Math.floor(Math.random() * (i + 1));
		        [a[i], a[j]] = [a[j], a[i]];
		    }
		    return a;
		}
	};
	memory.start('field');

})();

/*

<div class="item" onclick="this.classList.toggle('active');">
	<div class="card">
	  	<div class="flipper">
			<div class="front"></div>
			<div class="back">
				<i class="fas fa-bone"></i>
				<div>fas fa-bone</div>
			</div>
		</div>
	</div>
</div>
*/