({
	paginateReturns: function(component) {
        var result = component.get("v.pokemanObj");
        var itemsPerPage = component.get("v.pageSize");
        
        var paginationList = [];
        var iterationSize;
        if(result.length > itemsPerPage) {
            iterationSize = itemsPerPage;
        } else {
            iterationSize = result.length;
        }
        
        for(var i= 0; i < iterationSize ; i=i+1) {
            paginationList.push(result[i]);        
        }
        component.set("v.start", 0);
        component.set("v.end", component.get("v.pageSize")-1);
        component.set("v.totalSize", result.length);
        component.set("v.paginationList", paginationList);
        component.set("v.page", 1);
        component.set("v.pages", Math.ceil(result.length / itemsPerPage));
    },
    previous: function(component) {
        var prodList = component.get("v.pokemanObj");
        var end = component.get("v.end");
        var start = component.get("v.start");
        var pageSize = component.get("v.pageSize");
        var paginationList = [];
        component.set("v.page", component.get("v.page")-1);
        var counter = 0;
        for(var i= start-pageSize; i < start ; i++) {
            if(i > -1) {
                paginationList.push(prodList[i]);
                counter ++;
            }
            else {
                start++;
            }
        }
        start = start - counter;
        end = end - counter;        
        component.set("v.start",start);
        component.set("v.end",end);        
        component.set("v.paginationList", paginationList);
    },
    next: function(component) {
        var prodList = component.get("v.pokemanObj");
        var end = parseInt(component.get("v.end"),10);
        var start = component.get("v.start");
        var pageSize = parseInt(component.get("v.pageSize"),10);
        var paginationList = [];
        component.set("v.page", component.get("v.page")+1);
        var counter = 0;
        
        for(var i=end+1; i<end+pageSize+1; i++) {
            if(prodList.length > end && prodList[i]!=null) {
                paginationList.push(prodList[i]);
                counter ++ ;
            }
        }
        start = start + counter;
        end = end + counter;        
        component.set("v.start",start);        
        component.set("v.end",end);         
        component.set("v.paginationList", paginationList);
    }
    
})