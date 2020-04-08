/**
 * @File Name          : LCC_GetPokemonDetails.cls
 * @Description        : 
 * @Author             : karthy
 * @Group              : 
 * @Last Modified By   : ChangeMeIn@UserSettingsUnder.SFDoc
 * @Last Modified On   : 6/3/2019, 6:28:57 AM
 * @Modification Log   : 
 *==============================================================================
 * Ver         Date                     Author      		      Modification
 *==============================================================================
 * 1.0    6/3/2019, 6:28:03 AM   karthy     Initial Version
**/
//This controller will be use to invoke the Rest url and get the Pokemon details
public class LCC_GetPokemonDetails {
    
    @AuraEnabled
    public static Map<String,Object> getCalloutResponseContents() {
		
        HttpRequest req = new HttpRequest();
        req.setEndpoint('https://pokeapi.co/api/v2/pokemon?limit=151');
        req.setMethod('GET');

		Http http = new Http();   
		HttpResponse httpResponse = http.send(req); 
        //string firstValue;
        System.debug('response:--> ' + httpResponse.getBody());
        
	    Map <String,Object> resultsMap = (Map<String,Object>) JSON.deserializeUntyped(httpResponse.getBody());
        
		 System.debug('response:--> ' + resultsMap);
        
		return resultsMap;
         //response = JSON.serializePretty( JSON.deserializeUntyped(httpResponse.getBody()) );  
   
   }
    public class pokemanWrap{
        @auraEnabled public String name;
        @auraEnabled public String url;
    }
}