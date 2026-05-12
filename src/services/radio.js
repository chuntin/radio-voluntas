import db from '../assets/db.json';

class Radio {
  constructor() {
    this.radioShows = db.radioShows;
    this.shows = db.shows;
    this.songs = db.songs;
  }

  static getRadioShows() {
    return db.radioShows.map(radioShow => {
      const relatedShows = db.shows
        .filter(show => show.radio_show_id === radioShow.id)
        .map(show => ({
          ...show,
          songs: db.songs.filter(song => song.show_id === show.id),
          radioShow: radioShow
        }))
        .sort((a, b) => new Date(b.date_show) - new Date(a.date_show));

      return {
        ...radioShow,
        shows: relatedShows
      };
    });
  }

  static getRadioShowById(id) {
    const radioShow = db.radioShows.find(show => show.id === id);
    if (!radioShow) return null;

    const relatedShows = db.shows
      .filter(show => show.radio_show_id === radioShow.id)
      .map(show => ({
        ...show,
        songs: db.songs.filter(song => song.show_id === show.id),
        radioShow: radioShow
      }))
      .sort((a, b) => new Date(b.date_show) + new Date(a.date_show));

    return {
      ...radioShow,
      shows: relatedShows
    };
  }
}

export { Radio }
