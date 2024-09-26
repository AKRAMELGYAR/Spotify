const AppError = require('../utils/AppError')
const CatchAsync = require('../utils/CatchAsync')
const Song = require('../model/song');


const createSong = CatchAsync(async (req, res,next) => {
    const { title, artist, album, duration, genre,lyrics } = req.body;

    if (!req.files || !req.files.audioFile || !req.files.coverImage) {
      return next(new AppError('Audio file is required',400))
    }

    const newSong = new Song({
      title,
      artist,
      album,
      duration,
      genre,
      lyrics,
      audioFile: req.files.audioFile[0].filename, 
      coverImage: req.files.coverImage[0].filename 
    });

    await newSong.save();
    res.status(201).json({
        success : true,
        newSong 
    });
});

const getAllSongs =CatchAsync(async (req, res) => {
    const songs = await Song.find();
    res.status(200).json({
        success : true,
        songs
    });
});

const getSongById = CatchAsync(async (req, res) => {
    const song = await Song.findById(req.params.id);
    if (!song) {
      return res.status(404).json({ message: 'Song not found' });
    }
    res.status(200).json({
        success : true,
        song
    });
});

module.exports = {
  createSong,
  getAllSongs,
  getSongById,
};

