import Event from "../models/Event.js";

export const listEvents = ({ filter = {}, fields, setting = {} }) =>
  Event.find(filter, fields, setting);

// export const getContact = (filter) => Contact.findOne(filter);

// export const removeContact = async (filter) => Contact.findOneAndDelete(filter);

// export const addContact = (data) => Contact.create(data);

// export const updateContact = (filter, data) =>
//   Contact.findOneAndUpdate(filter, data);

// export const updateStatusContact = (filter, data) =>
//   Contact.findOneAndUpdate(filter, {
//     favorite: data.favorite,
//   });
