import ICON from '../assets/icons';

export const generateStart = (start: number) => {
  let starts = [];
  for (let i = 1; i <= +start; i++) {
    starts.push(<span className="Home-product-item_rating--gold">{ICON.START}</span>);
  }
  for (let j = 1; j <= 5 - start; j++) {
    starts.push(<span>{ICON.START}</span>);
  }
  return starts;
};
export const generateStartFilter = (start: number) => {
  let starts = [];
  for (let i = 1; i <= +start; i++) {
    starts.push(ICON.START_CHECKED);
  }
  for (let j = 1; j <= 5 - start; j++) {
    starts.push(ICON.START_UNCHECKED);
  }
  return starts;
};
