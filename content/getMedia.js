(function () {

  function getMedia() {
    const artistre = /artist: "(.+)"/;
    const tracksre = /trackinfo: (\[.*\])/i;
    const body = document.querySelector('body');
    const artistmatch = body.textContent.match(artistre)[1];
    const trackmatch = `{"trackinfo": ${body.textContent.match(tracksre)[1]}}`;
    const tracks = JSON.parse(trackmatch).trackinfo;
    return tracks.map((track) => {
      return {
        filename: `${artistmatch} - ${track.title}.mp3`,
        url: track.file['mp3-128']
      };
    });
  }

  function wrangleMedia() {
    const media = getMedia();
    if (media.length) {
      browser.runtime.sendMessage({ media });
    }
  }

  browser.runtime.onMessage.addListener(wrangleMedia);

}());
