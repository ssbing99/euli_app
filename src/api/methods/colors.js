import configureStore from '../../store/configureStore';

const { store } = configureStore();

export async function getColorList(username) {

  const state = store.getState();

  const colors = state.colorReducer.colors;
  console.log(colors);

  const userColor = colors[username] || [];



  return userColor;
}
