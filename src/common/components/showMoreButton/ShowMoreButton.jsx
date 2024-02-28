import './style.scss'
function ShowMoreButton({onButtonClick}) {
  return <button onClick={onButtonClick} className="show-more-posts">Show more</button>;
}

export default ShowMoreButton;
