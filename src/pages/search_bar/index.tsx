import { ComponentClass } from 'react';
import { connect } from '@tarojs/redux';
import Taro, { Component, Config } from '@tarojs/taro';
import { View, Button, Text, Form, Input } from '@tarojs/components'
import { fetchMusicsAsyncActionCreator } from '../../actions/search';

interface SearchBarProps {
  searchMusic:typeof fetchMusicsAsyncActionCreator
}
interface SearchBarStates {
  searchInput:string;
  need_clear:boolean;
}
@connect(map_states_to_props, map_dispatch_to_props)
class SearchBar extends Component<SearchBarProps, SearchBarStates> {
  constructor(props:SearchBarProps) {
    super(props);
    this.state = {
      searchInput: '歌手名/歌名',
      need_clear: false,
    };   
    this._onChange = this._onChange.bind(this);
    this._onClick = this._onClick.bind(this);
    this._search = this._search.bind(this);
  }
  private _onChange(e:any) {
    const searchInput = e.currentTarget.value;
    this.setState({
      searchInput,
    });
    return searchInput;
  }
  // 输入不能为空
  private _empty_test(name:string) {
    return /^(|歌手名\/歌名|请输入要搜索的歌曲)$/.test(name);
  }
  // 点击搜索按钮式
  private _search(e:any) {
    e.preventDefault();
    const empty = this._empty_test(this.state.searchInput);
    if (empty) {
      this.setState({
        searchInput: '请输入要搜索的歌曲',
        need_clear: true,
      });
      return;
    }
    // this.props.changeNavIndex(1);
    this.props.searchMusic({name: this.state.searchInput, page: 1, pagesize: 20});
  }

  // 点击input框时
  private _onClick() {
    this._empty_test(this.state.searchInput) && this.setState({
      searchInput: '',
      need_clear: false,
    });
  }

  public render() {
    const value = this.state.searchInput;
    // const need_tip = this.state.show_tip_list && this.props.tips_list.length > 0;
    return (
      <View className="flex-wrp" style='flex-direction:row'>
          <View>
            <Input className={'inputTag' + (this.state.need_clear ? ' error_input' : '')} placeholder="歌手名/歌名" type="text" value={value} onClick={this._onClick} onInput={this._onChange} />
          </View>
          <View>
            <Button onClick={this._search} className='submit_button'>搜索</Button>
          </View>
      </View>
    );
  }
}
function map_states_to_props(state) {
  return {
  };
}
function map_dispatch_to_props(dispatch) {
  return {
    searchMusic(query) {
      dispatch(fetchMusicsAsyncActionCreator(query))
    },
  };
}
export default SearchBar as ComponentClass<{},{}>