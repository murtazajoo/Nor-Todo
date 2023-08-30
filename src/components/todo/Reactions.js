import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateTodo } from "../../features/todo/todoAsyncThnuk";
import { toast } from "react-toastify";

function Reactions({ todo }) {
  const dispatch = useDispatch();
  const [isDisabled, setIsDisabled] = useState();
  const [newReactions, setNewReaction] = useState(todo.reactions);

  function handleChange(name) {
    if (isDisabled)
      return toast.warn("You can only react once in a 10 second", {
        autoClose: 5000,
      });

    setNewReaction((prev) => {
      return {
        ...prev,
        [name]: prev[name] + 1,
      };
    });
  }

  useEffect(() => {
    if (
      newReactions.like === todo.reactions.like &&
      newReactions.dislike === todo.reactions.dislike &&
      newReactions.rocket === todo.reactions.rocket
    )
      return;

    setIsDisabled(true);
    dispatch(
      updateTodo({
        ...todo,
        reactions: newReactions,
      })
    );
    setTimeout(() => {
      setIsDisabled(false);
    }, 10000);
  }, [newReactions]);

  return (
    <div className="flex justify-around items-center p-2">
      <p className="p-1 " onClick={() => handleChange("like")}>
        👍 {newReactions?.like}
      </p>
      <p className="p-1 " onClick={() => handleChange("dislike")}>
        👎 {newReactions?.dislike}
      </p>
      <p className="p-1 " onClick={() => handleChange("rocket")}>
        🚀 {newReactions?.rocket}
      </p>
    </div>
  );
}

export default Reactions;
