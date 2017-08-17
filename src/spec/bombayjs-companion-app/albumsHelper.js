var url = require('url');

export default (function () {

  class Helper {

    parseBandAndAlbumCount(req) {
      var url_parts = url.parse(req.url, true);
      var query = url_parts.query;
      var band = query.term;
      var albumCount = query.limit;
      return {
        band: band,
        albumCount: albumCount
      };
    }

    generateResponse(band, count) {
      var response = {
        resultCount: count,
        results: []
      }
      for (let i=0; i<count; i++) {
        response.results.push(albumsMap[band][i]);
      }
      return response;
    }
  }

  const albumsMap = createAlbumsMap();

  return Helper;
})();

function createAlbumsMap() {
  return {
    Beatles: [
      {
        "collectionName": "Love",
        "artworkUrl100": "http://localhost:3039/images/Beatles/Love.jpg",
        "releaseDate": "2011-02-08T08:00:00Z"
      }, 
      {
        "collectionName": "The Beatles Box Set", 
        "artworkUrl100": "http://localhost:3039/images/Beatles/The-Beatles-Box-Set.jpg",
        "releaseDate": "2009-09-09T07:00:00Z", 
      }, 
      {
        "collectionName": "1 (2015 Version)",
        "artworkUrl100": "http://localhost:3039/images/Beatles/One.jpg",
        "releaseDate": "2000-11-13T08:00:00Z"
      },
      {
        "collectionName": "The Beatles 1967-1970 (The Blue Album)",
        "artworkUrl100": "http://localhost:3039/images/Beatles/The-Blue-Album.jpg",
        "releaseDate": "1973-04-19T08:00:00Z"
      }, 
      {
        "collectionName": "The Beatles 1962-1966 (The Red Album)",
        "artworkUrl100": "http://localhost:3039/images/Beatles/The-Red-Album.jpg",
        "releaseDate": "1973-04-19T08:00:00Z"
      }, 
      {
        "collectionName": "Let It Be",
        "artworkUrl100": "http://localhost:3039/images/Beatles/Let-it-Be.jpg",
        "releaseDate": "1970-05-08T07:00:00Z"
      },
      {
        "collectionName": "Abbey Road",
        "artworkUrl100": "http://localhost:3039/images/Beatles/Abbey-Road.jpg",
        "releaseDate": "1969-09-26T07:00:00Z"
      }, 
      {
        "collectionName": "The Beatles (White Album)",
        "artworkUrl100": "http://localhost:3039/images/Beatles/The-White-Album.jpg",
        "releaseDate": "1968-11-22T08:00:00Z"
      }, 
      {
        "collectionName": "Sgt. Pepper's Lonely Hearts Club Band",
        "artworkUrl100": "http://localhost:3039/images/Beatles/Sgt-Peppers.jpg",
        "releaseDate": "1967-06-01T07:00:00Z"
      }, 
      {
        "collectionName": "Revolver",
        "artworkUrl100": "http://localhost:3039/images/Beatles/Revolver.jpg",
        "releaseDate": "1966-08-05T07:00:00Z"
      }, 
      {
        "collectionName": "Rubber Soul",
        "artworkUrl100": "http://localhost:3039/images/Beatles/Rubber-Soul.jpg",
        "releaseDate": "1965-12-03T08:00:00Z"
      }, 
      {
        "collectionName": "Help!", 
        "artworkUrl100": "http://localhost:3039/images/Beatles/Help.jpg",
        "releaseDate": "1965-08-06T07:00:00Z"
      }
    ],
    Bangles: [
      {
        "collectionName":"All Over the Place",
        "artworkUrl100": "http://localhost:3039/images/Bangles/All-over-the-Place.jpg",
        "releaseDate": "2010-10-22T07:00:00Z"
      },
      {
        "collectionName":"Baubles, Bangles And Beads",
        "artworkUrl100": "http://localhost:3039/images/Bangles/Baubles-Bangles-and-Beads.jpg",
        "releaseDate": "2008-11-01T07:00:00Z"
      },
      {
        "collectionName":"Different Light",
        "artworkUrl100": "http://localhost:3039/images/Bangles/Different-Light.jpg",
        "releaseDate": "1986-03-18T08:00:00Z"
      },
      {
        "collectionName":"Doll Revolution",
        "artworkUrl100": "http://localhost:3039/images/Bangles/Doll-Revolution.jpg",
        "releaseDate": "2003-09-23T07:00:00Z"
      },
      {
        "collectionName":"Everything",
        "artworkUrl100": "http://localhost:3039/images/Bangles/Everything.jpg",
        "releaseDate": "1988-10-18T07:00:00Z"
      },
      {
        "collectionName":"Greatest Hits",
        "artworkUrl100": "http://localhost:3039/images/Bangles/Greatest-Hits.jpg",
        "releaseDate": "1990-01-01T08:00:00Z"
      },
      {
        "collectionName":"Ladies and Gentlemen...The Bangles!",
        "artworkUrl100": "http://localhost:3039/images/Bangles/Ladies-and-Gentlemen.jpg",
        "releaseDate": "2014-11-27T08:00:00Z"
      },
      {
        "collectionName":"Lies",
        "artworkUrl100": "http://localhost:3039/images/Bangles/Lies.jpg",
        "releaseDate": "1986-11-27T08:00:00Z"
      },
      {
        "collectionName":"Light My Way - Single",
        "artworkUrl100": "http://localhost:3039/images/Bangles/Light-My-Way.jpg",
        "releaseDate": "2006-12-01T08:00:00Z"
      },
      {
        "collectionName":"Super Hits",
        "artworkUrl100": "http://localhost:3039/images/Bangles/Super-Hits.jpg",
        "releaseDate": "1998-06-29T07:00:00Z"
      },
      {
        "collectionName":"Sweetheart of the Sun",
        "artworkUrl100": "http://localhost:3039/images/Bangles/Sweetheart-of-the-Sun.jpg",
        "releaseDate": "2011-09-27T07:00:00Z"
      },
      {
        "collectionName":"The Essential Bangles",
        "artworkUrl100": "http://localhost:3039/images/Bangles/The-Essential-Bangles.jpg",
        "releaseDate": "2003-04-23T07:00:00Z"
      }
    ]
  }
}
