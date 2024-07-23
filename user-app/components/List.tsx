
  const handleScrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

export const List =  () => {
  return <ul className="flex text-white ml-14 gap-6">
  <li className="font-medium hover:underline cursor-pointer" onClick={handleScrollToBottom}>
    Explore</li>
  <li className="font-medium hover:underline cursor-pointer" onClick={handleScrollToBottom}>
    Pay and Recieve</li>
  <li className="font-medium hover:underline cursor-pointer" onClick={handleScrollToBottom}>
    Pay with EzyPay</li> 
  <li className="font-medium hover:underline cursor-pointer" onClick={handleScrollToBottom}>
    Support</li>
</ul>
}