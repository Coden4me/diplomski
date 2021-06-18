import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { logoutUser, subscribe, unsubscribe } from "reduxStore/actions";

const Menu = ({ user, isSubscribed }) => {
  const [show, setShow] = useState(false);
  const container = useRef(null);
  const dispatch = useDispatch();

  const logout = () => dispatch(logoutUser);

  const subscribeUnsubscribe = () => {
    if (!isSubscribed) {
      dispatch(subscribe);
    } else {
      dispatch(unsubscribe);
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!container.current.contains(event.target)) {
        if (!show) return;
        setShow(false);
      }
    };

    window.addEventListener("click", handleOutsideClick);
    return () => window.removeEventListener("click", handleOutsideClick);
  }, [show]);

  return (
    <div
      onClick={() => setShow(!show)}
      ref={container}
      className="relative pb-1 cursor-pointer items-center flex text-lg my-2 lg:text-sm lg:mx-6 lg:my-0 font-semibold hocus:text-primary-500"
    >
      {user.name}
      <button
        className="menu focus:outline-none focus:shadow-solid ml-2"
        onClick={() => setShow(!show)}
      >
        <img
          className="w-10 h-10 rounded-full"
          src={user.picture}
          alt={user.name}
        />
      </button>

      {show && (
        <div className="w-max absolute right-0 mt-1 bg-gray-800 rounded shadow-md custom-dropdown lg:transform-none top-100">
          <button
            onClick={logout}
            className="block rounded font-bold w-full px-4 py-2 hover:bg-green-500 hover:text-green-100 text-white text-center"
          >
            Logout
          </button>
          <button
            onClick={subscribeUnsubscribe}
            className="block rounded font-bold w-full px-4 py-2 hover:bg-green-500 hover:text-green-100 text-white text-center"
          >
            {isSubscribed
              ? "Unsubscribe from Newsletter"
              : "Subscribe to Newsletter"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Menu;
