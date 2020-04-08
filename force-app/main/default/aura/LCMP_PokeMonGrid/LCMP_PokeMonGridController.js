({
	doInit : function(component, event, helper) {
		 
        var action = component.get("c.getCalloutResponseContents");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (component.isValid() && state === "SUCCESS") {
                
                component.set("v.response", response.getReturnValue());
                //console.log(response.getReturnValue());
                
                var pokemons =  component.get("v.response")['results'];
                var count = 1;
                var pokeManList = [];
                for (var key in pokemons){
                    var pokemonObj = {};
                    pokemonObj["name"] = pokemons[key].name;
                    pokemonObj["url"] = '/images/'+count.toString()+'.png';
                    pokemonObj["count"] = count;
                    count = count +1;
                    pokeManList.push(pokemonObj);
                   
                }
                component.set("v.pokemanObj", pokeManList);
                component.set("v.filterOneOptions",pokeManList);
                helper.paginateReturns(component);
                
            }
        });
 
        $A.enqueueAction(action);

	},
    filterBySearchKeyword : function(component,event,helper){
        var temp;
        var stringKeyword;
        
        var keyword = component.get("v.searchKeyword");
        //var prevsearch = component.get("v.prevsearchKeyword");
        if(keyword!==undefined){
            temp = keyword.trim().toLowerCase();
            stringKeyword = temp.toString();
        }
        var productList = component.get("v.filterOneOptions");
        var filteredList = [];
        
        if (stringKeyword !== "" && stringKeyword !== null && stringKeyword !==undefined) {
            
             for (var i=0; i<productList.length; i=i+1) {
                //Copying single record from Products into a variable
                var obj = productList[i];
                //Getting field values in variables
                var pokeName = obj.name;
                  if(pokeName === undefined) {
                    pokeName = "";
                  }else{
                      pokeName = pokeName.toString().toLowerCase();
                  }
                 if(pokeName.indexOf(stringKeyword) >=0){
                     filteredList.push(obj);
                 }
             }
            
            component.set("v.pokemanObj", filteredList);
            component.set("v.prevsearchKeyword",component.get("v.searchKeyword"));
             helper.paginateReturns(component);
        }else{
            component.set("v.pokemanObj",component.get("v.filterOneOptions"));
             helper.paginateReturns(component);
        }
    },
    //-------- Method invoked on click of the next button to view next paginated page ----------------------------
    next: function(component, event, helper) {
        helper.next(component);        
    },
    
    //-------- Method invoked on click of the previous button to view previous paginated page ----------------------
    previous: function(component, event, helper) {
        helper.previous(component);
        
    }
    
})