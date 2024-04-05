import SockJS from "sockjs-client"
import Stomp from 'stompjs'

var stompClient = null;
export function connect({currentOrder, setCurrentOrder, companyId}) {
  var socket = new SockJS("http://localhost:8080/bookings");
   stompClient = Stomp.over(socket);

  stompClient.connect({}, function (frame) {
    stompClient.subscribe("/topic/bookings", function (message) {
        if(message?.body) {
            let tmp = JSON.parse(message?.body)
            if(tmp.companyId == companyId) {
                setCurrentOrder([tmp, ...currentOrder])
            }
        }
    });
  });
}