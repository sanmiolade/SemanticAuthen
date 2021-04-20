
    var theDragedImgObj = null;
    var theDragedStartPairBoxID = "";
    var ICON_to_PAIR_BOX_RATIO = 0.9;
    var gStrgVar = "";
  
  
function Init()
{
  //alert("in init");
  document.addEventListener("dragleave",dragLeave,false);

}  
    
    function dragStart(e){
        // Sets the operation allowed for a drag source
        e.dataTransfer.effectAllowed = "move";
    
        // Sets the value and type of the dragged data
       // e.dataTransfer.setData("Text", e.target.getAttribute("id"));
        theDragedImgObj = e.target; // Save reference to the Object that is been Dragged
        theDragedImgObj["CellLocationOnDragStart"] = e.target.parentNode.getAttribute("id");
        theDragedStartPairBoxID  = e.target.parentNode.getAttribute("id");
        e.target.style.opacity ="0.5";
      
    }
    function dragOver(e){
    	
    	
    	var theTargetBox = null;
    	if(e.target.className =="pairbox" ) theTargetBox = e.target;
    	if(e.target.parentNode.className =="pairbox" ) theTargetBox = e.target.parentNode;
    	
		if(theTargetBox.className =="pairbox"  )
		{    	
     		//var spanx = document.getElementById("spanx");
    		//spanx.innerHTML = "Over... " + theTargetBox.id;
    		//theTargetBox.style.background = "red";
    		//spanx.innerHTML = calcNeigbours(theTargetBox);
    		var ptarget =  getNeigboursWithImages(theTargetBox);
    		//spanx.innerHTML =  "Has : " + ptarget;
    		
    		if (ptarget.length > 0 ) 
    		{
				hilightNeighbours(ptarget,"#ffff77"); 
			}
	  }
        // Prevent the browser default handling of the data
        e.preventDefault();
        e.stopPropagation();
        
    }
    
    

    function dragLeave(e){
    	
    	var theTargetBox = null;
    	if(e.target.className =="pairbox" ) theTargetBox = e.target;
    	if(e.target.parentNode.className =="pairbox" ) theTargetBox = e.target.parentNode;
    	
		if(theTargetBox.className =="pairbox"  )
		{    	
     		//var spanx = document.getElementById("spanx");
    		//spanx.innerHTML = "Leave... " + theTargetBox.id;
    		theTargetBox.style.background = "#ebebeb";
    		
  		var ptarget =  getNeigboursWithImages(theTargetBox);
    		//spanx.innerHTML =  "Has : " + ptarget;
    		
    		if (ptarget.length > 0 ) 
    		{
				hilightNeighbours(ptarget,"#ebebeb"); 
			}    		
    		
	  }
        // Prevent the browser default handling of the data
        e.preventDefault();
        e.stopPropagation();
        
    }
    
    function drop(e){
        // Cancel this event for everyone else
        e.stopPropagation();
        e.preventDefault();
    
      theDragedImgObj.style.opacity ="1.0";
    // Here check what where the Dragged object is being dropped 
        //Check that the dragged object is dropped in the Element of class "pairbox" or its child
		if(e.target.className =="pairbox" || e.target.parentNode.className =="pairbox" )
		{
			   var theTargetBox = e.target; // set target
			   
			   
    		var ptarget =  getNeigboursWithImages(theTargetBox);
    		
    		
    		if (ptarget.length > 0 ) 
    		{
				hilightNeighbours(ptarget,"#ebebeb"); 
			}			   
			   

			    // if the dragged object was dropped  on a Child of "pairBox", then set target to Parent i.e pairbox
			    if(e.target.parentNode.className =="pairbox")theTargetBox = e.target.parentNode;
			    
			
			    var pairTable = document.getElementById("pwdgridtable");
			    var TargetimgCollection = theTargetBox.querySelectorAll("img");	
				var imgCollection = pairTable.querySelectorAll("img"); 

                
				//Now check if the pair box has a Child.... now get the Img in the pair box
				var imgCollection = theTargetBox.querySelectorAll("img"); 
				// check if two Img was found in this mainbox
				if(TargetimgCollection.length == 1) return;

				

		       
		       if (theDragedImgObj != null ) // if an image object was dragged
		       {
        		       var elem = theDragedImgObj;	//get the object that was just dropped    		          
 
  
 
        		        // calculate the Icon Size based on data
        		        var ResizedIconHeight =  (theTargetBox.clientHeight) * ICON_to_PAIR_BOX_RATIO;
        		        var ResizedIconWidth =  (theTargetBox.clientWidth) * ICON_to_PAIR_BOX_RATIO;

        		           
        		        elem.setAttribute("height", ResizedIconHeight );
        		        elem.setAttribute("width", ResizedIconWidth);
        		        
        		        //now CENTER the resized ICON in the PairBox, Set teh margins that will "center the Icon
        		        elem.style.marginTop = parseInt((theTargetBox.clientHeight - ResizedIconHeight)/2) + "px";
        		        elem.style.marginLeft = parseInt((theTargetBox.clientWidth - ResizedIconWidth)/2) + "px";       		      

        		  elem.style.opacity ="1.0";
        		        theTargetBox.appendChild(elem);	//Add the image to the empty pair box
        		        	        
						elem.ondblclick = deleteSelf;	// map the double click to the Delete Self function
        		        theDragedImgObj = null;  
		      }
        }
     
    }
    
 

