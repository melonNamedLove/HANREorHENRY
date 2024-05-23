/**
 *
 * @param uri => blob 데이터로 변환
 * @returns blob(Binary Large Object data)
 */
export const assetToBlob = async (uri: string) => {
  //1.network fetch를 사용해서 정보를 받아온다
  const response = await fetch(uri);
  //2. 정보 중에 blob 데이터를 뽑아낸다
  const blob = response.blob();
  //3. 뽑아낸 blob 데이터를 반환
  return blob;
};

/**
 * uri가 없는 경우 기본 이미지 값을 return
 * @param uri 띄워주고 싶은 이미지 URi
 * @return require('이미지 경로')
 */
export const defaultImage = (uri: string | undefined | null) => {
  //a.uri가 존재하는경우
  if (uri) {
    return { uri };
  }
  //b.uri가 존재하지 않는 경우
  else {
    return require("../assets/icon.png");
  }
};
