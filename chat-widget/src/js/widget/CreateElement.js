'use strict';

export default class CreateElement {

    createBody(){

    }
    
    // Создание html блока сообщения
    createMessage(user, text){

        // Создаю <div>
        let divMsg = document.createElement('div');

        /**
         * Условия от кого сообщение (true/false)
         * взависимости от кого, добаляю разные css классы
         */ 
        if(user){
            divMsg.className = 'spchat__massage spchat__massage--user';
        } else {
            divMsg.className = 'spchat__massage spchat__massage--manager';
        }

        // В дочерний <div> вставляю текст сообщения
        divMsg.innerHTML = text;
        
        return divMsg;
    }
}