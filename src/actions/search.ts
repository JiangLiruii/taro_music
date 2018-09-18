import { FETCH_MUSICS, CHANGE_STATE, CHANGE_LOAD_STATE, ADD_FAVO_MUSIC_LIST, DELETE_FROM_FAVO_MUSIC, CHANGE_END_STATE, } from '../constants/music'
import { Query } from '../reducers/search'
import { SongInfo } from '../reducers/song_single'
import Taro from '@tarojs/taro'
export function fetchMusicsAsyncActionCreator(query:Query) {
  const {name, page, pagesize} = query;
  return dispatch => {
    // dispatch(changeLoadState(true));
    Taro.request({
      url: 'https://lorry-music-api.leanapp.cn/api/search',
      data: {
        name,
        page,
        pagesize,
      }
    })
    .then((res) => {
      console.log(res.data);
      // 如果没有返回值
      if (res.data === '[]') {
        return dispatch(fetchMusicsAsyncActionCreator(query));
      } else if (res.data === '') {
        dispatch(changeLoadState(false));
        return dispatch(fetchSongEnd(true));
      }
      dispatch(fetchSongEnd(false));
      dispatch(fetchMusicSyncActionCreator({songs_list: res.data, page}));
      dispatch(changeCurrentMusicState(query));
      dispatch(changeLoadState(false));
    }, (err) => {console.log(err); } );
  };
}
function fetchSongEnd(end:boolean) {
  return {
    type: CHANGE_END_STATE,
    payload: end,
  };
}
function changeLoadState(isLoading:boolean) {
  return {
    type: CHANGE_LOAD_STATE,
    payload: {isLoading},
  };
}
function changeCurrentMusicState(currentMusicState:Query) {
  return {
    type: CHANGE_STATE,
    payload: {currentMusicState},
  };
}
export function fetchMusicSyncActionCreator(payload:any) {
  return {
    type: FETCH_MUSICS,
    payload,
  };
}

export function addMusicToFavoList(song:SongInfo) {
  return {
    type: ADD_FAVO_MUSIC_LIST,
    payload: song,
  };
}
export function deleteMusicFromFavoList(index:number) {
  return {
    type: DELETE_FROM_FAVO_MUSIC,
    payload: index,
  };
}