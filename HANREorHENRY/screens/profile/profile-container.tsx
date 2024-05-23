import { User, signOut, updateProfile } from "firebase/auth";
import { auth, storage } from "../../firebaseConfig";
import ProfileScreen from "./profile-screen";
import { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Alert, Linking } from "react-native";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { assetToBlob } from "../../utils/utils";

export type MyUser = {
  name: string | null;
  email: string | null;
  creationTime: string | undefined;
  photoURL: string | null;
};

export default () => {
  //1.데이터를 불러오고, 가공하고, 수정
  const [user, setUser] = useState<MyUser>();

  //프로필 이미지 변경 함수
  const onEditTmage = async () => {
    //0.d미지ㅣ 앨범 접근 권한
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    //0-a 만일 거절한 경우
    if (permission.status === ImagePicker.PermissionStatus.DENIED) {
      //다시한번 권한을 설정할 수 있도록 안내 or 유도
      return Alert.alert("알림", "사진에 접근하려면 권한을 설정해주세요", [
        {
          text: "설정으로 이동",
          style: "default",
          onPress: () => {
            Linking.openSettings();
          },
        },
      ]);
    }
    //0-b 설정을 못해서 결정을 못하 경우
    else if (permission.status === ImagePicker.PermissionStatus.UNDETERMINED) {
      //다시 한번 권한 허가 알림창 열기
      return await ImagePicker.requestMediaLibraryPermissionsAsync();
    }
    //0-c

    //1.이미지 고르기
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.3, //default 0.2 1에 가까우면 압축률 높음
    });
    //2.이미지 고른 후 서버(firebase)에 update
    //2-a 이미지 정상 선택된 경우
    if (!result.canceled && auth.currentUser) {
      //firebase에 저장할 위치 설정
      //ㄴ1.유저아이디
      const userId = auth.currentUser?.uid;
      //ㄴ2.저장경로
      const path = `profiles/${userId}`;
      const firebasePath = ref(storage, path);
      //firebase에 업로드
      //ㄴ0. 내가 선택한 이미지의 uri 경로 가져오기
      const locationURi = result.assets[0].uri;
      //ㄴ1.내 이미지를  blob- binarylargeobject로 변환
      const blob = await assetToBlob(locationURi);
      //ㄴ2.변환된 데이터를 firebaseㅔ 업로드(update)
      const uploadTask = await uploadBytes(firebasePath, blob);
      //ㄴ3.firebase에 업로드된 이미지의 url 가져오기
      const photoURL = await getDownloadURL(uploadTask.ref);
      //스크린에서 내 프로필 바뀐 이미지 새로고침
      //ㄴ1. 서버에서의 나의 프로필 이미지 업데이트
      await updateProfile(auth.currentUser, {
        photoURL, // == {photoURL :photoURL}
      });
      //ㄴ2.로컬app 화면에서 나의 프로필 이미지 갱신
      setUser({
        name: auth.currentUser.displayName,
        email: auth.currentUser.email,
        creationTime: auth.currentUser.metadata.creationTime,
        photoURL,
      });
    }
    //2-b 이미지가 선택되지 않은 경우
    else {
    }
  };

  //로그아웃 기능 함수
  const onSignout = async () => {
    await signOut(auth);
  };

  //firebase (server)에서 user의 정보를 불러온다.
  const getUserData = () => {
    //1.firebase의 유저 정보 가져온다.
    const user = auth.currentUser;
    //2. 유저 정보가 있다면, 유저의 정보를 저장
    if (user) {
      //d유저 정보를 저장
      setUser({
        name: user.displayName,
        email: user.email,
        creationTime: user.metadata.creationTime,
        photoURL: user.photoURL,
      });
    }
  };
  //profile 페이지가 실행될 때, 딱 1번
  useEffect(() => {
    getUserData();
  }, []);

  //2.가공한 데이터를 presenter에 넘겨준다.
  return (
    <ProfileScreen
      user={user}
      onSignout={onSignout}
      onEditImage={onEditTmage}
    />
  );
};
