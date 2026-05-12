import cover_v0_jpg from '../assets/images2/magazines/cover/v0.jpg';
import cover_v01_jpg from '../assets/images2/magazines/cover/v01.jpg';
import cover_v02_jpg from '../assets/images2/magazines/cover/v02.jpg';
import cover_v03_jpg from '../assets/images2/magazines/cover/v03.jpg';
import cover_v04_jpg from '../assets/images2/magazines/cover/v04.jpg';
import cover_v05_jpg from '../assets/images2/magazines/cover/v05.jpg';
import cover_v06_jpg from '../assets/images2/magazines/cover/v06.jpg';
import cover_v07_jpg from '../assets/images2/magazines/cover/v07.jpg';
import cover_v08_jpg from '../assets/images2/magazines/cover/v08.jpg';
import cover_v09_jpg from '../assets/images2/magazines/cover/v09.jpg';
import cover_v10_jpg from '../assets/images2/magazines/cover/v10.jpg';
import cover_v11_jpg from '../assets/images2/magazines/cover/v11.jpg';
import cover_v12_jpg from '../assets/images2/magazines/cover/v12.jpg';
import cover_v13_jpg from '../assets/images2/magazines/cover/v13.jpg';
import cover_v14_jpg from '../assets/images2/magazines/cover/v14.jpg';
import cover_v15_jpg from '../assets/images2/magazines/cover/v15.jpg';
import cover_v16a_jpg from '../assets/images2/magazines/cover/v16a.jpg';
import cover_v17_jpg from '../assets/images2/magazines/cover/v17.jpg';
import cover_v18_jpg from '../assets/images2/magazines/cover/v18.jpg';
import cover_v19_jpg from '../assets/images2/magazines/cover/v19.jpg';
import cover_v20_jpg from '../assets/images2/magazines/cover/v20.jpg';
import cover_v21_jpg from '../assets/images2/magazines/cover/v21.jpg';
import cover_v22_jpg from '../assets/images2/magazines/cover/v22.jpg';
import cover_v23_jpg from '../assets/images2/magazines/cover/v23.jpg';
import cover_v24_jpg from '../assets/images2/magazines/cover/v24.jpg';
import cover_v25_jpg from '../assets/images2/magazines/cover/v25.jpg';
import cover_v26_jpg from '../assets/images2/magazines/cover/v26.jpg';
import cover_v27_jpg from '../assets/images2/magazines/cover/v27.jpg';
import cover_v28_jpg from '../assets/images2/magazines/cover/v28.jpg';
import cover_v29_jpg from '../assets/images2/magazines/cover/v29.jpg';
import cover_v30_jpg from '../assets/images2/magazines/cover/v30.jpg';
import cover_v31_jpg from '../assets/images2/magazines/cover/v31.jpg';
import cover_v32_jpg from '../assets/images2/magazines/cover/v32.jpg';
import cover_v33_jpg from '../assets/images2/magazines/cover/v33.jpg';
import cover_v34_jpg from '../assets/images2/magazines/cover/v34.jpg';
import cover_v35_jpg from '../assets/images2/magazines/cover/v35.jpg';
import cover_v36_jpg from '../assets/images2/magazines/cover/v36.jpg';
import cover_v37_jpg from '../assets/images2/magazines/cover/v37.jpg';
import cover_v38_jpg from '../assets/images2/magazines/cover/v38.jpg';
import cover_v39_jpg from '../assets/images2/magazines/cover/v39.jpg';
import cover_v40_jpg from '../assets/images2/magazines/cover/v40.jpg';
import cover_v41_jpg from '../assets/images2/magazines/cover/v41.jpg';
import cover_v42_jpg from '../assets/images2/magazines/cover/v42.jpg';
import cover_v43_jpg from '../assets/images2/magazines/cover/v43.jpg';
import cover_v44_jpg from '../assets/images2/magazines/cover/v44.jpg';
import cover_v45_jpg from '../assets/images2/magazines/cover/v45.jpg';
import cover_v46_jpg from '../assets/images2/magazines/cover/v46.jpg';
import cover_v47_jpg from '../assets/images2/magazines/cover/v47.jpg';
import cover_v48_jpg from '../assets/images2/magazines/cover/v48.jpg';
import cover_v49_jpg from '../assets/images2/magazines/cover/v49.jpg';
import cover_v50_jpg from '../assets/images2/magazines/cover/v50.jpg';

const magazineCoverMap = {
  'v0.jpg': cover_v0_jpg,
  'v01.jpg': cover_v01_jpg,
  'v02.jpg': cover_v02_jpg,
  'v03.jpg': cover_v03_jpg,
  'v04.jpg': cover_v04_jpg,
  'v05.jpg': cover_v05_jpg,
  'v06.jpg': cover_v06_jpg,
  'v07.jpg': cover_v07_jpg,
  'v08.jpg': cover_v08_jpg,
  'v09.jpg': cover_v09_jpg,
  'v10.jpg': cover_v10_jpg,
  'v11.jpg': cover_v11_jpg,
  'v12.jpg': cover_v12_jpg,
  'v13.jpg': cover_v13_jpg,
  'v14.jpg': cover_v14_jpg,
  'v15.jpg': cover_v15_jpg,
  'v16a.jpg': cover_v16a_jpg,
  'v17.jpg': cover_v17_jpg,
  'v18.jpg': cover_v18_jpg,
  'v19.jpg': cover_v19_jpg,
  'v20.jpg': cover_v20_jpg,
  'v21.jpg': cover_v21_jpg,
  'v22.jpg': cover_v22_jpg,
  'v23.jpg': cover_v23_jpg,
  'v24.jpg': cover_v24_jpg,
  'v25.jpg': cover_v25_jpg,
  'v26.jpg': cover_v26_jpg,
  'v27.jpg': cover_v27_jpg,
  'v28.jpg': cover_v28_jpg,
  'v29.jpg': cover_v29_jpg,
  'v30.jpg': cover_v30_jpg,
  'v31.jpg': cover_v31_jpg,
  'v32.jpg': cover_v32_jpg,
  'v33.jpg': cover_v33_jpg,
  'v34.jpg': cover_v34_jpg,
  'v35.jpg': cover_v35_jpg,
  'v36.jpg': cover_v36_jpg,
  'v37.jpg': cover_v37_jpg,
  'v38.jpg': cover_v38_jpg,
  'v39.jpg': cover_v39_jpg,
  'v40.jpg': cover_v40_jpg,
  'v41.jpg': cover_v41_jpg,
  'v42.jpg': cover_v42_jpg,
  'v43.jpg': cover_v43_jpg,
  'v44.jpg': cover_v44_jpg,
  'v45.jpg': cover_v45_jpg,
  'v46.jpg': cover_v46_jpg,
  'v47.jpg': cover_v47_jpg,
  'v48.jpg': cover_v48_jpg,
  'v49.jpg': cover_v49_jpg,
  'v50.jpg': cover_v50_jpg,
};

export const getMagazineCover = (cover) => magazineCoverMap[cover] || magazineCoverMap['v50.jpg'];
