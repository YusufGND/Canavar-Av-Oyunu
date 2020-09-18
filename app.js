new Vue({
    el: "#app",
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        logs: [],
        gameIsOn: false,
        attackMultiple: 10,
        specialAttackMultiple: 25,
        monsterAttackMultiple: 15,
        healUpMultiple: 20,
        logText: {
            playerAttackText: "Oyuncu Saldırısı : ",
            specialAttackText: "Özel Güç Saldırısı : ",
            monsterAttackText: "Canavar Saldırısı : ",
            healUpText: "İyileştirme Kullanıldı : ",
            giveUpText: "Oyuncu Pes Etti!!"
        },
       
        
    },
    methods: {
        startGame: function(){
            this.gameIsOn=true;
        },
        attack: function(){
            var point = Math.ceil(Math.random() * this.attackMultiple);
            this.monsterHealth-=point;
            this.monsterAttack();
            this.addToLog({turn: "p", text: this.logText.playerAttackText + point});
        },
        specialAttack: function(){
            var point = Math.ceil(Math.random() * this.specialAttackMultiple);
            this.monsterHealth-=point;
            this.addToLog({turn: "p", text: this.logText.specialAttackText + point});
            this.monsterAttack();
            
        },
        healUp: function(){
            var point = Math.ceil(Math.random() * this.healUpMultiple);
            this.playerHealth+=point;
            this.addToLog({turn: "p", text: this.logText.healUpText + point});
            this.monsterAttack();
            
        },
        giveUp: function(){
            this.playerHealth=0;
            this.addToLog({turn: "p", text: this.logText.giveUpText});
            
        },
        monsterAttack: function(){
            var point= Math.ceil(Math.random() * this.monsterAttackMultiple);
            this.playerHealth-=point;
            this.addToLog({turn: "m", text: this.logText.monsterAttackText + point });
        },
        addToLog: function(log){
            this.logs.push(log);
        }
        
    },
    watch: {
        playerHealth: function(value){
            if(value <=0){
                this.playerHealth=0;
                if(confirm("Oyunu kaybettiniz. Tekrar oynamak ister misiniz ?")){
                    this.playerHealth=100;
                    this.monsterHealth=100;
                    this.logs=[];
                }
                
            }
            else if(value >=100){
                this.playerHealth=100;
            }
        },
        monsterHealth: function(value){
            if(value <=0){
                this.monsterHealth=0;
                if(confirm("Oyunu kazandınız. Tekrar oynamak ister misin ?")){
                    this.playerHealth=100;
                    this.monsterHealth=100;
                    this.logs=[];
                    
                }
            }            
        },
    },
    computed: {
        playerProgressbar: function(){
            return {
                width: this.playerHealth + "%"
            }
        },
        monsterProgressbar: function(){
            return {
                width: this.monsterHealth + "%"
            }    
        }
    },
});