//treated as a maximum value using a random function
const ATTACK_VALUE = 10;
const MONSTER_ATTACK_VALUE = 14;
const STRONG_ATTACK_VALUE = 18;
const HEAL_VALUE = 20;
//key static values
const MODE_ATTACK = 'ATTACK'; // MODE_ATTACK = 0
const MODE_STRONG_ATTACK = 'STRONG-ATTACK'; // MODE_STRONG_ATTACK = 1

//alert() function like, where the user may enter something
const enteredValue = prompt('Maximum life for you and the monster.', '100')

/*  let never changes unlike constant
    parseInt(String) into a Number from a String
    isNaN means is it Not A Number            */
let chosenMaxLife = parseInt(enteredValue);
    if(isNaN(chosenMaxLife) || chosenMaxLife <=0){
        chosenMaxLife =100;
        alert('Can only accept numbers!')
    }

let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true; //real boolean value

//put the chosenMaxLife into the health bars
adjustHealthBars(chosenMaxLife);

//names of functions shared amongst scripts, reset the game when its over
function reset(
){
    currentMonsterHealth = chosenMaxLife;
    currentPlayerHealth = chosenMaxLife;
    resetGame(chosenMaxLife);
}

function endRound() {
    const initialPlayerHealth = currentPlayerHealth;
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth -= playerDamage;


    //hasBonusLife || trusy value => hasBonusLife == True
    if (currentPlayerHealth <= 0 && hasBonusLife) {
        hasBonusLife = false;
        removeBonusLife();
        currentPlayerHealth = initialPlayerHealth; //This will update the value back to 100, the new life
        setPlayerHealth(initialPlayerHealth);
        alert('You would be dead but the bonus life saved you!');//how to output to the screen
    }

    // conditional logic practiced with else-if statements
    if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
        alert('Monster Killed!');
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
        alert('Monster Won, You Lost!');
    } else if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
        alert('You have a Draw!');
    }

    //&& has higher precedence than ||
    if (
        currentMonsterHealth <= 0 || currentPlayerHealth <= 0
    ) {
        reset();
    }
}


//function to reduce redundant code
function attackMonster(mode){
    let maxDamage;
    if(mode === 'MODE_ATTACK'){
        maxDamage = ATTACK_VALUE;
    }else if(mode === 'MODE_STRONG_ATTACK'){
        maxDamage = STRONG_ATTACK_VALUE;
    }

    const damage = dealMonsterDamage(maxDamage);
    currentMonsterHealth -= damage;
    endRound();
}


//lean out our onAttackHandler(s) methods/functions below
function onAttackHandler(){
    attackMonster('MODE_ATTACK');
}

//defined strongAttackHandler -- How to reduce code
function onStrongAttackHandler(){
    attackMonster('MODE_STRONG_ATTACK');
}

//defined healPlayerHandler
function healPlayerHandler(){
    let healValue;
    if(currentPlayerHealth >= chosenMaxLife - HEAL_VALUE){
        alert("You can't heal to more than your max initial health.");
        healValue = chosenMaxLife - currentPlayerHealth;
    }else {
        healValue = HEAL_VALUE;
    }
    increasePlayerHealth(healValue);
    currentPlayerHealth += healValue;
    endRound();
}

/*EventListeners defined to be able to respond to clicks on the attackBtn and strongAttackBtn using the
callback functions here*/
attackBtn.addEventListener('click', onAttackHandler);
strongAttackBtn.addEventListener('click', onStrongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler)
