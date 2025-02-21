 init();

function init(){
    var videoplaylist = document.getElementById('videoplaylist');
    var playlist = document.getElementById('playlist');
    var tracks = playlist.getElementsByTagName('a');
    videoplaylist.volume = 0.10;
    videoplaylist.play();
    
    for(var track in tracks) {
      var link = tracks[track];
      if(typeof link === "function" || typeof link === "number") continue;
      
			link.addEventListener('click', function(e) {
      	e.preventDefault();
        var song = this.getAttribute('href');
       	run(song, videoplaylist, this);
      });
    }
    
    videoplaylist.addEventListener('ended',function(e) {
        for(var track in tracks) {
					var link = tracks[track];
          var nextTrack = parseInt(track) + 1;
        	if(typeof link === "function" || typeof link === "number") continue;
          if(!this.src) this.src = tracks[0];
          if(track == (tracks.length - 1)) nextTrack = 0;
                                	console.log(nextTrack);
        	if(link.getAttribute('href') === this.src) {
          	var nextLink = tracks[nextTrack];
          	run(nextLink.getAttribute('href'), videoplaylist, nextLink);
            break;
          }
        }
    });
}

function run(song, videoplaylist, link){
				var parent = link.parentElement;

				//quitar el active de todos los elementos de la lista
				var items = parent.parentElement.getElementsByTagName('li');
        for(var item in items) {
					if(items[item].classList)
        		items[item].classList.remove("active");
        }
        
        //agregar active a este elemento
        parent.classList.add("active");
        
        //tocar la cancion
        videoplaylist.src = song;
        videoplaylist.load();
        videoplaylist.play();
}