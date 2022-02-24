export default class Song {
  constructor(data) {
    this.title = data.trackName || data.title;
    this.albumArt =
      data.albumArt || data.artworkUrl100.replace(/100x100/g, "300x300");
    this.artist = data.artistName || data.artist;
    this.album = data.collectionName || data.album;
    this.price = data.trackPrice || data.price;
    this.preview = data.previewUrl || data.preview;
    this.id = data.trackId?.toString() || data.id;
  }

  get ActiveSongTemplate() {
    return `
    <div class="text-center">
    <button type="button" class="btn btn-primary position-absolute top-0 start-30"onclick="app.songsController.addSong('${this.id}')">
    <span class="badge fs-5">+</span>
    </button>
    <img src="${this.albumArt}" class="rounded"alt="">
    <h2>${this.artist} | ${this.title}</h2>
    <h4>LP: ${this.album} |Price $${this.price}</h4>
    <audio controls  src="${this.preview}"></audio>
  </div>
        `;
  }

  get playlistTemplate() {
    return `
  <div class="bg-light">
    <h5 class="d-flex justify-content-between p-2">Song: ${this.title}<button class="btn btn-outline-danger mdi mdi-delete" onclick="app.songsController.removeSong('${this.id}')"></button></h5>
    <h6 class="p-2"><span class="text-decoration-underline">Artist:</span> ${this.artist}</h6>
    
  </div>
        `;
  }

  get songListTemplate() {
    return `
    <div class="card d-flex flex-row mb-2" style="width: 12rem;" onclick="app.songsController.setActiveSong('${this.id}')">
    <img src="${this.albumArt}" class="card-img-start img-fluid cover selectable" alt="...">
      <div class="card-body">
        <h5 class="card-title">${this.title}</h5>
        <p class="card-text">${this.artist}</p>
      </div>
    </div>
    `
  }
}
