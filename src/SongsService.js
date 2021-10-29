const { Pool } = require('pg');

class SongsService {
  constructor() {
    this._pool = new Pool();
  }

  async getSongsByPlaylistId(playlistId) {
    const query = {
      text: `SELECT songs.id, songs.title, songs.performer
              FROM songs
              LEFT JOIN playlistsongs
              ON playlistsongs.song_id = songs.id
              WHERE playlistsongs.playlist_id = $1`,
      values: [playlistId],
    };

    const { rows } = await this._pool.query(query);

    return rows;
  }
}

module.exports = { SongsService };
