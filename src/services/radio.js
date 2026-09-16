import db from '../assets/db.json';

const DAYS_TO_CONSIDER_NEW_SHOW = 7;

class Radio {
  constructor() {
    this.radioShows = db.radioShows;
    this.shows = db.shows;
    this.songs = db.songs;
  }

  static isNewShow(show) {
    if (!show.date_show) return false;
    const createdAtDate = new Date(show.date_show);
    const now = new Date();
    const timeMsDifference = now - createdAtDate;
    if (timeMsDifference < 0) return false; // fecha futura, no mostrar como nuevo
    const timeDaysDifference = timeMsDifference / (1000 * 60 * 60 * 24);
    return timeDaysDifference < DAYS_TO_CONSIDER_NEW_SHOW;
  }

  static hasNewShow(shows) {
    for (const show of shows) {
      if (this.isNewShow(show)) return true;
    }
    return false;
  }

  static slugify(text) {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }

  static getRadioShows() {
    const now = new Date();
    return db.radioShows.map(radioShow => {
      const relatedShows = db.shows
        .filter(show => show.radio_show_id === radioShow.id)
        .filter(show => !show.date_show || new Date(show.date_show) <= now)
        .map(show => ({
          ...show,
          songs: db.songs.filter(song => song.show_id === show.id),
          radioShow: radioShow,
        }))
        .sort((a, b) => new Date(b.date_show) - new Date(a.date_show));

      return {
        ...radioShow,
        hasNewShow: this.hasNewShow(relatedShows),
        slug: this.slugify(radioShow.title),
        shows: relatedShows
      };
    });
  }

  static getRadioShowById(id) {
    const now = new Date();
    const radioShow = db.radioShows.find(show => show.id === id);
    if (!radioShow) return null;

    const relatedShows = db.shows
      .filter(show => show.radio_show_id === radioShow.id)
      .filter(show => !show.date_show || new Date(show.date_show) <= now)
      .map(show => ({
        ...show,
        songs: db.songs.filter(song => song.show_id === show.id),
        radioShow: radioShow
      }))
      .sort((a, b) => new Date(b.date_show) + new Date(a.date_show));

    return {
      ...radioShow,
      hasNewShow: this.hasNewShow(relatedShows),
      slug: this.slugify(radioShow.title),
      shows: relatedShows
    };
  }


}

export { Radio }
