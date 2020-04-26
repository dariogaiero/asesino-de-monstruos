new Vue({
    el: '#app',
    
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,

    },

    methods: {
        startGame: function() {
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = [];
        },
        
        attack: function(){
           var damage = this.calculateDamage (3, 10);
           this.monsterHealth -= damage;
           this.turns.unshift({
               isPlayer: true,
               text: 'El Jugador golpea al MOSTRO por ' + damage
           });   
           if (this.checkWin()){
               return;
           }
           this.monsterAttacks();
        },

        monsterAttacks: function(){
            var damage = this.calculateDamage(5, 12);
            this.playerHealth -= damage;
            this.turns.unshift({
                isPlayer: false,
                text: 'El MOSTRO lastima al jugador en ' + damage
            });
            this.checkWin();    
        },

        calculateDamage: function(min,max){
            return Math.max(Math.floor(Math.random() * max) + 1,min)
        },

        checkWin: function(){
         if (this.monsterHealth <= 0){
             if (confirm('Ganaste! Jugar de Nuevo?')){
                 this.startGame();
             } else {
                 this.gameIsRunning = fasle;
             }
             return true;
         } else if (this.playerHealth <=0){
             if (confirm('Perdiste! Jugar de Nuevo?')){
                 this.startGame();
             } else {
                 this.gameIsRunning = false;
             }
             return true;
         }  
         return false;
        },

        specialAttack: function(){
           var damage = this.calculateDamage(10, 20);
           this.monsterHealth -= damage;

           if(this.checkWin()){
               return;
           }
           this.monsterAttacks();
        },

        heal: function(){
          if(this.playerHealth <= 90){
              this.playerHealth += 10;
          } else {
              this.playerHealth = 100;
          }
          this.monsterAttacks();
        },

        giveUp: function(){
           this.gameIsRunning = false;
        },
        
    },
    
});