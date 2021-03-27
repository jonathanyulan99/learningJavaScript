//treated as a maximum value using a random function
const ATTACK_VALUE = 10;
const MONSTER_ATTACK_VALUE = 14;
const STRONG_ATTACK_VALUE = 18;

// let never changes unlike constant
let chosenMaxLife = 100;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;

//put the chosenMaxLife into the health bars
adjustHealthBars(chosenMaxLife);

//function to reduce redundant code
function attackMonster(mode){
    let maxDamage;
    if(mode === 'ATTACK'){
        maxDamage = ATTACK_VALUE;
    }else{
        maxDamage = STRONG_ATTACK_VALUE;
    }

    const damage = dealMonsterDamage(maxDamage);
    currentMonsterHealth -= damage;
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth -= playerDamage;

    // conditional logic practiced with else-if statements
    if(currentMonsterHealth <= 0 && currentPlayerHealth > 0){
        alert('Monster Killed!');
    }else if(currentPlayerHealth <= 0 && currentMonsterHealth >0) {
        alert('You Lost!');
    }else if(currentMonsterHealth <= 0 && currentPlayerHealth <0){
        alert('You have a Draw!');
    }
}


//lean out our onAttackHandler(s) methods/functions below
function onAttackHandler(){
    attackMonster('ATTACK');
}

//defined strongAttackHandler -- How to reduce code
function onStrongAttackHandler(){
    attackMonster('STRONG_ATTACK');
}

/*EventListeners defined to be able to respond to clicks on the attackBtn and strongAttackBtn using the
callback functions here*/
attackBtn.addEventListener('click', onAttackHandler);
strongAttackBtn.addEventListener('click', onStrongAttackHandler);

