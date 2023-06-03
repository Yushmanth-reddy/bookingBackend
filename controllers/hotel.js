import hotel from "../models/hotel.js";
import room from "../models/room.js";

export const createHotel = async (req, res, next) => {
  const newHotel = new hotel(req.body);

  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (err) {
    next(err);
  }
};

export const updateHotel = async (req, res, next) => {
  try {
    const updatedHotel = await hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (err) {
    next(err);
  }
};

export const deleteHotel = async (req, res, next) => {
  try {
    await hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel has been deleted");
  } catch (err) {
    next(err);
  }
};

export const getHotel = async (req, res, next) => {
  try {
    const getHotel = await hotel.findById(req.params.id);
    res.status(200).json(getHotel);
  } catch (err) {
    next(err);
  }
};

export const countHotelbyCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return hotel.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

export const countHotelbyType = async (req, res, next) => {
  try {
    const hotelCount = await hotel.countDocuments({ type: "hotel" });
    const ApartmentsCount = await hotel.countDocuments({ type: "apartments" });
    const ResortsCount = await hotel.countDocuments({ type: "resorts" });
    const VillasCount = await hotel.countDocuments({ type: "villas" });
    const CabinsCount = await hotel.countDocuments({ type: "cabins" });
    res.status(200).json([
      { type: "hotel", count: hotelCount },
      { type: "apartments", count: ApartmentsCount },
      { type: "resorts", count: ResortsCount },
      { type: "villas", count: VillasCount },
      { type: "cabins", count: CabinsCount },
    ]);
  } catch (err) {
    next(err);
  }
};

export const getallHotels = async (req, res, next) => {
  const { max, min, ...others } = req.query;
  try {
    const hotels = await hotel
      .find({ ...others, cheapestPrice: { $gt: min | 1, $lt: max || 999 } })
      .limit(req.query.limit);
    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};

export const getHotelRooms = async (req, res, next) => {
  try {
    const ahotel = await hotel.findById(req.params.id);
    const list = await Promise.all(
      ahotel.rooms.map((aroom) => {
        return room.findById(aroom);
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};
