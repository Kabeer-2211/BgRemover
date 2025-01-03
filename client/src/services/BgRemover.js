import axios from "../utils/axios";

export const removeBg = async (data) => await axios.post('/api/remove-bg', data);