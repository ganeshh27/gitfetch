 
    url = 'https://api.github.com/users/'  
    xname = ''
    x = ''
    followers = []
    inputFieldId = "fname"
    following = []
    function delet_tab(tabid){
        var table = document.getElementById(tabid);
        var rowCount = table.rows.length;
        for (var i = 1; i < rowCount; i++) {
           table.deleteRow(i);
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
    function gitfetch(gitId) {
        
        delet_tab("followerstab")
        delet_tab("followingtab")
        fetch(url+gitId)
        .then(response => response.json())
        .then(function(data) {
            console.log(data);
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
             function insrt(id,res)
             {
               for (i=0;i<res.length;i++){      
                    var tr1 = document.createElement('tr');
                    
                    tr1.innerHTML="<td onclick=handleGit('"+res[i].login+"')>"+res[i].login+"</td>";
                    document.getElementById(id).appendChild(tr1);            
               }  
             }
             insrt("followingtab",followinga)
             insrt("followerstab",followersa)
         })   
    }
    