function extractfilenamefromURL(theUrl)
{
	var url = theUrl;
	url = url.substring(url.lastIndexOf('/')+1).split('.');
	return url[0];
		
}	
    
 

function getAllIconsToStrg()
{
//purpose : Goes thru the pwdgridtable and generate string indicating the pair image values 
//          Example : p1@img2*p2@img3

var imgPairID = "";
var allPairIDstrg = "";
var pairTable = document.getElementById("pwdgridtable"); // contains all the pairbox and images
//Get all the on the table Images in a collection 
var imgCollection = pairTable.querySelectorAll("img"); 

gStrgVar ="";
 for( var imgIcon of imgCollection) // for each ImageIcon
 {

	if (checkIfhasNeigbours(imgIcon.parentNode))
	{		
		imgPairID = imgIcon.parentNode.getAttribute("id");
		//ImgIconCellArray[imgPairID]	= imgIcon; 	
		var isMatchFound = gStrgVar.includes(imgPairID);
		if (!isMatchFound){
			if (gStrgVar.length > 2){
				gStrgVar = gStrgVar.substr(0,(gStrgVar.length-1));
				gStrgVar = gStrgVar + "@";
			}
			LocateAttachedIcons(imgIcon.parentNode);
		}
					
	}
						
 }//end for 

gStrgVar = gStrgVar.substr(0,(gStrgVar.length-1));
gStrgVar = gStrgVar.replace("@","}-{");	
gStrgVar = gStrgVar.replace("@","}-{");	
var allPairIDstrg = "{" + gStrgVar + "}";	
alert(allPairIDstrg );

return allPairIDstrg;

// for( var imgIcon of imgCollection) // for each ImageIcon
// {
//
//	if (checkIfhasNeigbours(imgIcon.parentNode))
//	{
//		imgPairID = imgIcon.parentNode.getAttribute("id")+ "@" + extractfilenamefromURL(imgIcon.src) ;		
//		// add to the main strg 
//		allPairIDstrg = allPairIDstrg + imgPairID +"*"; 			
//	}					
// }//end for 
//
// allPairIDstrg = allPairIDstrg.substr(0,allPairIDstrg.length-1); // remove the trailling "*"" 
 //alert(allPairIDstrg );
 //return allPairIDstrg;		
	
}


function clearAllIcons()
{

var pairTable = document.getElementById("pwdgridtable"); // contains all the pairbox and images
//Get all the Images in a collection 
var imgCollection = pairTable.querySelectorAll("img"); 
if(imgCollection.length == 0 )  return; 

 for( var imgIcon of imgCollection) // for each ImageIcon
 {
	var sourceObj = imgIcon["parentSourceObj"];
	sourceObj.style.visibility = 'visible'; 
	imgIcon.parentNode.removeChild(imgIcon);			
					
 }//end for 

}

function getIconpwdDataToSubmit()
{
    var pairData = document.getElementById("pwdiconstrg");	
    var thedata = getAllIconsToStrg();
	pairData.value = thedata.trim();
	if(pairData.value.length > 0)
	
	return (confirm('Are you sure you want to SUBMIT your Icon password selections ?'));
	  
	else
	{
		alert("Please create Icon password before you submit...Thank you ");
		return false;
	}
	  
}

function deleteSelf()
{

	var sourceObj = this["parentSourceObj"];
	 sourceObj.style.visibility = 'visible'; 
	this.parentNode.removeChild(this);
}

function checkIfhasNeigbours(ThePair) 
{
	var NeighbourList = calcNeigbours(ThePair);
	
	//alert(NeighbourList);
	
	var neigbourListArr = NeighbourList.split(',');
	//now check the neigbours pairbox to see if they have images
	
	for(x=0;x < neigbourListArr.length; x++) 
	{
		var pairBoxId = "p"+neigbourListArr[x]; // generate teh pairBox Id
		var thePairBox= document.getElementById(pairBoxId); //get the Element with the ID
		
		if(thePairBox != null)
		{
			// now get the Img in the pair box
			var imgCollection = thePairBox.querySelectorAll("img"); 
			// check if two Img was found in this mainbox
			if(imgCollection.length == 1) return true; // found a neigbour
							
		}		
	} // end for
	return false; // no neigbours found
}
   
