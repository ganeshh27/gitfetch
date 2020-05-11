 
    url = 'https://api.github.com/users/'  
    xname = ''
    x = ''
    followers = []
    following = []
    function gitfetch() {
        
        x = document.getElementById("fname").value;
        fetch(url+x)
        .then(response => response.json())
        .then(function(data) {
            console.log(data);
            return fetch(url+x+"/followers")
        //     .then(r=>r.json)
        //     .then(dataf1 => {
        //         console.log(dataf1);followers = dataf1})
        //     fetch(url+x+"/following")
        //     .then(r2=>r2.json)
        //     .then(dataf2 => {console.log(dataf2);following = dataf2})
         }).then(r1 => r1.json())
         .then(function(followers) {
             console.log(followers);
             followersa = followers
             return fetch(url+x+"/following")
         }).then(r2 => r2.json())
         .then(following =>  {
             console.log(following);
             followinga = following
             function insrt(id,res)
             {
               for (i=0;i<res.length;i++){

                    // var elem = '<tr onclick=gitfetch()> res[i].login</tr>'
                    // var table = document.getElementById(id);
                    // var row = table.insertRow(-1);
                    // var cell1 = row.insertCell(0);
                    // cell1.innerHTML = elem
                    $('id tr:last').after('<tr Onclick="gitfetch()">res[i].login</tr>');
               
               }  
             }
             insrt("followingtab",followinga)
             insrt("followerstab",followersa)
         })   
    }
    
