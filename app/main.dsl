context {
    input endpoint: string;
}

// declare external functions here 
external function findBeds(city: string): string;
external function contactNumber(state: string): string;

start node root {
    do {
        #connectSafe($endpoint);
        #waitForSpeech(1000);
        #sayText("Hello, and welcome to MediCenter. One stop for all your needs medical.");
        #sayText(" I'm your artificially intelligent agent Dasha. How may I serve your requirements?");
        wait *;
    }
    transitions {
    }
}

// acknowledge flow begins 
digression beds {
    conditions { on #messageHasIntent("beds"); }
    do {
        #sayText("Okay, in order to find hospital beds, I would need your location.");
        #sayText("In which city do you require hospital beds?");
        wait *;
    }
    transitions {
        bed: goto bed on #messageHasData("city");
    }
}

node bed {
    do {
        var city = #messageGetData("city", { value: true })[0]?.value??"";
        var response = external findBeds(city);
        #sayText(response);
        goto final;
    } 
    transitions
    {
        final: goto final;
        bed: goto bed on #messageHasData("city");
    }
}

digression helpline {
    conditions { on #messageHasIntent("helpline"); }
    do {
        #sayText("The national helpline number is 1 1 2 3 9 7 8 0 4 6");
        #sayText("To find regional helpline number, I need to know which state you reside in.");
        wait *;
    }
    transitions {
        contact: goto contact on #messageHasData("state");
    }
}

node contact {
    do {
        var state = #messageGetData("state", { value: true })[0]?.value??"";
        var response = external contactNumber(state);
        #sayText(response);
        goto final;
    } 
    transitions
    {
        final: goto final;
        contact: goto contact on #messageHasData("state");
    }
}

node final {
    do{
        #sayText("Anything else I can help you with today?");
        wait *;
    } 
    transitions
    {
        can_help: goto can_help on #messageHasIntent("yes");
        bye_then: goto bye_then on #messageHasIntent("no");
    }
}

node bye_then {
    do {
        #sayText("Thank you, bye!");
        exit;
    }
}


node can_help {
    do {
        #sayText("Right. How can I help you? ");
        wait*;
    }
}


digression bye  {
    conditions { on #messageHasIntent("bye"); }
    do {
        #sayText("Thank you, bye!");
        exit;
    }
}

// additional digressions 
digression @wait {
    conditions { on #messageHasAnyIntent(digression.@wait.triggers)  priority 900; }
    var triggers = ["wait", "wait_for_another_person"];
    var responses: Phrases[] = ["i_will_wait"];
    do {
        for (var item in digression.@wait.responses) {
            #say(item, repeatMode: "ignore");
        }
        #waitingMode(duration: 70000);
        return;
    }
    transitions {
    }
}

digression repeat {
    conditions { on #messageHasIntent("repeat"); }
    do {
        #repeat();
        return;
    }
} 