function calcNeigbours(ThePair)
{
	var ROW = 9;
	var COLUMN =6;
	
	var LastCell = ROW * COLUMN;
	var ElemId =  ThePair.getAttribute("id");
	var idstrg =  ElemId.replace("p","");
	
	var id = parseInt(idstrg,10);
	
	var Top = id - COLUMN;
	var Left = id - 1;
	var Right = id + 1;
	var Bottom = id + COLUMN;
	
	// confirm it 
	if (Bottom > LastCell) Bottom  = 0;
	
	if ((Left % COLUMN) == 0 )Left = 0;//means this is Leftmost column
	
	if ((id % COLUMN) == 0 )Right = 0;//means this is rightmost column
	
	if (Top < 1) Top  = 0;
	

	var NeighList = "";
	
	if(Left > 0) NeighList = Left + ",";
	if(Top > 0) NeighList = NeighList + Top + ",";
	if(Right > 0) NeighList = NeighList + Right + ",";
	if(Bottom > 0) NeighList = NeighList + Bottom + ",";
	
	return NeighList.substr(0,NeighList.length-1);
//	alert(NeighList);
	
}

function getNeigboursWithImages(TargetPair)
{
	
	var NeighBourWithImgList = "";
	//get the Cells around you 
	var NeighbourList = calcNeigbours(TargetPair);
	
	var neigbourListArr = NeighbourList.split(',');
	//now check the neigbours pairbox to see if they have images
	
	for(x=0;x < neigbourListArr.length; x++) 
	{
		var pairBoxId = "p"+neigbourListArr[x]; // generate teh pairBox Id
		var thePairBox= document.getElementById(pairBoxId); //get the Element with the ID
		
		if(thePairBox != null  && (pairBoxId != theDragedStartPairBoxID) )
		{
			// now get the Img in the pair box
			var imgCollection = thePairBox.querySelectorAll("img"); 
			// check if two Img was found in this mainbox
			if(imgCollection.length == 1) // found a neigbour
			{
				 NeighBourWithImgList = NeighBourWithImgList + neigbourListArr[x] + ",";
			}
			
							
		}		
	} // end for
	
	if (NeighBourWithImgList.length > 1) NeighBourWithImgList = NeighBourWithImgList.substr(0,NeighBourWithImgList.length-1);
	
	return NeighBourWithImgList;
}

function hilightNeighbours(PairNeighStrg, theColor)
{

	var NeighBourWithImgList = "";

	
	var neigbourWithImgListArr = PairNeighStrg.split(',');
	//now check the neigbours pairbox to see if they have images
	
	for(y=0;y < neigbourWithImgListArr.length; y++) 
	{
		var pairBoxId = "p"+neigbourWithImgListArr[y]; // generate teh pairBox Id
		var thePairBox= document.getElementById(pairBoxId); //get the Element with the ID
		
		if(thePairBox != null   )
		{
			// now get the Img in the pair box
			var imgCollection = thePairBox.querySelectorAll("img"); 
			// check if two Img was found in this mainbox
			if(imgCollection.length == 1) // found a neigbour
			{
								 
				      
				 
						//get the Cells around you 
						var NeighbourList = calcNeigbours(thePairBox);
						
						var neigbourListArr = NeighbourList.split(',');
						//now check the neigbours pairbox to see if they have images
						
						for(x=0;x < neigbourListArr.length; x++) 
						{
							var pairBoxId = "p"+neigbourListArr[x]; // generate teh pairBox Id
							var thePairBox= document.getElementById(pairBoxId); //get the Element with the ID
							
		                    thePairBox.style.background = theColor;
						} // end for				 
				 
				 
				 
				 
				 
				 
				 
			}
			
							
		}		
	} // end for  	
	
}

function LocateAttachedIcons(aPairBox)
{
	var imgPairID = aPairBox.getAttribute("id");
	
	var ImgObj = aPairBox.querySelector("img"); // get the Image
	
	var PairBoxAndImgData = imgPairID +  ":" + extractfilenamefromURL(ImgObj.src) ;		
	
	gStrgVar = gStrgVar  + PairBoxAndImgData + ",";  // add you name to this group list
	
	var NeighbourList = getNeigboursWithImages(aPairBox); // get all adjcent boxes	

    var neigbourListArr = NeighbourList.split(',');
	
	
	for(var x=0;x < neigbourListArr.length; x++)  // loop thru them 
	{
		var pairBoxId = "p"+neigbourListArr[x]; // generate teh pairBox Id
		var thePairBox= document.getElementById(pairBoxId); //get the Element with the ID
		
		
		var isMatchFound = gStrgVar.includes(pairBoxId); // have we check the pairBox before
		if((thePairBox != null) && (!isMatchFound) ) // if not 
		{
			// check if this pair box has adjecebt boxes
            LocateAttachedIcons(thePairBox);
							
		}			
	}//end for 
	
 

	

}




 