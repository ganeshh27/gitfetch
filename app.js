 
    url = 'https://api.github.com/users/'  
    xname = ''
    x = ''
    followers = []
    inputFieldId = "fname"
    following = []
    tableId1 = document.getElementById("followerstab")
    tableId2 = document.getElementById("followingtab")
    name1 = document.getElementById("fname")
    name1.addEventListener('keyup',function(e){
        if (e.keyCode === 13) {
        handleGit()
      }
    });
    nf = document.getElementById("notfound")
    function delet_tab(tabid){
        var table = document.getElementById(tabid);
        var rowCount = table.rows.length;
        var tempi = 0
        for (var i = 1; i < rowCount; i++) {
            
           table.deleteRow(i-tempi);
           tempi = tempi+1

        }
     }
     
    function handleGit(gitUserId){
        if (gitUserId){
            gitId = gitUserId
            document.getElementById(inputFieldId).value = gitId
        }
        else{
        gitId = document.getElementById(inputFieldId).value; 
        }
        gitfetch(gitId)
    }
    function notfound(){
            
            tableId1.style.visibility = "hidden"
            tableId2.style.visibility = "hidden"
            
            nf.style.visibility = 'visible'
    }
    function gitfetch(gitId) {

        delet_tab("followerstab")
        delet_tab("followingtab")
        tableId1.style.visibility = "visible"
        tableId2.style.visibility = "visible"
        nf.style.visibility = 'hidden'
        
        fetch(url+gitId)
        .then(response => response.json())
        .then(function(data) {
            console.log(data);
            if (data.message == "Not Found"){
                notfound()
                throw new Error('Something went wrong');
            }
            return fetch(url+gitId+"/followers")
         }).then(r1 => r1.json())
         .then(function(followers) {
             console.log(followers);
             followersa = followers
             return fetch(url+gitId+"/following")
         }).then(r2 => r2.json())
         .then(following =>  {
             console.log(following);
             followinga = following
             function insertTable(tabId,tabName)
             {
               for (i=0;i<tabName.length;i++){      
                    var tr1 = document.createElement('tr');
                    tr1.innerHTML=
                    
   
                    "<div class='row mt-2 mb-2' onclick=handleGit('"+tabName[i].login+"') >"+
                    "<div class='col-md-4'>"+
                        "<img src='"+tabName[i].avatar_url+"' class='img-thumbnail' alt='Cinque Terre'>"+
                    "</div>"+
                    "<div class='col-md-7'>"+tabName[i].login+
                    "</div>"+
                    "</div>"
        

                    // tr1.innerHTML=    "<div class='card'>"+
                    // "<div class='card-horizontal' onclick=handleGit('"+tabName[i].login+"')>"+
                    //     "<div class='img-square-wrapper'>"+
                    //         "<img class='img-thumbnail' src='"+tabName[i].avatar_url+"' alt='Card image cap'>"+
                    //     "</div>"+
                    //     "<div class='card-body'>"+
                    //         "<h4 class='card-title'>'"+(url+"/"+tabName[i].login).name+"'</h4>"+
                    //     "</div>"+
                    // "</div>"+
                    // "</div>"
                    //tr1.innerHTML="<td onclick=handleGit('"+tabName[i].login+"')>"+tabName[i].login+"</td>";
                    document.getElementById(tabId).appendChild(tr1);            
               }  
             }
             insertTable("followingtab",followinga)
             insertTable("followerstab",followersa)
             
         }) 
         .catch((error) => {
            console.log(error)
          });  
    }
 
    

