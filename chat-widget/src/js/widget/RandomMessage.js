'use strict';

export default class RandomMessage{

    random(lengthArray){
        let rand = 0 - 0.5 + Math.random() * (lengthArray - 0 + 1)
        rand = Math.round(rand);
        // Если ссгенерировано -0, тогда присваеваем 0
        if (rand === -0) rand = 0;

        return rand;
    }

}

