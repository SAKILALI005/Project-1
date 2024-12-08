module.exports.map = tt.map({
  key: 'wn5c1dFmQII6Gm5ojpNnhgAsddnNqmlY',
  container: 'map',
  zoom:14,
  center:[88.3630, 22.5626],
  dragPan: !isMobileOrTablet()
});
map.addControl(new tt.FullscreenControl());
map.addControl(new tt.NavigationControl());