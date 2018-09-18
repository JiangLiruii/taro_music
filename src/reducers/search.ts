import { FETCH_MUSICS, CHANGE_STATE, CHANGE_LOAD_STATE, ADD_FAVO_MUSIC_LIST, DELETE_FROM_FAVO_MUSIC, CHANGE_END_STATE } from '../constants/music'
import { SongInfo } from './song_single'
import Taro from "@tarojs/taro";

export interface Query {
  name:string;
  page?:number;
  pagesize?:number;
}
export interface SongsState {
  songs_list:SongInfo[];
  currentMusicState:Query;
  isLoading:boolean;
  favo_song_list:SongInfo[];
  end:boolean;
}
const INITIAL_STATE:SongsState = {
  songs_list: [],
  currentMusicState: {name:'', page:1, pagesize:20},
  isLoading: false,
  favo_song_list: Taro.getStorageSync('favo_song_list') && JSON.parse(Taro.getStorageSync('favo_song_list')),
  end: false,
};

export default function search (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_MUSICS:
      let origin = JSON.parse(JSON.stringify(state.songs_list));
      if (action.payload.page !== 1) {
        origin = origin.concat(action.payload.songs_list);
      } else {
        origin = action.payload.songs_list;
      }
      return {
        ...state,
        songs_list: origin,
      };
     case CHANGE_STATE:
       return {
         ...state,
         currentMusicState: action.payload.currentMusicState,
       }
      case CHANGE_LOAD_STATE:
       return {
        ...state,
        isLoading: action.payload.isLoading,
       }
       case ADD_FAVO_MUSIC_LIST:
        const new_favo_list = JSON.parse(JSON.stringify(state.favo_song_list));
        new_favo_list.push(action.payload);
        return {
          ...state,
          favo_song_list:new_favo_list,
        }
        case DELETE_FROM_FAVO_MUSIC:
          const new_songs_list = JSON.parse(JSON.stringify(state.favo_song_list));
          new_songs_list.splice(action.payload, 1);
          return {
            ...state,
            favo_song_list: new_songs_list,
          };
        case CHANGE_END_STATE:
          return {
            ...state,
            end: action.payload,
          }
        default:
          return state
  }
}
