//CODE FROM TWILIO INCASE PHONE NUMBER FAILS == PYN4FLP5ZTS6GHY2LBXPYN38
//Create a sms function 
// stop auto function when balance amount is less than stake

//when there is no activity on the window then reload the page

// For authentication i wanna make it that i generate codes which represent an amount;
// MAKE NOTIFACTION GO TO MY PHONE AND THEN SEND MONEY TO THE  WINNERS

document.addEventListener('DOMContentLoaded', (event) => { 
    const num15 = document.getElementById('num15');
    const num14 = document.getElementById('num14');
    const num13 = document.getElementById('num13');
    const num12 = document.getElementById('num12');
    const num11 = document.getElementById('num11');
    const num10 = document.getElementById('num10');
    const num9 = document.getElementById('num9');
    const num8 = document.getElementById('num8');
    const num7 = document.getElementById('num7');
    const num6 = document.getElementById('num6');
    const num5 = document.getElementById('num5');
    const num4 = document.getElementById('num4');
    const num3 = document.getElementById('num3');
    const num2 = document.getElementById('num2');
    const num1 = document.getElementById('num1');
    const amountInput = document.getElementById('input-amount'); 
    const withdrawInput = document.getElementById('withdraw-amount'); 
    const submitBtn = document.getElementById('submit-btn'); 
    const cancelBtn = document.getElementById('cancel-btn'); 
    const wdrwcancelBtn = document.getElementById('wdrw-cancel-btn'); 
    const withdrawBtn = document.getElementById('wdrw-btn'); 
    const balance = document.getElementById('balance');
    const stake = document.getElementById('stake');
    const win = document.getElementById('win');
    const overlay = document.getElementById('overlay');
    const modal = document.querySelector('[data-modal]');
    const startBtn = document.getElementById('start-btn');
    const autoBtn = document.getElementById('auto-btn');
    const positionAbs = document.querySelector('.position-abs');
    const confirmMsg = document.querySelector('.confirmation-msg');
    const withdrawPage = document.querySelector('.widthrawal-pg');
    const message = document.querySelector('.message');
    const credit = document.querySelector('.credit');
    // const winSound = document.getElementById('sound-win'); 
    const fruitLib = ["assets/img-1.jpg", "assets/img-2.jpg", "assets/img-3.jpg", "assets/img-4.jpg", "assets/img-5.jpg", "assets/img-6.jpg", "assets/img-7.jpg", "assets/img-8.jpg", "assets/img-9.jpg"];
    const numItems = [num1, num2, num3, num4, num5, num6, num7, num8, num9, num10, num11, num12, num13, num14, num15];
    const winList =[[num1, num7, num13],[num2, num8, num14], [num3, num7, num11],[num3, num9, num15], [num4, num8, num12], [num5, num9, num13],
                    [num1, num6, num11],[num2, num7, num12], [num3, num8, num13],[num4, num9, num14], [num5, num10, num15], [num1, num2, num3],
                    [num2, num3, num4],[num3, num4, num5], [num6, num7, num8],[num7, num8, num9], [num8, num9, num10], [num11, num12, num13],
                    [num12, num13, num14], [num13, num14, num15]];
    //INITIALIZES GAME TO NOT RUNNING               
    let isGameRunning = false;
    
    //CALCULATE WIN ANOUNT
    // function calculateWin(winValue){                
    //     win.value = winValue;
    //     balance.value = parseInt(balance.value) + parseInt(winValue); 
         
    // }
    //UPDATED ::: CALCULATE WIN ANOUNT
    calculateWin = (winValue) => {
        win.value = winValue;
        balance.value = parseInt(balance.value) + parseInt(winValue); 
    }

    // PLACE USER'S BET
    // function placeBet(){     
    //     balance.value = balance.value - parseInt(stake.value);
    // } 
    //UPDATED ::: PLACE USER'S BET
    placeBet = () =>  balance.value = balance.value - parseInt(stake.value);

    // REMOVE WIN INTERFACE
    function removeWin(){
        numItems.forEach(numItem => {
            numItem.classList.remove('win');
        })
    }
    
    // AUTO Function
    //BUD REPORT ::: I'M TRY TO CALCULATE AUTOCOUNT EVERTIME BEFORE RUNNING PLAYNEXTGAME 
    let autoTimeoutId;
    function autoPlay(stake, balance) {
        const autoCount = Math.floor(balance / stake); // Calculate number of auto plays
        let currentPlay = 0;  
            
       if(!isGameRunning){
            const playNextGame = () => {
                placeBet();
                startGame(); 
                currentPlay++;
        
                if (currentPlay < autoCount  ) {
                   autoTimeoutId = setTimeout(playNextGame, 3000);           
                   
                } 
                else{
                    autoBtn.innerHTML = "Auto";
                } 
                // SUGGESTED UPDATEa    aaa      
                // (currentPlay < autoCount) ?  autoTimeoutId = setTimeout(playNextGame, 3000) :    autoBtn.innerHTML = "Auto";
                
            }
            
            playNextGame();
        }
       
    } 
    // BUG REPORT ::: THE INNERHTML OF AUTOBTN IS NOT CHANGING WHEN AUTOPLAY IS STOPED
    autoBtn.addEventListener('click', () => {
        if(autoBtn.innerHTML === "Stop"){
            
            if(autoTimeoutId){
                clearTimeout(autoTimeoutId);
            }
            autoBtn.innerHTML == "Auto";
            
        }
    });
    //STOP AUTOPLAY BY PRESSING ""SHIFT"" KEY
    document.addEventListener('keydown', (event) => {
        if(event.key === "Shift"){
            if(autoTimeoutId){
                clearTimeout(autoTimeoutId);
            }
            autoBtn.innerHTML = "Auto";
        }
    });
    
    // VALIDATE AND  ACCEPT INPUT DEPOSIT   
    submitBtn.onclick = () =>{
        const userAmount = amountInput.value;
        if (userAmount < 100){            
            alert("Minimum amount is 100")
            amountInput.value = null;
        }
        else{            
            balance.value = parseInt(userAmount) + parseInt(balance.value);         
            overlay.classList.add('closed');
            amountInput.value = null;
        }
        
    }
    // CLOSE OVERLAY
    // cancelBtn.onclick = () =>{
    //     overlay.classList.add('closed');
    // }
    //UPDATED ::: CLOSE OVERLAY
    cancelBtn.onclick = () => overlay.classList.add('closed');

    // START GAME WITH ""START KEY""
    startBtn.onclick = () => {
        
        const stakeValue = parseFloat(stake.value);
        const balanceValue = parseFloat(balance.value);

        if(!isNaN(stakeValue) && !isNaN(balanceValue) && stakeValue > 0 && balanceValue >= stakeValue ){
            
            if (!isGameRunning) {
                placeBet();
                startGame();
            }
        }
        else{
            // Handle invalid input or insufficient balance
            positionAbs.classList.remove('closed');
            message.innerHTML = "insufficient amount";           
            
            setTimeout(() => positionAbs.classList.add('closed'), 5000);    
        }
    }
    // START GAME WITH ""ENTER KEY""
    document.addEventListener('keydown', (event) => {
    if(event.key === "Enter" && !isGameRunning){
        let stakeValue = parseInt(stake.value);
        let balanceValue = parseInt(balance.value);

        if(!isNaN(stakeValue) && stakeValue > 0 && balanceValue >= stakeValue ){
            placeBet();
            startGame()
        }
        else{
            //Sets In Message
            positionAbs.classList.remove('closed');
            message.innerHTML = "insufficient amount";

            //Clears Message
            setTimeout(() => positionAbs.classList.add('closed'), 5000);
        }
    }
    
    });

    // START GAME FUNCTION
    function startGame() { 
        if (isGameRunning) {
            return; 
        }
        stake.disabled = true;        
        isGameRunning = true;

        positionAbs.classList.add('closed');
        win.value = 0;     
        let intervalID;
        
        //Remove Win Interface
        removeWin();
        modal.classList.remove('opened');

        // var audio = document.getElementById('sound');
        // audio.play();  

        if (intervalID) {
            clearInterval(intervalID);
        }

        let elapsed = 0;
        const duration = 1800; 

        intervalID = setInterval(() => {
              
            numItems.forEach(numItem => {
                numItem.src = fruitLib[Math.floor(Math.random() * 9)]
            })          
            
            elapsed += 100; // update elapsed time
            if (elapsed >= duration) {
                isGameRunning = false;
                stake.disabled = false;
                clearInterval(intervalID);                 
                // audio.pause(); 
                
                //Checks For Possible Win
                let winValue = 0;
                winList.forEach(item => {
                    if(item[0].src === item[1].src && item[1].src === item[2].src){
                        item[0].classList.add('win');
                        item[1].classList.add('win');
                        item[2].classList.add('win');
                        modal.classList.add('opened');
                        let newWinAmount = stake.value * 2.50;
                        winValue += newWinAmount;
                        
                    }
                });
                calculateWin(winValue);

            }
                
        }, 100);
    }  
    // OPEN DEPOSIT PAGE
    document.getElementById('dep').addEventListener('click', () => {
        if(!isGameRunning){
            removeWin();
            modal.classList.remove('opened');
            positionAbs.classList.add('closed');
            overlay.classList.remove('closed');
            withdrawPage.classList.add('closed');
            credit.classList.remove('closed');
            confirmMsg.classList.remove('closed'); 
        }else{
            positionAbs.classList.remove('closed');
            message.innerHTML = "Game in Progress...";

            // setTimeout(() => {
            //     positionAbs.classList.add('closed');
            // }, 5000);
        }
       
    });
    // OPEN WITHDRAWAL PAGE
    document.getElementById('wdrw').addEventListener('click', () => {
       if(!isGameRunning){
            removeWin();
            modal.classList.remove('opened');
            credit.classList.add('closed');
            overlay.classList.remove('closed');
            withdrawPage.classList.remove('closed');
            confirmMsg.classList.remove('opened');
            
                
            withdrawBtn.onclick = () =>{       

                confirmMsg.innerHTML = 'Please wait for confirmation message'; 
                confirmMsg.style.color = '#ae0606'; 
                confirmMsg.classList.add('opened');          
                
                setTimeout(() =>{
                    const wdrwAmount = parseInt(withdrawInput.value);
                    if(wdrwAmount > balance.value || wdrwAmount == 0){
                        confirmMsg.innerHTML = "insufficient amount";
                        withdrawInput.value = null 
                    }
                    else{
                        balance.value = parseFloat(balance.value) - parseFloat(wdrwAmount);
                        alert("Confirmed UserId: "+ generateId() + " withdrew Ksh. " + wdrwAmount);                    
                        confirmMsg.innerHTML = "THANK YOU 😊"
                        confirmMsg.style.color = "#01533c";
                        
                        setTimeout(() =>{
                            overlay.classList.add('closed') 
                            withdrawPage.classList.add('closed');
                            withdrawInput.value = null
                        },1000)

                    }
                    
                },3000);    
            } 
            wdrwcancelBtn.onclick = () =>{
                overlay.classList.add('closed');
                confirmMsg.classList.remove('closed'); 
            }
       }else{
        positionAbs.classList.remove('closed');
        message.innerHTML = "Game in Progress...";

       }
    });
    // START AUTOPLAY BUTTON
    autoBtn.addEventListener('click', () => {
        if(autoBtn.innerHTML = "Auto")   {
            const stakeValue = parseFloat(stake.value);
            const balanceValue = parseFloat(balance.value);
        
            if (!isNaN(stakeValue) && !isNaN(balanceValue) && stakeValue > 0 && balanceValue >= stakeValue) {
                autoPlay(stakeValue, balanceValue);
                autoBtn.innerHTML = "Stop";            
            }
            else {
            // Handle invalid input or insufficient amount
                positionAbs.classList.remove('closed');
                message.innerHTML = "insufficient amount";

                setTimeout(() => positionAbs.classList.add('closed'), 5000);
                
            }     
        }
    });

    //GENERATE UNIQUE WITHDRAWAL ID
    function generateId(){
        let passwordLength = 10;
            
        const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const numbers = "0123456789";
        const lowercase = "abcdefghijklmnopqrstuvwxyz";
        const specialCharacters = "!@#$&*";

        let Password = [
            uppercase[Math.floor(Math.random() * uppercase.length)],
            numbers[Math.floor(Math.random() * numbers.length)],
            lowercase[Math.floor(Math.random() * lowercase.length)],
            specialCharacters[Math.floor(Math.random() * specialCharacters.length)]

        ];    

        let Allcharacters = uppercase + numbers + lowercase + specialCharacters;     
    
        for(let i = Password.length; i < passwordLength; i++){
            Password.push(Allcharacters[Math.floor(Math.random() * Allcharacters.length)]);
            
        }
                
        let withdrawalId = Password.join('');

        return withdrawalId;
        
    };
    
});
