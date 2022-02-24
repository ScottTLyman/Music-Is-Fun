import { ProxyState } from "../AppState.js";
import { sandBoxApi } from "../Services/AxiosService.js";
import songsService from "../Services/SongsService.js";

//Private
/**Draws the Search results to the page */
function _drawResults() {
  let template = ''
  ProxyState.songs.forEach(s => template += s.songListTemplate)
  document.getElementById('songs').innerHTML = template
}

/**Draws the Users saved songs to the page */
function _drawPlaylist() {
  let template = ''
  ProxyState.playlist.forEach(s => template += s.playlistTemplate)
  document.getElementById('playlist').innerHTML = template
}

function _drawActiveSong() {
  let activeSong = ProxyState.activeSong
  if (activeSong.title) {
    document.getElementById('now-playing').innerHTML = activeSong.ActiveSongTemplate
  } else {
    document.getElementById('now-playing').innerHTML = `<h2>Select a Song</h2>`

  }
}

//Public
export default class SongsController {
  constructor() {
    ProxyState.on('songs', _drawResults)
    ProxyState.on('activeSong', _drawActiveSong)
    ProxyState.on('playlist', _drawPlaylist)
    //TODO Don't forget to register your listeners and get your data
    songsService.getMySongs()
  }

  /**Takes in the form submission event and sends the query to the service */
  search(e) {
    //NOTE You dont need to change this method
    e.preventDefault();
    try {
      songsService.getMusicByQuery(e.target.query.value);
    } catch (error) {
      console.error(error);
    }
  }
  setActiveSong(id) {
    console.log('set active song', id);
    songsService.setActiveSong(id)
  }

  /**
   * Takes in a song id and sends it to the service in order to add it to the users playlist
   * @param {string} id
   */
  async addSong(id) {
    try {
      await songsService.addSong(id)
    } catch (error) {
      console.error(error)
    }

  }

  /**
   * Takes in a song id to be removed from the users playlist and sends it to the server
   * @param {string} id
   */
  async removeSong(id) {
    try {
      await songsService.removeSong(id)
    } catch (error) {
      console.error(error)
    }
  }
}
