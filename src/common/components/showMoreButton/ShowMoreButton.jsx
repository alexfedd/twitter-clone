import './style.scss'
function ShowMoreButton({onButtonClick, isPostsRefetching}) {
  return <button onClick={onButtonClick} className="show-more-posts">{isPostsRefetching ? 'Loading...' : 'Show more'}</button>;
}

export default ShowMoreButton;
